import type { ChatBotTheme } from './types';

const defaultTheme: ChatBotTheme = {
  background: '#f5f8fb',
  fontFamily: 'monospace',
  headerBgColor: '#6e48aa',
  headerFontColor: '#fff',
  headerFontSize: '16px',
  botBubbleColor: '#6E48AA',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a'
};

/**
 * Read a theme value, falling back to the default theme when the chatbot is
 * not inside a ThemeProvider or the theme does not define the key
 */
export const themed =
  (key: keyof ChatBotTheme) =>
  ({ theme }: { theme?: object }): string =>
    (theme as Partial<ChatBotTheme> | undefined)?.[key] ?? defaultTheme[key];

export default defaultTheme;
