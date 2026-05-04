# x2x5 Blog

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
# 创建: blog/260504-143015-为什么电视比手机要便宜/index.mdx
```

目录名包含**时分秒**，所以即使同一天连续写多篇，也不会重复或覆盖。
同时会写入秒级 `date`（例如 `2026-05-04T04:08:10+08:00`），用于稳定排序。

也可以手动指定短 slug：

```bash
npm run new-post "如何在 Docker 中部署" -- --slug docker-deploy
```

### 文章路径

```
blog/260504-143015-how-to-build-blog/index.mdx
```

### 标签

预定义标签见 `blog/tags.yml`。  
需要新标签时直接编辑这个文件。

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
npm run start      # 开发模式（热更新，调试用）
npm run build      # 构建生产版本
npm run serve      # 本地预览生产构建（推荐）
```

本地看最终效果请用：

```bash
npm run build
npm run serve
```

然后访问 http://localhost:3000/blog/

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
│  └─ YYMMDD-HHmmss-slug/
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
- **数学公式：** KaTeX
- **评论系统：** giscus（GitHub Discussions）
- **部署：** GitHub Pages + GitHub Actions
