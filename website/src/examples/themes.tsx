import { ThemeProvider } from 'styled-components';
import ChatBot, { type ChatBotTheme, type Step } from 'react-simple-chatbot';

const theme: ChatBotTheme = {
  background: '#fff8f0',
  fontFamily: 'Helvetica, Arial, sans-serif',
  headerBgColor: '#ef6c00',
  headerFontColor: '#fff',
  headerFontSize: '16px',
  botBubbleColor: '#ef6c00',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a'
};

const steps: Step[] = [
  { id: 'ask-name', message: 'What is your name?', trigger: 'name' },
  { id: 'name', user: true, trigger: 'greet' },
  { id: 'greet', message: 'Hi {previousValue}! This chatbot uses a custom theme.', end: true }
];

export default function Themes() {
  return (
    <ThemeProvider theme={theme}>
      <ChatBot headerTitle="Themes" steps={steps} />
    </ThemeProvider>
  );
}
