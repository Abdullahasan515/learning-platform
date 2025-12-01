"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LogOut, Plus, Edit2, Trash2, BookOpen, Users } from "lucide-react"

interface AdminCourse {
  id: number
  title: string
  category: string
  students: number
  lessons: number
  status: "draft" | "published"
}

const ADMIN_COURSES: AdminCourse[] = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    category: "Programming",
    students: 234,
    lessons: 24,
    status: "published",
  },
  {
    id: 2,
    title: "Advanced TypeScript",
    category: "Programming",
    students: 156,
    lessons: 18,
    status: "published",
  },
  {
    id: 3,
    title: "UI/UX Design Basics",
    category: "Design",
    students: 0,
    lessons: 15,
    status: "draft",
  },
]

export default function AdminPage() {
  const router = useRouter()
  const [courses, setCourses] = useState(ADMIN_COURSES)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const handleDeleteCourse = (id: number) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((c) => c.id !== id))
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground text-sm">Manage your courses</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Create Course Button */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Your Courses</h2>
            <p className="text-muted-foreground">Create and manage your premium courses</p>
          </div>
          <Link href="/admin/courses/new">
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <Plus className="w-4 h-4" />
              New Course
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Total Courses", value: courses.length, icon: BookOpen },
            { label: "Total Students", value: courses.reduce((acc, c) => acc + c.students, 0), icon: Users },
            { label: "Published", value: courses.filter((c) => c.status === "published").length, icon: BookOpen },
          ].map((stat, i) => (
            <Card key={i} className="glass-effect border-border/50 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className="w-8 h-8 text-primary opacity-50" />
              </div>
            </Card>
          ))}
        </div>

        {/* Courses Table */}
        <Card className="glass-effect border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Course</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Students</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Lessons</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="border-b border-border/50 hover:bg-muted/30 transition-smooth">
                    <td className="px-6 py-4">
                      <span className="font-medium">{course.title}</span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{course.category}</td>
                    <td className="px-6 py-4 text-muted-foreground">{course.students}</td>
                    <td className="px-6 py-4 text-muted-foreground">{course.lessons}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          course.status === "published"
                            ? "bg-green-500/20 text-green-600"
                            : "bg-amber-500/20 text-amber-600"
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link href={`/admin/courses/${course.id}`}>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-destructive hover:text-destructive/80"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  )
}
