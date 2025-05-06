"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  ExternalLink,
  Heart,
  Play,
  RefreshCw,
  Save,
  Share2,
  ThumbsDown,
  ThumbsUp,
  XCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ProblemPage({ params }: { params: { problemId: string } }) {
  const [code, setCode] = useState(`function solution(nums, target) {
  // Your code here
  
}`)
  const [language, setLanguage] = useState("javascript")
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testResults, setTestResults] = useState<null | {
    passed: boolean
    message: string
    time: string
    memory: string
  }>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const editorRef = useRef<HTMLTextAreaElement>(null)

  // In a real app, you would fetch the problem data based on the problemId
  const problem = problems.find((p) => p.id.toString() === params.problemId) || problems[0]

  useEffect(() => {
    setIsLoaded(true)

    // Set initial code based on the problem
    if (problem.id === 1) {
      // Two Sum
      setCode(`function twoSum(nums, target) {
  // Your solution here
  
}`)
    } else if (problem.id === 2) {
      // Add Two Numbers
      setCode(`/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function addTwoNumbers(l1, l2) {
  // Your solution here
  
}`)
    }
  }, [problem.id])

  const handleRunCode = () => {
    setIsRunning(true)
    setTestResults(null)

    // Simulate code execution with a delay
    setTimeout(() => {
      setIsRunning(false)

      // Mock test results
      if ((problem.id === 1 && code.includes("return [0, 1]")) || code.includes("return [0,1]")) {
        setTestResults({
          passed: true,
          message: "All test cases passed!",
          time: "56 ms",
          memory: "42.1 MB",
        })
      } else {
        setTestResults({
          passed: false,
          message: "Failed test case: nums = [2,7,11,15], target = 9",
          time: "N/A",
          memory: "N/A",
        })
      }
    }, 1500)
  }

  const handleSubmitCode = () => {
    setIsSubmitting(true)
    setTestResults(null)

    // Simulate code submission with a delay
    setTimeout(() => {
      setIsSubmitting(false)

      // Mock submission results
      if ((problem.id === 1 && code.includes("return [0, 1]")) || code.includes("return [0,1]")) {
        setTestResults({
          passed: true,
          message: "All test cases passed! Your solution beats 85% of submissions.",
          time: "56 ms",
          memory: "42.1 MB",
        })
      } else {
        setTestResults({
          passed: false,
          message: "Failed test case: nums = [2,7,11,15], target = 9",
          time: "N/A",
          memory: "N/A",
        })
      }
    }, 2000)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <div className="container py-10">
      <motion.div className="space-y-6" initial="hidden" animate={isLoaded ? "show" : "hidden"} variants={container}>
        <motion.div variants={item} className="flex items-center justify-between">
          <Link
            href="/problems"
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Problems
          </Link>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Heart className="h-4 w-4 text-muted-foreground hover:text-red-500 transition-colors" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to favorites</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Share2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share problem</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div variants={item} className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                  <span className="text-muted-foreground font-normal">#{problem.id}</span>
                  {problem.title}
                </h1>
                <div className="flex items-center gap-2 mt-2">
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
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span>{problem.acceptanceRate}%</span>
                  </div>
                </div>
              </div>
              {problem.status === "Solved" ? (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Solved</Badge>
              ) : problem.status === "Attempted" ? (
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                  Attempted
                </Badge>
              ) : null}
            </div>

            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p>{problem.description}</p>
                </div>

                <Accordion type="single" collapsible className="mt-6">
                  <AccordionItem value="examples">
                    <AccordionTrigger>Examples</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        {problem.examples.map((example, index) => (
                          <div key={index} className="bg-muted/50 p-4 rounded-md">
                            <div className="font-mono text-sm">
                              <div className="mb-2">
                                <span className="font-semibold">Input:</span> {example.input}
                              </div>
                              <div className="mb-2">
                                <span className="font-semibold">Output:</span> {example.output}
                              </div>
                              {example.explanation && (
                                <div>
                                  <span className="font-semibold">Explanation:</span> {example.explanation}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="constraints">
                    <AccordionTrigger>Constraints</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {problem.constraints.map((constraint, index) => (
                          <li key={index} className="font-mono text-sm">
                            {constraint}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="hints">
                    <AccordionTrigger>Hints</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowHint(!showHint)}
                          className="w-full justify-between"
                        >
                          <span>Hint 1: Think about using a hash map</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${showHint ? "rotate-180" : ""}`} />
                        </Button>

                        {showHint && (
                          <div className="bg-muted/50 p-4 rounded-md mt-2 text-sm">
                            <p>
                              You can use a hash map to store the numbers you've seen so far. For each number, check if
                              the target minus the current number exists in the hash map. If it does, you've found a
                              solution.
                            </p>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <ThumbsUp className="h-4 w-4" /> Helpful
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <ThumbsDown className="h-4 w-4" /> Not Helpful
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <Link href="#" className="hover:underline flex items-center gap-1">
                  <ExternalLink className="h-3.5 w-3.5" /> Related Problems
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                  </SelectContent>
                </Select>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="h-9 w-9" onClick={handleCopyCode}>
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{copied ? "Copied!" : "Copy code"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="h-9 w-9">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Reset code</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1" onClick={handleRunCode} disabled={isRunning}>
                  <Play className="h-4 w-4" />
                  {isRunning ? "Running..." : "Run Code"}
                </Button>
                <Button size="sm" className="gap-1" onClick={handleSubmitCode} disabled={isSubmitting}>
                  <Save className="h-4 w-4" />
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </div>

            <Card className="border-none shadow-md">
              <CardContent className="p-0">
                <div className="relative">
                  <Textarea
                    ref={editorRef}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="font-mono text-sm min-h-[400px] resize-none p-4 rounded-md focus-visible:ring-1 focus-visible:ring-primary"
                  />
                  <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                    {code.split("\n").length} lines
                  </div>
                </div>
              </CardContent>
            </Card>

            {testResults && (
              <Card
                className={`border-none shadow-md ${testResults.passed ? "bg-green-50 dark:bg-green-950/20" : "bg-red-50 dark:bg-red-950/20"}`}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    {testResults.passed ? (
                      <>
                        <Check className="h-5 w-5 text-green-500" />
                        <span className="text-green-700 dark:text-green-400">Success!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-500" />
                        <span className="text-red-700 dark:text-red-400">Failed</span>
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className={
                      testResults.passed ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
                    }
                  >
                    {testResults.message}
                  </p>

                  {testResults.passed && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="bg-background/50 p-3 rounded-md">
                        <div className="text-xs text-muted-foreground mb-1">Runtime</div>
                        <div className="font-medium">{testResults.time}</div>
                        <div className="text-xs text-muted-foreground mt-1">Beats 75% of submissions</div>
                      </div>
                      <div className="bg-background/50 p-3 rounded-md">
                        <div className="text-xs text-muted-foreground mb-1">Memory</div>
                        <div className="font-medium">{testResults.memory}</div>
                        <div className="text-xs text-muted-foreground mt-1">Beats 62% of submissions</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>

        <motion.div variants={fadeIn} className="bg-muted/50 rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Similar Problems</h3>
              <div className="space-y-2">
                {problems
                  .filter((p) => p.id !== problem.id && p.tags.some((tag) => problem.tags.includes(tag)))
                  .slice(0, 3)
                  .map((p) => (
                    <Link
                      key={p.id}
                      href={`/problems/${p.id}`}
                      className="flex items-center justify-between p-2 hover:bg-muted rounded-md transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">#{p.id}</span>
                        <span>{p.title}</span>
                        <Badge
                          variant="outline"
                          className={
                            p.difficulty === "Easy"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : p.difficulty === "Medium"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }
                        >
                          {p.difficulty}
                        </Badge>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-background p-4 rounded-lg shadow-sm w-full max-w-xs">
                <h4 className="font-medium mb-2">Your Progress</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Easy</span>
                      <span className="text-muted-foreground">2/4 solved</span>
                    </div>
                    <Progress value={50} className="h-2" indicatorClassName="bg-green-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Medium</span>
                      <span className="text-muted-foreground">3/6 solved</span>
                    </div>
                    <Progress value={50} className="h-2" indicatorClassName="bg-yellow-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Hard</span>
                      <span className="text-muted-foreground">0/2 solved</span>
                    </div>
                    <Progress value={0} className="h-2" indicatorClassName="bg-red-500" />
                  </div>
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
]
