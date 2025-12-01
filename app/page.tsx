import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, BookOpen, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
   <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex justify-between items-center">
          {/* Brand with big logo */}
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
          </div>
          <div className="flex gap-3">
            <Link href="/auth?type=login">
              <Button variant="outline" className="border-slate-300 text-slate-800 hover:bg-slate-100">
                دخول
              </Button>
            </Link>
            <Link href="/auth?type=signup">
              <Button className="bg-[#1D96D3] hover:bg-[#1877a8] text-white">
                ابدأ الآن
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Top Video Section (YouTube) */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
          <div className="w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-black">
            <iframe
              className="w-full h-full"
              width="853"
              height="480"
              src="https://www.youtube.com/embed/IDIxljawU0Q?autoplay=1&mute=1&rel=0&modestbranding=1"
              title="جامعة الباحة"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Logo highlight */}
          <div className="order-2 md:order-1">
            <div className="rounded-2xl p-6 h-64 md:h-72 flex items-center justify-center border border-slate-200 bg-white">
              <div className="relative w-full h-full max-w-xs mx-auto">
                <Image
                  src="/apple-icon.png"
                  alt="شعار المنصة التعليمية"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <h1 className="mb-4 text-3xl md:text-4xl font-bold leading-tight text-slate-900">
              نظام تعليم إلكتروني
              <span className="block text-[#3F1F8C] mt-1">سحابي، عصري، ومتخصص</span>
            </h1>
            <p className="text-base md:text-lg text-slate-700 mb-6">
              محاضرات مرئية من يوتيوب، مقررات منظمة، واختبارات لقياس مستوى الفهم، في مكان واحد بسيط وواضح.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/auth?type=signup">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#97C945] hover:bg-[#7fb436] text-white"
                >
                  ابدأ التعلم الآن
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </Link>
              <Link href="/auth?type=login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-slate-300 text-slate-800 hover:bg-slate-100"
                >
                  تسجيل دخول
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
        <h2 className="text-center mb-10 text-2xl md:text-3xl font-bold text-slate-900">
          ماذا يقدّم لك النظام؟
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: BookOpen,
              title: "محتوى مرئي من يوتيوب",
              desc: "محاضرات ودورات تعليمية من قنوات مميزة.",
            },
            {
              icon: Users,
              title: "تجربة منظمة",
              desc: "مقررات ودروس واختبارات في واجهة واحدة بسيطة.",
            },
            {
              icon: TrendingUp,
              title: "اختبارات وتقييم",
              desc: "أسئلة تساعدك على قياس فهمك بعد كل وحدة.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="rounded-xl p-6 text-center border border-slate-200 bg-white"
            >
              <feature.icon className="w-10 h-10 text-[#1D96D3] mx-auto mb-3" />
              <h3 className="text-lg mb-2 font-semibold text-slate-900">{feature.title}</h3>
              <p className="text-slate-700 text-sm md:text-base">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-4 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center text-slate-500 text-sm">
          <p>&copy; 2025 نظام التعليم الإلكتروني السحابي. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  )
}
