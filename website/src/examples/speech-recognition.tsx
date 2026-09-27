import ChatBot, { type Step } from 'react-simple-chatbot';

const steps: Step[] = [
  { id: 'ask-name', message: 'What is your name?', trigger: 'name' },
  { id: 'name', user: true, trigger: 'greet' },
  { id: 'greet', message: 'Hi {previousValue}, nice to meet you!', end: true }
];

export default function SpeechRecognition() {
  return <ChatBot headerTitle="Speech recognition" recognitionEnable steps={steps} />;
}
