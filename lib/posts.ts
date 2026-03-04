import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq, desc, ilike } from "drizzle-orm";

export type { Post } from "@/lib/db/schema";

export async function getPosts(q?: string) {
  if (q) {
    return db
      .select()
      .from(posts)
      .where(ilike(posts.title, `%${q}%`))
      .orderBy(desc(posts.date));
  }
  return db.select().from(posts).orderBy(desc(posts.date));
}

export async function getPostBySlug(slug: string) {
  const results = await db.select().from(posts).where(eq(posts.slug, slug));
  return results[0] ?? null;
}
