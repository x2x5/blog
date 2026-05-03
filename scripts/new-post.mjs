#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Parse args
const title = process.argv[2];
const slugIndex = process.argv.indexOf('--slug');
const slug = slugIndex !== -1 ? process.argv[slugIndex + 1] : '';

if (!title) {
  console.error('Usage: npm run new-post "Post Title" -- --slug post-slug');
  process.exit(1);
}

if (!slug) {
  console.error('Missing --slug. Usage: npm run new-post "Title" -- --slug my-slug');
  process.exit(1);
}

const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD in local timezone
const folderName = `${today}-${slug}`;

const dirs = {
  zh: path.join(rootDir, 'blog', folderName),
  en: path.join(rootDir, 'i18n', 'en', 'docusaurus-plugin-content-blog', folderName),
};

const templates = {
  zh: `---
title: ${title}
slug: ${slug}
date: ${today}
authors: [x2x5]
tags: []
description:
---

在这里写正文。

{/* truncate */}
`,
  en: `---
title: ${title}
slug: ${slug}
date: ${today}
authors: [x2x5]
tags: []
description:
---

Write your content here.

{/* truncate */}
`,
};

for (const lang of ['zh', 'en']) {
  const dir = dirs[lang];
  const filePath = path.join(dir, 'index.mdx');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, templates[lang]);
  console.log(`✅  ${lang === 'zh' ? '中文' : '英文'}: ${lang === 'zh' ? 'blog' : 'i18n/en/docusaurus-plugin-content-blog'}/${folderName}/index.mdx`);
}

console.log('\nDone! Edit the files above and write your post.');
