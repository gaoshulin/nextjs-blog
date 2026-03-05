import { getPosts } from "@/lib/posts";
import SearchInput from "@/component/ui/SearchInput";
import BlogManager from "@/component/ui/BlogManager";
import { Suspense } from "react";
import styles from "./blog.module.css";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const posts = await getPosts(q);

  return (
    <main className={`max-w-4xl mx-auto px-4 py-16 ${styles.blog}`}>
      <header className="mb-8">
        <h1 className="text-4xl font-bold dark:text-gray-100">Blog</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          {q ? (
            <>
              找到 <span className="text-gray-900 dark:text-gray-100 font-medium">{posts.length}</span> 篇匹配「{q}」的文章
            </>
          ) : (
            <>共 {posts.length} 篇文章</>
          )}
        </p>
      </header>

      <Suspense>
        <SearchInput />
      </Suspense>

      <div className="mt-8">
        <BlogManager posts={posts} />
      </div>
    </main>
  );
}
