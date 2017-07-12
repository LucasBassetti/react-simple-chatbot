import React from 'react';
// Intro
import Installation from './pages/intro/Installation';
import HelloWorld from './pages/intro/HelloWorld';
// Examples
import Example1 from './pages/examples/Example1';
import Example2 from './pages/examples/Example2';
import Example3 from './pages/examples/Example3';
import Example4 from './pages/examples/Example4';
import Example5 from './pages/examples/Example5';
import Example6 from './pages/examples/Example6';
import Example7 from './pages/examples/Example7';
import Example8 from './pages/examples/Example8';
// API Referece
import Component1 from './pages/reference/Component1';
import Component2 from './pages/reference/Component2';
import Component3 from './pages/reference/Component3';
// Others
import Contribute from './pages/others/Contribute';

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
    ],
  },
  {
    title: 'Examples',
    icon: 'fa fa-code',
    links: [
      {
        href: '/docs/previous-value',
        title: 'Previous Value',
        component: <Example5 />,
      },
      {
        href: '/docs/options',
        title: 'Options',
        component: <Example1 />,
      },
      {
        href: '/docs/validator',
        title: 'Validator',
        component: <Example2 />,
      },
      {
        href: '/docs/custom',
        title: 'Custom Step',
        component: <Example3 />,
      },
      {
        href: '/docs/wikipedia',
        title: 'Wikipédia Search',
        component: <Example4 />,
      },
      {
        href: '/docs/form',
        title: 'Simple Form',
        component: <Example6 />,
      },
      {
        href: '/docs/end-callback',
        title: 'End Callback',
        component: <Example7 />,
      },
      {
        href: '/docs/bmi',
        title: 'BMI',
        component: <Example8 />,
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
        component: <Component1 />,
      },
      {
        href: '/docs/steps',
        title: 'Steps (JSON)',
        component: <Component2 />,
      },
      {
        href: '/docs/custom-component',
        title: 'Custom Component',
        component: <Component3 />,
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
    ],
  },
];

export default menu;
