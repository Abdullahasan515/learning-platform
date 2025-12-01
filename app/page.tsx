import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, BookOpen, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#97C945] via-[#1D96D3] to-[#3F1F8C] text-white">
      {/* Navigation */}
      <nav className="border-b border-white/20 backdrop-blur-xl sticky top-0 z-50 bg-[#020617]/80">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex justify-between items-center">
          {/* Brand with logo */}
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 md:w-24 md:h-24">
              <Image
                src="/apple-icon.png"
                alt="شعار المنصة التعليمية"
                fill
                priority
                className="object-contain drop-shadow-[0_0_35px_rgba(15,23,42,0.9)]"
              />
            </div>
            <span className="hidden sm:inline text-xs md:text-sm text-slate-100/80">
              نظام التعليم الإلكتروني السحابي
            </span>
          </div>
          <div className="flex gap-3">
            <Link href="/auth?type=login">
              <Button variant="outline" className="border-white/60 text-white hover:bg-white/10">
                دخول
              </Button>
            </Link>
            <Link href="/auth?type=signup">
              <Button className="bg-[#97C945] hover:bg-[#7fb436] text-white shadow-lg shadow-[#97C945]/40">
                ابدأ الآن
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Top Video Section (YouTube) */}
      <section className="border-b border-white/15 bg-[#020617]/80">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
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

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Logo highlight */}
          <div className="order-2 md:order-1">
            <div className="rounded-2xl p-8 h-64 md:h-80 flex items-center justify-center overflow-hidden border border-white/20 bg-[#020617] shadow-xl shadow-black/50">
              <div className="relative w-full h-full max-w-md mx-auto">
                <Image
                  src="/apple-icon.png"
                  alt="شعار المنصة التعليمية"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_0_45px_rgba(56,189,248,0.8)]"
                />
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <h1 className="text-balance mb-6 text-3xl md:text-5xl font-bold leading-tight">
              نظام تعليم إلكتروني
              <span className="block text-[#97C945] mt-2">سحابي، عصري، ومتخصص</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-100/90 mb-8 leading-relaxed">
              محاضرات تفاعلية، محتوى مرئي من يوتيوب، واختبارات تقيس فهمك في كل مرحلة، في تجربة
              موحّدة سهلة للطلاب والطالبات.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth?type=signup">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#97C945] hover:bg-[#7fb436] text-white shadow-lg shadow-[#97C945]/40"
                >
                  ابدأ التعلم الآن
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </Link>
              <Link href="/auth?type=login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white/70 text-white hover:bg-white/10"
                >
                  تسجيل دخول
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
        <h2 className="text-center mb-12 md:mb-16 text-2xl md:text-3xl font-bold text-white">
          ماذا يقدّم لك النظام؟
        </h2>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              icon: BookOpen,
              title: "محتوى مرئي من يوتيوب",
              desc: "محاضرات ودورات منتقاة من قنوات تعليمية مميزة.",
            },
            {
              icon: Users,
              title: "تجربة مخصصة",
              desc: "تتبع التقدم لكل طالب مع واجهة بسيطة وواضحة.",
            },
            {
              icon: TrendingUp,
              title: "اختبارات وتقييم",
              desc: "أسئلة تفاعلية لقياس مستوى الفهم بعد كل وحدة.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="rounded-xl p-7 text-center border border-white/20 bg-[#020617] shadow-lg shadow-black/40"
            >
              <feature.icon className="w-12 h-12 text-[#1D96D3] mx-auto mb-4" />
              <h3 className="text-xl mb-2 font-semibold text-white">{feature.title}</h3>
              <p className="text-slate-100/80 text-sm md:text-base">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 py-6 px-4 md:px-6 bg-[#020617]/90">
        <div className="max-w-7xl mx-auto text-center text-slate-200/80 text-sm">
          <p>&copy; 2025 نظام التعليم الإلكتروني السحابي. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  )
}
