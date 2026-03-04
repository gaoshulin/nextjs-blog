export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  tags: string[];
  readingTime: number; // minutes
};

const posts: Post[] = [
  {
    id: 1,
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js 15",
    excerpt:
      "A comprehensive guide to building modern web applications with Next.js 15, covering App Router, Server Components, and more.",
    content: `## Introduction

Next.js 15 introduces several powerful features that make building React applications even better. In this post, we'll explore the key concepts and get you up and running quickly.

## App Router

The App Router is the recommended way to build Next.js applications. It uses React Server Components by default, which means less JavaScript shipped to the client.

\`\`\`tsx
// app/page.tsx
export default function Home() {
  return <h1>Hello, Next.js!</h1>;
}
\`\`\`

## Server Components

Server Components run on the server and can directly access databases, file systems, and other server-side resources without exposing sensitive logic to the client.

## Conclusion

Next.js 15 is a major step forward for React development. Its focus on performance, developer experience, and flexibility makes it an excellent choice for modern web applications.`,
    author: {
      name: "Alice Johnson",
      avatar: "AJ",
    },
    date: "2026-02-15",
    tags: ["Next.js", "React", "Web Dev"],
    readingTime: 5,
  },
  {
    id: 2,
    slug: "mastering-tailwind-css",
    title: "Mastering Tailwind CSS for Rapid UI Development",
    excerpt:
      "Learn how to leverage Tailwind CSS utility classes to build beautiful, responsive UIs faster than ever before.",
    content: `## Why Tailwind CSS?

Tailwind CSS takes a utility-first approach to styling. Instead of writing custom CSS, you compose designs directly in your markup using pre-defined classes.

## Core Concepts

### Responsive Design

Tailwind makes responsive design intuitive with breakpoint prefixes:

\`\`\`html
<div class="text-sm md:text-base lg:text-lg">Responsive text</div>
\`\`\`

### Dark Mode

Enable dark mode support effortlessly:

\`\`\`html
<div class="bg-white dark:bg-gray-900">Content</div>
\`\`\`

## Customization

Tailwind is highly customizable through its configuration file. You can extend the default theme with your own colors, fonts, spacing, and more.

## Conclusion

Once you get comfortable with Tailwind's utility classes, you'll find yourself building UIs much faster. The consistency it enforces across your codebase is invaluable for larger teams.`,
    author: {
      name: "Bob Chen",
      avatar: "BC",
    },
    date: "2026-02-22",
    tags: ["CSS", "Tailwind", "UI"],
    readingTime: 4,
  },
  {
    id: 3,
    slug: "typescript-best-practices",
    title: "TypeScript Best Practices in 2026",
    excerpt:
      "Explore the most effective TypeScript patterns and practices to write safer, more maintainable code in modern projects.",
    content: `## Strong Typing

Avoid using \`any\` whenever possible. Prefer \`unknown\` when the type is genuinely uncertain, and narrow it before use.

\`\`\`ts
function processInput(value: unknown) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
}
\`\`\`

## Utility Types

TypeScript ships with powerful built-in utility types:

- \`Partial<T>\` — makes all properties optional
- \`Required<T>\` — makes all properties required
- \`Pick<T, K>\` — selects a subset of properties
- \`Omit<T, K>\` — excludes a subset of properties

## Discriminated Unions

Use discriminated unions for type-safe state modeling:

\`\`\`ts
type Result<T> =
  | { status: "success"; data: T }
  | { status: "error"; message: string };
\`\`\`

## Conclusion

Adopting these TypeScript best practices will help you catch bugs at compile time, improve code readability, and make refactoring safer across your entire codebase.`,
    author: {
      name: "Carol White",
      avatar: "CW",
    },
    date: "2026-03-01",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
    readingTime: 6,
  },
  {
    id: 4,
    slug: "react-server-components-deep-dive",
    title: "React Server Components: A Deep Dive",
    excerpt:
      "Understand how React Server Components work under the hood and when to use them versus Client Components.",
    content: `## What Are Server Components?

React Server Components (RSC) are a new paradigm that allows components to render on the server without sending their JavaScript to the client. This significantly reduces bundle size and improves performance.

## Server vs Client Components

| Feature | Server Component | Client Component |
|---|---|---|
| Rendering | Server only | Server + Client |
| Interactivity | No | Yes |
| Data fetching | Direct (DB, API) | Via hooks/effects |
| Bundle impact | None | Included |

## When to Use Each

Use **Server Components** for:
- Fetching data from databases or APIs
- Accessing backend resources directly
- Keeping sensitive data on the server

Use **Client Components** for:
- Interactive UI elements
- Browser APIs (localStorage, geolocation)
- React hooks (useState, useEffect)

## Conclusion

The Server/Client Component model gives you the best of both worlds — server-rendered performance with client-side interactivity where needed.`,
    author: {
      name: "David Kim",
      avatar: "DK",
    },
    date: "2026-03-04",
    tags: ["React", "Server Components", "Performance"],
    readingTime: 7,
  },
];

export function getPosts(): Post[] {
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
