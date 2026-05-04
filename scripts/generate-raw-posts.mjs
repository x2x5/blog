#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const blogDir = path.join(rootDir, 'blog');
const outDir = path.join(rootDir, 'static', 'raw-posts');

function walk(dir) {
  const entries = fs.readdirSync(dir, {withFileTypes: true});
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.isFile() && entry.name === 'index.mdx') {
      files.push(fullPath);
    }
  }
  return files;
}

const mdxFiles = walk(blogDir);
fs.rmSync(outDir, {recursive: true, force: true});
let generated = 0;

for (const file of mdxFiles) {
  const rel = path.relative(rootDir, file).split(path.sep).join('/');
  const outputRel = `${rel}.txt`;
  const outputFile = path.join(outDir, outputRel);
  fs.mkdirSync(path.dirname(outputFile), {recursive: true});
  fs.writeFileSync(outputFile, fs.readFileSync(file, 'utf8'));
  generated += 1;
}

console.log(`Generated ${generated} raw post files in ${outDir}.`);
