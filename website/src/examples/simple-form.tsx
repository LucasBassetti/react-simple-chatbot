import { useState } from 'react';
import ChatBot, { type CustomComponentProps, type Step } from 'react-simple-chatbot';

function Review({ steps }: CustomComponentProps) {
  const [answers] = useState(() => [
    { label: 'Name', value: steps?.name?.value },
    { label: 'Gender', value: steps?.gender?.value },
    { label: 'Age', value: steps?.age?.value }
  ]);

  return (
    <div style={{ width: '100%' }}>
      <strong>Summary</strong>
      <table style={{ marginTop: 8 }}>
        <tbody>
          {answers.map(({ label, value }) => (
            <tr key={label}>
              <td style={{ paddingRight: 16 }}>{label}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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
  { id: 'ask-name', message: 'What is your name?', trigger: 'name' },
  { id: 'name', user: true, trigger: 'ask-gender' },
  { id: 'ask-gender', message: 'Hi {previousValue}! What is your gender?', trigger: 'gender' },
  {
    id: 'gender',
    options: [
      { label: 'Male', trigger: 'ask-age' },
      { label: 'Female', trigger: 'ask-age' },
      { label: 'Other', trigger: 'ask-age' }
    ]
  },
  { id: 'ask-age', message: 'How old are you?', trigger: 'age' },
  { id: 'age', user: true, validator: validateAge, trigger: 'show-review' },
  { id: 'show-review', message: 'Great! Check out your summary', trigger: 'review' },
  { id: 'review', component: <Review />, asMessage: true, trigger: 'ask-update' },
  { id: 'ask-update', message: 'Would you like to update some field?', trigger: 'update' },
  {
    id: 'update',
    options: [
      { label: 'Yes', trigger: 'ask-field' },
      { label: 'No', trigger: 'end-message' }
    ]
  },
  { id: 'ask-field', message: 'What field would you like to update?', trigger: 'field' },
  {
    id: 'field',
    options: [
      { label: 'Name', trigger: 'update-name' },
      { label: 'Gender', trigger: 'update-gender' },
      { label: 'Age', trigger: 'update-age' }
    ]
  },
  { id: 'update-name', update: 'name', trigger: 'show-review' },
  { id: 'update-gender', update: 'gender', trigger: 'show-review' },
  { id: 'update-age', update: 'age', trigger: 'show-review' },
  { id: 'end-message', message: 'Thanks! Your data was submitted successfully!', end: true }
];

export default function SimpleForm() {
  return <ChatBot headerTitle="Simple form" steps={steps} />;
}
