# React Simple Chatbot website

The documentation site of [React Simple Chatbot](https://github.com/LucasBassetti/react-simple-chatbot), published at **https://lucasbassetti.github.io/react-simple-chatbot/**.

It is built with [Astro Starlight](https://starlight.astro.build). GitHub Pages serves this branch (`gh-pages`) as it is, so the branch holds both:

- `website/`: the source of the site (pages in `website/src/content/docs`, live examples in `website/src/examples`)
- the root: the built site, generated from `website/` (don't edit it by hand)

## Development

```bash
cd website
npm install
npm run dev
```

Open http://localhost:4321/react-simple-chatbot/.

- `npm run check`: type-check the site
- `npm run build`: build the site in `website/dist` and validate the links
- `npm run publish-site`: build the site and copy it to the branch root

## Publishing

GitHub Pages serves the branch root, and the **Site** workflow keeps it up to date:

- On pull requests, it type-checks and builds the site (the internal links are validated).
- After a merge into `gh-pages`, it builds the site again and commits the root if it changed.

So a pull request only needs the changes in `website/`. Run `npm run publish-site` if you want to include the built root, or to preview it locally.

## Live examples

Each file in `website/src/examples` is a chatbot rendered live in the page, and its source is shown as the example code. Use it in a page with:

```mdx
import Demo from '../../../components/Demo.astro';

<Demo name="options" />
```
