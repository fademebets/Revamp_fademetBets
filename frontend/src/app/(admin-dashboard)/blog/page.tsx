"use client"

import { useState } from "react"
import { BlogTable } from "./components/blog-table"
import { BlogForm } from "./components/blog-form"

type View = "list" | "create" | "edit"

export default function BlogsPage() {
  const [currentView, setCurrentView] = useState<View>("list")
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null)

  const handleCreateNew = () => {
    setCurrentView("create")
    setSelectedBlogId(null)
  }

  const handleEdit = (blogId: string) => {
    setSelectedBlogId(blogId)
    setCurrentView("edit")
  }

  const handleDelete = (blogId: string) => {
    // Implement delete logic here
    console.log("Delete blog:", blogId)
    // You would typically show a confirmation dialog and then delete
  }

  const handleView = (blogId: string) => {
    // Implement view logic here
    console.log("View blog:", blogId)
    // You could open the blog in a new tab or show a preview modal
  }

  const handleSave = (blogData: any) => {
    // Implement save logic here
    console.log("Save blog:", blogData)
    // You would typically send this to your API
    setCurrentView("list")
  }

  const handleCancel = () => {
    setCurrentView("list")
    setSelectedBlogId(null)
  }

  // Mock blog data for editing (you'd fetch this from your API)
  const mockBlog = selectedBlogId
    ? {
        id: selectedBlogId,
        title: "How to integrate crypto payments",
        category: "crypto-payments",
        content: "This is the main content of the blog post...",
        featuredImage: "/placeholder.svg?height=200&width=400",
        tags: ["crypto", "payments", "integration"],
        isPublished: false,
        metaDescription: "Learn how to integrate crypto payments into your app",
        slug: "how-to-integrate-crypto-payments",
      }
    : undefined

  return (
    <div className="container mx-auto py-6 px-4">
      {currentView === "list" && (
        <BlogTable onCreateNew={handleCreateNew} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />
      )}

      {(currentView === "create" || currentView === "edit") && (
        <BlogForm blog={currentView === "edit" ? mockBlog : undefined} onSave={handleSave} onCancel={handleCancel} />
      )}
    </div>
  )
}
