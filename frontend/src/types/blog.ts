export interface Blog {
  id: string
  title: string
  category: string
  content: string
  featuredImage: string
  tags: string[]
  isPublished: boolean
  metaDescription: string
  metaTitle?: string
  slug: string
  createdAt: string
  updatedAt: string
  author?: string
}

export interface BlogsResponse {
  blogs: Blog[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface CreateBlogData {
  title: string
  category: string
  content: string
  featuredImage: string
  tags: string[]
  isPublished: boolean
  metaDescription: string
  metaTitle?: string
  slug: string
}

export interface UpdateBlogData extends Partial<CreateBlogData> {}

export interface BlogFormProps {
  blog?: Blog
  onSave?: (blogData: Blog) => void
  onCancel?: () => void
}

export interface BlogTableProps {
  onCreateNew?: () => void
  onEdit?: (blog: Blog) => void
  onDelete?: (blogId: string) => void
  onView?: (blogId: string) => void
}

export interface BlogStore {
  blogs: Blog[]
  total: number
  currentPage: number
  totalPages: number
  isLoading: boolean

  // Actions
  setBlogs: (blogs: Blog[], total: number, page: number, totalPages: number) => void
  addBlog: (blog: Blog) => void
  updateBlog: (id: string, updatedBlog: Blog) => void
  removeBlog: (id: string) => void
  setLoading: (loading: boolean) => void
  setCurrentPage: (page: number) => void
}

export interface ApiError {
  message: string
  status: number
}

export interface Category {
  value: string
  label: string
}
