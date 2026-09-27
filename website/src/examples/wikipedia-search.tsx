import { useEffect, useState } from 'react';
import ChatBot, { Loading, type CustomComponentProps, type Step } from 'react-simple-chatbot';

interface Article {
  title: string;
  url: string;
}

type OpenSearchResponse = [string, string[], string[], string[]];

async function searchWikipedia(term: string, signal: AbortSignal): Promise<Article | null> {
  const params = new URLSearchParams({
    action: 'opensearch',
    format: 'json',
    origin: '*',
    search: term
  });
  const response = await fetch(`https://en.wikipedia.org/w/api.php?${params}`, { signal });
  const [, titles, , urls]: OpenSearchResponse = await response.json();

  return titles.length > 0 ? { title: titles[0], url: urls[0] } : null;
}

function WikipediaResult({ previousStep, triggerNextStep }: CustomComponentProps) {
  const search: string = previousStep?.value;
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    searchWikipedia(search, controller.signal)
      .then(setArticle)
      .catch(() => setArticle(null))
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [search]);

  useEffect(() => {
    if (!loading) {
      triggerNextStep?.();
    }
  }, [loading, triggerNextStep]);

  if (loading) {
    return <Loading />;
  }

  if (!article) {
    return <span>Nothing found for "{search}".</span>;
  }

  return (
    <span>
      Found on Wikipedia:{' '}
      <a href={article.url} target="_blank" rel="noreferrer">
        {article.title}
      </a>
    </span>
  );
}

const steps: Step[] = [
  { id: 'ask', message: 'Type something to search on Wikipedia (e.g. Brazil)', trigger: 'search' },
  { id: 'search', user: true, trigger: 'result' },
  { id: 'result', component: <WikipediaResult />, waitAction: true, trigger: 'ask-again' },
  { id: 'ask-again', message: 'Do you want to search again?', trigger: 'again' },
  {
    id: 'again',
    options: [
      { label: 'Yes', trigger: 'ask' },
      { label: 'No', trigger: 'bye' }
    ]
  },
  { id: 'bye', message: 'Thanks for searching!', end: true }
];

export default function WikipediaSearch() {
  return <ChatBot headerTitle="Wikipedia search" steps={steps} />;
}
