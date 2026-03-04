import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import PostDetail from "@/component/ui/PostDetail";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <PostDetail post={post} />;
}
