# React Simple Chatbot

<a href="https://github.com/LucasBassetti/react-simple-chatbot/actions/workflows/nodejs.yml"><img src="https://github.com/LucasBassetti/react-simple-chatbot/actions/workflows/nodejs.yml/badge.svg" alt="Node CI" /></a> <a href="https://badge.fury.io/js/react-simple-chatbot"><img src="https://badge.fury.io/js/react-simple-chatbot.svg" alt="npm version"></a>
  <img src="https://codecov.io/gh/LucasBassetti/react-simple-chatbot/branch/master/graph/badge.svg" alt="Codecov" />
</a>

A simple chatbot component to create conversation chats

<img src="https://cloud.githubusercontent.com/assets/1014326/25716667/2d4bb4c4-30d6-11e7-996e-30c8fb316361.gif" height="400" />

## Getting Start

`react-simple-chatbot` uses [styled-components](https://styled-components.com) as a peer dependency, so install both:

```bash
npm install react-simple-chatbot styled-components
```

It works with React 18 or 19 and styled-components 5.1 or newer. The library is written in TypeScript, so the types are included.

## Usage

There are several examples on the [website](https://lucasbassetti.github.io/react-simple-chatbot/). Here is the first one to get you started:

```tsx
import { createRoot } from 'react-dom/client';
import ChatBot, { type Step } from 'react-simple-chatbot';

const steps: Step[] = [
  {
    id: '0',
    message: 'Welcome to react chatbot!',
    trigger: '1',
  },
  {
    id: '1',
    message: 'Bye!',
    end: true,
  },
];

createRoot(document.getElementById('root')!).render(<ChatBot steps={steps} />);
```

### Tips

- **Restart the conversation**: render the chatbot with a new `key` (e.g. `<ChatBot key={conversationId} steps={steps} />`). If `cache` is enabled, also clear it with `localStorage.removeItem(cacheName)`.
- **Change steps after mount**: updates to `steps`, the avatars, the delays and `botName` are used by the steps that were not rendered yet.
- **Style the chatbot**: every element has a stable `rsc-*` class name (e.g. `.rsc-ts-bubble`, `.rsc-input`) that you can target with CSS, and the `*Style` props accept inline styles.
- **Custom components**: the components of the steps receive `step`, `steps`, `previousStep` and `triggerNextStep`, typed as `CustomComponentProps`.

## React Simple Chatbot on media

1. [webdesignerdepot](https://www.webdesignerdepot.com/2017/08/whats-new-for-designers-august-2017/)
2. [codrops](https://tympanus.net/codrops/collective/collective-335/)

## How to Contribute

Please check the [contributing guide](https://github.com/LucasBassetti/react-simple-chatbot/blob/master/contributing.md)

## Authors

| ![Lucas Bassetti](https://avatars3.githubusercontent.com/u/1014326?v=3&s=150)|
|:---------------------:|
|  [Lucas Bassetti](https://github.com/LucasBassetti/)   |

See also the list of [contributors](https://github.com/LucasBassetti/react-simple-chatbot/contributors) who participated in this project.

## License

MIT · [Lucas Bassetti](https://lucasbassetti.com)
