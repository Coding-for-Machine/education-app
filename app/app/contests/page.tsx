"use client";

import Link from "next/link"
import { ArrowRight, Calendar, Clock, Trophy, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ContestsPage() {
  return (
    <div className="container py-10">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kodlash Musobaqalari</h1>
          <p className="text-muted-foreground mt-2">
            Dasturlash ko'nikmalaringizni sinab ko'ring va boshqa talabalar bilan raqobatlashing.
          </p>
        </div>

        <Tabs defaultValue="upcoming">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="upcoming">Kutilayotgan</TabsTrigger>
            <TabsTrigger value="active">Faol</TabsTrigger>
            <TabsTrigger value="past">O'tgan</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="space-y-6 pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingContests.map((contest, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="line-clamp-1">{contest.title}</CardTitle>
                      <Badge
                        variant="outline"
                        className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                      >
                        Kutilmoqda
                      </Badge>
                    </div>
                    <CardDescription>{contest.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Boshlanishi: {contest.startDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Davomiyligi: {contest.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                        <span>Qiyinchilik: {contest.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{contest.participants} ta ro'yxatdan o'tgan</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/contests/${contest.id}`}>
                        Batafsil <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="active" className="space-y-6 pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeContests.map((contest, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="line-clamp-1">{contest.title}</CardTitle>
                      <Badge
                        variant="outline"
                        className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                      >
                        Faol
                      </Badge>
                    </div>
                    <CardDescription>{contest.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Tugashi: {contest.endDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Qolgan vaqt: {contest.timeLeft}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                        <span>Qiyinchilik: {contest.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{contest.participants} ta ishtirokchi</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href={`/contests/${contest.id}/participate`}>
                        Ishtirok etish <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="past" className="space-y-6 pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pastContests.map((contest, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="line-clamp-1">{contest.title}</CardTitle>
                      <Badge variant="outline" className="bg-muted text-muted-foreground">
                        Tugagan
                      </Badge>
                    </div>
                    <CardDescription>{contest.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Tugagan sana: {contest.endDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                        <span>Qiyinchilik: {contest.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{contest.participants} ta ishtirokchi</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/contests/${contest.id}/results`}>
                        Natijalarni ko'rish <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

const upcomingContests = [
  {
    id: "frontend-challenge-2023",
    title: "Frontend Challenge 2023",
    description: "React va CSS yordamida responsive veb ilova yarating",
    startDate: "15 May, 2023",
    duration: "48 soat",
    difficulty: "O'rta",
    participants: 156,
  },
  {
    id: "algorithm-masters",
    title: "Algoritmlar ustalari",
    description: "Murakkab algoritmik masalalarga optimal yechimlar toping",
    startDate: "20 May, 2023",
    duration: "24 soat",
    difficulty: "Qiyin",
    participants: 89,
  },
  {
    id: "data-visualization",
    title: "Ma'lumotlarni vizualizatsiya qilish",
    description: "Berilgan ma'lumotlar asosida tushunarli vizualizatsiyalar yarating",
    startDate: "1 Iyun, 2023",
    duration: "72 soat",
    difficulty: "O'rta",
    participants: 112,
  },
]

const activeContests = [
  {
    id: "web-accessibility",
    title: "Veb qulaylik hackathon",
    description: "WCAG yo'riqnomalariga amal qilgan holda qulay veb komponentlar yarating",
    endDate: "8 May, 2023",
    timeLeft: "23 soat",
    difficulty: "O'rta",
    participants: 78,
  },
  {
    id: "javascript-challenge",
    title: "JavaScript kodlash musobaqasi",
    description: "Haqiqiy dunyo masalalari bilan JavaScript bilimingizni sinang",
    endDate: "10 May, 2023",
    timeLeft: "2 kun",
    difficulty: "Boshlang'ich",
    participants: 203,
  },
]

const pastContests = [
  {
    id: "css-battle",
    title: "CSS jangi 2023",
    description: "Faqat HTML va CSS yordamida murakkab dizaynlarni qayta yarating",
    endDate: "25 Aprel, 2023",
    difficulty: "O'rta",
    participants: 187,
  },
  {
    id: "fullstack-challenge",
    title: "Full Stack dasturlash musobaqasi",
    description: "Frontend va backend bilan to'liq veb ilova yarating",
    endDate: "15 Aprel, 2023",
    difficulty: "Qiyin",
    participants: 94,
  },
  {
    id: "debugging-contest",
    title: "Debugging musobaqasi",
    description: "Berilgan kodlardagi xatolarni toping va tuzating",
    endDate: "5 Aprel, 2023",
    difficulty: "Boshlang'ich",
    participants: 156,
  },
]