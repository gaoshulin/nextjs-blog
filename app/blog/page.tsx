import { getPosts } from "@/lib/posts";
import PostList from "@/component/ui/PostList";

export default async function BlogPage() {
  const posts = await Promise.resolve(getPosts());

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold dark:text-gray-100">
          Blog
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          共 {posts.length} 篇文章
        </p>
      </header>

      <PostList posts={posts} />
    </main>
  );
}
