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
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background">
      {/* Header with logo */}
      <header className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-50 bg-background/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="relative w-10 h-10 md:w-16 md:h-16">
                <Image
                  src="/apple-icon.png"
                  alt="شعار جامعة الباحة"
                  fill
                  className="object-contain drop-shadow-md"
                  priority
                />
              </div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                جامعة الباحة
              </h1>
            </div>
            <p className="text-muted-foreground text-sm">
              أهلاً وسهلاً، {user.name || user.email}
            </p>
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
          <p className="text-muted-foreground">
            استمر في التعلم، تتبع تقدمك، وحقق نجاحك الأكاديمي
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted
