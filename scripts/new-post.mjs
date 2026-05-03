#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const title = process.argv[2];
const slugIndex = process.argv.indexOf('--slug');
const customSlug = slugIndex !== -1 ? process.argv[slugIndex + 1] : '';

if (!title) {
  console.error('Usage: npm run new-post "Post Title" [-- --slug my-slug]');
  process.exit(1);
}

// Build timestamp: YYYY-MM-DD_HHmmss
const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

// Auto-generate a short key from the title (for folder / url slug)
function autoKey(text) {
  let key = text
    .replace(/[^\w一-鿿]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  if (key.length > 15) key = key.slice(0, 15);
  return key;
}

const slug = customSlug || autoKey(title);
const folderName = `${date}_${time}-${slug}`;

const dirs = {
  zh: path.join(rootDir, 'blog', folderName),
  en: path.join(rootDir, 'i18n', 'en', 'docusaurus-plugin-content-blog', folderName),
};

const templates = {
  zh: `---
title: ${title}
slug: ${slug}
date: ${date}
tags: []
description: ${title}
---

在这里写摘要。这部分会显示在首页列表。

{/* truncate */}

在这里写正文。
`,
  en: `---
title: ${title}
slug: ${slug}
date: ${date}
tags: []
description: ${title}
---

{/* English version — translate from Chinese */}
{/* TODO: translate me */}

Write your summary here. This part appears on the list page.

{/* truncate */}

Write your content here.
`,
};

for (const lang of ['zh', 'en']) {
  const dir = dirs[lang];
  const filePath = path.join(dir, 'index.mdx');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, templates[lang]);
  console.log(`✅  ${lang === 'zh' ? '中文' : '英文'}: ${lang === 'zh' ? 'blog' : 'i18n/en/docusaurus-plugin-content-blog'}/${folderName}/index.mdx`);
}

console.log('\nDone! Edit the Chinese article first, then translate the English version.');
