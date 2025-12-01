"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, BookOpen, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-50 bg-background/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Brand with big logo */}
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 md:w-24 md:h-24">
              <Image
                src="/apple-icon.png"
                alt="شعار جامعة الباحة"
                fill
                priority
                className="object-contain drop-shadow-xl"
              />
            </div>
            <div className="flex flex-col">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
                جامعة الباحة
              </div>
              <span className="text-xs md:text-sm text-muted-foreground">
                نظام التعليم الإلكتروني
              </span>
            </div>
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
            <div className="glass-effect rounded-2xl p-8 h-64 md:h-80 flex items-center justify-center overflow-hidden border border-primary/30 bg-background/40">
              <div className="relative w-full h-full max-w-md mx-auto">
                <Image
                  src="/apple-icon.png"
                  alt="شعار جامعة الباحة"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_0_40px_rgba(37,99,235,0.55)]"
                />
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <h1 className="text-balance mb-6 text-4xl md:text-5xl font-bold">
              نظام التعليم <span className="text-primary">الإلكتروني</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              اختبر التعليم المتميز مع جامعة الباحة - محاضرات حية، دورات متخصصة، ومسارات تعليمية متقدمة للطلاب
              والطالبات.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth?type=signup">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white">
                  ابدأ التعلم
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </Link>
              <Link href="/auth?type=login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-primary text-primary hover:bg-primary/5 bg-transparent"
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
        <h2 className="text-center mb-16 text-3xl font-bold">لماذا تختار نظام جامعة الباحة؟</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: BookOpen, title: "محتوى أكاديمي", desc: "مقررات منتقاة من أساتذة الجامعة المتخصصين" },
            { icon: Users, title: "تعاون الطلاب", desc: "تعاون مع آلاف الطلاب والطالبات من الجامعة" },
            { icon: TrendingUp, title: "تتبع الأداء", desc: "تحليلات شاملة لتقدمك الأكاديمي" },
          ].map((feature, i) => (
            <div
              key={i}
              className="glass-effect rounded-xl p-8 text-center hover:border-primary/50 transition-smooth border border-primary/20"
            >
              <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl mb-2 font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20 py-8 px-6 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 جامعة الباحة - نظام التعليم الإلكتروني. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  )
}
