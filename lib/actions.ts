"use server";

import { db } from "@/lib/db";
import { posts, type NewPost } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createPost(data: Omit<NewPost, "id">) {
  await db.insert(posts).values(data);
  revalidatePath("/blog");
}

export async function updatePost(id: number, data: Partial<Omit<NewPost, "id">>) {
  await db.update(posts).set(data).where(eq(posts.id, id));
  revalidatePath("/blog");
}

export async function deletePost(id: number) {
  await db.delete(posts).where(eq(posts.id, id));
  revalidatePath("/blog");
}
