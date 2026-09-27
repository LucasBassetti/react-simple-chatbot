import ChatBot, { type Step } from 'react-simple-chatbot';

const steps: Step[] = [
  { id: 'ask-name', message: 'Hi! What is your name?', trigger: 'name' },
  { id: 'name', user: true, trigger: 'greet' },
  { id: 'greet', message: 'Nice to meet you, {previousValue}!', end: true }
];

export default function Floating() {
  return (
    <ChatBot
      floating
      headerTitle="Need help?"
      floatingStyle={{ bottom: '24px', right: '24px' }}
      steps={steps}
    />
  );
}
