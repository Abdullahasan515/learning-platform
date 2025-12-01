import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, BookOpen, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#97C945] via-[#1D96D3] to-[#3F1F8C]">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-50 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Brand with logo only */}
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 md:w-24 md:h-24">
              <Image
                src="/apple-icon.png"
                alt="شعار المنصة التعليمية"
                fill
                priority
                className="object-contain drop-shadow-[0_0_35px_rgba(30,64,175,0.7)]"
              />
            </div>
            <span className="hidden sm:inline text-xs md:text-sm text-muted-foreground">
              نظام التعليم الإلكتروني السحابي
            </span>
          </div>

          <div className="flex gap-4">
            <Link href="/auth?type=login">
              <Button variant="ghost" className="text-foreground hover:bg-primary/10">
                دخول
              </Button>
            </Link>
            <Link href="/auth?type=signup">
              <Button className="bg-primary hover:bg-primary/90 text-white">ابدأ الآن</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Big logo card */}
          <div className="order-2 md:order-1">
            <div className="glass-effect rounded-2xl p-8 h-64 md:h-80 flex items-center justify-center overflow-hidden border border-primary/40 bg-black/10">
              <div className="relative w-full h-full max-w-md mx-auto">
                <Image
                  src="/apple-icon.png"
                  alt="شعار المنصة التعليمية"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_0_45px_rgba(56,189,248,0.75)]"
                />
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <h1 className="text-balance mb-6 text-4xl md:text-5xl font-bold text-background">
              نظام التعليم <span className="text-[#97C945]">الإلكتروني</span>
            </h1>
            <p className="text-xl text-background/80 mb-8 leading-relaxed">
              محاضرات تفاعلية، دورات متخصصة، ومسارات تعليمية متقدمة للطلاب والطالبات، بتجربة عصرية
              على السحابة.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth?type=signup">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#97C945] hover:bg-[#7fb436] text-white shadow-lg shadow-[#97C945]/40"
                >
                  ابدأ التعلم
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </Link>
              <Link href="/auth?type=login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white/60 text-white hover:bg-white/10 bg-transparent"
                >
                  دخول
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-center mb-16 text-3xl font-bold text-white">
          لماذا تختار هذا النظام التعليمي؟
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: BookOpen, title: "محتوى أكاديمي", desc: "مقررات منتقاة من نخبة من أعضاء هيئة التدريس" },
            { icon: Users, title: "تعاون الطلاب", desc: "بيئة تفاعلية تجمع الطلاب والطالبات في مساحة واحدة" },
            { icon: TrendingUp, title: "تتبع الأداء", desc: "تحليلات شاملة لتقدمك الأكاديمي لحظة بلحظة" },
          ].map((feature, i) => (
            <div
              key={i}
              className="glass-effect rounded-xl p-8 text-center hover:border-[#1D96D3]/70 transition-smooth border border-white/20 bg-black/10"
            >
              <feature.icon className="w-12 h-12 text-[#1D96D3] mx-auto mb-4" />
              <h3 className="text-xl mb-2 font-semibold text-white">{feature.title}</h3>
              <p className="text-slate-100/80">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 mt-20 py-8 px-6 bg-gradient-to-r from-[#1D96D3]/20 via-[#3F1F8C]/30 to-[#97C945]/20">
        <div className="max-w-7xl mx-auto text-center text-slate-100/80">
          <p>&copy; 2025 نظام التعليم الإلكتروني. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  )
}
