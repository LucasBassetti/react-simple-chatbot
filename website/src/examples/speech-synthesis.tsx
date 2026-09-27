import ChatBot, { type Step } from 'react-simple-chatbot';

const steps: Step[] = [
  { id: 'ask-name', message: 'What is your name?', trigger: 'name' },
  { id: 'name', user: true, trigger: 'greet' },
  {
    id: 'greet',
    message: 'Hi {previousValue}, nice to meet you!',
    metadata: {
      speak: 'Hi {previousValue}. I am saying something different from the message text.'
    },
    trigger: 'card'
  },
  {
    id: 'card',
    component: <div>This is a custom component</div>,
    metadata: { speak: 'I can also say something about a custom component.' },
    end: true
  }
];

export default function SpeechSynthesis() {
  return (
    <ChatBot
      headerTitle="Speech synthesis"
      speechSynthesis={{ enable: true, lang: 'en' }}
      steps={steps}
    />
  );
}
