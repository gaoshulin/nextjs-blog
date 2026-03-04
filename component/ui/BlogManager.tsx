"use client";

import { useState, useTransition } from "react";
import type { Post } from "@/lib/db/schema";
import { deletePost } from "@/lib/actions";
import BlogForm from "./BlogForm";
import PostCard from "./PostCard";

export default function BlogManager({ posts }: { posts: Post[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isPending, startTransition] = useTransition();

  function openCreate() {
    setEditingPost(null);
    setModalOpen(true);
  }

  function openEdit(post: Post) {
    setEditingPost(post);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingPost(null);
  }

  function handleDelete(post: Post) {
    if (!confirm(`确定要删除「${post.title}」吗？`)) return;
    startTransition(async () => {
      await deletePost(post.id);
    });
  }

  return (
    <>
      <div className="flex justify-end mb-6">
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          新建文章
        </button>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray-400 py-16">暂无文章，点击「新建文章」开始创作</p>
      ) : (
        <ul className={`grid gap-6 sm:grid-cols-2 ${isPending ? "opacity-60 pointer-events-none" : ""}`}>
          {posts.map((post) => (
            <li key={post.id}>
              <PostCard
                post={post}
                onEdit={() => openEdit(post)}
                onDelete={() => handleDelete(post)}
              />
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-gray-900 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {editingPost ? "编辑文章" : "新建文章"}
              </h2>
              <button
                type="button"
                aria-label="关闭"
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-4">
              <BlogForm post={editingPost} onClose={closeModal} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
