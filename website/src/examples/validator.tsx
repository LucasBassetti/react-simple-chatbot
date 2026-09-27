import ChatBot, { type Step } from 'react-simple-chatbot';

const validateAge = (value: string) => {
  const age = Number(value);

  if (value.trim() === '' || Number.isNaN(age)) {
    return 'Please type a number';
  }
  if (age <= 0) {
    return 'Your age must be positive';
  }
  if (age >= 120) {
    return `${value}? Come on!`;
  }
  return true;
};

const steps: Step[] = [
  { id: 'question', message: 'How old are you?', trigger: 'age' },
  { id: 'age', user: true, validator: validateAge, trigger: 'answer' },
  { id: 'answer', message: 'Got it, you are {previousValue} years old.', end: true }
];

export default function Validator() {
  return <ChatBot headerTitle="Validator" steps={steps} />;
}
