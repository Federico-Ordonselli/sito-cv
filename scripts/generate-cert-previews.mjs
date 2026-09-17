import { mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { getContent } from '../src/data/content.js';

// Requires Poppler's pdftoppm. Generated images are committed, so deployment
// and the browser do not need a PDF renderer.
const publicDir = new URL('../public/', import.meta.url);
mkdirSync(new URL('certs/previews/', publicDir), { recursive: true });
const files = getContent('it').certifications.flatMap(group => group.items.map(cert => cert.file));
for (const file of new Set(files)) {
  const source = fileURLToPath(new URL(file.slice(1), publicDir));
  const output = fileURLToPath(new URL(file.slice(1).replace('certs/', 'certs/previews/').replace(/\.pdf$/, ''), publicDir));
  execFileSync('pdftoppm', ['-f', '1', '-singlefile', '-scale-to', '900', '-jpeg', '-jpegopt', 'quality=85', source, output], { stdio: 'inherit' });
}
console.log(`Generated ${new Set(files).size} certificate previews.`);
