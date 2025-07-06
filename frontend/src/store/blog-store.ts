import type { BlogStore } from "@/types/blog"
import { create } from "zustand"

export const useBlogStore = create<BlogStore>((set, get) => ({
  blogs: [],
  total: 0,
  currentPage: 1,
  totalPages: 0,
  isLoading: false,

  setBlogs: (blogs, total, page, totalPages) =>
    set({
      blogs: blogs || [],
      total: total || 0,
      currentPage: page || 1,
      totalPages: totalPages || 0,
    }),

  addBlog: (blog) =>
    set((state) => ({
      blogs: [blog, ...(state.blogs || [])],
      total: (state.total || 0) + 1,
    })),

  updateBlog: (id, updatedBlog) =>
    set((state) => ({
      blogs: (state.blogs || []).map((blog) => (blog.id === id ? updatedBlog : blog)),
    })),

  removeBlog: (id) =>
    set((state) => ({
      blogs: (state.blogs || []).filter((blog) => blog.id !== id),
      total: Math.max((state.total || 0) - 1, 0),
    })),

  setLoading: (loading) => set({ isLoading: loading }),

  setCurrentPage: (page) => set({ currentPage: page || 1 }),
}))
