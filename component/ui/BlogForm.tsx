"use client";

import { useState, useEffect } from "react";
import { createPost, updatePost } from "@/lib/actions";
import type { Post } from "@/lib/db/schema";

type FormData = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  authorName: string;
  authorAvatar: string;
  date: string;
  tags: string;
  readingTime: number;
};

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const emptyForm: FormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  authorName: "",
  authorAvatar: "",
  date: new Date().toISOString().slice(0, 10),
  tags: "",
  readingTime: 3,
};

export default function BlogForm({
  post,
  onClose,
}: {
  post?: Post | null;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormData>(() =>
    post
      ? {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          authorName: post.authorName,
          authorAvatar: post.authorAvatar,
          date: post.date,
          tags: post.tags.join(", "),
          readingTime: post.readingTime,
        }
      : emptyForm
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (post) {
      setForm({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        authorName: post.authorName,
        authorAvatar: post.authorAvatar,
        date: post.date,
        tags: post.tags.join(", "),
        readingTime: post.readingTime,
      });
    } else {
      setForm(emptyForm);
    }
  }, [post]);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    setForm((f) => ({
      ...f,
      title,
      slug: post ? f.slug : slugify(title),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = {
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };
      if (post) {
        await updatePost(post.id, data);
      } else {
        await createPost(data);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "操作失败，请重试");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            标题 *
          </label>
          <input
            className={inputClass}
            value={form.title}
            onChange={handleTitleChange}
            placeholder="文章标题"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            Slug *
          </label>
          <input
            className={inputClass}
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            placeholder="url-slug"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            摘要
          </label>
          <textarea
            className={inputClass + " resize-none"}
            rows={2}
            value={form.excerpt}
            onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
            placeholder="文章摘要..."
          />
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            正文内容 *
          </label>
          <textarea
            className={inputClass + " resize-y font-mono text-xs"}
            rows={10}
            value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            placeholder="支持 Markdown 格式..."
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            作者名称
          </label>
          <input
            className={inputClass}
            value={form.authorName}
            onChange={(e) => setForm((f) => ({ ...f, authorName: e.target.value }))}
            placeholder="作者名称"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            头像缩写
          </label>
          <input
            className={inputClass}
            value={form.authorAvatar}
            onChange={(e) =>
              setForm((f) => ({ ...f, authorAvatar: e.target.value.slice(0, 2).toUpperCase() }))
            }
            placeholder="AB"
            maxLength={2}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            发布日期
          </label>
          <input
            title="请选择发布日期"
            type="date"
            className={inputClass}
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            阅读时长（分钟）
          </label>
          <input
            title="请输入阅读时长（分钟）"
            type="number"
            className={inputClass}
            value={form.readingTime}
            min={1}
            onChange={(e) =>
              setForm((f) => ({ ...f, readingTime: Number(e.target.value) }))
            }
          />
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            标签（逗号分隔）
          </label>
          <input
            className={inputClass}
            value={form.tags}
            onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
            placeholder="Next.js, React, Web Dev"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex justify-end gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          取消
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "保存中..." : post ? "保存修改" : "创建文章"}
        </button>
      </div>
    </form>
  );
}
