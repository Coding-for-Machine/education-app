"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle, Clock, Code, Search, SlidersHorizontal, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SubmissionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch = submission.problem.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !statusFilter || submission.status === statusFilter

    return matchesSearch && matchesStatus
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

  return (
    <div className="container py-10">
      <motion.div className="space-y-8" initial="hidden" animate={isLoaded ? "show" : "hidden"} variants={container}>
        <motion.div variants={fadeIn} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/problems"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Problems
            </Link>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent pb-1">
              My Submissions
            </h1>
          </div>
          <Button asChild className="gap-2">
            <Link href="/problems">
              <Code className="h-4 w-4" /> Solve Problems
            </Link>
          </Button>
        </motion.div>

        <motion.div variants={fadeIn} className="flex flex-col md:flex-row gap-4 items-start">
          <div className="relative flex w-full md:max-w-md items-center">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search submissions by problem..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filter
                {statusFilter && <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">1</Badge>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter Submissions</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuLabel className="text-xs">Status</DropdownMenuLabel>
              <DropdownMenuItem className={!statusFilter ? "bg-muted/50" : ""} onClick={() => setStatusFilter(null)}>
                All Statuses
              </DropdownMenuItem>
              <DropdownMenuItem
                className={statusFilter === "Accepted" ? "bg-muted/50" : ""}
                onClick={() => setStatusFilter("Accepted")}
              >
                Accepted
              </DropdownMenuItem>
              <DropdownMenuItem
                className={statusFilter === "Wrong Answer" ? "bg-muted/50" : ""}
                onClick={() => setStatusFilter("Wrong Answer")}
              >
                Wrong Answer
              </DropdownMenuItem>
              <DropdownMenuItem
                className={statusFilter === "Time Limit Exceeded" ? "bg-muted/50" : ""}
                onClick={() => setStatusFilter("Time Limit Exceeded")}
              >
                Time Limit Exceeded
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => setStatusFilter(null)}>Reset All Filters</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        <motion.div variants={fadeIn}>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="all">All Submissions</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="pt-6">
              <Card className="border-none shadow-md">
                <CardContent className="p-0">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">Status</TableHead>
                          <TableHead>Problem</TableHead>
                          <TableHead className="w-[100px]">Language</TableHead>
                          <TableHead className="w-[100px]">Runtime</TableHead>
                          <TableHead className="w-[100px]">Memory</TableHead>
                          <TableHead className="hidden md:table-cell">Submitted</TableHead>
                          <TableHead className="w-[80px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSubmissions.map((submission, index) => (
                          <TableRow key={index} className="group">
                            <TableCell>
                              {submission.status === "Accepted" ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : submission.status === "Wrong Answer" ? (
                                <XCircle className="h-5 w-5 text-red-500" />
                              ) : (
                                <Clock className="h-5 w-5 text-yellow-500" />
                              )}
                            </TableCell>
                            <TableCell>
                              <Link
                                href={`/problems/${submission.problem.id}`}
                                className="font-medium hover:text-primary transition-colors"
                              >
                                {submission.problem.title}
                              </Link>
                            </TableCell>
                            <TableCell>{submission.language}</TableCell>
                            <TableCell>{submission.runtime}</TableCell>
                            <TableCell>{submission.memory}</TableCell>
                            <TableCell className="hidden md:table-cell text-muted-foreground">
                              {submission.submittedAt}
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/problems/submissions/${index + 1}`}>View</Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="accepted" className="pt-6">
              <Card className="border-none shadow-md">
                <CardContent className="p-0">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">Status</TableHead>
                          <TableHead>Problem</TableHead>
                          <TableHead className="w-[100px]">Language</TableHead>
                          <TableHead className="w-[100px]">Runtime</TableHead>
                          <TableHead className="w-[100px]">Memory</TableHead>
                          <TableHead className="hidden md:table-cell">Submitted</TableHead>
                          <TableHead className="w-[80px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSubmissions
                          .filter((s) => s.status === "Accepted")
                          .map((submission, index) => (
                            <TableRow key={index} className="group">
                              <TableCell>
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              </TableCell>
                              <TableCell>
                                <Link
                                  href={`/problems/${submission.problem.id}`}
                                  className="font-medium hover:text-primary transition-colors"
                                >
                                  {submission.problem.title}
                                </Link>
                              </TableCell>
                              <TableCell>{submission.language}</TableCell>
                              <TableCell>{submission.runtime}</TableCell>
                              <TableCell>{submission.memory}</TableCell>
                              <TableCell className="hidden md:table-cell text-muted-foreground">
                                {submission.submittedAt}
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" asChild>
                                  <Link href={`/problems/submissions/${index + 1}`}>View</Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="failed" className="pt-6">
              <Card className="border-none shadow-md">
                <CardContent className="p-0">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">Status</TableHead>
                          <TableHead>Problem</TableHead>
                          <TableHead className="w-[100px]">Language</TableHead>
                          <TableHead className="w-[100px]">Runtime</TableHead>
                          <TableHead className="w-[100px]">Memory</TableHead>
                          <TableHead className="hidden md:table-cell">Submitted</TableHead>
                          <TableHead className="w-[80px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSubmissions
                          .filter((s) => s.status !== "Accepted")
                          .map((submission, index) => (
                            <TableRow key={index} className="group">
                              <TableCell>
                                {submission.status === "Wrong Answer" ? (
                                  <XCircle className="h-5 w-5 text-red-500" />
                                ) : (
                                  <Clock className="h-5 w-5 text-yellow-500" />
                                )}
                              </TableCell>
                              <TableCell>
                                <Link
                                  href={`/problems/${submission.problem.id}`}
                                  className="font-medium hover:text-primary transition-colors"
                                >
                                  {submission.problem.title}
                                </Link>
                              </TableCell>
                              <TableCell>{submission.language}</TableCell>
                              <TableCell>{submission.runtime}</TableCell>
                              <TableCell>{submission.memory}</TableCell>
                              <TableCell className="hidden md:table-cell text-muted-foreground">
                                {submission.submittedAt}
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" asChild>
                                  <Link href={`/problems/submissions/${index + 1}`}>View</Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div variants={fadeIn} className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Showing {filteredSubmissions.length} of {submissions.length} submissions
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
      </motion.div>
    </div>
  )
}

const submissions = [
  {
    problem: { id: 1, title: "Two Sum" },
    status: "Accepted",
    language: "JavaScript",
    runtime: "56 ms",
    memory: "42.1 MB",
    submittedAt: "2023-05-01 14:32",
    code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
  },
  {
    problem: { id: 9, title: "Palindrome Number" },
    status: "Accepted",
    language: "JavaScript",
    runtime: "120 ms",
    memory: "48.3 MB",
    submittedAt: "2023-05-02 09:15",
    code: `function isPalindrome(x) {
  if (x < 0) return false;
  
  const str = x.toString();
  let left = 0;
  let right = str.length - 1;
  
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  
  return true;
}`,
  },
  {
    problem: { id: 2, title: "Add Two Numbers" },
    status: "Wrong Answer",
    language: "JavaScript",
    runtime: "N/A",
    memory: "N/A",
    submittedAt: "2023-05-03 16:45",
    code: `function addTwoNumbers(l1, l2) {
  let dummyHead = new ListNode(0);
  let current = dummyHead;
  let carry = 0;
  
  while (l1 || l2) {
    let x = l1 ? l1.val : 0;
    let y = l2 ? l2.val : 0;
    let sum = x + y + carry;
    
    carry = Math.floor(sum / 10);
    current.next = new ListNode(sum % 10);
    current = current.next;
    
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }
  
  return dummyHead.next;
}`,
  },
  {
    problem: { id: 2, title: "Add Two Numbers" },
    status: "Accepted",
    language: "JavaScript",
    runtime: "95 ms",
    memory: "46.8 MB",
    submittedAt: "2023-05-03 17:20",
    code: `function addTwoNumbers(l1, l2) {
  let dummyHead = new ListNode(0);
  let current = dummyHead;
  let carry = 0;
  
  while (l1 || l2 || carry) {
    let x = l1 ? l1.val : 0;
    let y = l2 ? l2.val : 0;
    let sum = x + y + carry;
    
    carry = Math.floor(sum / 10);
    current.next = new ListNode(sum % 10);
    current = current.next;
    
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }
  
  return dummyHead.next;
}`,
  },
  {
    problem: { id: 3, title: "Longest Substring Without Repeating Characters" },
    status: "Time Limit Exceeded",
    language: "JavaScript",
    runtime: "N/A",
    memory: "N/A",
    submittedAt: "2023-05-04 11:10",
    code: `function lengthOfLongestSubstring(s) {
  let maxLength = 0;
  
  for (let i = 0; i < s.length; i++) {
    const seen = new Set();
    for (let j = i; j < s.length; j++) {
      if (seen.has(s[j])) {
        break;
      }
      seen.add(s[j]);
      maxLength = Math.max(maxLength, j - i + 1);
    }
  }
  
  return maxLength;
}`,
  },
  {
    problem: { id: 3, title: "Longest Substring Without Repeating Characters" },
    status: "Accepted",
    language: "JavaScript",
    runtime: "72 ms",
    memory: "45.2 MB",
    submittedAt: "2023-05-04 11:35",
    code: `function lengthOfLongestSubstring(s) {
  let maxLength = 0;
  let left = 0;
  const charMap = new Map();
  
  for (let right = 0; right < s.length; right++) {
    if (charMap.has(s[right])) {
      left = Math.max(left, charMap.get(s[right]) + 1);
    }
    charMap.set(s[right], right);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}`,
  },
  {
    problem: { id: 5, title: "Longest Palindromic Substring" },
    status: "Accepted",
    language: "JavaScript",
    runtime: "88 ms",
    memory: "44.9 MB",
    submittedAt: "2023-05-05 14:22",
    code: `function longestPalindrome(s) {
  if (!s || s.length < 1) return "";
  
  let start = 0;
  let maxLength = 1;
  
  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const currentLength = right - left + 1;
      if (currentLength > maxLength) {
        maxLength = currentLength;
        start = left;
      }
      left--;
      right++;
    }
  }
  
  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i, i); // Odd length
    expandAroundCenter(i, i + 1); // Even length
  }
  
  return s.substring(start, start + maxLength);
}`,
  },
]
