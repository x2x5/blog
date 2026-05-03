# x2x5 Blog

> English | [中文](./README.md)

Personal blog built with [Docusaurus](https://docusaurus.io/), deployed on GitHub Pages.

**URL:** https://x2x5.top/blog/en/

---

## Writing a New Post

```bash
npm run new-post "Post Title"
```

Just pass the title. The directory name includes a **timestamp** to avoid collisions:

```bash
npm run new-post "Why TV Is Cheaper Than Phones"
# Creates: blog/2026-05-04_143015-why-tv-is-cheaper/index.mdx
```

Both Chinese and English template files are created. The English one uses the Chinese title as a placeholder — translate it later with AI.

You can also specify a custom slug:

```bash
npm run new-post "How to Deploy with Docker" -- --slug docker-deploy
```

### Chinese / English Workflow

Write the Chinese article first, then use AI to translate the English version at:
`i18n/en/docusaurus-plugin-content-blog/YYYY-MM-DD_HHmmss-slug/index.mdx`
- Place images in the same directory, reference them with relative paths

### Chinese / English Correspondence

Chinese path:

```
blog/2026-05-04-how-to-build-blog/index.mdx
```

English path:

```
i18n/en/docusaurus-plugin-content-blog/2026-05-04-how-to-build-blog/index.mdx
```

**Both folder names must be identical** (same date + slug) for Docusaurus to recognize them as translations of the same post.

### Tags

Predefined tags are in `blog/tags.yml` (Chinese) and `i18n/en/docusaurus-plugin-content-blog/tags.yml` (English).  
Add new tags directly to these files.

### Math

Inline: `$E = mc^2$`

Block:

$$
E = mc^2
$$

### Images

Supports PNG / JPG / WebP. Place images in the same directory as the post and reference them with relative paths in MDX:

```mdx
![alt text](./image.png)
```

---

## Local Development

```bash
npm install        # First-time setup
npm run start      # Start dev server (hot reload)
npm run build      # Production build
npm run serve      # Preview the built site
```

After `npm run start`, visit http://localhost:3000/blog/en/

---

## Deployment

Push to `main` to trigger automatic GitHub Actions deployment.

```bash
git add .
git commit -m "new post"
git push
```

---

## Project Structure

```
blog/
├─ .github/workflows/deploy.yml        # GitHub Actions deploy config
├─ blog/                                # Chinese posts
│  ├─ authors.yml
│  ├─ tags.yml
│  └─ YYYY-MM-DD-slug/
│     ├─ index.mdx
│     └─ *.png
├─ i18n/en/docusaurus-plugin-content-blog/  # English posts
│  ├─ authors.yml
│  ├─ tags.yml
│  └─ YYYY-MM-DD-slug/
│     ├─ index.mdx
│     └─ *.png
├─ scripts/
│  └─ new-post.mjs                      # New post scaffolding script
├─ src/
│  ├─ components/Comments.tsx
│  ├─ css/custom.css
│  └─ theme/BlogPostPaginator/
├─ static/
│  ├─ img/
│  └─ .nojekyll
└─ docusaurus.config.ts
```

---

## Tech Stack

- **Framework:** Docusaurus 3 (React)
- **Language:** TypeScript
- **Format:** Markdown / MDX
- **i18n:** Chinese (default) + English
- **Math:** KaTeX
- **Comments:** giscus (GitHub Discussions)
- **Deploy:** GitHub Pages + GitHub Actions
