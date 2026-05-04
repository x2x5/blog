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

// Build timestamp: YYMMDD-HHmmss
const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const shortYear = String(now.getFullYear()).slice(-2);
const date = `${shortYear}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
const fullDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
const tzOffsetMinutes = -now.getTimezoneOffset();
const tzSign = tzOffsetMinutes >= 0 ? '+' : '-';
const tzAbs = Math.abs(tzOffsetMinutes);
const tzHours = pad(Math.floor(tzAbs / 60));
const tzMinutes = pad(tzAbs % 60);
const isoDateTime = `${fullDate}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}${tzSign}${tzHours}:${tzMinutes}`;

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
const folderName = `${date}-${time}-${slug}`;

const dirs = {
  zh: path.join(rootDir, 'blog', folderName),
};

const templates = {
  zh: `---
title: ${title}
slug: ${slug}
date: ${isoDateTime}
---

在这里写摘要。这部分会显示在首页列表。

{/* truncate */}

在这里写正文。
`,
};

const dir = dirs.zh;
const filePath = path.join(dir, 'index.mdx');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(filePath, templates.zh);
console.log(`✅  中文: blog/${folderName}/index.mdx`);

console.log('\nDone!');
