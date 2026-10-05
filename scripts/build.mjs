import { cp, mkdir } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
for (const entry of ['index.html', 'assets', 'js', 'robots.txt', 'sitemap.xml']) {
  await cp(entry, `dist/${entry}`, { recursive: true });
}
console.log('Przygotowano statyczną stronę w dist/.');
