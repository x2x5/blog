# x2x5 Blog

> [English](./README.en.md) | 中文

个人博客，基于 [Docusaurus](https://docusaurus.io/) 构建，部署于 GitHub Pages。

**访问地址：** https://x2x5.top/blog/

---

## 写新文章

```bash
npm run new-post "文章标题"
```

直接传标题即可，目录和 slug 自动生成：

```bash
npm run new-post "为什么电视比手机要便宜"
# 创建: blog/2026-05-04_143015-为什么电视比手机要便宜/index.mdx
```

目录名包含**时分秒**，所以即使同一天连续写多篇，也不会重复或覆盖。

命令同时创建中英文两个模板文件。英文版先用中文标题占位，后续用 AI 翻译。

也可以手动指定短 slug：

```bash
npm run new-post "如何在 Docker 中部署" -- --slug docker-deploy
```

### 中英文文章对应规则

中文写完以后，让 AI 帮你把 `i18n/en/docusaurus-plugin-content-blog/` 下对应的英文文件翻译好就行。
- 图片放在文章同目录，相对路径引用

### 中英文文章对应规则

中文路径：

```
blog/2026-05-04-how-to-build-blog/index.mdx
```

英文路径：

```
i18n/en/docusaurus-plugin-content-blog/2026-05-04-how-to-build-blog/index.mdx
```

**两个文件夹名称必须一致**（日期 + slug 相同），Docusaurus 才会把它们识别为同一篇文章的不同语言版本。

### 标签

预定义标签见 `blog/tags.yml`（中文）和 `i18n/en/docusaurus-plugin-content-blog/tags.yml`（英文）。  
需要新标签时直接编辑这两个文件。

### 数学公式

行内：`$E = mc^2$`

块级：

$$
E = mc^2
$$

### 图片

支持 PNG / JPG / WebP，放在文章同目录，MDX 中相对路径引用：

```mdx
![图片描述](./image.png)
```

---

## 本地开发

```bash
npm install        # 首次安装依赖
npm run start      # 启动本地服务（热更新）
npm run build      # 构建生产版本
npm run serve      # 本地预览构建结果
```

`npm run start` 启动后访问 http://localhost:3000/blog/

---

## 部署

推送到 `main` 分支自动触发 GitHub Actions 部署。

```bash
git add .
git commit -m "新文章"
git push
```

---

## 项目结构

```
blog/
├─ .github/workflows/deploy.yml        # GitHub Actions 部署
├─ blog/                                # 中文文章
│  ├─ authors.yml
│  ├─ tags.yml
│  └─ YYYY-MM-DD-slug/
│     ├─ index.mdx
│     └─ *.png
├─ i18n/en/docusaurus-plugin-content-blog/  # 英文文章
│  ├─ authors.yml
│  ├─ tags.yml
│  └─ YYYY-MM-DD-slug/
│     ├─ index.mdx
│     └─ *.png
├─ scripts/
│  └─ new-post.mjs                      # 新建文章脚本
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

## 技术栈

- **框架：** Docusaurus 3 (React)
- **语言：** TypeScript
- **文章格式：** Markdown / MDX
- **国际化：** 中文（默认）+ 英文
- **数学公式：** KaTeX
- **评论系统：** giscus（GitHub Discussions）
- **部署：** GitHub Pages + GitHub Actions
