"use client";

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, CheckCircle, Clock, Users } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Animatsiya variantlari
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Asosiy bo'lim */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial="hidden"
            animate="show"
            variants={container}
            className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
          >
            <motion.div variants={item} className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                >
                  O'zingizning sur'atingizda o'rganing
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="max-w-[600px] text-muted-foreground md:text-xl"
                >
                  Yangi ko'nikmalarni egallash va karyerangizni rivojlantirish uchun mo'ljallangan kurslarimizni kashf eting.
                </motion.p>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col gap-2 min-[400px]:flex-row"
              >
                <Link href="/courses">
                  <Button size="lg" className="gap-1 hover:scale-105 transition-transform">
                    Kurslarni ko'rish <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="lg" variant="outline" className="hover:scale-105 transition-transform">
                    Bepul ro'yxatdan o'tish
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center justify-center"
            >
              <Image
                src="/placeholder.svg?height=400&width=500"
                width={500}
                height={400}
                alt="Asosiy rasm"
                className="rounded-lg object-cover shadow-xl hover:shadow-2xl transition-shadow duration-300"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tanlangan kurslar */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="show"
            variants={container}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <motion.div variants={item} className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Tanlangan Kurslar
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Eng mashhur kurslarimizni kashf eting va o'rganish safaringizni boshlang.
              </p>
            </motion.div>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="show"
            variants={container}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          >
            {featuredCourses.map((course) => (
              <motion.div variants={item} key={course.id}>
                <Link href={`/courses/${course.id}`} className="group">
                  <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="object-cover transition-transform group-hover:scale-110 duration-500"
                        fill
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span>{course.lessons} dars</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="gap-1 w-full group-hover:text-primary">
                        Kursni ko'rish <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center mt-8"
          >
            <Link href="/courses">
              <Button variant="outline" size="lg" className="hover:scale-105 transition-transform">
                Barcha kurslarni ko'rish
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Afzalliklar */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="show"
            variants={container}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <motion.div variants={item} className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Nima uchun bizni tanlashadi?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Platformamiz sizning ehtiyojlaringizga moslashtirilgan noyob o'rganish tajribasini taklif etadi.
              </p>
            </motion.div>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="show"
            variants={container}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
          >
            {features.map((feature, index) => (
              <motion.div 
                variants={item}
                key={index}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="bg-background hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <motion.div 
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="p-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2"
                    >
                      {feature.icon}
                    </motion.div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Chaqiruv */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-950 dark:to-teal-950">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="show"
            variants={container}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <motion.div variants={item} className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                O'rganishga tayyormisiz?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Platformamizda o'rganayotgan minglab talabalar qatoriga qo'shiling.
              </p>
            </motion.div>
            <motion.div 
              variants={item}
              className="flex flex-col gap-2 min-[400px]:flex-row"
            >
              <Link href="/signup">
                <Button size="lg" className="gap-1 hover:scale-105 transition-transform">
                  Boshlash <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button size="lg" variant="outline" className="hover:scale-105 transition-transform">
                  Kurslarni ko'rish
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

const featuredCourses = [
  {
    id: "web-development",
    title: "Web Dasturlash Asoslari",
    description: "Zamonaviy veb-saytlar qurish uchun HTML, CSS va JavaScript asoslarini o'rganing.",
    image: "/placeholder.svg?height=200&width=350",
    duration: "8 hafta",
    lessons: 24,
  },
  {
    id: "data-science",
    title: "Ma'lumotlar Tahliliga Kirish",
    description: "Ma'lumotlarni tahlil qilish va vizualizatsiya qilish asoslarini egallang.",
    image: "/placeholder.svg?height=200&width=350",
    duration: "10 hafta",
    lessons: 32,
  },
  {
    id: "mobile-app",
    title: "Mobil Ilovalarni Ishlab Chiqish",
    description: "React Native yordamida platformalararo mobil ilovalar yarating.",
    image: "/placeholder.svg?height=200&width=350",
    duration: "12 hafta",
    lessons: 36,
  },
]

const features = [
  {
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
    title: "Mutaxassis O'qituvchilar",
    description: "O'z sohalarida yillik tajribaga ega bo'lgan mutaxassislardan o'rganing.",
  },
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
    title: "Moslashuvchan O'rganish",
    description: "Kurs materiallariga umrbod kirish imkoniyati bilan o'zingizning sur'atingizda o'rganing.",
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Jamiyat Qo'llabi-quvvatlash",
    description: "O'rganuvchilar jamiyatiga qo'shiling va kerak bo'lganda yordam oling.",
  },
]