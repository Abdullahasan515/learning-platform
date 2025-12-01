"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
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
    <div className="min-h-screen bg-gradient-to-br from-[#97C945] via-[#1D96D3] to-[#3F1F8C] text-white">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-xl sticky top-0 z-50 bg-[#020617]/90">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <Image
                  src="/apple-icon.png"
                  alt="شعار المنصة التعليمية"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_0_30px_rgba(56,189,248,0.8)]"
                />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#97C945] via-[#1D96D3] to-[#3F1F8C] bg-clip-text text-transparent">
                لوحة تحكم المدرّس
              </h1>
            </div>
            <p className="text-slate-100/80 text-sm">إدارة المقررات والدورات التعليمية</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="gap-2 bg-transparent border-white/40 text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4" />
            تسجيل خروج
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {/* Create Course Button */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">مقرراتك</h2>
            <p className="text-slate-100/85">أنشئ وادِر مقرراتك الإلكترونية بسهولة</p>
          </div>
          <Link href="/admin/courses/new">
            <Button className="bg-[#97C945] hover:bg-[#7fb436] gap-2 text-white shadow-lg shadow-[#97C945]/40">
              <Plus className="w-4 h-4" />
              مقرر جديد
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "إجمالي المقررات", value: courses.length, icon: BookOpen },
            {
              label: "إجمالي الطلاب",
              value: courses.reduce((acc, c) => acc + c.students, 0),
              icon: Users,
            },
            {
              label: "المقررات المنشورة",
              value: courses.filter((c) => c.status === "published").length,
              icon: BookOpen,
            },
          ].map((stat, i) => (
            <Card
              key={i}
              className="border border-white/25 bg-[#020617] p-6 text-white shadow-lg shadow-black/40"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-200/80 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className="w-8 h-8 text-[#1D96D3] opacity-80" />
              </div>
            </Card>
          ))}
        </div>

        {/* Courses Table */}
        <Card className="border border-white/25 bg-[#020617] overflow-hidden text-white shadow-xl shadow-black/50">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/20 bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">المقرر</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">التصنيف</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">عدد الطلاب</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">عدد الدروس</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">الحالة</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr
                    key={course.id}
                    className="border-b border-white/10 hover:bg-white/5 transition-smooth"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium">{course.title}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-100/80">{course.category}</td>
                    <td className="px-6 py-4 text-slate-100/80">{course.students}</td>
                    <td className="px-6 py-4 text-slate-100/80">{course.lessons}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          course.status === "published"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-amber-500/20 text-amber-200"
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link href={`/admin/courses/${course.id}`}>
                          <Button variant="ghost" size="sm" className="gap-1 text-slate-100">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-red-400 hover:text-red-300"
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
