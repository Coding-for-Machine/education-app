"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CalendarDay {
  date: string
  count: number
}

interface CalendarMonth {
  month: string
  days: CalendarDay[]
}

interface ContributionCalendarProps {
  year: number
  total: number
  calendar: CalendarMonth[]
}

export function ActivityCalendar({ data }: { data: ContributionCalendarProps }) {
  const [selectedYear, setSelectedYear] = useState(data.year)

  // Function to determine the intensity of the color based on the count
  const getColorIntensity = (count: number) => {
    if (count === 0) return "bg-muted hover:bg-muted/80"
    if (count < 5) return "bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-900/50"
    if (count < 10) return "bg-emerald-200 dark:bg-emerald-800/40 hover:bg-emerald-300 dark:hover:bg-emerald-800/60"
    if (count < 15) return "bg-emerald-300 dark:bg-emerald-700/50 hover:bg-emerald-400 dark:hover:bg-emerald-700/70"
    return "bg-emerald-400 dark:bg-emerald-600/60 hover:bg-emerald-500 dark:hover:bg-emerald-600/80"
  }

  // Get the day of the week (0-6, where 0 is Sunday)
  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString)
    return date.getDay()
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  // Get the first day of the first month to determine the starting position
  const firstDayOfYear = data.calendar[0]?.days[0]?.date || `${selectedYear}-01-01`
  const startingDayOfWeek = getDayOfWeek(firstDayOfYear)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">Activity Calendar</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  This calendar shows your daily coding activity. Darker colors indicate more problems solved on that
                  day.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-7 px-2">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">{selectedYear}</span>
          <Button variant="outline" size="sm" className="h-7 px-2">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex min-w-[900px]">
          {/* Day labels (Sun-Sat) */}
          <div className="flex flex-col pr-2 pt-6">
            <div className="h-3 text-xs text-muted-foreground">Sun</div>
            <div className="h-3 mt-2 text-xs text-muted-foreground">Mon</div>
            <div className="h-3 mt-2 text-xs text-muted-foreground">Tue</div>
            <div className="h-3 mt-2 text-xs text-muted-foreground">Wed</div>
            <div className="h-3 mt-2 text-xs text-muted-foreground">Thu</div>
            <div className="h-3 mt-2 text-xs text-muted-foreground">Fri</div>
            <div className="h-3 mt-2 text-xs text-muted-foreground">Sat</div>
          </div>

          {/* Calendar grid */}
          <div className="flex-1">
            <div className="flex">
              {/* Month labels */}
              {data.calendar.map((month, index) => (
                <div key={index} className="flex-1 text-center text-xs text-muted-foreground">
                  {month.month}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-53 gap-1 mt-1">
              {/* Empty cells for alignment */}
              {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                <div key={`empty-start-${index}`} className="h-3 w-3"></div>
              ))}

              {/* Calendar cells */}
              {data.calendar.flatMap((month) =>
                month.days.map((day, dayIndex) => {
                  const dayOfWeek = getDayOfWeek(day.date)
                  // Calculate the position in the grid
                  const gridColumn = Math.floor(dayIndex / 7) + 1
                  const gridRow = dayOfWeek + 1

                  return (
                    <TooltipProvider key={day.date}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`h-3 w-3 rounded-sm ${getColorIntensity(day.count)} transition-colors`}
                            style={{ gridColumn, gridRow }}
                          ></div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-xs">
                            <div className="font-medium">{formatDate(day.date)}</div>
                            <div>
                              {day.count} {day.count === 1 ? "contribution" : "contributions"}
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )
                }),
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <div className="text-xs text-muted-foreground">Less</div>
        <div className="flex gap-1">
          <div className="h-3 w-3 rounded-sm bg-muted"></div>
          <div className="h-3 w-3 rounded-sm bg-emerald-100 dark:bg-emerald-900/30"></div>
          <div className="h-3 w-3 rounded-sm bg-emerald-200 dark:bg-emerald-800/40"></div>
          <div className="h-3 w-3 rounded-sm bg-emerald-300 dark:bg-emerald-700/50"></div>
          <div className="h-3 w-3 rounded-sm bg-emerald-400 dark:bg-emerald-600/60"></div>
        </div>
        <div className="text-xs text-muted-foreground">More</div>
      </div>

      <div className="text-sm text-center text-muted-foreground">
        {data.total} contributions in {selectedYear}
      </div>
    </div>
  )
}
