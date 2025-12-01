import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "نظام التعليم الإلكتروني السحابي",
  description: "منصة تعليم إلكتروني سحابي للطلاب والطالبات.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={
          `${geist.className} antialiased ` +
          // الخلفية الأساسية المتدرجة (الأخضر + الأزرق الفاتح + البنفسجي الغامق)
          "bg-gradient-to-br from-[#97C945] via-[#1D96D3] to-[#3F1F8C]"
        }
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
