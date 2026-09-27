import { useEffect, useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { themes } from 'prism-react-renderer';
import ChatBot, { Loading } from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const templates = {
  'Hello world': `const steps: Step[] = [
  { id: '1', message: 'What is your name?', trigger: '2' },
  { id: '2', user: true, trigger: '3' },
  { id: '3', message: 'Hi {previousValue}, nice to meet you!', end: true }
];

render(<ChatBot steps={steps} />);`,

  Options: `const steps: Step[] = [
  { id: 'ask', message: 'Which framework do you use?', trigger: 'framework' },
  {
    id: 'framework',
    options: [
      { label: 'Next.js', trigger: 'next' },
      { label: 'Vite', trigger: 'vite' },
      { label: 'Other', trigger: 'other' }
    ]
  },
  { id: 'next', message: "Add 'use client' to the file that renders the chatbot.", end: true },
  { id: 'vite', message: 'It works out of the box!', end: true },
  { id: 'other', message: 'It works with any React 18 or 19 app.', end: true }
];

render(<ChatBot headerTitle="Options" steps={steps} />);`,

  Validator: `const steps: Step[] = [
  { id: 'ask', message: 'How old are you?', trigger: 'age' },
  {
    id: 'age',
    user: true,
    inputAttributes: { inputMode: 'numeric' },
    validator: (value: string) => {
      const age = Number(value);
      if (!Number.isInteger(age) || age < 1) {
        return 'Type a whole number';
      }
      return age < 120 ? true : 'Are you sure?';
    },
    trigger: 'done'
  },
  { id: 'done', message: '{previousValue} years, got it!', end: true }
];

render(<ChatBot headerTitle="Validator" steps={steps} />);`,

  'Custom component': `function Review({ steps }: CustomComponentProps) {
  return (
    <div style={{ width: '100%' }}>
      <strong>Order</strong>
      <p>
        {steps?.size.value} pizza with {steps?.topping.value}
      </p>
    </div>
  );
}

const steps: Step[] = [
  { id: 'ask-size', message: 'Which size?', trigger: 'size' },
  {
    id: 'size',
    options: [
      { label: 'Small', trigger: 'ask-topping' },
      { label: 'Large', trigger: 'ask-topping' }
    ]
  },
  { id: 'ask-topping', message: 'Which topping?', trigger: 'topping' },
  { id: 'topping', user: true, trigger: 'review' },
  { id: 'review', component: <Review />, asMessage: true, trigger: 'end' },
  { id: 'end', message: 'Your pizza is on the way!', end: true }
];

render(<ChatBot headerTitle="Pizza" steps={steps} />);`,

  Theme: `const theme = {
  background: '#fff7ed',
  fontFamily: 'Georgia, serif',
  headerBgColor: '#ea580c',
  headerFontColor: '#fff',
  headerFontSize: '16px',
  botBubbleColor: '#ea580c',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#431407'
};

const steps: Step[] = [
  { id: '1', message: 'Change the theme on the left!', trigger: '2' },
  { id: '2', user: true, trigger: '3' },
  { id: '3', message: 'You said: {previousValue}', trigger: '2' }
];

render(
  <ThemeProvider theme={theme}>
    <ChatBot headerTitle="Themed" steps={steps} />
  </ThemeProvider>
);`
};

type TemplateName = keyof typeof templates;

const scope = { ChatBot, Loading, ThemeProvider, useState };

const encode = (code: string) =>
  btoa(String.fromCharCode(...new TextEncoder().encode(code)));

const decode = (value: string) =>
  new TextDecoder().decode(Uint8Array.from(atob(value), char => char.charCodeAt(0)));

const readSharedCode = () => {
  const match = window.location.hash.match(/^#code=(.+)$/);
  if (!match) {
    return null;
  }
  try {
    return decode(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
};

/** Editable code with a live chatbot preview */
export default function Playground() {
  const [template, setTemplate] = useState<TemplateName>('Hello world');
  const [code, setCode] = useState(() => readSharedCode() ?? templates['Hello world']);
  // the preview restarts the conversation when the key changes
  const [runId, setRunId] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const selectTemplate = (name: TemplateName) => {
    setTemplate(name);
    setCode(templates[name]);
    setRunId(id => id + 1);
    history.replaceState(null, '', window.location.pathname);
  };

  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}#code=${encodeURIComponent(encode(code))}`;
    history.replaceState(null, '', url);
    await navigator.clipboard?.writeText(url);
    setCopied(true);
  };

  return (
    <div className="playground">
      <div className="playground-toolbar">
        <label className="playground-select">
          <span>Template</span>
          <select
            value={template}
            onChange={event => selectTemplate(event.target.value as TemplateName)}
          >
            {Object.keys(templates).map(name => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
        <div className="playground-actions">
          <button type="button" onClick={() => setRunId(id => id + 1)}>
            Restart
          </button>
          <button type="button" onClick={() => selectTemplate(template)}>
            Reset
          </button>
          <button type="button" onClick={share} aria-live="polite">
            {copied ? 'Link copied!' : 'Share'}
          </button>
        </div>
      </div>
      <LiveProvider code={code} scope={scope} noInline theme={themes.nightOwl}>
        <div className="playground-panes">
          <div className="playground-editor">
            <LiveEditor onChange={setCode} aria-label="Code editor" />
          </div>
          <div className="playground-preview">
            <LivePreview key={runId} />
            <LiveError className="playground-error" />
          </div>
        </div>
      </LiveProvider>
    </div>
  );
}
