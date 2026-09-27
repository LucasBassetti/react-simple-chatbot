import * as React from 'react';
import ChatBot, { CustomComponentProps, Loading, Step } from '../../src';

const Review = ({ steps, triggerNextStep }: CustomComponentProps) => (
  <button type="button" onClick={() => triggerNextStep && triggerNextStep({ value: steps })}>
    ok
  </button>
);

const steps: Step[] = [
  { id: '1', message: 'What is your name?', trigger: 'name' },
  {
    id: 'name',
    user: true,
    validator: value => (value ? true : 'Required'),
    trigger: ({ value }) => (value === 'admin' ? 'options' : 'greet')
  },
  { id: 'greet', message: ({ previousValue }) => `Hi ${previousValue}!`, trigger: 'options' },
  {
    id: 'options',
    options: [
      { label: 'Yes', trigger: 'review' },
      { value: false, label: 'No', trigger: 'end' }
    ]
  },
  { id: 'review', component: <Review />, waitAction: true, trigger: 'end' },
  { id: 'update', update: 'name', trigger: 'end' },
  { id: 'end', component: <Loading />, asMessage: true, end: true }
];

export const App = () => (
  <ChatBot
    steps={steps}
    floating
    opened
    toggleFloating={({ opened }) => opened}
    handleEnd={({ values }) => values}
    speechSynthesis={{ enable: true, lang: 'en' }}
    extraControl={<button type="button">extra</button>}
  />
);
