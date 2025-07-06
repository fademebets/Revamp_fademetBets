"use client"

import { MoreVertical, Plus, Eye, Edit, Trash2, ImageIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { blogApi } from "@/lib/blogApi"
import { useBlogStore } from "@/store/blog-store"
import { BlogTableSkeleton } from "./blog-skeleton"
import { DeleteBlogDialog } from "./delete-blog-dialog"
import { toast } from "sonner"
import type { Blog, BlogTableProps } from "@/types/blog"

export function BlogTable({ onCreateNew, onEdit, onDelete, onView }: BlogTableProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean
    blog: Blog | null
  }>({
    isOpen: false,
    blog: null,
  })

  const queryClient = useQueryClient()

  const {
    blogs = [],
    total = 0,
    currentPage = 1,
    totalPages = 0,
    setBlogs,
    removeBlog,
    setCurrentPage,
  } = useBlogStore()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Fetch blogs with React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs", currentPage],
    queryFn: () => blogApi.getBlogs(currentPage, 10),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Update Zustand store when data changes
  useEffect(() => {
    if (data && data.blogs) {
      console.log("Setting blogs:", data.blogs.length, "blogs")
      setBlogs(data.blogs, data.total, data.page, data.totalPages)
    }
  }, [data, setBlogs])

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: blogApi.deleteBlog,
    onSuccess: (_, deletedId) => {
      removeBlog(deletedId)
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      toast.success("Blog post deleted successfully")
      setDeleteDialog({ isOpen: false, blog: null })
    },
    onError: (error) => {
      toast.error("Failed to delete blog post")
      console.error("Delete error:", error)
    },
  })

  const handleAction = (action: string, blog: Blog) => {
    switch (action) {
      case "edit":
        onEdit?.(blog)
        break
      case "delete":
        setDeleteDialog({ isOpen: true, blog })
        break
      case "view":
        onView?.(blog.id)
        break
      default:
        break
    }
  }

  const handleDeleteConfirm = () => {
    if (deleteDialog.blog) {
      deleteMutation.mutate(deleteDialog.blog.id)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, blog: null })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (isLoading) {
    return <BlogTableSkeleton isMobile={isMobile} />
  }

  if (error) {
    console.error("Query error:", error)
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading blogs. Please try again.</p>
        <p className="text-sm text-gray-500 mt-2">{error.message}</p>
        <Button onClick={() => queryClient.invalidateQueries({ queryKey: ["blogs"] })} className="mt-4">
          Retry
        </Button>
      </div>
    )
  }

  const PaginationControls = () => (
    <div className="flex items-center justify-between mt-4">
      <p className="text-sm text-muted-foreground">
        Showing {(currentPage - 1) * 10 + 1} to {Math.min(currentPage * 10, total)} of {total} results
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Blog Posts</h2>
            <Button onClick={onCreateNew} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>

          {!blogs || blogs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No blog posts found.</p>
            </div>
          ) : (
            <>
              {blogs.map((blog) => (
                <Card key={blog.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {blog.featuredImage ? (
                        <Avatar className="h-10 w-10 rounded-md">
                          <AvatarImage src={blog.featuredImage || "/placeholder.svg"} alt={blog.title} />
                          <AvatarFallback className="rounded-md">
                            <ImageIcon className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center">
                          <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm line-clamp-2">{blog.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {blog.category?.replace("-", " ") || "Uncategorized"} •{" "}
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAction("view", blog)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Post
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction("edit", blog)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Post
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleAction("delete", blog)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Post
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {blog.tags?.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      )) || null}
                      {blog.tags && blog.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{blog.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          blog.isPublished
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-yellow-100 text-yellow-800 border-yellow-200"
                        }`}
                      >
                        {blog.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">by {blog.author || "Admin"}</span>
                    </div>
                  </div>
                </Card>
              ))}
              <PaginationControls />
            </>
          )}
        </div>

        <DeleteBlogDialog
          blog={deleteDialog.blog}
          isOpen={deleteDialog.isOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          isDeleting={deleteMutation.isPending}
        />
      </>
    )
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Blog Posts</h2>
          <Button onClick={onCreateNew}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Post
          </Button>
        </div>

        {!blogs || blogs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No blog posts found.</p>
          </div>
        ) : (
          <>
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">TITLE</TableHead>
                    <TableHead>CATEGORY</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead>DATE</TableHead>
                    <TableHead className="text-right">ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs.map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          {blog.featuredImage ? (
                            <Avatar className="h-8 w-8 rounded-md">
                              <AvatarImage src={blog.featuredImage || "/placeholder.svg"} alt={blog.title} />
                              <AvatarFallback className="rounded-md">
                                <ImageIcon className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="h-8 w-8 bg-muted rounded-md flex items-center justify-center">
                              <ImageIcon className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="font-medium line-clamp-1">{blog.title}</div>
                            <div className="text-xs text-muted-foreground line-clamp-1">{blog.metaDescription}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {blog.category?.replace("-", " ") || "Uncategorized"}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${
                            blog.isPublished
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-yellow-100 text-yellow-800 border-yellow-200"
                          }`}
                        >
                          {blog.isPublished ? "Published" : "Draft"}
                        </Badge>
                      </TableCell>

                      <TableCell>{new Date(blog.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleAction("view", blog)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Post
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("edit", blog)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Post
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleAction("delete", blog)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Post
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <PaginationControls />
          </>
        )}
      </div>

      <DeleteBlogDialog
        blog={deleteDialog.blog}
        isOpen={deleteDialog.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleteMutation.isPending}
      />
    </>
  )
}
