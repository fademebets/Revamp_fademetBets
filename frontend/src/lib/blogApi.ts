import { getCookie } from "cookies-next"
import type { Blog, BlogsResponse, CreateBlogData, UpdateBlogData } from "@/types/blog"

const API_BASE_URL = "https://revamp-fademetbets.onrender.com/api"

const getAuthToken = () => {
  return getCookie("auth-token")
}

const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken()

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data
}

// Transform MongoDB _id to id for consistency
const transformBlog = (blog: any): Blog => ({
  id: blog._id,
  title: blog.title,
  category: blog.category,
  content: blog.content,
  featuredImage: blog.featuredImage,
  tags: blog.tags || [],
  isPublished: blog.isPublished,
  metaDescription: blog.metaDescription,
  metaTitle: blog.metaTitle,
  slug: blog.slug,
  createdAt: blog.createdAt,
  updatedAt: blog.updatedAt,
  author: blog.author || 'FADEMEBETS',
})

// API functions
export const blogApi = {
  getBlogs: async (page = 1, limit = 10): Promise<BlogsResponse> => {
    const response = await apiRequest(`/blogs?page=${page}&limit=${limit}`)

    // Handle your API response structure: { success: true, count: number, data: Blog[] }
    if (response.success && response.data && Array.isArray(response.data)) {
      const transformedBlogs = response.data.map(transformBlog)

      return {
        blogs: transformedBlogs,
        total: response.count || response.data.length,
        page: page,
        limit: limit,
        totalPages: Math.ceil((response.count || response.data.length) / limit),
      }
    }

    // Fallback for other structures
    if (Array.isArray(response)) {
      const transformedBlogs = response.map(transformBlog)
      return {
        blogs: transformedBlogs,
        total: response.length,
        page: page,
        limit: limit,
        totalPages: Math.ceil(response.length / limit),
      }
    }

    // If response has blogs property
    if (response.blogs && Array.isArray(response.blogs)) {
      const transformedBlogs = response.blogs.map(transformBlog)
      return {
        blogs: transformedBlogs,
        total: response.total || response.blogs.length,
        page: response.page || page,
        limit: response.limit || limit,
        totalPages: response.totalPages || Math.ceil((response.total || response.blogs.length) / limit),
      }
    }

    throw new Error("Unexpected API response structure")
  },

  createBlog: async (data: CreateBlogData): Promise<Blog> => {
    const response = await apiRequest("/blogs", {
      method: "POST",
      body: JSON.stringify(data),
    })

    // Handle response structure
    if (response.success && response.data) {
      return transformBlog(response.data)
    }

    return transformBlog(response)
  },

  updateBlog: async (id: string, data: UpdateBlogData): Promise<Blog> => {
    const response = await apiRequest(`/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })

    // Handle response structure
    if (response.success && response.data) {
      return transformBlog(response.data)
    }

    return transformBlog(response)
  },

  deleteBlog: async (id: string): Promise<void> => {
    return apiRequest(`/blogs/${id}`, {
      method: "DELETE",
    })
  },

  getPublishedBlogs: async (page = 1, limit = 10): Promise<BlogsResponse> => {
  const response = await apiRequest(`/blogs/published?page=${page}&limit=${limit}`)

  if (response.success && response.data && Array.isArray(response.data)) {
    const transformedBlogs = response.data.map(transformBlog)
    return {
      blogs: transformedBlogs,
      total: response.count || response.data.length,
      page,
      limit,
      totalPages: Math.ceil((response.count || response.data.length) / limit),
    }
  }

  throw new Error("Unexpected response while fetching published blogs")
},

getAllPublishedBlogs: async (): Promise<Blog[]> => {
  const response = await apiRequest(`/blogs/published?limit=1000`); // or remove limit param if your API defaults to "all"

  if (response.success && Array.isArray(response.data)) {
    return response.data.map(transformBlog);
  }

  throw new Error("Unexpected response while fetching all published blogs");
},

getBlogBySlug: async (slug: string): Promise<Blog> => {
    const response = await apiRequest(`/blogs/slug/${slug}`)

    // Handle response structure
    if (response.success && response.data) {
      return transformBlog(response.data)
    }

    // Fallback for direct blog object
    return transformBlog(response)
  },

}
