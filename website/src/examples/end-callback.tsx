import { useState } from 'react';
import ChatBot, { type HandleEndArgs, type Step } from 'react-simple-chatbot';

const steps: Step[] = [
  { id: 'ask-name', message: 'What is your name?', trigger: 'name' },
  { id: 'name', user: true, trigger: 'ask-number' },
  { id: 'ask-number', message: 'Pick a number, {previousValue}', trigger: 'number' },
  {
    id: 'number',
    options: [
      { label: '1', trigger: 'end-message' },
      { label: '2', trigger: 'end-message' },
      { label: '3', trigger: 'end-message' },
      { label: '4', trigger: 'end-message' },
      { label: '5', trigger: 'end-message' }
    ]
  },
  { id: 'end-message', message: 'Done! Check the values below the chatbot.', end: true }
];

export default function EndCallback() {
  const [answers, setAnswers] = useState<string[]>([]);

  const handleEnd = ({ values }: HandleEndArgs) => {
    setAnswers(values);
  };

  return (
    <div>
      <ChatBot headerTitle="End callback" handleEnd={handleEnd} steps={steps} />
      {answers.length > 0 && <p>Values: {answers.join(', ')}</p>}
    </div>
  );
}
