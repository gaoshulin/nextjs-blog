# Next.js Blog

一个基于 Next.js App Router + Drizzle ORM + PostgreSQL 的博客项目，包含前台浏览和基础后台管理能力。

## 功能概览

1. 首页：提供简单欢迎页（`/`）。
2. 博客列表：在 `/blog` 按日期倒序展示文章。
3. 搜索文章：支持按标题关键字搜索（查询参数 `q`）。
4. 文章详情：通过 `slug` 路由访问单篇文章（`/blog/[slug]`）。
5. 文章管理：在博客页内支持新建、编辑、删除文章（弹窗表单）。
6. 表单字段：标题、slug、摘要、正文、作者名、头像缩写、发布日期、标签、阅读时长。
7. 自动体验：新建文章时可根据标题自动生成 slug。
8. 加载状态：博客列表页面提供 skeleton loading。
9. 数据更新：通过 Server Actions 执行增删改，并在写入后 `revalidatePath("/blog")`。

## 技术栈

- Next.js (App Router)
- React
- Tailwind CSS
- Drizzle ORM
- PostgreSQL

## 本地运行

1. 安装依赖：

```bash
pnpm install
```

2. 配置环境变量（参考 `.env.example`）：

```bash
cp .env.example .env.local
```

3. 初始化数据库结构：

```bash
pnpm db:push
```

4. 启动开发环境：

```bash
pnpm dev
```

5. 访问：

- `http://localhost:3000`
- `http://localhost:3000/blog`

## 常用命令

```bash
pnpm dev          # 本地开发
pnpm build        # 构建生产版本
pnpm start        # 启动生产服务
pnpm lint         # 运行 ESLint
pnpm lint:fix     # 自动修复 ESLint 问题
pnpm db:push      # 推送 schema 到数据库
pnpm db:generate  # 生成 drizzle migration
pnpm db:studio    # 打开 drizzle studio
```
