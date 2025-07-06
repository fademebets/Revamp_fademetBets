"use client"

import type React from "react"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { X, Upload, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useBlogStore } from "@/store/blog-store"
import { toast } from "sonner"
import type { CreateBlogData, BlogFormProps } from "@/types/blog"
import { blogApi } from "@/lib/blogApi"

export function BlogForm({ blog, onSave, onCancel }: BlogFormProps) {
  const queryClient = useQueryClient()
  const { addBlog, updateBlog } = useBlogStore()

  const [formData, setFormData] = useState<CreateBlogData>({
    title: blog?.title || "",
    category: blog?.category || "",
    content: blog?.content || "",
    featuredImage: blog?.featuredImage || "",
    tags: blog?.tags || [],
    isPublished: blog?.isPublished || false,
    metaDescription: blog?.metaDescription || "",
    metaTitle: blog?.metaTitle || "",
    slug: blog?.slug || "",
  })

  const [newTag, setNewTag] = useState("")

// Create mutation
const createMutation = useMutation({
  mutationFn: blogApi.createBlog,
  onSuccess: (newBlog) => {
    addBlog(newBlog)
    queryClient.invalidateQueries({ queryKey: ["blogs"] })
    toast.success("Blog post created successfully")
    onSave?.(newBlog)
  },
  onError: (error) => {
    toast.error("Failed to create blog post")
  },
})

// Update mutation
const updateMutation = useMutation({
  mutationFn: ({ id, data }: { id: string; data: Partial<CreateBlogData> }) =>
    blogApi.updateBlog(id, data),
  onSuccess: (updatedBlog) => {
    if (blog?.id) {
      updateBlog(blog.id, updatedBlog)
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      toast.success("Blog post updated successfully")
      onSave?.(updatedBlog)
    }
  },
  onError: (error) => {
    toast.error("Failed to update blog post")
  },
})



  const handleInputChange = (field: keyof CreateBlogData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleTitleChange = (title: string) => {
    handleInputChange("title", title)
    if (!blog) {
      // Only auto-generate slug for new posts
      handleInputChange("slug", generateSlug(title))
    }
    // Auto-generate meta title if not set
    if (!formData.metaTitle) {
      handleInputChange("metaTitle", title)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleInputChange("tags", [...formData.tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    handleInputChange(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove),
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (blog?.id) {
      updateMutation.mutate({ id: blog.id, data: formData })
    } else {
      createMutation.mutate(formData)
    }
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{blog ? "Edit Blog Post" : "Create New Blog Post"}</h1>
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter blog post title"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    placeholder="post-url-slug"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    placeholder="Write your blog post content here..."
                    className="min-h-[300px]"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={formData.metaTitle}
                    onChange={(e) => handleInputChange("metaTitle", e.target.value)}
                    placeholder="SEO title (optional)"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={formData.metaDescription}
                    onChange={(e) => handleInputChange("metaDescription", e.target.value)}
                    placeholder="Brief description for SEO (150-160 characters)"
                    className="min-h-[80px]"
                    maxLength={160}
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground mt-1">{formData.metaDescription.length}/160 characters</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publish Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="published">Published</Label>
                  <Switch
                    id="published"
                    checked={formData.isPublished}
                    onCheckedChange={(checked) => handleInputChange("isPublished", checked)}
                    disabled={isLoading}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    placeholder="Enter category (e.g., Technology, Tutorials, etc.)"
                    disabled={isLoading}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="featuredImage">Image URL</Label>
                  <Input
                    id="featuredImage"
                    value={formData.featuredImage}
                    onChange={(e) => handleInputChange("featuredImage", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    disabled={isLoading}
                  />
                </div>

                {formData.featuredImage && (
                  <div className="aspect-video bg-muted rounded-md overflow-hidden">
                    <Image
                      width={200}
                      height={200}
                      src={formData.featuredImage || "/placeholder.svg"}
                      alt="Featured"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <Button type="button" variant="outline" className="w-full bg-transparent" disabled={isLoading}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    disabled={isLoading}
                  />
                  <Button type="button" onClick={addTag} size="icon" disabled={isLoading}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-destructive"
                        disabled={isLoading}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (blog ? "Updating..." : "Creating...") : blog ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </form>
    </div>
  )
}
