import Link from "next/link";
import type { Post } from "@/lib/db/schema";

function PostContent({ content }: { content: string }) {
  return (
    <article className="prose prose-gray dark:prose-invert max-w-none">
      {content.split("\n").map((line, i) => {
        if (line.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="text-2xl font-semibold mt-10 mb-3 text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800 pb-2"
            >
              {line.slice(3)}
            </h2>
          );
        }
        if (line.startsWith("### ")) {
          return (
            <h3
              key={i}
              className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-gray-200"
            >
              {line.slice(4)}
            </h3>
          );
        }
        if (line.trim() === "") {
          return <br key={i} />;
        }
        return (
          <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {line}
          </p>
        );
      })}
    </article>
  );
}

export default function PostDetail({ post }: { post: Post }) {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      {/* Back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline mb-10"
      >
        ← 返回博客列表
      </Link>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
            {post.authorAvatar}
          </div>
          <span>{post.authorName}</span>
        </div>
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span>{post.readingTime} min read</span>
      </div>

      <hr className="my-8 border-gray-200 dark:border-gray-800" />

      {/* Content */}
      <PostContent content={post.content} />
    </main>
  );
}
