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
    } catch {
      setError("فشل التحقق. يرجى المحاولة مرة أخرى.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md border border-slate-200 bg-white">
        <div className="p-8">
          {/* Brand with big logo only */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 md:w-28 md:h-28 mb-4">
                <Image
                  src="/apple-icon.png"
                  alt="شعار المنصة التعليمية"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-slate-700 text-sm md:text-base">
              {isLogin ? "مرحباً بعودتك إلى نظام التعليم الإلكتروني" : "أنشئ حساباً وابدأ رحلتك التعليمية"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-slate-800">
                  <User className="w-4 h-4" />
                  الاسم الكامل
                </label>
                <Input
                  type="text"
                  placeholder="اسمك"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white border-slate-300 text-slate-900 focus:border-[#1D96D3] focus:ring-[#1D96D3]/30"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2 text-slate-800">
                <Mail className="w-4 h-4" />
                البريد الإلكتروني
              </label>
              <Input
                type="email"
                placeholder="your@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white border-slate-300 text-slate-900 focus:border-[#1D96D3] focus:ring-[#1D96D3]/30"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items.center gap-2 text-slate-800">
                <Lock className="w-4 h-4" />
                كلمة المرور
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-white border-slate-300 text-slate-900 focus:border-[#1D96D3] focus:ring-[#1D96D3]/30 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-slate-800">
                  <Lock className="w-4 h-4" />
                  تأكيد كلمة المرور
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="bg-white border-slate-300 text-slate-900 focus:border-[#1D96D3] focus:ring-[#1D96D3]/30"
                />
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 border border-red-300 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1D96D3] hover:bg-[#1877a8] text-white font-semibold py-2 h-11"
            >
              {loading ? "جاري المعالجة..." : isLogin ? "دخول" : "إنشاء حساب"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-700 text-sm">
              {isLogin ? "ليس لديك حساب؟" : "هل لديك حساب بالفعل؟"}
              <Link href={isLogin ? "/auth?type=signup" : "/auth?type=login"}>
                <button className="text-[#3F1F8C] hover:text-[#1D96D3] font-semibold mr-1">
                  {isLogin ? "انضم الآن" : "تسجيل الدخول"}
                </button>
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
