"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Search,
  SlidersHorizontal,
  Tag,
  BarChart,
  Code,
  ListFilter,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

export default function ProblemsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesDifficulty = !difficultyFilter || problem.difficulty === difficultyFilter
    const matchesCategory = !categoryFilter || problem.tags.includes(categoryFilter)
    const matchesStatus = !statusFilter || problem.status === statusFilter

    return matchesSearch && matchesDifficulty && matchesCategory && matchesStatus
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
  }

  const resetFilters = () => {
    setDifficultyFilter(null)
    setCategoryFilter(null)
    setStatusFilter(null)
  }

  return (
    <div className="container py-10">
      <motion.div className="space-y-8" initial="hidden" animate={isLoaded ? "show" : "hidden"} variants={container}>
        <motion.div variants={fadeIn} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent pb-1">
              Coding Problems
            </h1>
            <p className="text-muted-foreground mt-2">Solve algorithmic challenges to improve your coding skills</p>
          </div>
          <div className="flex gap-2">
            <Button asChild className="gap-2">
              <Link href="/problems/random">
                <Code className="h-4 w-4" /> Random Problem
              </Link>
            </Button>
            <Button variant="outline" asChild className="gap-2">
              <Link href="/problems/submissions">
                <ListFilter className="h-4 w-4" /> My Submissions
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="flex flex-col md:flex-row gap-4 items-start">
          <div className="relative flex w-full md:max-w-md items-center">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search problems by title or tag..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter
                  {(difficultyFilter || categoryFilter || statusFilter) && (
                    <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                      {[difficultyFilter, categoryFilter, statusFilter].filter(Boolean).length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter Problems</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuLabel className="text-xs">Difficulty</DropdownMenuLabel>
                <DropdownMenuItem
                  className={!difficultyFilter ? "bg-muted/50" : ""}
                  onClick={() => setDifficultyFilter(null)}
                >
                  All Difficulties
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={difficultyFilter === "Easy" ? "bg-muted/50" : ""}
                  onClick={() => setDifficultyFilter("Easy")}
                >
                  Easy
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={difficultyFilter === "Medium" ? "bg-muted/50" : ""}
                  onClick={() => setDifficultyFilter("Medium")}
                >
                  Medium
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={difficultyFilter === "Hard" ? "bg-muted/50" : ""}
                  onClick={() => setDifficultyFilter("Hard")}
                >
                  Hard
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuLabel className="text-xs">Status</DropdownMenuLabel>
                <DropdownMenuItem className={!statusFilter ? "bg-muted/50" : ""} onClick={() => setStatusFilter(null)}>
                  All Statuses
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={statusFilter === "Solved" ? "bg-muted/50" : ""}
                  onClick={() => setStatusFilter("Solved")}
                >
                  Solved
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={statusFilter === "Attempted" ? "bg-muted/50" : ""}
                  onClick={() => setStatusFilter("Attempted")}
                >
                  Attempted
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={statusFilter === "Todo" ? "bg-muted/50" : ""}
                  onClick={() => setStatusFilter("Todo")}
                >
                  Todo
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={resetFilters}>Reset All Filters</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Tag className="h-4 w-4" />
                  Topics
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Problem Topics</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className={!categoryFilter ? "bg-muted/50" : ""}
                  onClick={() => setCategoryFilter(null)}
                >
                  All Topics
                </DropdownMenuItem>
                {Array.from(new Set(problems.flatMap((p) => p.tags)))
                  .sort()
                  .map((tag) => (
                    <DropdownMenuItem
                      key={tag}
                      className={categoryFilter === tag ? "bg-muted/50" : ""}
                      onClick={() => setCategoryFilter(tag)}
                    >
                      {tag}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        <motion.div variants={fadeIn}>
          <Tabs defaultValue="table" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="cards">Card View</TabsTrigger>
            </TabsList>
            <TabsContent value="table" className="pt-6">
              <Card className="border-none shadow-md">
                <CardContent className="p-0">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">Status</TableHead>
                          <TableHead className="w-[50px]">#</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead className="w-[100px]">Difficulty</TableHead>
                          <TableHead className="w-[100px]">Acceptance</TableHead>
                          <TableHead className="hidden md:table-cell">Tags</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProblems.map((problem, index) => (
                          <TableRow key={problem.id} className="group">
                            <TableCell>
                              {problem.status === "Solved" ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : problem.status === "Attempted" ? (
                                <Clock className="h-5 w-5 text-yellow-500" />
                              ) : (
                                <div className="h-5 w-5" />
                              )}
                            </TableCell>
                            <TableCell className="font-medium">{problem.id}</TableCell>
                            <TableCell>
                              <Link
                                href={`/problems/${problem.id}`}
                                className="font-medium hover:text-primary transition-colors"
                              >
                                {problem.title}
                              </Link>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  problem.difficulty === "Easy"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                    : problem.difficulty === "Medium"
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                }
                              >
                                {problem.difficulty}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress
                                  value={problem.acceptanceRate}
                                  className="h-2 w-16"
                                  indicatorClassName={
                                    problem.acceptanceRate > 70
                                      ? "bg-green-500"
                                      : problem.acceptanceRate > 40
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }
                                />
                                <span className="text-xs">{problem.acceptanceRate}%</span>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="flex flex-wrap gap-1">
                                {problem.tags.slice(0, 3).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {problem.tags.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{problem.tags.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="cards" className="pt-6">
              <motion.div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredProblems.map((problem) => (
                  <motion.div key={problem.id} variants={item} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                    <Card className="overflow-hidden h-full border-none shadow-md hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base flex items-center gap-2">
                            <span className="text-muted-foreground font-normal">#{problem.id}</span>
                            {problem.title}
                          </CardTitle>
                          {problem.status === "Solved" ? (
                            <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                          ) : problem.status === "Attempted" ? (
                            <Clock className="h-5 w-5 text-yellow-500 shrink-0" />
                          ) : null}
                        </div>
                        <CardDescription className="line-clamp-2">{problem.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex flex-wrap gap-1 mb-3">
                          {problem.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <Badge
                            variant="outline"
                            className={
                              problem.difficulty === "Easy"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : problem.difficulty === "Medium"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            }
                          >
                            {problem.difficulty}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Acceptance:</span>
                            <span className="text-xs font-medium">{problem.acceptanceRate}%</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full gap-1 group" asChild>
                          <Link href={`/problems/${problem.id}`}>
                            Solve Problem{" "}
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div variants={fadeIn} className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Showing {filteredProblems.length} of {problems.length} problems
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="bg-muted/50 rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Your Problem Solving Progress</h3>
              <p className="text-muted-foreground mb-4">
                Track your progress and improve your coding skills by solving more problems.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-md text-center">
                  <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                    {problems.filter((p) => p.status === "Solved").length}
                  </div>
                  <div className="text-xs text-green-800 dark:text-green-500">Solved</div>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-md text-center">
                  <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                    {problems.filter((p) => p.status === "Attempted").length}
                  </div>
                  <div className="text-xs text-yellow-800 dark:text-yellow-500">Attempted</div>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-md text-center">
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                    {problems.filter((p) => p.status === "Todo").length}
                  </div>
                  <div className="text-xs text-blue-800 dark:text-blue-500">Todo</div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-40 h-40 relative">
                <BarChart className="w-full h-full text-muted-foreground/30" />
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    {Math.round((problems.filter((p) => p.status === "Solved").length / problems.length) * 100)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Completion</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

const problems = [
  {
    id: 1,
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: "Easy",
    acceptanceRate: 48,
    tags: ["Array", "Hash Table"],
    status: "Solved",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
  },
  {
    id: 2,
    title: "Add Two Numbers",
    description:
      "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
    difficulty: "Medium",
    acceptanceRate: 38,
    tags: ["Linked List", "Math", "Recursion"],
    status: "Attempted",
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807.",
      },
    ],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 <= Node.val <= 9",
      "It is guaranteed that the list represents a number that does not have leading zeros.",
    ],
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    difficulty: "Medium",
    acceptanceRate: 33,
    tags: ["Hash Table", "String", "Sliding Window"],
    status: "Todo",
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.',
      },
    ],
    constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    description:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    difficulty: "Hard",
    acceptanceRate: 35,
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    status: "Todo",
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2.",
      },
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6",
    ],
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    description: "Given a string s, return the longest palindromic substring in s.",
    difficulty: "Medium",
    acceptanceRate: 31,
    tags: ["String", "Dynamic Programming"],
    status: "Solved",
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" is also a valid answer.',
      },
    ],
    constraints: ["1 <= s.length <= 1000", "s consist of only digits and English letters."],
  },
  {
    id: 6,
    title: "ZigZag Conversion",
    description:
      'The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)',
    difficulty: "Medium",
    acceptanceRate: 42,
    tags: ["String"],
    status: "Todo",
    examples: [
      {
        input: 's = "PAYPALISHIRING", numRows = 3',
        output: '"PAHNAPLSIIGYIR"',
        explanation: "P   A   H   N\nA P L S I I G\nY   I   R",
      },
    ],
    constraints: [
      "1 <= s.length <= 1000",
      "s consists of English letters (lower-case and upper-case), ',' and '.'.",
      "1 <= numRows <= 1000",
    ],
  },
  {
    id: 7,
    title: "Reverse Integer",
    description:
      "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.",
    difficulty: "Medium",
    acceptanceRate: 26,
    tags: ["Math"],
    status: "Solved",
    examples: [
      {
        input: "x = 123",
        output: "321",
      },
    ],
    constraints: ["-2^31 <= x <= 2^31 - 1"],
  },
  {
    id: 8,
    title: "String to Integer (atoi)",
    description:
      "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function).",
    difficulty: "Medium",
    acceptanceRate: 16,
    tags: ["String", "Math"],
    status: "Todo",
    examples: [
      {
        input: 's = "42"',
        output: "42",
        explanation:
          'The underlined characters are what is read in, the caret is the current reader position.\nStep 1: "42" (no characters read because there is no leading whitespace)\n         ^\nStep 2: "42" (no characters read because there is neither a \'-\' nor \'+\')\n         ^\nStep 3: "42" ("42" is read in)\n           ^\nThe parsed integer is 42.\nSince 42 is in the range [-2^31, 2^31 - 1], the final result is 42.',
      },
    ],
    constraints: [
      "0 <= s.length <= 200",
      "s consists of English letters (lower-case and upper-case), digits (0-9), ' ', '+', '-', and '.'.",
    ],
  },
  {
    id: 9,
    title: "Palindrome Number",
    description:
      "Given an integer x, return true if x is palindrome integer. An integer is a palindrome when it reads the same backward as forward.",
    difficulty: "Easy",
    acceptanceRate: 52,
    tags: ["Math"],
    status: "Solved",
    examples: [
      {
        input: "x = 121",
        output: "true",
        explanation: "121 reads as 121 from left to right and from right to left.",
      },
    ],
    constraints: ["-2^31 <= x <= 2^31 - 1"],
  },
  {
    id: 10,
    title: "Regular Expression Matching",
    description:
      "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where: '.' Matches any single character. '*' Matches zero or more of the preceding element.",
    difficulty: "Hard",
    acceptanceRate: 28,
    tags: ["String", "Dynamic Programming", "Recursion"],
    status: "Todo",
    examples: [
      {
        input: 's = "aa", p = "a"',
        output: "false",
        explanation: '"a" does not match the entire string "aa".',
      },
    ],
    constraints: [
      "1 <= s.length <= 20",
      "1 <= p.length <= 30",
      "s contains only lowercase English letters.",
      "p contains only lowercase English letters, '.', and '*'.",
      "It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.",
    ],
  },
  {
    id: 11,
    title: "Container With Most Water",
    description:
      "Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.",
    difficulty: "Medium",
    acceptanceRate: 54,
    tags: ["Array", "Two Pointers", "Greedy"],
    status: "Attempted",
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation:
          "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.",
      },
    ],
    constraints: ["n == height.length", "2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
  },
  {
    id: 12,
    title: "Integer to Roman",
    description:
      "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M. Given an integer, convert it to a roman numeral.",
    difficulty: "Medium",
    acceptanceRate: 59,
    tags: ["Hash Table", "Math", "String"],
    status: "Todo",
    examples: [
      {
        input: "num = 3",
        output: '"III"',
        explanation: "3 is represented as 3 ones.",
      },
    ],
    constraints: ["1 <= num <= 3999"],
  },
  {
    id: 13,
    title: "Roman to Integer",
    description:
      "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M. Given a roman numeral, convert it to an integer.",
    difficulty: "Easy",
    acceptanceRate: 57,
    tags: ["Hash Table", "Math", "String"],
    status: "Solved",
    examples: [
      {
        input: 's = "III"',
        output: "3",
        explanation: "III = 3.",
      },
    ],
    constraints: [
      "1 <= s.length <= 15",
      "s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').",
      "It is guaranteed that s is a valid roman numeral in the range [1, 3999].",
    ],
  },
  {
    id: 14,
    title: "Longest Common Prefix",
    description:
      'Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string "".',
    difficulty: "Easy",
    acceptanceRate: 39,
    tags: ["String", "Trie"],
    status: "Todo",
    examples: [
      {
        input: 'strs = ["flower","flow","flight"]',
        output: '"fl"',
        explanation: 'The longest common prefix is "fl".',
      },
    ],
    constraints: [
      "1 <= strs.length <= 200",
      "0 <= strs[i].length <= 200",
      "strs[i] consists of only lowercase English letters.",
    ],
  },
  {
    id: 15,
    title: "3Sum",
    description:
      "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
    difficulty: "Medium",
    acceptanceRate: 32,
    tags: ["Array", "Two Pointers", "Sorting"],
    status: "Attempted",
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
        explanation: "The triplets that sum to zero are [-1,-1,2] and [-1,0,1].",
      },
    ],
    constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
  },
]
