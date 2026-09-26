> [!WARNING]  
> React Simple Chatbot is no longer maintained. I recommend using [react-chatbotify](https://github.com/tjtanjin/react-chatbotify) as an alternative.



# React Simple Chatbot

<a href="https://github.com/LucasBassetti/react-simple-chatbot/actions/workflows/nodejs.yml"><img src="https://github.com/LucasBassetti/react-simple-chatbot/actions/workflows/nodejs.yml/badge.svg" alt="Node CI" /></a> <a href="https://badge.fury.io/js/react-simple-chatbot"><img src="https://badge.fury.io/js/react-simple-chatbot.svg" alt="npm version"></a>
  <img src="https://codecov.io/gh/LucasBassetti/react-simple-chatbot/branch/master/graph/badge.svg" alt="Codecov" />
</a> <a href="https://beerpay.io/LucasBassetti/react-simple-chatbot"><img src="https://beerpay.io/LucasBassetti/react-simple-chatbot/badge.svg?style=flat" /></a>

A simple chatbot component to create conversation chats

<img src="https://cloud.githubusercontent.com/assets/1014326/25716667/2d4bb4c4-30d6-11e7-996e-30c8fb316361.gif" height="400" />

## Getting Start

`react-simple-chatbot` uses [styled-components](https://styled-components.com) as a peer dependency, so install both:

```bash
npm install react-simple-chatbot styled-components
```

It works with React 16.3 or newer (including React 18 and 19) and styled-components 4, 5 or 6. TypeScript declarations are included.

## Usage

There are several examples on the [website](https://lucasbassetti.github.io/react-simple-chatbot/). Here is the first one to get you started:

``` javascript
import { createRoot } from 'react-dom/client';
import ChatBot from 'react-simple-chatbot';

const steps = [
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

createRoot(document.getElementById('root')).render(<ChatBot steps={steps} />);
```

### Tips

- **Restart the conversation**: render the chatbot with a new `key` (e.g. `<ChatBot key={conversationId} steps={steps} />`). If `cache` is enabled, also clear it with `localStorage.removeItem(cacheName)`.
- **Change steps after mount**: updates to `steps`, the avatars, the delays and `botName` are used by the steps that were not rendered yet.
- **Style the chatbot**: every element has a stable `rsc-*` class name (e.g. `.rsc-ts-bubble`, `.rsc-input`) that you can target with CSS, and the `*Style` props accept inline styles.

## React Simple Chatbot with AI

1. [CodeParrot AI](https://codeparrot.ai/oracle?owner=LucasBassetti&repo=react-simple-chatbot) - Bot will help you understand this repository better. You can ask for code examples, installation guide, debugging help and much more.

## React Simple Chatbot on media

1. [webdesignerdepot](https://www.webdesignerdepot.com/2017/08/whats-new-for-designers-august-2017/)
2. [blogduwebdesign](http://www.blogduwebdesign.com/webdesign/ressources-web-du-lundi-aout-164/2507)
3. [codrops](https://tympanus.net/codrops/collective/collective-335/)

## Build with `react-simple-chatbot`

1. [Seth Loh Website](https://github.com/lackdaz/lackdaz.github.io) - Personal website of Seth Loh ([demo](https://www.sethloh.com))
2. [Paul's Website](https://psheon.github.io/) - Personal website of Paul Jiang ([demo](https://psheon.github.io/archives/))
3. [Cisco Partner Support API Chatbot](https://github.com/btotharye/cisco-pss-api-chatbot) - Code with screenshots to have your own Cisco Serial lookup chatbot.
4. [Chatcompose](https://www.chatcompose.com/en.html) - Chatbot Platform for Conversational Marketing and Support.
5. [Mixat](https://www.svt.se/mixat) - News Chatbot for tweenies. Also as app ([iOS](https://apps.apple.com/se/app/mixat-h%C3%A4r-f%C3%A5r-du-koll/id1239444432) or [Android](https://play.google.com/store/apps/details?id=se.svt.mixat))

Built something with `react-simple-chatbot`? Submit a PR and add it to this list!

## How to Contribute

Please check the [contributing guide](https://github.com/LucasBassetti/react-simple-chatbot/blob/master/contributing.md)

## Authors

| ![Lucas Bassetti](https://avatars3.githubusercontent.com/u/1014326?v=3&s=150)|
|:---------------------:|
|  [Lucas Bassetti](https://github.com/LucasBassetti/)   |

See also the list of [contributors](https://github.com/LucasBassetti/react-simple-chatbot/contributors) who participated in this project.

## License

MIT · [Lucas Bassetti](https://lucasbassetti.com)
