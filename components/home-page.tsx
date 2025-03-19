"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import {
  ArrowRight,
  MessageSquare,
  ListTodo,
  LineChart,
  CheckCircle2,
  Clock,
  AlertCircle,
  Zap,
  TrendingUp,
  BarChart,
  Target,
  Plus,
  Users,
  ArrowUpRight,
  Brain,
  Flame,
  Calendar,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  UserPlus,
  Filter,
  Slack,
  Mail,
  BellRing,
  Smartphone,
  Lightbulb,
  Rocket,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Missing Activity component
function Activity(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}


interface HomePageProps {
  onNavigate: (view: "home" | "dashboard" | "taskboard" | "marketinsights" | "insights") => void
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [greeting, setGreeting] = useState("Good day")
  const [userName, setUserName] = useState("John")
  const [viewMode, setViewMode] = useState<"execution" | "strategy">("execution")

  // Get appropriate greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  // Mock data for dashboard stats
  const stats = {
    feedback: {
      new: 3,
      total: 24,
      priority: 76,
      lastChecked: "2 days ago",
      criticalIssues: [
        { id: 1, title: "Onboarding flow is confusing", mentions: 12, sentiment: "negative" },
        { id: 2, title: "Mobile app crashes on login", mentions: 8, sentiment: "negative" },
      ],
      positiveHighlights: [{ id: 3, title: "Users love the new AI feature", mentions: 15, sentiment: "positive" }],
      pattern: "Users are asking for better mobile experience",
    },
    tasks: {
      pending: 5,
      total: 18,
      completed: 8,
      dueToday: 2,
      weeklyCompletion: 80,
      backlogGrowth: 20,
      criticalTasks: [
        { id: 1, title: "Fix mobile login crash", dueDate: "Today", assignee: "Engineering", priority: "high" },
        { id: 2, title: "Simplify onboarding flow", dueDate: "Tomorrow", assignee: "Product", priority: "high" },
        { id: 3, title: "Prepare investor update", dueDate: "Today", assignee: "You", priority: "high" },
      ],
      blockers: [{ id: 4, title: "API integration with payment provider", blockedTeams: ["Sales", "Marketing"] }],
    },
    market: {
      new: 2,
      competitors: 4,
      trends: ["AI-Powered Analytics", "Mobile-First Experience"],
      lastUpdate: "Today",
      latestEvent: "CompetitorX launched new feature",
      criticalUpdates: [
        { id: 1, title: "CompetitorX secured $10M funding", impact: "high", date: "Yesterday" },
        { id: 2, title: "New market entrant with similar product", impact: "medium", date: "3 days ago" },
      ],
    },
    company: {
      metrics: {
        userGrowth: { value: 15, trend: "up" },
        revenue: { value: 22, trend: "up" },
        churn: { value: -5, trend: "down" },
      },
      okrs: [
        { id: 1, title: "Increase user base by 30%", progress: 50 },
        { id: 2, title: "Launch mobile app", progress: 75 },
        { id: 3, title: "Secure Series A funding", progress: 40 },
      ],
    },
    team: {
      members: [
        { id: 1, name: "Sarah", role: "Product", avatar: "", tasks: 5 },
        { id: 2, name: "Mike", role: "Engineering", avatar: "", tasks: 8 },
        { id: 3, name: "Alex", role: "Design", avatar: "", tasks: 3 },
      ],
    },
  }

  // AI-selected focus items (combining critical tasks, feedback, and market updates)
  const aiSelectedFocus = [
    {
      id: 1,
      type: "task",
      title: "Fix mobile login crash",
      description: "Critical issue affecting 15% of users",
      priority: "high",
      action: "Assign to Engineering",
      icon: AlertCircle,
      iconColor: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      id: 2,
      type: "feedback",
      title: "Onboarding flow confusion",
      description: "12 mentions in the last week",
      priority: "high",
      action: "Review feedback",
      icon: MessageSquare,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      id: 3,
      type: "market",
      title: "CompetitorX secured funding",
      description: "Announced $10M Series A yesterday",
      priority: "medium",
      action: "See details",
      icon: TrendingUp,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
    },
  ]

  // Strategic insights for Founder Mode
  const strategicInsights = [
    {
      id: 1,
      title: "Market Positioning",
      description:
        "Your product is positioned well against competitors in the AI analytics space, but lacks mobile presence.",
      recommendation: "Consider prioritizing mobile app development to address this gap.",
      confidence: 85,
    },
    {
      id: 2,
      title: "Growth Opportunity",
      description: "User feedback shows strong interest in your AI features, which aligns with market trends.",
      recommendation: "Double down on AI capabilities to differentiate from competitors.",
      confidence: 92,
    },
    {
      id: 3,
      title: "Resource Allocation",
      description: "Engineering team is overloaded with tasks while design has capacity.",
      recommendation: "Redistribute workload or consider hiring another engineer.",
      confidence: 78,
    },
  ]

  // Function to render task priority badge
  const renderPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="destructive" className="ml-2">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="default" className="ml-2">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="secondary" className="ml-2">
            Low
          </Badge>
        )
      default:
        return null
    }
  }

  // Function to handle task completion
  const handleCompleteTask = (taskId: number) => {
    // In a real app, this would update the task status
    console.log(`Task ${taskId} marked as complete`)
    // Then update the UI accordingly
  }

  // Function to handle task delegation
  const handleDelegateTask = (taskId: number, team: string) => {
    // In a real app, this would assign the task to the team
    console.log(`Task ${taskId} delegated to ${team}`)
    // Then update the UI accordingly
  }

  return (
    <div className="space-y-5">
      {/* Header with personalized greeting and view mode toggle */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {greeting}, {userName}!
          </h1>
          <p className="text-muted-foreground mt-1">
            {viewMode === "execution"
              ? `You have ${stats.tasks.dueToday} critical tasks due today and ${stats.feedback.new} new feedback items.`
              : "Strategic overview of your business metrics and long-term goals."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-2 bg-muted p-1 rounded-md">
            <Button
              variant={viewMode === "execution" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("execution")}
              className="gap-1.5"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Execution</span>
            </Button>
            <Button
              variant={viewMode === "strategy" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("strategy")}
              className="gap-1.5"
            >
              <Rocket className="h-3.5 w-3.5" />
              <span>Strategy</span>
            </Button>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <BellRing className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {viewMode === "execution" ? (
        /* EXECUTION MODE - Daily operations focus */
        <>
          {/* CEO Snapshot - What Needs Your Attention Today */}
          <Card className="border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Flame className="h-5 w-5 text-primary" />
                Your Focus Today
              </CardTitle>
              <CardDescription>AI-selected priorities based on impact and urgency</CardDescription>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-3">
                {aiSelectedFocus.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border ${item.bgColor} border-${item.iconColor}/20`}
                  >
                    <div className={`rounded-full p-2 ${item.bgColor} border border-${item.iconColor}/20`}>
                      <item.icon className={`h-4 w-4 ${item.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm truncate">{item.title}</h3>
                        {renderPriorityBadge(item.priority)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8"
                        onClick={() => {
                          if (item.type === "task") onNavigate("taskboard")
                          else if (item.type === "feedback") onNavigate("dashboard")
                          else if (item.type === "market") onNavigate("marketinsights")
                        }}
                      >
                        {item.action}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2">
                            <CheckCircle2 className="h-4 w-4" /> Mark as done
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <UserPlus className="h-4 w-4" /> Delegate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Clock className="h-4 w-4" /> Snooze
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Company Pulse - Key Metrics at a Glance */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Your Company's Pulse
              </CardTitle>
              <CardDescription>Real-time overview of key business metrics</CardDescription>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="grid gap-3 md:grid-cols-3">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="rounded-full bg-green-100 p-2">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">User Growth</h3>
                      <div className="flex items-center gap-1 text-green-600">
                        <ArrowUp className="h-3 w-3" />
                        <span className="text-sm font-medium">+{stats.company.metrics.userGrowth.value}%</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="rounded-full bg-blue-100 p-2">
                    <BarChart className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Revenue</h3>
                      <div className="flex items-center gap-1 text-green-600">
                        <ArrowUp className="h-3 w-3" />
                        <span className="text-sm font-medium">+{stats.company.metrics.revenue.value}%</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="rounded-full bg-amber-100 p-2">
                    <Users className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Churn Rate</h3>
                      <div className="flex items-center gap-1 text-green-600">
                        <ArrowDown className="h-3 w-3" />
                        <span className="text-sm font-medium">{stats.company.metrics.churn.value}%</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Task Management with Inline Actions */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ListTodo className="h-5 w-5 text-primary" />
                  Critical Tasks
                </CardTitle>
                <Button variant="outline" size="sm" className="gap-1.5" onClick={() => onNavigate("taskboard")}>
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Task</span>
                </Button>
              </div>
              <CardDescription>Tasks that need your immediate attention</CardDescription>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-2">
                {stats.tasks.criticalTasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Checkbox
                      id={`task-${task.id}`}
                      className="h-5 w-5"
                      onCheckedChange={() => handleCompleteTask(task.id)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <label
                          htmlFor={`task-${task.id}`}
                          className="text-sm font-medium cursor-pointer hover:text-primary"
                        >
                          {task.title}
                        </label>
                        {renderPriorityBadge(task.priority)}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{task.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{task.assignee}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 gap-1">
                            <UserPlus className="h-3.5 w-3.5" />
                            <span>Delegate</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Assign to</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {stats.team.members.map((member) => (
                            <DropdownMenuItem key={member.id} onClick={() => handleDelegateTask(task.id, member.name)}>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>
                                  {member.name} ({member.role})
                                </span>
                              </div>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onNavigate("taskboard")}>
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Task Blocker Alert */}
                {stats.tasks.blockers.length > 0 && (
                  <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg mt-3">
                    <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Critical Blocker</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {stats.tasks.blockers[0].title} is blocking {stats.tasks.blockers[0].blockedTeams.join(", ")}
                      </p>
                      <Button variant="link" size="sm" className="h-6 px-0" onClick={() => onNavigate("taskboard")}>
                        Resolve Blocker
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-0 pb-3">
              <Button variant="outline" className="w-full justify-between" onClick={() => onNavigate("taskboard")}>
                <span>View All Tasks</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          {/* User Feedback with Patterns */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  User Feedback
                </CardTitle>
                <Button variant="outline" size="sm" className="gap-1.5" onClick={() => onNavigate("dashboard")}>
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filter</span>
                </Button>
              </div>
              <CardDescription>Key insights from your users</CardDescription>
            </CardHeader>
            <CardContent className="pt-3">
              {/* Feedback Pattern Insight */}
              <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg mb-3">
                <Lightbulb className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Pattern Detected</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{stats.feedback.pattern}</p>
                </div>
              </div>

              <div className="space-y-2">
                {stats.feedback.criticalIssues.map((issue) => (
                  <div key={issue.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="rounded-full bg-red-100 p-1.5 mt-0.5">
                      <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">{issue.title}</h3>
                        <Badge variant="outline" className="ml-2">
                          {issue.mentions} mentions
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => onNavigate("dashboard")}
                        >
                          View Details
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-7 text-xs">
                              Create Task
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Assign to</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {stats.team.members.map((member) => (
                              <DropdownMenuItem key={member.id}>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span>
                                    {member.name} ({member.role})
                                  </span>
                                </div>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Positive Feedback */}
                {stats.feedback.positiveHighlights.map((highlight) => (
                  <div
                    key={highlight.id}
                    className="flex items-start gap-3 p-3 border border-green-200 bg-green-50 rounded-lg"
                  >
                    <div className="rounded-full bg-green-100 p-1.5 mt-0.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">{highlight.title}</h3>
                        <Badge variant="outline" className="bg-green-100 ml-2">
                          {highlight.mentions} mentions
                        </Badge>
                      </div>
                      <Button variant="link" size="sm" className="h-6 px-0" onClick={() => onNavigate("dashboard")}>
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-0 pb-3">
              <Button variant="outline" className="w-full justify-between" onClick={() => onNavigate("dashboard")}>
                <span>View All Feedback</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          {/* Market Insights with Critical Updates */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-primary" />
                Market Insights
              </CardTitle>
              <CardDescription>Critical market and competitor updates</CardDescription>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-2">
                {stats.market.criticalUpdates.map((update) => (
                  <div key={update.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="rounded-full bg-blue-100 p-1.5 mt-0.5">
                      <TrendingUp className="h-3.5 w-3.5 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">{update.title}</h3>
                        {update.impact === "high" ? (
                          <Badge variant="destructive">High Impact</Badge>
                        ) : (
                          <Badge>Medium Impact</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">Reported {update.date}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => onNavigate("marketinsights")}
                        >
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          Set Alert
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Market Trends */}
                <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg mt-2">
                  <Brain className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Top Market Trend</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {stats.market.trends[0]} is gaining traction across the industry
                    </p>
                    <Button variant="link" size="sm" className="h-6 px-0" onClick={() => onNavigate("marketinsights")}>
                      Explore Trend
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 pb-3">
              <Button variant="outline" className="w-full justify-between" onClick={() => onNavigate("marketinsights")}>
                <span>View All Market Insights</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <BellRing className="h-5 w-5 text-primary" />
                Smart Notifications
              </CardTitle>
              <CardDescription>Get alerted about critical updates</CardDescription>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Slack className="h-5 w-5 text-[#4A154B]" />
                    <div>
                      <h3 className="text-sm font-medium">Slack Alerts</h3>
                      <p className="text-xs text-muted-foreground">Critical updates sent to #alerts channel</p>
                    </div>
                  </div>
                  <Switch defaultChecked id="slack-notifications" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-500" />
                    <div>
                      <h3 className="text-sm font-medium">Email Digest</h3>
                      <p className="text-xs text-muted-foreground">Daily summary of key insights</p>
                    </div>
                  </div>
                  <Switch defaultChecked id="email-notifications" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-green-500" />
                    <div>
                      <h3 className="text-sm font-medium">Mobile Alerts</h3>
                      <p className="text-xs text-muted-foreground">Push notifications for urgent matters</p>
                    </div>
                  </div>
                  <Switch defaultChecked id="mobile-notifications" />
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        /* STRATEGY MODE - Big picture focus */
        <>
          {/* Strategic Overview */}
          <Card className="border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-primary" />
                Strategic Overview
              </CardTitle>
              <CardDescription>Long-term goals and business health</CardDescription>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-4">
                {/* OKRs and Key Milestones */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Company OKRs</h3>
                  {stats.company.okrs.map((okr) => (
                    <div key={okr.id} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm">{okr.title}</h4>
                        <span className="text-sm font-medium">{okr.progress}%</span>
                      </div>
                      <Progress value={okr.progress} className="h-2" />
                    </div>
                  ))}
                </div>

                {/* Growth Metrics */}
                <div className="grid gap-3 md:grid-cols-3 mt-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="rounded-full bg-green-100 p-2">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">User Growth</h3>
                        <div className="flex items-center gap-1 text-green-600">
                          <ArrowUp className="h-3 w-3" />
                          <span className="text-sm font-medium">+{stats.company.metrics.userGrowth.value}%</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Last 30 days</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="rounded-full bg-blue-100 p-2">
                      <BarChart className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Revenue</h3>
                        <div className="flex items-center gap-1 text-green-600">
                          <ArrowUp className="h-3 w-3" />
                          <span className="text-sm font-medium">+{stats.company.metrics.revenue.value}%</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Last 30 days</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="rounded-full bg-amber-100 p-2">
                      <Users className="h-4 w-4 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Churn Rate</h3>
                        <div className="flex items-center gap-1 text-green-600">
                          <ArrowDown className="h-3 w-3" />
                          <span className="text-sm font-medium">{stats.company.metrics.churn.value}%</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Last 30 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Strategic Insights */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI Strategic Insights
              </CardTitle>
              <CardDescription>AI-generated recommendations based on your data</CardDescription>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-3">
                {strategicInsights.map((insight) => (
                  <div key={insight.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-medium">{insight.title}</h3>
                      <Badge variant="outline">{insight.confidence}% confidence</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{insight.description}</p>
                    <div className="flex items-center gap-1 text-sm text-primary">
                      <Lightbulb className="h-4 w-4" />
                      <span className="font-medium">Recommendation:</span>
                      <span>{insight.recommendation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Market Position */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Market Position
              </CardTitle>
              <CardDescription>Your position relative to competitors</CardDescription>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Competitive Landscape</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium">Your Strengths</h4>
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />
                          <span>AI-powered feedback analysis</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />
                          <span>Intuitive user interface</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />
                          <span>Competitive pricing</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium">Areas to Improve</h4>
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2 text-xs">
                          <AlertCircle className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
                          <span>Mobile experience</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs">
                          <AlertCircle className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
                          <span>Enterprise features</span>
                        </li>
                        <li className="flex items-start gap-2 text-xs">
                          <AlertCircle className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
                          <span>Integration ecosystem</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Market Opportunities</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="text-xs font-medium">AI-Powered Analytics</h4>
                        <p className="text-xs text-muted-foreground">
                          Growing demand for AI solutions in feedback analysis
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="text-xs font-medium">Mobile-First Experience</h4>
                        <p className="text-xs text-muted-foreground">Increasing demand for mobile-friendly solutions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 pb-3">
              <Button variant="outline" className="w-full justify-between" onClick={() => onNavigate("marketinsights")}>
                <span>View Detailed Market Analysis</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          {/* Resource Allocation */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Team & Resources
              </CardTitle>
              <CardDescription>Resource allocation and team performance</CardDescription>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Team Workload</h3>
                <div className="space-y-2">
                  {stats.team.members.map((member) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm">
                            {member.name} ({member.role})
                          </h4>
                          <span className="text-xs">{member.tasks} tasks</span>
                        </div>
                        <Progress
                          value={(member.tasks / 10) * 100}
                          className="h-1.5 mt-1"
                          indicatorColor={member.tasks > 7 ? "bg-red-500" : "bg-primary"}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 border rounded-lg mt-3">
                  <h3 className="text-sm font-medium mb-2">Resource Recommendations</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                      <p className="text-xs">
                        Engineering team is overloaded. Consider hiring another developer or redistributing tasks.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                      <p className="text-xs">
                        Design team has capacity for additional work. Consider shifting some UI tasks to them.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
