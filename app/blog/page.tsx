import { getPosts } from "@/lib/posts";
import PostList from "@/component/ui/PostList";
import SearchInput from "@/component/ui/SearchInput";
import { Suspense } from "react";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const posts = getPosts();

  const filtered = q
    ? posts.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()))
    : posts;

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <header className="mb-8">
        <h1 className="text-4xl font-bold dark:text-gray-100">Blog</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          {q ? (
            <>
              找到 <span className="text-gray-900 dark:text-gray-100 font-medium">{filtered.length}</span> 篇匹配「{q}」的文章
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
        <PostList posts={filtered} />
      </div>
    </main>
  );
}
