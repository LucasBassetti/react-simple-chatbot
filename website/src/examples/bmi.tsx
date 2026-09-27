import ChatBot, { type CustomComponentProps, type Step } from 'react-simple-chatbot';

const numberBetween = (min: number, max: number) => (value: string) => {
  const number = Number(value);

  if (value.trim() === '' || Number.isNaN(number)) {
    return 'Please type a number';
  }
  if (number < min || number > max) {
    return `Type a number between ${min} and ${max}`;
  }
  return true;
};

const getCategory = (bmi: number) => {
  if (bmi < 18.5) {
    return 'underweight';
  }
  if (bmi < 25) {
    return 'normal weight';
  }
  if (bmi < 30) {
    return 'overweight';
  }
  return 'obesity';
};

function BMIResult({ steps }: CustomComponentProps) {
  const height = Number(steps?.height?.value) / 100;
  const weight = Number(steps?.weight?.value);
  const bmi = Number((weight / (height * height)).toFixed(1));

  return (
    <span>
      Your BMI is {bmi} ({getCategory(bmi)})
    </span>
  );
}

const steps: Step[] = [
  { id: 'welcome', message: "Let's calculate your BMI (body mass index)", trigger: 'ask-height' },
  { id: 'ask-height', message: 'What is your height in centimeters?', trigger: 'height' },
  { id: 'height', user: true, validator: numberBetween(50, 250), trigger: 'ask-weight' },
  { id: 'ask-weight', message: 'What is your weight in kilograms?', trigger: 'weight' },
  { id: 'weight', user: true, validator: numberBetween(20, 300), trigger: 'result' },
  { id: 'result', component: <BMIResult />, asMessage: true, end: true }
];

export default function BMI() {
  return <ChatBot headerTitle="BMI calculator" steps={steps} />;
}
