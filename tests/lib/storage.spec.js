import { describe, it } from 'mocha';
import { expect } from 'chai';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as storage from '../../lib/storage';
import { getStepFromBackend } from '../../lib/utils';

describe('Storage', () => {
  it('stores data', () => {
    const steps = {
      '1': {
        '@class': '.TextStep',
        id: '1',
        message: 'First message',
        trigger: '2'
      },
      '2': {
        '@class': '.TextStep',
        id: '2',
        message: 'Second message',
        trigger: '3'
      },
      '3': {
        '@class': '.TextStep',
        id: '3',
        message: 'Third message',
        end: true
      }
    };

    const state = {
      renderedSteps: [steps['1'], steps['2'], steps['3']],
      previousSteps: [steps['1'], steps['2'], steps['3']],
      previousStep: steps['2'],
      currentStep: steps['3']
    };
    const stringifiedState = storage.setData('storage_cache', state);

    expect(localStorage.getItem('storage_cache')).to.equal(stringifiedState);
  });

  it('extracts data', async () => {
    const steps = {
      '1': {
        '@class': '.TextStep',
        id: '1',
        message: 'First message',
        trigger: '2'
      },
      '2': {
        '@class': '.TextStep',
        id: '2',
        message: 'Second message',
        trigger: '3'
      },
      '3': {
        '@class': '.TextStep',
        id: '3',
        message: 'Third message',
        end: true
      }
    };

    const state = {
      renderedSteps: [steps['1'], steps['2'], steps['3']],
      previousSteps: [steps['1'], steps['2'], steps['3']],
      previousStep: steps['2'],
      currentStep: steps['3']
    };

    const stringifiedState = storage.setData('storage_cache', state);

    const { currentStep, previousStep, renderedSteps } = await storage.getData({
      cacheName: 'storage_cache',
      cache: stringifiedState,
      firstStep: steps['1'],
      steps
    });

    expect(currentStep).to.contain(state.currentStep);
    expect(previousStep).to.contain(state.previousStep);
    renderedSteps.forEach((step, index) => {
      expect(step).to.contain(state.renderedSteps[index]);
    });
  });

  it('marks all rendered steps as rendered except the last one', async () => {
    const steps = {
      '1': {
        '@class': '.TextStep',
        id: '1',
        message: 'First Message',
        trigger: '2'
      },
      '2': {
        '@class': '.TextStep',
        id: '2',
        message: 'Second Message',
        trigger: '3'
      },
      '3': {
        '@class': '.TextStep',
        id: '3',
        message: 'Third Message',
        end: true
      }
    };

    const renderedSteps = [
      {
        '@class': '.TextStep',
        id: '1',
        message: 'First Message',
        trigger: '2'
      },
      {
        '@class': '.TextStep',
        id: '2',
        message: 'Second Message',
        trigger: '3'
      }
    ];
    const currentStep = renderedSteps[1];
    const previousSteps = renderedSteps.map(i => i); // copy over its references
    const previousStep = renderedSteps[0];

    const state = { renderedSteps, currentStep, previousStep, previousSteps };

    const stringifiedState = storage.setData('storage_cache', state);

    const stateFromStorage = await storage.getData({
      cacheName: 'storage_cache',
      cache: stringifiedState,
      firstStep: steps['1'],
      steps
    });

    expect(stateFromStorage.currentStep).to.eql({ ...currentStep, delay: 0 });
    stateFromStorage.renderedSteps.forEach((step, index) => {
      if (index < stateFromStorage.renderedSteps.length - 1) {
        expect(step).to.eql({ ...renderedSteps[index], rendered: true, delay: 0 });
      } else {
        expect(step).to.eql({ ...renderedSteps[index], delay: 0 });
      }
    });
    expect(stateFromStorage.previousStep).to.eql({ ...previousStep, rendered: true, delay: 0 });
  });

  it('marks every steps in renderedSteps rendered except last one if current step is a UserStep', async () => {
    const steps = {
      '1': {
        id: '1',
        message: 'First message',
        trigger: '2'
      },
      '2': {
        id: '2',
        message: 'Second message',
        trigger: '{userInput}'
      },
      '{userInput}': {
        id: '{userInput}',
        user: true,
        end: true
      }
    };
    const state = {
      renderedSteps: [steps['1'], steps['2']],
      previousStep: steps['2'],
      previousSteps: [steps['1'], steps['2']],
      currentStep: steps['{userInput}']
    };

    const stringifiedState = storage.setData('storage_cache', state);

    const { currentStep, renderedSteps, previousStep } = await storage.getData(
      {
        cacheName: 'storage_cache',
        cache: stringifiedState,
        firstStep: steps['1'],
        steps
      },
      () => {}
    );

    expect(currentStep).to.eql({ ...state.currentStep });
    renderedSteps.forEach((step, index) => {
      expect(step).to.eql({ ...state.renderedSteps[index], rendered: true, delay: 0 });
    });
    expect(currentStep).to.not.eql(renderedSteps[renderedSteps.length - 1]);
    expect(previousStep).to.eql({ ...state.previousStep, rendered: true, delay: 0 });
  });

  it('marks all renderedSteps as rendered except the last one when currentStep is an OptionStep', async () => {
    const steps = {
      '1': {
        id: '1',
        message: 'First message',
        trigger: '{options}'
      },
      '{options}': {
        id: '{options}',
        options: [
          { label: 'Option 1', value: 'Option 1' },
          { label: 'Option 2', value: 'Option 2' }
        ],
        end: true
      }
    };
    const state = {
      renderedSteps: [steps['1'], steps['{options}']],
      previousStep: steps['1'],
      previousSteps: [steps['1'], steps['{options}']],
      currentStep: steps['{options}']
    };

    const stringifiedState = storage.setData('storage_cache', state);

    const { currentStep, renderedSteps, previousStep } = await storage.getData({
      cacheName: 'storage_cache',
      cache: stringifiedState,
      firstStep: steps['1'],
      steps
    });

    expect(currentStep).to.eql({ ...state.currentStep, delay: 0 });
    renderedSteps.forEach((step, index) => {
      if (index < renderedSteps.length - 1) {
        expect(step).to.eql({ ...state.renderedSteps[index], rendered: true, delay: 0 });
      } else {
        expect(step).to.eql({ ...state.renderedSteps[index], delay: 0 });
      }
    });
    expect(previousStep).to.eql({ ...state.previousStep, rendered: true, delay: 0 });
  });

  it('reassigns parser and validator to current UserStep', async () => {
    const steps = {
      '{userInput}': {
        id: '{userInput}',
        user: true,
        parser: () => {},
        validator: () => {},
        end: true
      }
    };
    const state = {
      currentStep: steps['{userInput}'],
      renderedSteps: [],
      previousSteps: [],
      previousStep: {}
    };

    const stringifiedState = storage.setData('storage_cache', state);

    const { currentStep } = await storage.getData(
      {
        cacheName: 'storage_cache',
        cache: stringifiedState,
        firstStep: steps['{userInput}'],
        steps
      },
      () => {}
    );

    expect(currentStep.parser).to.equal(steps['{userInput}'].parser);
    expect(currentStep.validator).to.equal(steps['{userInput}'].validator);
  });

  it('reassigns trigger function to current options step', async () => {
    const function1 = () => {};
    const function2 = () => {};

    const steps = {
      '{option}': {
        id: '{option}',
        options: [
          { label: 'Option 1', value: 'Option 1', trigger: function1 },
          { label: 'Option 2', value: 'Option 2', trigger: function2 }
        ]
      }
    };

    const state = {
      currentStep: steps['{option}'],
      renderedSteps: [steps['{option}']],
      previousSteps: [steps['{option}']],
      previousStep: {}
    };

    const stringifiedState = storage.setData('storage_cache', state);

    const { currentStep } = await storage.getData(
      {
        cacheName: 'storage_cache',
        cache: stringifiedState,
        firstStep: steps['{option}'],
        steps
      },
      () => {}
    );

    expect(currentStep.options[0].trigger).to.equal(function1);
    expect(currentStep.options[1].trigger).to.equal(function2);
  });

  it('reassigns trigger to an updated option step', async () => {
    const triggerFunction1 = () => {};
    const triggerFunction2 = () => {};

    const newTriggerFunction1 = () => {};
    const newTriggerFunction2 = () => {};
    const steps = {
      '{option}': {
        id: '{option}',
        options: [
          { label: 'Option 1', value: 'Value 1', trigger: triggerFunction1 },
          { label: 'Option 1', value: 'Value 1', trigger: triggerFunction2 }
        ]
      },
      'update-options': {
        id: 'update-options',
        update: '{option}',
        updateOptions: [
          { label: 'Option 1', value: 'Value 1', trigger: newTriggerFunction1 },
          { label: 'Option 1', value: 'Value 1', trigger: newTriggerFunction2 }
        ]
      }
    };

    const latestStep = {
      ...steps['{option}'],
      options: steps['update-options'].updateOptions,
      updatedBy: 'update-options'
    };

    const lastStep = {
      ...steps['{option}'],
      message: 'Option 1',
      value: 'Value 1',
      user: true
    };
    delete lastStep.options;

    const state = {
      renderedSteps: [lastStep, latestStep],
      previousSteps: [lastStep, latestStep],
      previousStep: lastStep,
      currentStep: latestStep
    };

    const stringifiedState = storage.setData('storage_cache', state);

    const { currentStep } = await storage.getData(
      {
        cacheName: 'storage_cache',
        cache: stringifiedState,
        firstStep: steps['{option}'],
        steps
      },
      () => {}
    );

    expect(currentStep.options[0].trigger).to.equal(newTriggerFunction1);
    expect(currentStep.options[1].trigger).to.equal(newTriggerFunction2);
  });

  it('reassigns trigger to an updated user step', async () => {
    const triggerFunction = () => {};
    const newTriggerFunction = () => {};

    const steps = {
      '{input}': {
        id: '{input}',
        user: true,
        trigger: triggerFunction
      },
      'update-user-step': {
        update: '{input}',
        trigger: newTriggerFunction
      }
    };

    const lastStep = {
      ...steps['{input}'],
      message: 'Some Input'
    };

    const latestStep = {
      ...steps['{input}'],
      trigger: newTriggerFunction,
      updatedBy: 'update-user-step'
    };

    const state = {
      renderedSteps: [lastStep],
      previousSteps: [lastStep],
      previousStep: lastStep,
      currentStep: latestStep
    };

    const stringifiedState = storage.setData('storage_cache', state);

    const { currentStep } = await storage.getData(
      {
        cacheName: 'storage_cache',
        cache: stringifiedState,
        firstStep: steps['{input}'],
        steps
      },
      () => {}
    );

    expect(currentStep.trigger).to.equal(newTriggerFunction);
  });

  it('reassigns trigger, parser and validator to only-update user step', async () => {
    const triggerFunction = () => {};
    const parserFunction = () => {};
    const validatorFunction = () => {};

    const steps = {
      'update-user-step': {
        update: '{input}',
        updateUser: true,
        trigger: triggerFunction,
        parser: parserFunction,
        validator: validatorFunction
      }
    };

    const latestStep = {
      ...steps['update-user-step'],
      id: '{input}',
      user: true,
      updatedBy: 'update-user-step',
      trigger: triggerFunction,
      parser: parserFunction,
      validator: validatorFunction
    };

    const state = {
      renderedSteps: [],
      previousSteps: [],
      previousStep: {},
      currentStep: latestStep
    };

    const stringifiedState = storage.setData('storage_cache', state);

    const { currentStep } = await storage.getData(
      {
        cacheName: 'storage_cache',
        cache: stringifiedState,
        firstStep: steps['update-user-step'],
        steps
      },
      () => {}
    );

    expect(currentStep.trigger).to.equal(triggerFunction);
    expect(currentStep.parser).to.equal(parserFunction);
    expect(currentStep.validator).to.equal(validatorFunction);
  });

  it('uses fetch to update parsed step', async () => {
    const steps = {};
    const state = {
      currentStep: {
        id: '{userInput}',
        user: true,
        end: true
      },
      renderedSteps: [],
      previousSteps: [],
      previousStep: {}
    };

    const stringifiedState = storage.setData('storage_cache', state);

    const url = 'url';
    const axiosMock = new MockAdapter(axios);
    const parser = () => {};
    const validator = () => {};

    axiosMock.onGet(url).replyOnce(200, {
      id: '{userInput}',
      user: true,
      end: true
    });

    const { currentStep } = await storage.getData(
      {
        cacheName: 'storage_cache',
        cache: stringifiedState,
        firstStep: state.currentStep,
        getStepFromApi: async trigger => {
          const step = await getStepFromBackend(url, trigger);
          return { ...step, parser, validator };
        },
        steps
      },
      () => {}
    );

    expect(currentStep.parser).to.equal(parser);
    expect(currentStep.validator).to.equal(validator);
  });

  it('uses fetch to update parsed update user step', async () => {
    const steps = {};
    const state = {
      currentStep: {
        id: '{userInput}',
        user: true,
        updatedBy: 'update-user-input',
        end: true
      },
      renderedSteps: [],
      previousSteps: [],
      previousStep: {}
    };

    const stringifiedState = storage.setData('storage_cache', state);

    const url = 'url';
    const axiosMock = new MockAdapter(axios);
    const parser = () => {};
    const validator = () => {};

    axiosMock.onGet(url, { params: { stepId: '{userInput}' } }).replyOnce(200, {
      id: '{userInput}',
      user: true,
      end: true
    });

    axiosMock.onGet(url, { params: { stepId: 'update-user-input' } }).replyOnce(200, {
      id: 'update-user-input',
      user: true,
      end: true
    });

    const { currentStep } = await storage.getData(
      {
        cacheName: 'storage_cache',
        cache: stringifiedState,
        firstStep: state.currentStep,
        getStepFromApi: async trigger => {
          const step = await getStepFromBackend(url, trigger);
          if (trigger === '{userInput}') return { ...step, parser, validator };
          return step;
        },
        steps
      },
      () => {}
    );

    expect(currentStep.parser).to.equal(parser);
    expect(currentStep.validator).to.equal(validator);
  });
});
