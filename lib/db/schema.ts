import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull().default(""),
  authorName: text("author_name").notNull().default(""),
  authorAvatar: text("author_avatar").notNull().default(""),
  date: text("date").notNull(),
  tags: text("tags").array().notNull().default([]),
  readingTime: integer("reading_time").notNull().default(1),
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
