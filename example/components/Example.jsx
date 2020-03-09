import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from '../../lib/index';

const otherFontTheme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#6e48aa',
  headerFontColor: '#fff',
  headerFontSize: '16px',
  botBubbleColor: '#6E48AA',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a'
};

const steps = [
  {
    id: '1',
    delay: 1000,
    '@class': '.TextStep',
    avatar:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP0/Q8AAZ8BTkxHGRcAAAAASUVORK5CYII=',
    message:
      'Hello John. We think working together through this new tool we can find a solution that will benefit us both.',
    trigger: 'c4ca4238-a0b9-3382-8dcc-509a6f75849b',
    evalExpression: ''
  },
  {
    id: 'c4ca4238-a0b9-3382-8dcc-509a6f75849b',
    key: 'amlWGUw06xLdxMDbk1aHChWr',
    '@class': '.OptionsStep',
    options: [
      {
        label: 'Great!',
        value: '60.736b.38ba542b1-c3a0.618c9ac28',
        trigger: '46.905c.77965b6d2-5961.decf03a99'
      },
      {
        label: "I'd be surprised, but I'm willing to listen.",
        value: '61.736b.38ba542b1-c3a0.618c9ac28',
        trigger: '64.736b.38ba542b1-c3a0.618c9ac28'
      }
    ],
    evalExpression: '',
  },
  {
    id: '46.905c.77965b6d2-5961.decf03a99',
    message: 'You pressed great'
  },
  {
    id: '64.736b.38ba542b1-c3a0.618c9ac28',
    message: 'You are surprised'
  }
];

const extractNumericalValue = (text) => {
  const whiteSpaceRegex = /\s/g;
  const currencyRegex = /[$£€]/g;
  text = text
    .replace(whiteSpaceRegex, '')
    .replace(currencyRegex, '')
    .replace('%', '')
    .replace(',', '.'); // Decimal separator

  return text === '' ? NaN : Number(text);
};

const getValidator = (format, invalidFormatMessage) => {
  if (format === 'any') {
    return () => true;
  }

  // format === 'positive_numeric'
  if (invalidFormatMessage === null || invalidFormatMessage === undefined)
    invalidFormatMessage = 'Please enter positive numeric value';
  return (value) => {
    const numericValue = extractNumericalValue(value);
    return isNaN(numericValue) || numericValue < 0 ? invalidFormatMessage : true;
  };
};

const getParser = (format) => {
  if (format === 'any') {
    return (value) => value;
  }

  // format === 'positive_numeric'
  return (value) => {
    return extractNumericalValue(value);
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const trigger = (trigger) => ({ value, steps }) => {
  for (const condition in trigger) {
    // eslint-disable-next-line
    if (trigger.hasOwnProperty(condition) && eval(condition)) {
      return trigger[condition];
    }
  }
  throw new Error('Missing condition for value: ' + value);
};

const parseStep = (step) => {
  const stepIsUserStep = step.user;
  const stepIsUpdateUserStep = step.update && !step.updateOptions;
  if (stepIsUserStep || stepIsUpdateUserStep) {
    const validator = getValidator(step.format, step.invalidFormatMessage);
    const parser = getParser(step.format);
    step = { ...step, validator, parser };
    delete step.format;
    delete step.invalidFormatMessage;
  }
  if (typeof step.trigger === 'object' && step.trigger !== null) {
    step = { ...step, trigger: trigger(step.trigger) };
  }
  return { ...step };
};

const ThemedExample = () => (
  <ThemeProvider theme={otherFontTheme}>
    <React.StrictMode>
      {/*<ChatBot*/}
      {/*  cache={true}*/}
      {/*  steps={steps}*/}
      {/*/>*/}
      <ChatBot
        botDelay={1000}
        userDelay={5000}
        customDelay={500}
        cache={true}
        parseStep={parseStep}
        nextStepUrl='/api/v1/chats/1fbjO6mJVyCCMOZdQO90qLfXCxghoX4Ps/models/null/modelKey/null/states/saladus/nextStep/'
      />
    </React.StrictMode>
  </ThemeProvider>
);

export default ThemedExample;
