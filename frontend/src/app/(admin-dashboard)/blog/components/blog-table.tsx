"use client"

import { MoreVertical, Plus, Eye, Edit, Trash2, ImageIcon } from "lucide-react"
import { useState, useEffect } from "react"

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

// Sample blog data
const blogs = [
  {
    id: "1",
    title: "How to integrate crypto payments",
    category: "crypto-payments",
    content:
      "This is the main content of the blog post about integrating cryptocurrency payments into your application...",
    featuredImage: "/placeholder.svg?height=40&width=40",
    tags: ["crypto", "payments", "integration"],
    isPublished: true,
    metaDescription: "Learn how to integrate crypto payments into your app",
    slug: "how-to-integrate-crypto-payments",
    createdAt: "2024-01-15",
    author: "John Doe",
  },
  {
    id: "2",
    title: "Building Modern Web Applications",
    category: "web-development",
    content: "A comprehensive guide to building modern web applications using the latest technologies...",
    featuredImage: "/placeholder.svg?height=40&width=40",
    tags: ["web", "development", "modern"],
    isPublished: false,
    metaDescription: "Complete guide to modern web app development",
    slug: "building-modern-web-applications",
    createdAt: "2024-01-12",
    author: "Jane Smith",
  },
  {
    id: "3",
    title: "Understanding Blockchain Technology",
    category: "blockchain",
    content: "Deep dive into blockchain technology and its applications in various industries...",
    featuredImage: "/placeholder.svg?height=40&width=40",
    tags: ["blockchain", "technology", "cryptocurrency"],
    isPublished: true,
    metaDescription: "Comprehensive guide to blockchain technology",
    slug: "understanding-blockchain-technology",
    createdAt: "2024-01-10",
    author: "Mike Johnson",
  },
]

interface BlogTableProps {
  onCreateNew?: () => void
  onEdit?: (blogId: string) => void
  onDelete?: (blogId: string) => void
  onView?: (blogId: string) => void
}

export function BlogTable({ onCreateNew, onEdit, onDelete, onView }: BlogTableProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleAction = (action: string, blogId: string) => {
    switch (action) {
      case "edit":
        onEdit?.(blogId)
        break
      case "delete":
        onDelete?.(blogId)
        break
      case "view":
        onView?.(blogId)
        break
      default:
        break
    }
  }

  if (isMobile) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Blog Posts</h2>
          <Button onClick={onCreateNew} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

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
                    {blog.category} • {blog.createdAt}
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
                  <DropdownMenuItem onClick={() => handleAction("view", blog.id)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Post
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction("edit", blog.id)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Post
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleAction("delete", blog.id)} className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Post
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mt-3 space-y-2">
              <div className="flex flex-wrap gap-1">
                {blog.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {blog.tags.length > 2 && (
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
                <span className="text-xs text-muted-foreground">by {blog.author}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Blog Posts</h2>
        <Button onClick={onCreateNew}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Post
        </Button>
      </div>

      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">TITLE</TableHead>
              <TableHead>CATEGORY</TableHead>
              <TableHead>TAGS</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>AUTHOR</TableHead>
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
                    {blog.category.replace("-", " ")}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {blog.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {blog.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{blog.tags.length - 2}
                      </Badge>
                    )}
                  </div>
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
                <TableCell>{blog.author}</TableCell>
                <TableCell>{blog.createdAt}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleAction("view", blog.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Post
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction("edit", blog.id)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Post
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleAction("delete", blog.id)} className="text-red-600">
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
    </div>
  )
}
