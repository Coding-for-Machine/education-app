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
  title: "EduLearn Platform",
  description: "Learn at your own pace with our comprehensive courses",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
                    Home
                  </Link>
                  <Link href="/courses" className="text-sm font-medium hover:underline underline-offset-4">
                    Courses
                  </Link>
                  <Link href="/contests" className="text-sm font-medium hover:underline underline-offset-4">
                    Contests
                  </Link>
                  <Link href="/problems" className="text-sm font-medium hover:underline underline-offset-4">
                    Problems
                  </Link>
                  <Link href="/certificates" className="text-sm font-medium hover:underline underline-offset-4">
                    Certificates
                  </Link>
                  <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
                    About
                  </Link>
                </nav>
                <div className="flex items-center gap-2">
                  <Link href="/profile">
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Profile</span>
                    </Button>
                  </Link>
                  <Link href="/statistics">
                    <Button variant="ghost" size="icon">
                      <LayoutDashboard className="h-5 w-5" />
                      <span className="sr-only">Statistics</span>
                    </Button>
                  </Link>
                  <Link href="/certificates">
                    <Button variant="ghost" size="icon">
                      <Award className="h-5 w-5" />
                      <span className="sr-only">Certificates</span>
                    </Button>
                  </Link>
                  <Link href="/problems">
                    <Button variant="ghost" size="icon">
                      <Code className="h-5 w-5" />
                      <span className="sr-only">Problems</span>
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" size="sm">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm">Sign up</Button>
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
                    Terms
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Cookies
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
