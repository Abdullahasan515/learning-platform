import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, BookOpen, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-1.5 flex items-center justify-between">
          {/* Brand (big logo) */}
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 md:w-20 md:h-20">
              <Image
                src="/apple-icon.png"
                alt="شعار المنصة التعليمية"
                fill
                priority
                className="object-contain drop-shadow-[0_0_22px_rgba(63,31,140,0.5)]"
              />
            </div>
          </div>

          <div className="flex gap-2 md:gap-3">
            <Link href="/auth?type=login">
              <Button
                variant="outline"
                className="border-slate-300 text-slate-800 bg-white/70 hover:bg-slate-100"
              >
                دخول
              </Button>
            </Link>
            <Link href="/auth?type=signup">
              <Button className="bg-gradient-to-r from-[#3F1F8C] via-[#1D96D3] to-[#97C945] text-white hover:opacity-90">
                ابدأ الآن
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Top Video Section (YouTube) */}
      <section className="border-b border-slate-200 bg-white/80">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl shadow-slate-300/60">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/IDIxljawU0Q?autoplay=1&mute=1&rel=0&modestbranding=1"
              title="جامعة الباحة"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Wide Logo under header */}
      <section className="bg-transparent">
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-2 flex justify-center">
          <div className="relative w-40 h-40 md:w-52 md:h-52">
            <Image
              src="/apple-icon.png"
              alt="شعار المنصة التعليمية"
              fill
              priority
              className="object-contain drop-shadow-[0_0_32px_rgba(29,150,211,0.6)]"
            />
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pt-4 pb-12 md:pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-pulse">
              <span className="block text-slate-900">نظام تعليم إلكتروني</span>
              <span className="block bg-gradient-to-r from-[#3F1F8C] via-[#1D96D3] to-[#97C945] bg-clip-text text-transparent">
                سحابي • عصري • متكامل
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-700 mb-8 leading-relaxed">
              منصة تعليم إلكتروني سحابية تربطك بدورات مرئية من يوتيوب، محتوى تفاعلي، واختبارات تقيس فهمك
              في كل خطوة، مع واجهة واضحة تعمل بسلاسة على اللابتوب والجوال.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/auth?type=signup">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-[#3F1F8C] via-[#1D96D3] to-[#97C945] text-white hover:opacity-90">
                  ابدأ التعلم الآن
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </Link>
              <Link href="/auth?type=login">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-slate-300 bg-white/70 text-slate-800 hover:bg-slate-100"
                >
                  تسجيل دخول
                </Button>
              </Link>
            </div>
          </div>

          {/* Features card */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white/80 shadow-md p-5">
              <h2 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#3F1F8C]" />
                محتوى مرئي من يوتيوب
              </h2>
              <p className="text-slate-700 text-sm">
                دروس ودورات من قنوات تعليمية مختارة، تعرض مباشرة داخل المنصة مع تتبع للتقدم.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 shadow-md p-5">
              <h2 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#1D96D3]" />
                تجربة مريحة للطلاب
              </h2>
              <p className="text-slate-700 text-sm">
                نفس التجربة على الجوال واللابتوب، مع واجهات بسيطة وخلفيات بيضاء شفافة مريحة للعين.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 shadow-md p-5">
              <h2 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#97C945]" />
                اختبارات وتتبّع أداء
              </h2>
              <p className="text-slate-700 text-sm">
                اختبارات قصيرة لكل مقرر، مع إظهار الدرجة النهائية لتقييم مستواك فوراً.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white/80">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 text-center text-xs md:text-sm text-slate-600">
          &copy; 2025 نظام التعليم الإلكتروني السحابي. جميع الحقوق محفوظة.
        </div>
      </footer>
    </div>
  )
}
