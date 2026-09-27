import ChatBot, { type Step } from 'react-simple-chatbot';

const steps: Step[] = [
  { id: 'question', message: 'What number am I thinking of?', trigger: 'answer' },
  {
    id: 'answer',
    options: [
      { label: 'Number 1', value: 1, trigger: 'wrong' },
      { label: 'Number 2', value: 2, trigger: 'right' },
      { label: 'Number 3', value: 3, trigger: 'wrong' }
    ]
  },
  { id: 'wrong', message: 'Wrong answer, try again.', trigger: 'answer' },
  { id: 'right', message: 'Awesome! You are a telepath!', end: true }
];

export default function Options() {
  return <ChatBot headerTitle="Options" steps={steps} />;
}
