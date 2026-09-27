import React, { StrictMode, useEffect, useState } from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { parse, stringify } from 'flatted';
import ChatBot, { type ChatBotProps, type CustomComponentProps, type Step } from '../../src';
import newSpeechRecognition from '../helpers/corti';
import { bubbles, getInput, settle, typeMessage } from '../helpers/utils';

const renderChatBot = (props: ChatBotProps) =>
  render(<ChatBot botDelay={0} userDelay={0} customDelay={0} {...props} />);

const Empty = () => <div />;

describe('ChatBot', () => {
  describe('Simple', () => {
    const steps: Step[] = [
      { id: '1', message: 'Hello World', trigger: 'user' },
      { id: 'user', user: true, trigger: 'update' },
      { id: 'update', update: 'user', trigger: () => '2' },
      { id: '2', component: <Empty />, trigger: '3' },
      { id: '3', component: <Empty />, asMessage: true, trigger: '4' },
      { id: '4', component: <Empty />, replace: true, trigger: '5' },
      {
        id: '5',
        options: [
          { value: 'op1', label: 'Option 1', trigger: () => '6' },
          { value: 'op2', label: 'Option 2', trigger: '6' }
        ]
      },
      { id: '6', message: 'Bye!', end: true }
    ];

    it('should render with the class name and a header', () => {
      const { container } = renderChatBot({ className: 'classname-test', steps });
      expect(container.querySelector('.rsc.classname-test')).not.toBeNull();
      expect(container.querySelector('.rsc-header')).not.toBeNull();
      expect(screen.getByText('Chat')).toBeTruthy();
    });

    it('should run the whole conversation', async () => {
      const handleEnd = vi.fn();
      const { container } = renderChatBot({ steps, handleEnd });

      await waitFor(() => expect(bubbles(container)).toEqual(['Hello World']));
      typeMessage(container, 'first');
      // the update step asks the user step again
      await waitFor(() => expect(getInput(container).disabled).toBe(false));
      typeMessage(container, 'second');

      // the replaced custom step is removed, and the options are shown
      const option = await screen.findByText('Option 1');
      expect(container.querySelectorAll('.rsc-cs')).toHaveLength(1);
      fireEvent.click(option);

      await waitFor(() =>
        expect(bubbles(container)).toEqual([
          'Hello World',
          'first',
          'second',
          '',
          'Option 1',
          'Bye!'
        ])
      );
      expect(handleEnd).toHaveBeenCalledTimes(1);
      const { renderedSteps, steps: stepsById, values } = handleEnd.mock.calls[0][0];
      expect(values).toEqual(['first', 'second', 'op1']);
      expect(renderedSteps.map((step: { id: string }) => step.id)).toEqual([
        '1',
        'user',
        'user',
        '2',
        '3',
        '4',
        '5',
        '6'
      ]);
      expect(stepsById.user.value).toBe('second');
    });
  });

  describe('Header', () => {
    it('should be rendered without header', () => {
      const { container } = renderChatBot({
        hideHeader: true,
        steps: [{ id: '1', message: 'Hello World', end: true }]
      });
      expect(container.querySelector('.rsc-header')).toBeNull();
    });

    it('should be rendered with a custom header', () => {
      const { container } = renderChatBot({
        headerComponent: <div className="header-component" />,
        steps: [{ id: '1', message: 'Hello World', end: true }]
      });
      expect(container.querySelector('.header-component')).not.toBeNull();
      expect(container.querySelector('.rsc-header')).toBeNull();
    });
  });

  describe('Floating', () => {
    const steps: Step[] = [
      { id: '1', message: 'Hello World', trigger: '2' },
      { id: '2', message: () => 'Bye', end: true }
    ];

    it('should be rendered with a close button and a floating button', () => {
      renderChatBot({ floating: true, steps });
      expect(screen.getByLabelText('Close chat')).toBeTruthy();
      expect(screen.getByLabelText('Open chat')).toBeTruthy();
    });

    it('should start the conversation and cache the steps once opened', async () => {
      const { container } = renderChatBot({ floating: true, cache: true, steps });
      await settle();
      expect(bubbles(container)).toEqual([]);

      fireEvent.click(screen.getByLabelText('Open chat'));
      await waitFor(() => expect(bubbles(container)).toEqual(['Hello World', 'Bye']));
      await waitFor(() => {
        const data = parse(localStorage.getItem('rsc_cache') as string);
        expect(data.renderedSteps).toHaveLength(2);
      });
    });

    it('should open and close with the keyboard', () => {
      const { container } = renderChatBot({ floating: true, steps });
      const floatButton = screen.getByLabelText('Open chat');
      expect(floatButton.getAttribute('aria-hidden')).toBe('false');

      fireEvent.keyDown(floatButton, { key: 'Enter' });
      expect(floatButton.getAttribute('aria-hidden')).toBe('true');

      fireEvent.keyDown(screen.getByLabelText('Close chat'), { key: ' ' });
      expect(floatButton.getAttribute('aria-hidden')).toBe('false');
      expect(container.querySelector('.rsc-float-button')).toBe(floatButton);
    });

    it('should not forward the style props to the DOM', () => {
      const { container } = renderChatBot({ floating: true, steps });
      const chatContainer = container.querySelector('.rsc-container') as HTMLElement;
      expect(chatContainer.getAttribute('width')).toBeNull();
      expect(chatContainer.getAttribute('opened')).toBeNull();
    });
  });

  describe('Floating - Custom Opened', () => {
    const FloatingExample = () => {
      const [opened, setOpened] = useState(true);
      return (
        <ChatBot
          floating
          floatingStyle={{ left: '32px', right: 'initial', transformOrigin: 'bottom left' }}
          opened={opened}
          toggleFloating={({ opened: nextOpened }) => setOpened(nextOpened)}
          botDelay={0}
          steps={[{ id: '1', message: 'Hello World', end: true }]}
        />
      );
    };

    it('should follow the opened prop', () => {
      render(<FloatingExample />);
      const floatButton = screen.getByLabelText('Open chat');
      expect(floatButton.getAttribute('aria-hidden')).toBe('true');

      fireEvent.click(screen.getByLabelText('Close chat'));
      expect(floatButton.getAttribute('aria-hidden')).toBe('false');

      fireEvent.click(floatButton);
      expect(floatButton.getAttribute('aria-hidden')).toBe('true');
    });

    it('should not change when the parent does not change the opened prop', () => {
      const toggleFloating = vi.fn();
      render(
        <ChatBot
          floating
          opened
          toggleFloating={toggleFloating}
          steps={[{ id: '1', message: 'Hello World', end: true }]}
        />
      );
      fireEvent.click(screen.getByLabelText('Close chat'));
      expect(toggleFloating).toHaveBeenCalledWith({ opened: false });
      expect(screen.getByLabelText('Open chat').getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Input', () => {
    it('should be rendered without input', () => {
      const { container } = renderChatBot({
        steps: [{ id: '1', message: 'Hide Input', hideInput: true, end: true }]
      });
      expect(getInput(container)).toBeNull();
    });

    it('should be rendered with the input attributes of the step', () => {
      const { container } = renderChatBot({
        steps: [
          {
            id: '1',
            message: 'Hide Input',
            inputAttributes: { autoComplete: 'firstname' },
            end: true
          }
        ]
      });
      expect(getInput(container).getAttribute('autocomplete')).toBe('firstname');
    });

    it('should enable and focus the input of a first user step', async () => {
      const { container } = renderChatBot({
        steps: [
          { id: '1', user: true, trigger: '2' },
          { id: '2', message: 'got {previousValue}', end: true }
        ]
      });
      const input = getInput(container);
      await waitFor(() => expect(document.activeElement).toBe(input));
      expect(input.disabled).toBe(false);

      typeMessage(container, 'hello');
      await waitFor(() => expect(bubbles(container)).toEqual(['hello', 'got hello']));
      expect(input.disabled).toBe(true);
    });

    it('should show the error of the validator, then give back the value', async () => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
      try {
        const { container } = renderChatBot({
          steps: [
            {
              id: '1',
              user: true,
              validator: value => (Number.isNaN(Number(value)) ? 'value must be a number' : true),
              trigger: '2'
            },
            { id: '2', message: 'ok', end: true }
          ]
        });
        const input = getInput(container);
        await waitFor(() => expect(input.disabled).toBe(false));

        typeMessage(container, 'abc');
        expect(input.value).toBe('value must be a number');
        expect(input.disabled).toBe(true);

        await act(async () => {
          vi.advanceTimersByTime(2000);
        });
        expect(input.value).toBe('abc');
        expect(input.disabled).toBe(false);

        typeMessage(container, '42');
        await waitFor(() => expect(bubbles(container)).toEqual(['42', 'ok']));
      } finally {
        vi.useRealTimers();
      }
    });

    it('should not submit while composing characters', async () => {
      const { container } = renderChatBot({
        steps: [
          { id: '1', user: true, trigger: '2' },
          { id: '2', message: 'ok', end: true }
        ]
      });
      const input = getInput(container);
      await waitFor(() => expect(input.disabled).toBe(false));
      fireEvent.change(input, { target: { value: 'にほん' } });
      fireEvent.keyDown(input, { key: 'Enter', isComposing: true });
      await settle();
      expect(bubbles(container)).toEqual([]);
    });
  });

  describe('Metadata', () => {
    it('should be accessible in "steps" and "previousStep"', async () => {
      const Check = ({ steps, previousStep }: CustomComponentProps) => (
        <span>{`${steps?.['1'].metadata?.custom} ${previousStep?.metadata?.custom}`}</span>
      );
      const { container } = renderChatBot({
        steps: [
          { id: '1', message: 'Set metadata!', metadata: { custom: 'Hello' }, trigger: '2' },
          {
            id: '2',
            message: ({ steps }) => steps['1'].metadata?.custom,
            metadata: { custom: 'World' },
            trigger: '3'
          },
          { id: '3', component: <Check />, asMessage: true, end: true }
        ]
      });
      await waitFor(() =>
        expect(bubbles(container)).toEqual(['Set metadata!', 'Hello', 'Hello World'])
      );
    });
  });

  describe('Extra control', () => {
    it('should hide the extra control when the step asks it', async () => {
      const CustomControl = () => <button className="my-button">custom</button>;
      const { container } = renderChatBot({
        extraControl: <CustomControl />,
        steps: [
          { id: '1', user: true, hideExtraControl: false, trigger: '2' },
          { id: '2', user: true, hideExtraControl: true, trigger: '3' },
          { id: '3', message: 'end', end: true }
        ]
      });
      expect(container.querySelector('div.rsc-controls button.my-button')).not.toBeNull();

      await waitFor(() => expect(getInput(container).disabled).toBe(false));
      typeMessage(container, 'test');
      await waitFor(() =>
        expect(container.querySelector('div.rsc-controls button.my-button')).toBeNull()
      );
    });
  });

  describe('Cache', () => {
    const steps: Step[] = [
      { id: '1', message: 'hello', trigger: '2' },
      { id: '2', user: true, trigger: '3' },
      { id: '3', message: 'bye', end: true }
    ];

    it('should restore the conversation from the cache', async () => {
      const first = renderChatBot({ cache: true, steps });
      await waitFor(() => expect(getInput(first.container).disabled).toBe(false));
      await waitFor(() => expect(localStorage.getItem('rsc_cache')).not.toBeNull());
      first.unmount();

      const { container } = renderChatBot({ cache: true, steps });
      await waitFor(() => expect(bubbles(container)).toEqual(['hello']));
      await waitFor(() => expect(getInput(container).disabled).toBe(false));

      typeMessage(container, 'hi');
      await waitFor(() => expect(bubbles(container)).toEqual(['hello', 'hi', 'bye']));
    });

    it('should start again when the cached conversation ended', () => {
      const endedStep = { id: '3', message: 'bye', end: true, key: 'a' };
      localStorage.setItem(
        'rsc_cache',
        stringify({
          currentStep: endedStep,
          previousStep: {},
          previousSteps: [endedStep],
          renderedSteps: [endedStep]
        })
      );
      renderChatBot({ cache: true, steps });
      expect(localStorage.getItem('rsc_cache')).toBeNull();
    });

    it('should ignore an invalid cache', async () => {
      const info = vi.spyOn(console, 'info').mockImplementation(() => {});
      localStorage.setItem('rsc_cache', 'invalid');
      const { container } = renderChatBot({ cache: true, steps });
      await waitFor(() => expect(bubbles(container)).toEqual(['hello']));
      expect(info).toHaveBeenCalled();
      info.mockRestore();
    });
  });

  describe('Custom steps', () => {
    it('should change the trigger from the component', async () => {
      const Ask = ({ triggerNextStep }: CustomComponentProps) => (
        <button
          type="button"
          onClick={() => triggerNextStep?.({ value: 'blue', trigger: 'chosen' })}
        >
          ok
        </button>
      );
      const { container } = renderChatBot({
        steps: [
          { id: '1', component: <Ask />, waitAction: true, trigger: 'default' },
          { id: 'default', message: 'default', end: true },
          { id: 'chosen', message: ({ steps }) => `chosen ${steps['1'].value}`, end: true }
        ]
      });
      fireEvent.click(await screen.findByText('ok'));
      await waitFor(() => expect(bubbles(container)).toEqual(['chosen blue']));
    });
  });

  describe('Regressions', () => {
    it('should select options without value by their label', async () => {
      const { container } = renderChatBot({
        steps: [
          {
            id: '1',
            options: [
              { label: 'first', trigger: 'a' },
              { label: 'second', trigger: 'b' }
            ]
          },
          { id: 'a', message: 'chose first', end: true },
          { id: 'b', message: 'chose second', end: true }
        ]
      });

      fireEvent.click(await screen.findByText('second'));
      await waitFor(() => expect(bubbles(container)).toEqual(['second', 'chose second']));
    });

    it('should use steps updated after mount', async () => {
      const steps: Step[] = [
        { id: '1', message: 'hello', trigger: '2' },
        { id: '2', user: true, trigger: '3' },
        { id: '3', message: 'old', end: true }
      ];
      const { container, rerender } = renderChatBot({ steps });
      await settle();

      const newSteps = [steps[0], steps[1], { id: '3', message: 'new', end: true }];
      rerender(<ChatBot botDelay={0} userDelay={0} customDelay={0} steps={newSteps} />);

      typeMessage(container, 'hi');
      await waitFor(() => expect(bubbles(container)).toEqual(['hello', 'hi', 'new']));
    });

    it('should not pass step props to DOM element components', async () => {
      const error = vi.spyOn(console, 'error');
      try {
        const { container } = renderChatBot({
          steps: [
            { id: '1', component: <div className="dom-component">dom</div>, trigger: '2' },
            {
              id: '2',
              component: <div className="dom-message">msg</div>,
              asMessage: true,
              end: true
            }
          ]
        });
        await waitFor(() => expect(container.querySelector('.dom-message')).not.toBeNull());
        expect(container.querySelector('.dom-component')).not.toBeNull();
        const unknownPropWarnings = error.mock.calls.filter(args =>
          String(args[0]).includes('React does not recognize')
        );
        expect(unknownPropWarnings).toHaveLength(0);
      } finally {
        error.mockRestore();
      }
    });

    it('should keep the last message visible unless the user scrolled up', async () => {
      const { container } = renderChatBot({
        steps: [
          { id: '1', message: 'hello', trigger: '2' },
          { id: '2', user: true, trigger: '3' },
          { id: '3', message: 'bye', end: true }
        ]
      });
      await settle();

      const content = container.querySelector('.rsc-content') as HTMLElement;
      Object.defineProperty(content, 'scrollHeight', { value: 1000, configurable: true });
      Object.defineProperty(content, 'clientHeight', { value: 100, configurable: true });
      const mutate = async () => {
        (content.firstChild as HTMLElement).appendChild(document.createElement('span'));
        await settle(0);
      };

      await mutate();
      expect(content.scrollTop).toBe(1000);

      // the user scrolls up to read
      content.scrollTop = 200;
      fireEvent.scroll(content);
      await mutate();
      expect(content.scrollTop).toBe(200);

      // a new message scrolls to the bottom again
      typeMessage(container, 'hi');
      await settle();
      expect(content.scrollTop).toBe(1000);
    });

    it('should keep the value of a first custom step', async () => {
      const Ask = ({ triggerNextStep }: CustomComponentProps) => (
        <button type="button" className="ask" onClick={() => triggerNextStep?.({ value: 'blue' })}>
          ok
        </button>
      );
      const { container } = renderChatBot({
        steps: [
          { id: '1', component: <Ask />, waitAction: true, trigger: '2' },
          { id: '2', message: ({ steps }) => `value=${steps['1'].value}`, end: true }
        ]
      });
      fireEvent.click(await screen.findByText('ok'));
      await waitFor(() => expect(bubbles(container)).toEqual(['value=blue']));
    });

    it('should keep working when the steps prop becomes invalid', async () => {
      const steps: Step[] = [
        { id: '1', message: 'hello', trigger: '2' },
        { id: '2', message: 'bye', end: true }
      ];
      const error = vi.spyOn(console, 'error').mockImplementation(() => {});
      try {
        const { container, rerender } = render(<ChatBot botDelay={50} steps={steps} />);
        rerender(
          <ChatBot botDelay={50} steps={[{ id: '1', message: 'hello', trigger: 'missing' }]} />
        );
        await waitFor(() => expect(bubbles(container)).toEqual(['hello', 'bye']));
        expect(error).toHaveBeenCalled();
      } finally {
        error.mockRestore();
      }
    });

    it('should submit the recognized text when the recognition ends', async () => {
      let recognition: any;
      window.webkitSpeechRecognition = function FakeRecognition() {
        recognition = new newSpeechRecognition();
        return recognition;
      } as unknown as typeof window.webkitSpeechRecognition;
      try {
        const { container } = renderChatBot({
          recognitionEnable: true,
          steps: [
            { id: '1', message: 'say something', trigger: '2' },
            { id: '2', user: true, trigger: '3' },
            { id: '3', message: 'done', end: true }
          ]
        });
        const submit = screen.getByLabelText('Start voice input') as HTMLButtonElement;
        await waitFor(() => expect(submit.disabled).toBe(false));

        fireEvent.click(submit);
        expect(screen.getByLabelText('Stop voice input')).toBeTruthy();
        expect(getInput(container).placeholder).toBe('Listening ...');

        act(() => recognition.say('hello'));
        act(() => recognition.abort());
        await waitFor(() => expect(bubbles(container)).toEqual(['say something', 'hello', 'done']));
      } finally {
        delete window.webkitSpeechRecognition;
      }
    });
  });

  describe('StrictMode', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should render each message only once', async () => {
      const { container } = render(
        <StrictMode>
          <ChatBot
            botDelay={0}
            steps={[
              { id: '1', message: 'first', trigger: '2' },
              { id: '2', message: 'second', trigger: '3' },
              { id: '3', message: 'third', end: true }
            ]}
          />
        </StrictMode>
      );
      await waitFor(() => expect(bubbles(container)).toHaveLength(3));
      await settle();
      expect(bubbles(container)).toEqual(['first', 'second', 'third']);
    });

    it('should trigger the next step only once when a component calls it twice', async () => {
      const DoubleTrigger = ({ triggerNextStep }: CustomComponentProps) => {
        useEffect(() => {
          triggerNextStep?.();
          triggerNextStep?.();
        }, [triggerNextStep]);
        return <span>custom</span>;
      };
      const { container } = render(
        <StrictMode>
          <ChatBot
            botDelay={0}
            customDelay={0}
            steps={[
              { id: '1', component: <DoubleTrigger />, waitAction: true, trigger: '2' },
              { id: '2', message: 'next', end: true }
            ]}
          />
        </StrictMode>
      );
      await waitFor(() => expect(bubbles(container)).toEqual(['next']));
      await settle();
      expect(bubbles(container)).toEqual(['next']);
    });
  });
});
