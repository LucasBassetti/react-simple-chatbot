// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import starlightLinksValidator from 'starlight-links-validator';
import starlightLlmsTxt from 'starlight-llms-txt';

const base = '/react-simple-chatbot';

// the old site used hash routes (e.g. /#/docs/installation), keep those links working
const legacyRoutes = {
  installation: 'getting-started/installation/',
  'hello-world': 'getting-started/quick-start/',
  themes: 'guides/theming/',
  'previous-value': 'examples/previous-value/',
  'speech-recognition': 'examples/speech-recognition/',
  'speech-synthesis': 'examples/speech-synthesis/',
  options: 'examples/options/',
  validator: 'examples/validator/',
  custom: 'examples/custom-component/',
  wikipedia: 'examples/wikipedia-search/',
  form: 'examples/simple-form/',
  'end-callback': 'examples/end-callback/',
  bmi: 'examples/bmi/',
  chatbot: 'reference/chatbot/',
  steps: 'reference/steps/',
  'custom-component': 'reference/custom-component/',
  contribute: 'resources/contributing/',
  releases: 'resources/changelog/',
  'react-native': 'resources/faq/',
  donate: ''
};

const legacyRedirect = `(() => {
  const match = location.hash.match(/^#\\/docs\\/([\\w-]+)/);
  if (!match) return;
  const routes = ${JSON.stringify(legacyRoutes)};
  if (match[1] in routes) location.replace('${base}/' + routes[match[1]]);
})();`;

export default defineConfig({
  site: 'https://lucasbassetti.github.io',
  base,
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'React Simple Chatbot',
      description:
        'Build conversational chatbots in React with a list of steps. Written in TypeScript, works with React 18 and 19.',
      logo: { src: './src/assets/logo.svg' },
      favicon: '/favicon.svg',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/LucasBassetti/react-simple-chatbot'
        },
        {
          icon: 'npm',
          label: 'npm',
          href: 'https://www.npmjs.com/package/react-simple-chatbot'
        }
      ],
      editLink: {
        baseUrl: 'https://github.com/LucasBassetti/react-simple-chatbot/edit/gh-pages/website/'
      },
      head: [
        { tag: 'script', content: legacyRedirect },
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: `https://lucasbassetti.github.io${base}/og.png` }
        },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } }
      ],
      customCss: ['./src/styles/custom.css'],
      components: {
        Hero: './src/components/Hero.astro'
      },
      expressiveCode: {
        themes: ['github-dark-default', 'github-light-default']
      },
      sidebar: [
        {
          label: 'Getting started',
          items: [
            'getting-started/introduction',
            'getting-started/installation',
            'getting-started/quick-start',
            'getting-started/typescript',
            'getting-started/migration'
          ]
        },
        {
          label: 'Guides',
          items: [
            'guides/steps',
            'guides/dynamic-content',
            'guides/user-input',
            'guides/custom-components',
            'guides/theming',
            'guides/floating',
            'guides/cache',
            'guides/speech',
            'guides/frameworks'
          ]
        },
        {
          label: 'Examples',
          items: [
            'examples/previous-value',
            'examples/options',
            'examples/validator',
            'examples/custom-component',
            'examples/simple-form',
            'examples/end-callback',
            'examples/bmi',
            'examples/wikipedia-search',
            'examples/themes',
            'examples/floating',
            'examples/speech-recognition',
            'examples/speech-synthesis'
          ]
        },
        { slug: 'playground', badge: { text: 'Live', variant: 'tip' } },
        {
          label: 'API reference',
          items: ['reference/chatbot', 'reference/steps', 'reference/custom-component', 'reference/types']
        },
        {
          label: 'Resources',
          items: ['resources/faq', 'resources/changelog', 'resources/contributing']
        }
      ],
      plugins: [starlightLinksValidator(), starlightLlmsTxt()]
    }),
    react()
  ]
});
