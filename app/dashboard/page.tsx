"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LogOut, Search, Star, Play, Clock } from "lucide-react"

interface Course {
  id: number
  title: string
  instructor: string
  progress: number
  lessons: number
  duration: string
  category: string
  rating: number
  image: string
}

const SAMPLE_COURSES: Course[] = [
  {
    id: 1,
    title: "مقدمة في الرياضيات التطبيقية",
    instructor: "أ.د محمد السالمي",
    progress: 45,
    lessons: 24,
    duration: "12 ساعة",
    category: "الرياضيات",
    rating: 4.8,
    image: "data:image/webp;base64,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",
  },
  {
    id: 2,
    title: "تقنيات البرمجة المتقدمة",
    instructor: "أ.د فاطمة الحارثي",
    progress: 20,
    lessons: 18,
    duration: "10 ساعات",
    category: "البرمجة",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "أساسيات الإدارة الحديثة",
    instructor: "أ.د علي الزهراني",
    progress: 0,
    lessons: 15,
    duration: "8 ساعات",
    category: "الإدارة",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "مبادئ التسويق الرقمي والإعلام",
    instructor: "أ.د سارة السريع",
    progress: 60,
    lessons: 20,
    duration: "11 ساعة",
    category: "التسويق",
    rating: 4.6,
    image: "https://tse4.mm.bing.net/th/id/OIP.vvwerPj7g54HU82nMw5O5QHaEk?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCourses, setFilteredCourses] = useState(SAMPLE_COURSES)

  useEffect(() => {
    const userData = typeof window !== "undefined" ? localStorage.getItem("user") : null
    if (!userData) {
      router.push("/auth")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  useEffect(() => {
    const filtered = SAMPLE_COURSES.filter(
      (course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredCourses(filtered)
  }, [searchQuery])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5FFF7] via-[#F3F7FF] to-[#F7F3FF]">
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
                  className="object-contain drop-shadow-[0_0_22px_rgba(29,150,211,0.5)]"
                />
              </div>
              <h1 className="text-lg md:text-2xl font-bold text-slate-900">لوحة التحكم التعليمية</h1>
            </div>
            <p className="text-slate-600 text-xs md:text-sm">
              أهلاً، {user.name || user.email} – استمر في تعلّم دوراتك  
            </p>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#3F1F8C]">رحلتك الأكاديمية</h2>
          <p className="text-slate-700 text-sm md:text-base">
            تصفّح الدورات، تابع تقدّمك، وارجع لأي درس مرئي بسهولة.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="ابحث عن دورة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-11 py-3 bg-white/80 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1D96D3] focus:ring-2 focus:ring-[#1D96D3]/20"
            />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <Card className="h-full bg-white/80 border border-slate-200 hover:border-[#1D96D3] transition-all cursor-pointer overflow-hidden shadow-md hover:shadow-lg">
                <div className="w-full h-44 overflow-hidden relative">
                  <img
                    src={course.image || "/placeholder.jpg"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-900/80 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-300" fill="currentColor" />
                    <span className="text-xs font-semibold text-white">{course.rating}</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col h-full">
                  <div className="mb-3">
                    <p className="text-xs font-medium text-[#1D96D3] mb-1">{course.category}</p>
                    <h3 className="text-md md:text-lg font-semibold text-slate-900">{course.title}</h3>
                  </div>

                  <p className="text-slate-600 text-sm mb-3">الأستاذ/ة: {course.instructor}</p>

                  {course.progress > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1 text-slate-700 text-xs">
                        <span>التقدم</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#3F1F8C] via-[#1D96D3] to-[#97C945]"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs md:text-sm text-slate-600 mt-auto pt-3 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Play className="w-4 h-4" />
                      {course.lessons} محاضرة
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </span>
                  </div>

                  <Button className="w-full mt-4 bg-gradient-to-r from-[#3F1F8C] via-[#1D96D3] to-[#97C945] text-white hover:opacity-90">
                    {course.progress > 0 ? "استمر" : "ابدأ"} الآن
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-10">
            <p className="text-slate-600">لم نجد دورات. جرب بحث مختلف.</p>
          </div>
        )}
      </main>
    </div>
  )
}
