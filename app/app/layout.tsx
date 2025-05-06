import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Award, BookOpen, LayoutDashboard, User, Code } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "EduLearn Platformasi",
  description: "O'z tezoringizda o'rganish uchun keng qamrovli kurslar",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background">
              <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                  <BookOpen className="h-6 w-6" />
                  <span>EduLearn</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                  <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
                    Bosh sahifa
                  </Link>
                  <Link href="/courses" className="text-sm font-medium hover:underline underline-offset-4">
                    Kurslar
                  </Link>
                  <Link href="/contests" className="text-sm font-medium hover:underline underline-offset-4">
                    Musobaqalar
                  </Link>
                  <Link href="/problems" className="text-sm font-medium hover:underline underline-offset-4">
                    Masalalar
                  </Link>
                  <Link href="/certificates" className="text-sm font-medium hover:underline underline-offset-4">
                    Sertifikatlar
                  </Link>
                  <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
                    Biz haqimizda
                  </Link>
                </nav>
                <div className="flex items-center gap-2">
                  <Link href="/profile">
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Profil</span>
                    </Button>
                  </Link>
                  <Link href="/statistics">
                    <Button variant="ghost" size="icon">
                      <LayoutDashboard className="h-5 w-5" />
                      <span className="sr-only">Statistika</span>
                    </Button>
                  </Link>
                  <Link href="/certificates">
                    <Button variant="ghost" size="icon">
                      <Award className="h-5 w-5" />
                      <span className="sr-only">Sertifikatlar</span>
                    </Button>
                  </Link>
                  <Link href="/problems">
                    <Button variant="ghost" size="icon">
                      <Code className="h-5 w-5" />
                      <span className="sr-only">Masalalar</span>
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" size="sm">
                      Kirish
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm">Ro'yxatdan o'tish</Button>
                  </Link>
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t py-6 md:py-8">
              <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span className="text-sm font-medium">EduLearn © 2023</span>
                </div>
                <nav className="flex items-center gap-4 text-sm">
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Shartlar
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Maxfiylik
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Cookie-fayllar
                  </Link>
                </nav>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}