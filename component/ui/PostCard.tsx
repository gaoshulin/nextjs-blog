import Link from "next/link";
import type { Post } from "@/lib/posts";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
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
      <h2 className="text-xl font-semibold leading-snug text-gray-900 dark:text-gray-100">
        <Link
          href={`/blog/${post.slug}`}
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {post.title}
        </Link>
      </h2>

      {/* Excerpt */}
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
        {post.excerpt}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
            {post.author.avatar}
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {post.author.name}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>{post.readingTime} min read</span>
        </div>
      </div>
    </article>
  );
}
