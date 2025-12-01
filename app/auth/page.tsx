"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"

export default function AuthPage() {
  const searchParams = useSearchParams()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const type = searchParams.get("type")
    setIsLogin(type !== "signup")
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (isLogin) {
        if (!formData.email || !formData.password) {
          setError("يرجى ملء جميع الحقول")
          return
        }
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: formData.email,
            name: formData.email.split("@")[0],
            role: "student",
            id: Date.now(),
          }),
        )
      } else {
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
          setError("يرجى ملء جميع الحقول")
          return
        }
        if (formData.password !== formData.confirmPassword) {
          setError("كلمات المرور غير متطابقة")
          return
        }
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: formData.name,
            email: formData.email,
            role: "student",
            id: Date.now(),
          }),
        )
      }
      window.location.href = "/dashboard"
    } catch (err) {
      setError("فشل التحقق. يرجى المحاولة مرة أخرى.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className="w-full max-w-md glass-effect border-primary/20">
        <div className="p-8">
          {/* Brand with big logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20 md:w-28 md:h-28 mb-3">
                <Image
                  src="/apple-icon.png"
                  alt="شعار جامعة الباحة"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_0_30px_rgba(37,99,235,0.55)]"
                />
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                جامعة الباحة
              </div>
            </div>
            <p className="text-muted-foreground">
              {isLogin ? "مرحباً بعودتك إلى نظام التعليم الإلكتروني" : "انضم إلى نظام التعليم الإلكتروني"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-primary">
                  <User className="w-4 h-4" />
                  الاسم الكامل
                </label>
                <Input
                  type="text"
                  placeholder="اسمك"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2 text-primary">
                <Mail className="w-4 h-4" />
                البريد الإلكتروني
              </label>
              <Input
                type="email"
                placeholder="your@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2 text-primary">
                <Lock className="w-4 h-4" />
                كلمة المرور
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-primary">
                  <Lock className="w-4 h-4" />
                  تأكيد كلمة المرور
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                />
              </div>
            )}

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-lg text-sm text-destructive">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 h-11 transition-smooth"
            >
              {loading ? "جاري المعالجة..." : isLogin ? "دخول" : "إنشاء حساب"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              {isLogin ? "ليس لديك حساب؟" : "هل لديك حساب بالفعل؟"}
              <Link href={isLogin ? "/auth?type=signup" : "/auth?type=login"}>
                <button className="text-primary hover:text-primary/80 font-semibold mr-1 transition-smooth">
                  {isLogin ? "انضم الآن" : "دخول"}
                </button>
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
