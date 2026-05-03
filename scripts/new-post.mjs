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

// Auto-generate a short key from the title
function autoKey(text) {
  // Keep letters, numbers, Chinese, replace everything else with hyphens
  let key = text
    .replace(/[^\w一-鿿]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  // Truncate to 15 chars max
  if (key.length > 15) {
    key = key.slice(0, 15);
  }
  return key;
}

const slug = customSlug || autoKey(title);
const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD

// Find a unique folder name (append -2, -3 if already exists)
let folderName = `${today}-${slug}`;
let suffix = 1;
while (
  fs.existsSync(path.join(rootDir, 'blog', folderName)) ||
  fs.existsSync(path.join(rootDir, 'i18n', 'en', 'docusaurus-plugin-content-blog', folderName))
) {
  suffix++;
  folderName = `${today}-${slug}-${suffix}`;
}

const dirs = {
  zh: path.join(rootDir, 'blog', folderName),
  en: path.join(rootDir, 'i18n', 'en', 'docusaurus-plugin-content-blog', folderName),
};

const templates = {
  zh: `---
title: ${title}
slug: ${slug}
date: ${today}
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
