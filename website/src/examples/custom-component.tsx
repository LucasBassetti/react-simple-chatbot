import ChatBot, { type CustomComponentProps, type Step } from 'react-simple-chatbot';

function Summary({ steps }: CustomComponentProps) {
  return (
    <div style={{ width: '100%', lineHeight: 1.6 }}>
      <strong>Your order</strong>
      <div>Name: {steps?.name?.value}</div>
      <div>Plan: {steps?.plan?.value}</div>
    </div>
  );
}

const steps: Step[] = [
  { id: 'ask-name', message: 'What is your name?', trigger: 'name' },
  { id: 'name', user: true, trigger: 'ask-plan' },
  { id: 'ask-plan', message: 'Which plan do you want, {previousValue}?', trigger: 'plan' },
  {
    id: 'plan',
    options: [
      { label: 'Free', trigger: 'summary' },
      { label: 'Pro', trigger: 'summary' },
      { label: 'Team', trigger: 'summary' }
    ]
  },
  { id: 'summary', component: <Summary />, end: true }
];

export default function CustomComponent() {
  return <ChatBot headerTitle="Custom component" steps={steps} />;
}
