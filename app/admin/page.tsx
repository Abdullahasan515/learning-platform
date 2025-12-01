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
    <div className="min-h-screen bg-gradient-to-br.from-[#F5FFF7] via-[#F3F7FF] to-[#F7F3FF]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-1.5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <Image
                  src="/apple-icon.png"
                  alt="شعار المنصة التعليمية"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_0_22px_rgba(63,31,140,0.5)]"
                />
              </div>
              <h1 className="text-lg md:text-2xl font-bold text-slate-900">لوحة تحكم المدرّس</h1>
            </div>
            <p className="text-slate-600 text-xs md:text-sm">إدارة المقررات والدورات التعليمية.</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="gap-2 bg-white/70 border-slate-300 text-slate-800 hover:bg-slate-100"
          >
            <LogOut className="w-4 h-4" />
            تسجيل خروج
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header row */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#3F1F8C]">مقرراتك</h2>
            <p className="text-slate-700 text-sm md:text-base">
              أنشئ وادِر مقرراتك الإلكترونية، وتابع أعداد الطلاب بسهولة.
            </p>
          </div>
          <Link href="/admin/courses/new">
            <Button className="bg-gradient-to-r from-[#3F1F8C] via-[#1D96D3] to-[#97C945] text-white hover:opacity-90 gap-2">
              <Plus className="w-4 h-4" />
              مقرر جديد
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
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
            <Card key={i} className="bg-white/85 border border-slate-200 shadow-md p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl md:text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <stat.icon className="w-8 h-8 text-[#1D96D3]" />
              </div>
            </Card>
          ))}
        </div>

        {/* Courses Table */}
        <Card className="bg-white/90 border border-slate-200 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 bg-slate-50/80">
                <tr>
                  <th className="px-6 py-3 text-right font-semibold text-slate-800">المقرر</th>
                  <th className="px-6 py-3 text-right font-semibold text-slate-800">التصنيف</th>
                  <th className="px-6 py-3 text-right font-semibold text-slate-800">الطلاب</th>
                  <th className="px-6 py-3 text-right font-semibold text-slate-800">الدروس</th>
                  <th className="px-6 py-3 text-right font-semibold text-slate-800">الحالة</th>
                  <th className="px-6 py-3 text-right font-semibold text-slate-800">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr
                    key={course.id}
                    className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="px-6 py-3 text-slate-900">{course.title}</td>
                    <td className="px-6 py-3 text-slate-700">{course.category}</td>
                    <td className="px-6 py-3 text-slate-700">{course.students}</td>
                    <td className="px-6 py-3 text-slate-700">{course.lessons}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          course.status === "published"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex gap-1">
                        <Link href={`/admin/courses/${course.id}`}>
                          <Button variant="ghost" size="sm" className="text-slate-700 hover:text-slate-900">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
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
