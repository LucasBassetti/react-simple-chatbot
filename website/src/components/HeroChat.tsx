import ChatBot, { type Step } from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const theme = {
  background: '#f7f5fc',
  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  headerBgColor: '#6e48aa',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#6e48aa',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#3b3355'
};

const steps: Step[] = [
  { id: 'hello', message: 'Hi! I am a chatbot built with React Simple Chatbot.', trigger: 'ask-name' },
  { id: 'ask-name', message: 'What is your name?', trigger: 'name' },
  {
    id: 'name',
    user: true,
    validator: value => (value.trim() ? true : 'Please type your name'),
    trigger: 'greet'
  },
  { id: 'greet', message: 'Nice to meet you, {previousValue}! What do you want to know?', trigger: 'menu' },
  {
    id: 'menu',
    options: [
      { label: 'How does it work?', trigger: 'how' },
      { label: 'Is it typed?', trigger: 'types' },
      { label: 'How do I install it?', trigger: 'install' }
    ]
  },
  {
    id: 'how',
    message: 'You describe the conversation as a list of steps: messages, user inputs, options and your own components.',
    trigger: 'more'
  },
  {
    id: 'types',
    message: 'Yes! It is written in TypeScript and works with React 18 and 19.',
    trigger: 'more'
  },
  {
    id: 'install',
    message: 'Run: npm install react-simple-chatbot styled-components',
    trigger: 'more'
  },
  { id: 'more', message: 'Anything else?', trigger: 'menu' }
];

/** The live chatbot of the home page */
export default function HeroChat() {
  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        steps={steps}
        headerTitle="Live demo"
        botDelay={600}
        userDelay={300}
        width="100%"
        height="480px"
      />
    </ThemeProvider>
  );
}
