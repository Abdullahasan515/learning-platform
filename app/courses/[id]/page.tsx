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
  type: "video" | "quiz"
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
      "تعلم أساسيات الرياضيات التطبيقية مع تطبيقات في الجبر الخطي، حساب التفاضل والتكامل، والمعادلات التفاضلية من خلال دروس مرئية من يوتيوب.",
    progress: 45,
    rating: 4.8,
    coverImage: "https://th.bing.com/th?&id=OVP.-Vv0AUSNlP_bY0g_BFD_eAHgFo&w=332&h=186&c=7&pid=2.1&rs=1",
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
        type: "video",
        completed: false,
        videoUrl: "https://www.youtube.com/embed/IDIxljawU0Q",
        image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=250&fit=crop",
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
      "مفاهيم متقدمة في البرمجة مع أمثلة عملية من خلال دروس مرئية في TypeScript وPatterns وتطبيقات عملية.",
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
        type: "video",
        completed: false,
        videoUrl: "https://www.youtube.com/embed/nu_pCVPKzTk",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop",
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
  const completionPercent = Math.round((completedLessons / course.lessons.length) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5FFF7] via-[#F3F7FF] to-[#F7F3FF]">
      {/* Header */}
      <header className="sticky.top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-1.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 md:w-16 md:h-16">
              <Image
                src="/apple-icon.png"
                alt="شعار المنصة التعليمية"
                fill
                priority
                className="object-contain drop-shadow-[0_0_20px_rgba(29,150,211,0.5)]"
              />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-slate-900">{course.title}</h1>
              <p className="text-slate-600 text-xs md:text-sm">{course.instructor}</p>
            </div>
          </div>
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="gap-2 border-slate-300 bg-white/70 text-slate-800 hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
              العودة للدورات
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl.mx-auto px-4 md:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main lesson area */}
          <div className="lg:col-span-2">
            {selectedLesson && (
              <Card className="bg-white/90 border border-slate-200 shadow-md p-5 md:p-6">
                {/* Video / Content */}
                <div className="rounded-xl overflow-hidden bg-slate-100 mb-6">
                  {selectedLesson.type === "video" && selectedLesson.videoUrl ? (
                    <div className="relative w-full aspect-video">
                      <iframe
                        className="w-full h-full"
                        src={selectedLesson.videoUrl}
                        title={selectedLesson.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : selectedLesson.type === "quiz" ? (
                    <div className="p-10 flex flex-col items-center justify-center">
                      <Award className="w-16 h-16 text-[#3F1F8C] mb-3" />
                      <p className="text-slate-700 text-sm md:text-base">
                        هذا درس عبارة عن اختبار قصير لقياس فهمك لمحتوى المقرر.
                      </p>
                    </div>
                  ) : null}
                </div>

                {/* Info */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900">{selectedLesson.title}</h2>
                    {selectedLesson.completed && (
                      <div className="flex.items-center gap-2 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-semibold text-green-700">مكتمل</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-slate-600 text-xs md:text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedLesson.duration}
                    </span>
                    <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-800">
                      {selectedLesson.type === "video" ? "درس مرئي من يوتيوب" : "اختبار"}
                    </span>
                  </div>
                </div>

                <p className="text-slate-700 text-sm md:text-base mb-6">{course.description}</p>

                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  {!selectedLesson.completed && (
                    <Button className="bg-gradient-to-r from-[#3F1F8C] via-[#1D96D3] to-[#97C945] text-white hover:opacity-90 gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      تعليم كمكتمل
                    </Button>
                  )}
                  <Link href={`/quiz/${course.id}`}>
                    <Button
                      variant="outline"
                      className="border-slate-300 text-slate-800 bg-white/80 hover:bg-slate-100"
                    >
                      الانتقال للاختبار
                    </Button>
                  </Link>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar: lessons + progress */}
          <div className="space-y-4">
            <Card className="bg-white/90 border border-slate-200 shadow-md p-5 sticky top-24">
              {/* Progress */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-slate-900 text-sm md:text-base">التقدم في المقرر</h3>
                  <span className="text-xs font-bold text-[#3F1F8C]">{completionPercent}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#3F1F8C] via-[#1D96D3] to-[#97C945]"
                    style={{ width: `${completionPercent}%` }}
                  />
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  {completedLessons} من {course.lessons.length} درس مكتمل
                </p>
              </div>

              {/* Lessons list */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3 text-sm md:text-base">دروس المقرر</h3>
                <div className="space-y-2">
                  {course.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => setSelectedLesson(lesson)}
                      className={`w-full text-right p-3 rounded-lg border text-xs md:text-sm transition-colors ${
                        selectedLesson?.id === lesson.id
                          ? "bg-[#F3F7FF] border-[#1D96D3]"
                          : "bg-white/70 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {lesson.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-400 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-900 truncate">{lesson.title}</p>
                          <p className="text-[11px] text-slate-600">{lesson.duration}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
