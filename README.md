# x2x5 Blog

个人博客，基于 [Docusaurus](https://docusaurus.io/) 构建，部署于 GitHub Pages。

**访问地址：** https://x2x5.top/blog/

---

## 写新文章 / Writing a New Post

### 中文文章

在 `blog/` 目录下新建文件夹，命名格式为 `YYYY-MM-DD-slug/`，里面放 `index.mdx` 和图片。

```
blog/
└─ 2026-05--<slug>/
   ├─ index.mdx
   └─ <image>.png
```

文章头部格式：

```mdx
---
title: 文章标题
slug:  url- slug
date:  YYYY-MM-DD
authors: [x2x5]
tags: [tag1, tag2]
description: 文章摘要，会显示在卡片和 SEO 中。
---

这里是正文。支持 Markdown 和 MDX。

图片直接放在同目录引用：

![图片描述](./<image>.png)

数学公式：

$$
E = mc^2
$$

{/* 在正文后加上截断标记，控制首页列表的预览长度 */}
```

可用标签见 `blog/tags.yml`。需要新标签时直接在该文件添加。

### English Post

Create a folder under `i18n/en/docusaurus-plugin-content-blog/` with the same folder name:

```
i18n/en/docusaurus-plugin-content-blog/
└─ YYYY-MM-DD-<slug>/
   ├─ index.mdx
   └─ <image>.png
```

**Important:** The folder name (date + slug) must match the Chinese version exactly for Docusaurus to link them as translations of the same post.

Frontmatter:

```mdx
---
title: Post Title
slug:  url-slug
date:  YYYY-MM-DD
authors: [x2x5]
tags: [tag1, tag2]
description: Post summary for cards and SEO.
---
```

英语标签配置在 `i18n/en/docusaurus-plugin-content-blog/tags.yml`。

### 图片

图片放在文章同级目录，在 MDX 中通过相对路径引用。支持 PNG、JPG、WebP 等格式。

---

## 本地开发 / Local Development

```bash
# 安装依赖（首次）
npm install

# 启动本地服务（热更新）
npm run start

# 构建生产版本
npm run build

# 本地预览构建结果
npm run serve
```

`npm run start` 启动后浏览器打开 http://localhost:3000/blog/ 即可预览。修改文件会自动刷新。

---

## 部署 / Deployment

推送到 `main` 分支自动触发 GitHub Actions 部署到 GitHub Pages。

```bash
git add .
git commit -m "写点什么"
git push
```

部署完成后访问 https://x2x5.top/blog/ 查看。

---

## 项目结构 / Project Structure

```
blog/
├─ .github/workflows/deploy.yml   # GitHub Actions 部署配置
├─ blog/                           # 中文文章（Markdown/MDX）
│  ├─ authors.yml                  # 中文作者信息
│  ├─ tags.yml                     # 中文标签定义
│  └─ YYYY-MM-DD-slug/
│     ├─ index.mdx
│     └─ *.png
├─ i18n/en/
│  └─ docusaurus-plugin-content-blog/  # 英文文章（结构和中文一致）
│     ├─ authors.yml
│     ├─ tags.yml
│     └─ YYYY-MM-DD-slug/
│        ├─ index.mdx
│        └─ *.png
├─ src/
│  ├─ components/Comments.tsx      # giscus 评论组件
│  ├─ css/custom.css               # 全局样式
│  └─ theme/BlogPostPaginator/     # 文章底部评论区包裹组件
├─ static/
│  ├─ img/                         # 站点静态图片
│  └─ .nojekyll
└─ docusaurus.config.ts            # Docusaurus 主配置
```

---

## 技术栈 / Tech Stack

- **框架：** Docusaurus 3 (React)
- **语言：** TypeScript
- **文章格式：** Markdown / MDX
- **国际化：** 中文（默认）+ 英文
- **数学公式：** KaTeX
- **评论系统：** giscus（基于 GitHub Discussions）
- **部署：** GitHub Pages + GitHub Actions
