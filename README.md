# React Simple Chatbot

<a href="https://travis-ci.org/LucasBassetti/react-simple-chatbot"><img src="https://travis-ci.org/LucasBassetti/react-simple-chatbot.svg?branch=master" alt="Travis CI" /></a> <a href="https://badge.fury.io/js/react-simple-chatbot"><img src="https://badge.fury.io/js/react-simple-chatbot.svg" alt="npm version"></a>
  <img src="https://codecov.io/gh/LucasBassetti/react-simple-chatbot/branch/master/graph/badge.svg" alt="Codecov" />
</a>

A simple chatbot component

<img src="https://cloud.githubusercontent.com/assets/1014326/25030722/506abd18-209d-11e7-91f2-646f4bdfdeb3.gif" height="400" />

## Getting Start

```bash
npm install react-simple-chatbot --save
```

## Usage

``` javascript
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

ReactDOM.render(
  <div>
    <ChatBot steps={steps} />
  </div>,
  document.getElementById('root')
);
```

## License

MIT · [Lucas Bassetti](http://lucasbassetti.com.br)
