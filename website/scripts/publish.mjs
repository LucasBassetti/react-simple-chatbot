// Copies the built site (website/dist) to the root of the gh-pages branch,
// which GitHub Pages serves. Run it with `npm run publish-site`.
import { cp, readdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const websiteDir = fileURLToPath(new URL('..', import.meta.url));
const rootDir = path.resolve(websiteDir, '..');
const distDir = path.join(websiteDir, 'dist');

// files of the branch that are not part of the built site
const keep = new Set([
  '.editorconfig',
  '.git',
  '.github',
  '.gitignore',
  'CNAME',
  'LICENSE',
  'README.md',
  'website'
]);

for (const entry of await readdir(rootDir)) {
  if (!keep.has(entry)) {
    await rm(path.join(rootDir, entry), { recursive: true, force: true });
  }
}

await cp(distDir, rootDir, { recursive: true });

// without it, the Jekyll build of GitHub Pages ignores the _astro folder
await writeFile(path.join(rootDir, '.nojekyll'), '');

console.log(`Published ${path.relative(rootDir, distDir)} to the branch root`);
