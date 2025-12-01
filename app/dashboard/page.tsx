"use client"

import { useState, useEffect } from "react"
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
    category: "العلوم",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1516534775068-bb571a5e1d5b?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1460925895917-adf4198c838d?w=400&h=300&fit=crop",
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCourses, setFilteredCourses] = useState(SAMPLE_COURSES)

  useEffect(() => {
    const userData = localStorage.getItem("user")
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
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background">
      <header className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-50 bg-white/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">جامعة</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                جامعة الباحة
              </h1>
            </div>
            <p className="text-muted-foreground text-sm">أهلاً وسهلاً، {user.name || user.email}</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="gap-2 bg-transparent border-primary/20 text-primary hover:bg-primary/10"
          >
            <LogOut className="w-4 h-4" />
            تسجيل خروج
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-2 text-primary">رحلتك الأكاديمية</h2>
          <p className="text-muted-foreground">استمر في التعلم، تتبع تقدمك، وحقق نجاحك الأكاديمي</p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="ابحث عن دورة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-3 bg-input/50 border border-border/50 rounded-lg focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-smooth"
            />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <Card className="h-full glass-effect border-primary/20 hover:border-primary/50 transition-smooth cursor-pointer group overflow-hidden">
                <div className="w-full h-48 overflow-hidden relative">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-secondary/90 px-2 py-1 rounded-full backdrop-blur-sm">
                    <Star className="w-4 h-4 text-yellow-300" fill="currentColor" />
                    <span className="text-xs font-semibold text-white">{course.rating}</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <p className="text-xs font-medium text-secondary mb-2">{course.category}</p>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-smooth">{course.title}</h3>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4">الأستاذ/ة: {course.instructor}</p>

                  {course.progress > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium">التقدم</span>
                        <span className="text-xs text-muted-foreground">{course.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-secondary"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto pt-4 border-t border-border/50">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Play className="w-4 h-4" />
                        {course.lessons} محاضرة
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold">
                    {course.progress > 0 ? "استمر" : "ابدأ"} الآن
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">لم نجد دورات. جرب بحث مختلف.</p>
          </div>
        )}
      </main>
    </div>
  )
}
