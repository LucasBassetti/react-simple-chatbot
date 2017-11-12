import React from 'react';
// Intro
import {
  HelloWorld,
  Installation,
  Themes,
} from './pages/intro';

// Examples
import {
  BMI,
  CustomComponent,
  EndCallback,
  Options,
  PreviousValue,
  SimpleForm,
  Validator,
  SpeechRecognition,
  WikipediaSearch,
} from './pages/examples';

// API Referece
import {
  ChatBotAPI,
  CustomComponentAPI,
  Steps,
} from './pages/reference';

// Others
import {
  Contribute,
  Donate,
  ReactNative,
  Releases,
} from './pages/others';

const menu = [
  {
    title: 'Intro',
    icon: 'fa fa-arrow-right',
    links: [
      {
        href: '/docs/installation',
        title: 'Installation',
        component: <Installation />,
      },
      {
        href: '/docs/hello-world',
        title: 'Hello World',
        component: <HelloWorld />,
      },
      {
        href: '/docs/themes',
        title: 'Theming',
        component: <Themes />,
      },
    ],
  },
  {
    title: 'Examples',
    icon: 'fa fa-code',
    links: [
      {
        href: '/docs/previous-value',
        title: 'Previous Value',
        component: <PreviousValue />,
      },
      {
        href: '/docs/speech-recognition',
        title: 'Speech Recognition',
        component: <SpeechRecognition />,
      },
      {
        href: '/docs/options',
        title: 'Options',
        component: <Options />,
      },
      {
        href: '/docs/validator',
        title: 'Validator',
        component: <Validator />,
      },
      {
        href: '/docs/custom',
        title: 'Custom Component',
        component: <CustomComponent />,
      },
      {
        href: '/docs/wikipedia',
        title: 'Wikipédia Search',
        component: <WikipediaSearch />,
      },
      {
        href: '/docs/form',
        title: 'Simple Form',
        component: <SimpleForm />,
      },
      {
        href: '/docs/end-callback',
        title: 'End Callback',
        component: <EndCallback />,
      },
      {
        href: '/docs/bmi',
        title: 'BMI',
        component: <BMI />,
      },
    ],
  },
  {
    title: 'API Reference',
    icon: 'fa fa-cogs',
    links: [
      {
        href: '/docs/chatbot',
        title: 'ChatBot',
        component: <ChatBotAPI />,
      },
      {
        href: '/docs/steps',
        title: 'Steps (JSON)',
        component: <Steps />,
      },
      {
        href: '/docs/custom-component',
        title: 'Custom Component',
        component: <CustomComponentAPI />,
      },
    ],
  },
  {
    title: 'Others',
    icon: 'fa fa-th',
    links: [
      {
        href: '/docs/contribute',
        title: 'How to Contribute',
        component: <Contribute />,
      },
      {
        href: '/docs/donate',
        title: 'Donate',
        component: <Donate />,
      },
      {
        href: '/docs/react-native',
        title: 'React Native',
        component: <ReactNative />,
      },
      {
        href: '/docs/releases',
        title: 'Releases',
        component: <Releases />,
      },
    ],
  },
];

export default menu;
