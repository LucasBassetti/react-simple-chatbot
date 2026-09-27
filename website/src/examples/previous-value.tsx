import ChatBot, { type Step } from 'react-simple-chatbot';

const steps: Step[] = [
  { id: '1', message: 'What is your name?', trigger: '2' },
  { id: '2', user: true, trigger: '3' },
  { id: '3', message: 'Hi {previousValue}, nice to meet you!', end: true }
];

export default function PreviousValue() {
  return <ChatBot headerTitle="Previous value" steps={steps} />;
}
