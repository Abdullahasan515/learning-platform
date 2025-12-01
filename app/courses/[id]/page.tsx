"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2, Clock, BookOpen, Award } from "lucide-react"

interface Lesson {
  id: number
  title: string
  duration: string
  type: "video" | "text" | "quiz"
  completed: boolean
  videoUrl?: string
  image?: string
}

interface CourseDetail {
  id: number
  title: string
  instructor: string
  description: string
  progress: number
  rating: number
  lessons: Lesson[]
  coverImage: string
}

const COURSE_DATA: Record<number, CourseDetail> = {
  1: {
    id: 1,
    title: "مقدمة في الرياضيات التطبيقية",
    instructor: "أ.د محمد السالمي",
    description:
      "تعلم أساسيات الرياضيات التطبيقية مع تطبيقات عملية. الجبر الخطي، حساب التفاضل والتكامل، والمعادلات التفاضلية مع أمثلة واقعية.",
    progress: 45,
    rating: 4.8,
    coverImage: "https://images.unsplash.com/photo-1516534775068-bb571a5e1d5b?w=800&h=400&fit=crop",
    lessons: [
      {
        id: 1,
        title: "مقدمة عن الرياضيات التطبيقية",
        duration: "15 دقيقة",
        type: "video",
        completed: true,
        videoUrl: "https://www.youtube.com/embed/kfF40MiS7zA",
        image: "https://images.unsplash.com/photo-1516534775068-bb571a5e1d5b?w=400&h=250&fit=crop",
      },
      {
        id: 2,
        title: "الجبر الخطي - المصفوفات",
        duration: "20 دقيقة",
        type: "video",
        completed: true,
        videoUrl: "https://www.youtube.com/embed/fNk_zzaMoSs",
        image: "https://images.unsplash.com/photo-1516534775068-bb571a5e1d5b?w=400&h=250&fit=crop",
      },
      {
        id: 3,
        title: "حساب التفاضل والتكامل الأساسي",
        duration: "25 دقيقة",
        type: "video",
        completed: true,
        videoUrl: "https://www.youtube.com/embed/WUvTyaaNkzM",
        image: "https://images.unsplash.com/photo-1516534775068-bb571a5e1d5b?w=400&h=250&fit=crop",
      },
      {
        id: 4,
        title: "المعادلات التفاضلية العادية",
        duration: "22 دقيقة",
        type: "video",
        completed: false,
        videoUrl: "https://www.youtube.com/embed/p_di4Zn4wz4",
        image: "https://images.unsplash.com/photo-1516534775068-bb571a5e1d5b?w=400&h=250&fit=crop",
      },
      {
        id: 5,
        title: "تطبيقات عملية في الحياة الواقعية",
        duration: "30 دقيقة",
        type: "text",
        completed: false,
        image: "https://images.unsplash.com/photo-1516534775068-bb571a5e1d5b?w=400&h=250&fit=crop",
      },
      {
        id: 6,
        title: "اختبار الوحدة الأول",
        duration: "45 دقيقة",
        type: "quiz",
        completed: false,
      },
    ],
  },
  2: {
    id: 2,
    title: "تقنيات البرمجة المتقدمة",
    instructor: "أ.د فاطمة الحارثي",
    description:
      "تعمق في مفاهيم البرمجة المتقدمة مع التركيز على Design Patterns والتطبيقات الموزعة، وكتابة أكواد احترافية قابلة للصيانة.",
    progress: 20,
    rating: 4.9,
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
    lessons: [
      {
        id: 1,
        title: "مفاهيم البرمجة الموجهة للكائنات",
        duration: "25 دقيقة",
        type: "video",
        completed: true,
        videoUrl: "https://www.youtube.com/embed/pTB0EiLXUC8",
        image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop",
      },
      {
        id: 2,
        title: "Design Patterns في البرمجة",
        duration: "30 دقيقة",
        type: "video",
        completed: false,
        videoUrl: "https://www.youtube.com/embed/LAP0A181hvQ",
        image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop",
      },
      {
        id: 3,
        title: "البرمجة الوظيفية (Functional Programming)",
        duration: "28 دقيقة",
        type: "video",
        completed: false,
        videoUrl: "https://www.youtube.com/embed/e-5obm1G_FY",
        image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop",
      },
      {
        id: 4,
        title: "مشروع عملي متقدم",
        duration: "45 دقيقة",
        type: "text",
        completed: false,
      },
      {
        id: 5,
        title: "اختبار نهائي",
        duration: "60 دقيقة",
        type: "quiz",
        completed: false,
      },
    ],
  },
}

export default function CoursePage() {
  const params = useParams()
  const [course, setCourse] = useState<CourseDetail | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)

  useEffect(() => {
    const courseId = Number.parseInt(params.id as string)
    const courseData = COURSE_DATA[courseId]
    if (courseData) {
      setCourse(courseData)
      setSelectedLesson(courseData.lessons[0])
    }
  }, [params.id])

  if (!course) return null

  const completedLessons = course.lessons.filter((l) => l.completed).length

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 md:w-20 md:h-20">
              <Image
                src="/apple-icon.png"
                alt="شعار المنصة التعليمية"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900">{course.title}</h1>
              <p className="text-slate-600 text-sm">{course.instructor}</p>
            </div>
          </div>
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="gap-2 text-slate-800 hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
              العودة للدورات
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lesson Content - Main */}
          <div className="lg:col-span-2">
            {selectedLesson && (
              <Card className="border border-slate-200 bg-white p-6 md:p-8 text-slate-900">
                {/* Video/Content Area */}
                <div className="rounded-lg mb-8 overflow-hidden border border-slate-200 bg-black">
                  {selectedLesson.type === "video" && selectedLesson.videoUrl ? (
                    <iframe
                      width="100%"
                      height="400"
                      src={selectedLesson.videoUrl}
                      title={selectedLesson.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : selectedLesson.type === "video" && selectedLesson.image ? (
                    <div className="w-full">
                      <img
                        src={selectedLesson.image || "/placeholder.svg"}
                        alt={selectedLesson.title}
                        className="w-full h-80 object-cover"
                      />
                    </div>
                  ) : selectedLesson.type === "quiz" ? (
                    <div className="p-10 flex flex-col items-center justify-center min-h-[18rem] bg-slate-50">
                      <Award className="w-16 h-16 text-[#3F1F8C] mb-4" />
                      <p className="text-slate-700">اختبار: {selectedLesson.title}</p>
                    </div>
                  ) : (
                    <div className="p-10 flex flex-col items-center justify-center min-h-[18rem] bg-slate-50">
                      <BookOpen className="w-16 h-16 text-[#1D96D3] mb-4" />
                      <p className="text-slate-700">محاضرة: {selectedLesson.title}</p>
                    </div>
                  )}
                </div>

                {/* Lesson Title & Meta */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-2xl font-bold text-slate-900">{selectedLesson.title}</h2>
                    {selectedLesson.completed && (
                      <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-4 h-4 text-green-700" />
                        <span className="text-sm font-semibold text-green-700">مكتمل</span>
                      </div>
                    )}
                  </div>
                  <div className="flex.items-center gap-4 text-slate-700">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedLesson.duration}
                    </span>
                    <span className="px-3 py-1 bg-slate-100 rounded-full text-sm font-medium">
                      {selectedLesson.type === "video" ? "فيديو" : selectedLesson.type === "quiz" ? "اختبار" : "نص"}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-700 mb-8">{course.description}</p>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-slate-200">
                  {!selectedLesson.completed && (
                    <Button className="bg-[#97C945] hover:bg-[#7fb436] gap-2 text-white">
                      <CheckCircle2 className="w-4 h-4" />
                      تعليم كمكتمل
                    </Button>
                  )}
                  <Link href={`/quiz/${course.id}`}>
                    <Button variant="outline" className="border-slate-300 text-slate-800 hover:bg-slate-100">
                      الاختبار
                    </Button>
                  </Link>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar - Lesson List */}
          <div>
            <Card className="border border-slate-200 bg-white p-6 sticky top-24 text-slate-900">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">التقدم</h3>
                  <span className="text-sm font-bold text-[#3F1F8C]">
                    {Math.round((completedLessons / course.lessons.length) * 100)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#97C945] via-[#1D96D3] to-[#3F1F8C]"
                    style={{ width: `${(completedLessons / course.lessons.length) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  {completedLessons} من {course.lessons.length} محاضرة مكتملة
                </p>
              </div>

              {/* Lessons List */}
              <div className="space-y-2">
                <h3 className="font-semibold mb-3">المحاضرات</h3>
                {course.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLesson(lesson)}
                    className={`w-full text-right p-3 rounded-lg transition-all ${
                      selectedLesson?.id === lesson.id
                        ? "bg-slate-100 border border-[#1D96D3]"
                        : "hover:bg-slate-50 border border-transparent"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {lesson.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{lesson.title}</p>
                        <p className="text-xs text-slate-600">{lesson.duration}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
