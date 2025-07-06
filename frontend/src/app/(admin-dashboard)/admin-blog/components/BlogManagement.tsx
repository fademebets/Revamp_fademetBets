"use client"

import { useState } from "react"
import { BlogTable } from "./blog-table"
import { BlogForm } from "./blog-form"
import type { Blog } from "@/types/blog"

type View = "table" | "create" | "edit"

export default function BlogManagement() {
  const [currentView, setCurrentView] = useState<View>("table")
  const [editingBlog, setEditingBlog] = useState<Blog | undefined>()

  const handleCreateNew = () => {
    setEditingBlog(undefined)
    setCurrentView("create")
  }

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog)
    setCurrentView("edit")
  }

  const handleSave = () => {
    setCurrentView("table")
    setEditingBlog(undefined)
  }

  const handleCancel = () => {
    setCurrentView("table")
    setEditingBlog(undefined)
  }

  const handleView = (blogId: string) => {
    // Implement view logic
    console.log("View blog:", blogId)
  }

  const handleDelete = (blogId: string) => {
    // Delete is handled in BlogTable component
    console.log("Delete blog:", blogId)
  }

  if (currentView === "create" || currentView === "edit") {
    return <BlogForm blog={editingBlog} onSave={handleSave} onCancel={handleCancel} />
  }

  return <BlogTable onCreateNew={handleCreateNew} onEdit={handleEdit} onView={handleView} onDelete={handleDelete} />
}
