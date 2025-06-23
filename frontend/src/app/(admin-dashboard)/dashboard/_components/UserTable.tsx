"use client"

import { MoreVertical } from "lucide-react"
import { useState, useEffect } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const users = [
  {
    id: "1",
    name: "Talha Chaudhary",
    image: "/placeholder.svg?height=32&width=32",
    plan: "Pro",
    endingDate: "30 July 2025",
    status: "Active",
  },
  {
    id: "2",
    name: "Sarah Khan",
    image: "/placeholder.svg?height=32&width=32",
    plan: "Basic",
    endingDate: "12 August 2025",
    status: "Active",
  },
  {
    id: "3",
    name: "Hamza Ali",
    image: "/placeholder.svg?height=32&width=32",
    plan: "Premium",
    endingDate: "05 September 2025",
    status: "Expired",
  },
]

export function UserTable() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (isMobile) {
    return (
      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {user.plan} Plan
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Upgrade Plan</DropdownMenuItem>
                  <DropdownMenuItem>Cancel Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">
                  Subscription Ends
                </div>
                <div>{user.endingDate}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Status</div>
                <Badge
                  variant="outline"
                  className={`mt-1 ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.status}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">USER NAME</TableHead>
            <TableHead>PLAN</TableHead>
            <TableHead>ENDING DATE</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                </div>
              </TableCell>
              <TableCell>{user.plan}</TableCell>
              <TableCell>{user.endingDate}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`${
                    user.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Upgrade Plan</DropdownMenuItem>
                    <DropdownMenuItem>Cancel Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
