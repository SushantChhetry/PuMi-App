"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  BarChart,
  LineChart,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  MessageSquare,
  ListTodo,
  Lightbulb,
  Target,
  Zap,
  Calendar,
  ExternalLink,
  AlertCircle,
  Share2,
  Slack,
  X,
} from "lucide-react"
// Add these imports at the top with the other imports
import { Textarea } from "@/components/ui/textarea"
import { Paperclip, FileText, Link2, Globe, Pencil, Plus, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function InsightsView() {
  // Add these state variables after the existing useState declarations
  const [timeDialogOpen, setTimeDialogOpen] = useState(false)
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("last30Days")

  // Add these state variables for the custom date range
  const [startDate, setStartDate] = useState<string>(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  )
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split("T")[0])

  // Add this state variable after the other useState declarations
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [slackChannel, setSlackChannel] = useState("#general")
  const [includeMetrics, setIncludeMetrics] = useState(true)
  const [includeTopInsights, setIncludeTopInsights] = useState(true)
  const [includeRecommendations, setIncludeRecommendations] = useState(true)
  const [shareSuccess, setShareSuccess] = useState(false)

  // Add these state variables after the other useState declarations
  const [businessContextDialogOpen, setBusinessContextDialogOpen] = useState(false)
  const [companyInfo, setCompanyInfo] = useState({
    name: "Acme Inc.",
    industry: "SaaS",
    size: "50-100 employees",
    target: "Small to medium businesses",
    description: "Acme provides workflow automation tools for marketing teams.",
  })
  const [productVision, setProductVision] = useState(
    "To become the leading workflow automation platform for marketing teams by simplifying complex processes and providing actionable insights.",
  )
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: "Q1 2025 Product Roadmap",
      type: "notion",
      url: "https://notion.so/acme/roadmap",
    },
    {
      id: 2,
      title: "Competitor Analysis",
      type: "gdoc",
      url: "https://docs.google.com/document/d/123456",
    },
    {
      id: 3,
      title: "User Research Findings",
      type: "figma",
      url: "https://figma.com/file/abcdef",
    },
  ])
  const [newDocument, setNewDocument] = useState({ title: "", type: "link", url: "" })

  // First, let's add time period-specific data sets after the useState declarations
  // Replace the existing sample data with these time-specific data sets

  const timePeriodsData = {
    last7Days: {
      feedbackInsights: [
        {
          id: 1,
          title: "Onboarding flow issues are your top priority",
          description: "12 mentions with 90% priority score, primarily negative sentiment",
          recommendation: "Consider redesigning the account setup process based on feedback",
          impact: "high",
          source: "feedback",
          trend: "up",
          change: "+8% from last week",
        },
        {
          id: 2,
          title: "Users love your AI recommendations feature",
          description: "7 mentions with positive sentiment across all user segments",
          recommendation: "Highlight this feature in marketing materials and expand its capabilities",
          impact: "medium",
          source: "feedback",
          trend: "up",
          change: "+3% from last week",
        },
        {
          id: 3,
          title: "Mobile responsiveness needs improvement",
          description: "5 mentions from mobile users, primarily negative sentiment",
          recommendation: "Prioritize fixing mobile UI issues on key screens",
          impact: "medium",
          source: "feedback",
          trend: "new",
          change: "New issue this week",
        },
      ],
      taskInsights: [
        {
          id: 4,
          title: "25% of high-priority tasks are overdue",
          description: "3 out of 12 high-priority tasks have missed their deadlines",
          recommendation: "Review resource allocation for high-priority items",
          impact: "high",
          source: "tasks",
          trend: "down",
          change: "-5% from last week",
        },
        {
          id: 5,
          title: "Product team has the most assigned tasks",
          description: "Product team has 8 tasks, followed by Engineering with 6",
          recommendation: "Consider redistributing some tasks to balance workload",
          impact: "medium",
          source: "tasks",
          trend: "stable",
          change: "No change from last week",
        },
        {
          id: 6,
          title: "UI improvement tasks have the highest completion rate",
          description: "80% of UI-related tasks completed on time vs. 60% average",
          recommendation: "Apply the same workflow to other task categories",
          impact: "low",
          source: "tasks",
          trend: "up",
          change: "+2% from last week",
        },
      ],
      marketInsights: [
        {
          id: 7,
          title: "CompetitorX launched new feature",
          description: "Added AI-powered analytics dashboard this week",
          recommendation: "Analyze their implementation and consider similar features",
          impact: "high",
          source: "market",
          trend: "new",
          change: "New development this week",
        },
        {
          id: 8,
          title: "AI-Powered Analytics is the top market trend",
          description: "90% relevance to your product with high impact",
          recommendation: "Accelerate your AI feature roadmap to stay competitive",
          impact: "high",
          source: "market",
          trend: "up",
          change: "+5% from last week",
        },
        {
          id: 9,
          title: "SaaS companies are your dominant user segment",
          description: "35% of your users are from SaaS companies",
          recommendation: "Tailor marketing and features to this segment's specific needs",
          impact: "medium",
          source: "market",
          trend: "stable",
          change: "No change from last week",
        },
      ],
      keyMetrics: [
        {
          title: "Feedback Priority",
          value: 72,
          change: "+2",
          trend: "up",
          description: "Average priority score",
        },
        {
          title: "Task Completion",
          value: 60,
          change: "-2",
          trend: "down",
          description: "Percentage completed on time",
        },
        {
          title: "Market Opportunity",
          value: 65,
          change: "+3",
          trend: "up",
          description: "Based on trends & gaps",
        },
        {
          title: "Overall Health",
          value: 68,
          change: "+1",
          trend: "up",
          description: "Combined score",
        },
      ],
      upcomingDeadlines: [
        {
          id: 1,
          title: "Fix mobile responsiveness issues",
          dueDate: "Mar 20, 2025",
          priority: "high",
          type: "task",
        },
        {
          id: 2,
          title: "Analyze CompetitorX new features",
          dueDate: "Mar 22, 2025",
          priority: "high",
          type: "market",
        },
        {
          id: 3,
          title: "Weekly team progress report",
          dueDate: "Mar 21, 2025",
          priority: "medium",
          type: "task",
        },
      ],
      lastUpdated: "2 hours ago",
    },
    last30Days: {
      feedbackInsights: [
        {
          id: 1,
          title: "Onboarding flow issues are your top priority",
          description: "24 mentions with 92% priority score, primarily negative sentiment",
          recommendation: "Consider redesigning the account setup process based on feedback",
          impact: "high",
          source: "feedback",
          trend: "up",
          change: "+15% from last month",
        },
        {
          id: 2,
          title: "Users love your AI recommendations feature",
          description: "15 mentions with positive sentiment across all user segments",
          recommendation: "Highlight this feature in marketing materials and expand its capabilities",
          impact: "medium",
          source: "feedback",
          trend: "up",
          change: "+8% from last month",
        },
        {
          id: 3,
          title: "API documentation needs improvement",
          description: "12 mentions from developers, primarily from integration partners",
          recommendation: "Prioritize updating API docs with better examples and guides",
          impact: "medium",
          source: "feedback",
          trend: "stable",
          change: "No change from last month",
        },
      ],
      taskInsights: [
        {
          id: 4,
          title: "33% of high-priority tasks are overdue",
          description: "5 out of 15 high-priority tasks have missed their deadlines",
          recommendation: "Review resource allocation for high-priority items",
          impact: "high",
          source: "tasks",
          trend: "up",
          change: "+12% from last month",
        },
        {
          id: 5,
          title: "Product team has the most assigned tasks",
          description: "Product team has 12 tasks, followed by Engineering with 8",
          recommendation: "Consider redistributing some tasks to balance workload",
          impact: "medium",
          source: "tasks",
          trend: "stable",
          change: "No change from last month",
        },
        {
          id: 6,
          title: "UI improvement tasks have the highest completion rate",
          description: "85% of UI-related tasks completed on time vs. 62% average",
          recommendation: "Apply the same workflow to other task categories",
          impact: "low",
          source: "tasks",
          trend: "up",
          change: "+5% from last month",
        },
      ],
      marketInsights: [
        {
          id: 7,
          title: "CompetitorX is gaining market share",
          description: "Increased from 30% to 35% in the last quarter",
          recommendation: "Analyze their recent feature additions and marketing strategy",
          impact: "high",
          source: "market",
          trend: "up",
          change: "+5% from last quarter",
        },
        {
          id: 8,
          title: "AI-Powered Analytics is the top market trend",
          description: "90% relevance to your product with high impact",
          recommendation: "Accelerate your AI feature roadmap to stay competitive",
          impact: "high",
          source: "market",
          trend: "up",
          change: "+15% from last quarter",
        },
        {
          id: 9,
          title: "SaaS companies are your dominant user segment",
          description: "35% of your users are from SaaS companies",
          recommendation: "Tailor marketing and features to this segment's specific needs",
          impact: "medium",
          source: "market",
          trend: "stable",
          change: "+2% from last quarter",
        },
      ],
      keyMetrics: [
        {
          title: "Feedback Priority",
          value: 76,
          change: "+4",
          trend: "up",
          description: "Average priority score",
        },
        {
          title: "Task Completion",
          value: 62,
          change: "-3",
          trend: "down",
          description: "Percentage completed on time",
        },
        {
          title: "Market Opportunity",
          value: 68,
          change: "+7",
          trend: "up",
          description: "Based on trends & gaps",
        },
        {
          title: "Overall Health",
          value: 72,
          change: "+2",
          trend: "up",
          description: "Combined score",
        },
      ],
      upcomingDeadlines: [
        {
          id: 1,
          title: "Fix onboarding flow issues",
          dueDate: "Mar 25, 2025",
          priority: "high",
          type: "task",
        },
        {
          id: 2,
          title: "Update API documentation",
          dueDate: "Mar 30, 2025",
          priority: "high",
          type: "task",
        },
        {
          id: 3,
          title: "Quarterly market analysis report",
          dueDate: "Apr 5, 2025",
          priority: "medium",
          type: "market",
        },
      ],
      lastUpdated: "2 hours ago",
    },
    last90Days: {
      feedbackInsights: [
        {
          id: 1,
          title: "Onboarding flow issues are your top priority",
          description: "42 mentions with 94% priority score, primarily negative sentiment",
          recommendation: "Consider redesigning the account setup process based on feedback",
          impact: "high",
          source: "feedback",
          trend: "up",
          change: "+22% from previous quarter",
        },
        {
          id: 2,
          title: "Users love your AI recommendations feature",
          description: "28 mentions with positive sentiment across all user segments",
          recommendation: "Highlight this feature in marketing materials and expand its capabilities",
          impact: "medium",
          source: "feedback",
          trend: "up",
          change: "+18% from previous quarter",
        },
        {
          id: 3,
          title: "API documentation needs improvement",
          description: "25 mentions from developers, primarily from integration partners",
          recommendation: "Prioritize updating API docs with better examples and guides",
          impact: "medium",
          source: "feedback",
          trend: "up",
          change: "+10% from previous quarter",
        },
      ],
      taskInsights: [
        {
          id: 4,
          title: "40% of high-priority tasks are overdue",
          description: "12 out of 30 high-priority tasks have missed their deadlines",
          recommendation: "Review resource allocation for high-priority items",
          impact: "high",
          source: "tasks",
          trend: "up",
          change: "+15% from previous quarter",
        },
        {
          id: 5,
          title: "Product team has the most assigned tasks",
          description: "Product team has 25 tasks, followed by Engineering with 18",
          recommendation: "Consider redistributing some tasks to balance workload",
          impact: "high",
          source: "tasks",
          trend: "up",
          change: "+8% from previous quarter",
        },
        {
          id: 6,
          title: "UI improvement tasks have the highest completion rate",
          description: "80% of UI-related tasks completed on time vs. 58% average",
          recommendation: "Apply the same workflow to other task categories",
          impact: "medium",
          source: "tasks",
          trend: "down",
          change: "-5% from previous quarter",
        },
      ],
      marketInsights: [
        {
          id: 7,
          title: "CompetitorX is gaining market share",
          description: "Increased from 25% to 35% in the last quarter",
          recommendation: "Analyze their recent feature additions and marketing strategy",
          impact: "high",
          source: "market",
          trend: "up",
          change: "+10% from previous quarter",
        },
        {
          id: 8,
          title: "AI-Powered Analytics is the top market trend",
          description: "95% relevance to your product with high impact",
          recommendation: "Accelerate your AI feature roadmap to stay competitive",
          impact: "high",
          source: "market",
          trend: "up",
          change: "+25% from previous quarter",
        },
        {
          id: 9,
          title: "SaaS companies are your dominant user segment",
          description: "40% of your users are from SaaS companies",
          recommendation: "Tailor marketing and features to this segment's specific needs",
          impact: "high",
          source: "market",
          trend: "up",
          change: "+8% from previous quarter",
        },
      ],
      keyMetrics: [
        {
          title: "Feedback Priority",
          value: 82,
          change: "+12",
          trend: "up",
          description: "Average priority score",
        },
        {
          title: "Task Completion",
          value: 58,
          change: "-7",
          trend: "down",
          description: "Percentage completed on time",
        },
        {
          title: "Market Opportunity",
          value: 75,
          change: "+15",
          trend: "up",
          description: "Based on trends & gaps",
        },
        {
          title: "Overall Health",
          value: 78,
          change: "+8",
          trend: "up",
          description: "Combined score",
        },
      ],
      upcomingDeadlines: [
        {
          id: 1,
          title: "Fix onboarding flow issues",
          dueDate: "Mar 25, 2025",
          priority: "high",
          type: "task",
        },
        {
          id: 2,
          title: "Update API documentation",
          dueDate: "Mar 30, 2025",
          priority: "high",
          type: "task",
        },
        {
          id: 3,
          title: "Quarterly market analysis report",
          dueDate: "Apr 5, 2025",
          priority: "medium",
          type: "market",
        },
      ],
      lastUpdated: "5 hours ago",
    },
    lastQuarter: {
      feedbackInsights: [
        {
          id: 1,
          title: "Onboarding flow issues are your top priority",
          description: "38 mentions with 90% priority score, primarily negative sentiment",
          recommendation: "Consider redesigning the account setup process based on feedback",
          impact: "high",
          source: "feedback",
          trend: "up",
          change: "+20% from previous quarter",
        },
        {
          id: 2,
          title: "Users love your AI recommendations feature",
          description: "22 mentions with positive sentiment across all user segments",
          recommendation: "Highlight this feature in marketing materials and expand its capabilities",
          impact: "medium",
          source: "feedback",
          trend: "up",
          change: "+12% from previous quarter",
        },
        {
          id: 3,
          title: "Performance issues on large datasets",
          description: "18 mentions from enterprise customers with large data volumes",
          recommendation: "Optimize database queries and implement pagination",
          impact: "high",
          source: "feedback",
          trend: "new",
          change: "New issue this quarter",
        },
      ],
      taskInsights: [
        {
          id: 4,
          title: "35% of high-priority tasks are overdue",
          description: "10 out of 28 high-priority tasks have missed their deadlines",
          recommendation: "Review resource allocation for high-priority items",
          impact: "high",
          source: "tasks",
          trend: "up",
          change: "+10% from previous quarter",
        },
        {
          id: 5,
          title: "Engineering team has the most assigned tasks",
          description: "Engineering team has 22 tasks, followed by Product with 15",
          recommendation: "Consider redistributing some tasks to balance workload",
          impact: "medium",
          source: "tasks",
          trend: "changed",
          change: "Product team had most tasks last quarter",
        },
        {
          id: 6,
          title: "Backend tasks have the lowest completion rate",
          description: "Only 45% of backend tasks completed on time vs. 65% average",
          recommendation: "Investigate bottlenecks in backend development workflow",
          impact: "high",
          source: "tasks",
          trend: "down",
          change: "-15% from previous quarter",
        },
      ],
      marketInsights: [
        {
          id: 7,
          title: "New competitor entered the market",
          description: "StartupZ launched with $10M funding and similar feature set",
          recommendation: "Monitor their positioning and differentiate our offering",
          impact: "high",
          source: "market",
          trend: "new",
          change: "New development this quarter",
        },
        {
          id: 8,
          title: "Enterprise segment growing fastest",
          description: "Enterprise customers increased by 25% this quarter",
          recommendation: "Invest in enterprise-specific features and sales resources",
          impact: "high",
          source: "market",
          trend: "up",
          change: "+25% from previous quarter",
        },
        {
          id: 9,
          title: "Integration capabilities becoming key differentiator",
          description: "85% of prospects asking about integration options",
          recommendation: "Expand API capabilities and integration partnerships",
          impact: "high",
          source: "market",
          trend: "up",
          change: "+30% from previous quarter",
        },
      ],
      keyMetrics: [
        {
          title: "Feedback Priority",
          value: 80,
          change: "+8",
          trend: "up",
          description: "Average priority score",
        },
        {
          title: "Task Completion",
          value: 65,
          change: "+2",
          trend: "up",
          description: "Percentage completed on time",
        },
        {
          title: "Market Opportunity",
          value: 72,
          change: "+12",
          trend: "up",
          description: "Based on trends & gaps",
        },
        {
          title: "Overall Health",
          value: 75,
          change: "+5",
          trend: "up",
          description: "Combined score",
        },
      ],
      upcomingDeadlines: [
        {
          id: 1,
          title: "Q2 Strategic Planning",
          dueDate: "Apr 10, 2025",
          priority: "high",
          type: "market",
        },
        {
          id: 2,
          title: "Performance optimization project",
          dueDate: "Apr 15, 2025",
          priority: "high",
          type: "task",
        },
        {
          id: 3,
          title: "Competitor analysis report",
          dueDate: "Apr 5, 2025",
          priority: "medium",
          type: "market",
        },
      ],
      lastUpdated: "1 day ago",
    },
    lastYear: {
      feedbackInsights: [
        {
          id: 1,
          title: "User interface complexity is the top concern",
          description: "125 mentions with 88% priority score across the year",
          recommendation: "Conduct a comprehensive UX audit and simplification project",
          impact: "high",
          source: "feedback",
          trend: "up",
          change: "+35% from previous year",
        },
        {
          id: 2,
          title: "Mobile experience lags behind desktop",
          description: "98 mentions specifically about mobile usability issues",
          recommendation: "Invest in mobile-first redesign for key workflows",
          impact: "high",
          source: "feedback",
          trend: "up",
          change: "+45% from previous year",
        },
        {
          id: 3,
          title: "AI features are the most praised",
          description: "85 positive mentions about AI-powered features",
          recommendation: "Continue investing in AI capabilities as a differentiator",
          impact: "medium",
          source: "feedback",
          trend: "up",
          change: "+60% from previous year",
        },
      ],
      taskInsights: [
        {
          id: 4,
          title: "Technical debt significantly impacting velocity",
          description: "Task completion rate decreased 15% in second half of year",
          recommendation: "Dedicate one sprint per quarter to technical debt reduction",
          impact: "high",
          source: "tasks",
          trend: "down",
          change: "-15% from previous year",
        },
        {
          id: 5,
          title: "Feature requests outnumber bug fixes 3:1",
          description: "75% of tasks are new features vs. 25% bug fixes",
          recommendation: "Evaluate quality metrics and consider rebalancing priorities",
          impact: "medium",
          source: "tasks",
          trend: "up",
          change: "+20% from previous year",
        },
        {
          id: 6,
          title: "Cross-team dependencies causing delays",
          description: "40% of delayed tasks involve multiple teams",
          recommendation: "Implement better cross-team planning and coordination",
          impact: "high",
          source: "tasks",
          trend: "up",
          change: "+25% from previous year",
        },
      ],
      marketInsights: [
        {
          id: 7,
          title: "Market consolidation through acquisitions",
          description: "Three major acquisitions changed competitive landscape",
          recommendation: "Reassess competitive positioning and partnership strategy",
          impact: "high",
          source: "market",
          trend: "changed",
          change: "Significant shift from previous year",
        },
        {
          id: 8,
          title: "AI adoption accelerating across industry",
          description: "85% of competitors now offer AI-powered features",
          recommendation: "Identify new AI opportunities to maintain differentiation",
          impact: "high",
          source: "market",
          trend: "up",
          change: "+55% from previous year",
        },
        {
          id: 9,
          title: "Enterprise segment represents biggest growth opportunity",
          description: "Enterprise segment growing 2x faster than SMB",
          recommendation: "Shift resources toward enterprise features and sales",
          impact: "high",
          source: "market",
          trend: "up",
          change: "+40% from previous year",
        },
      ],
      keyMetrics: [
        {
          title: "Feedback Priority",
          value: 85,
          change: "+15",
          trend: "up",
          description: "Average priority score",
        },
        {
          title: "Task Completion",
          value: 55,
          change: "-10",
          trend: "down",
          description: "Percentage completed on time",
        },
        {
          title: "Market Opportunity",
          value: 80,
          change: "+20",
          trend: "up",
          description: "Based on trends & gaps",
        },
        {
          title: "Overall Health",
          value: 70,
          change: "+5",
          trend: "up",
          description: "Combined score",
        },
      ],
      upcomingDeadlines: [
        {
          id: 1,
          title: "Annual strategic planning",
          dueDate: "Apr 30, 2025",
          priority: "high",
          type: "market",
        },
        {
          id: 2,
          title: "UX simplification project kickoff",
          dueDate: "Apr 15, 2025",
          priority: "high",
          type: "task",
        },
        {
          id: 3,
          title: "Mobile redesign proposal",
          dueDate: "Apr 20, 2025",
          priority: "high",
          type: "task",
        },
      ],
      lastUpdated: "2 days ago",
    },
    custom: {
      feedbackInsights: [
        {
          id: 1,
          title: "Custom date range insights",
          description: "Insights based on your selected date range",
          recommendation: "Adjust date range to analyze specific periods",
          impact: "medium",
          source: "feedback",
          trend: "stable",
          change: "Based on custom date range",
        },
        {
          id: 2,
          title: "Feedback trends for selected period",
          description: "Analysis of feedback patterns in your date range",
          recommendation: "Compare with other time periods for context",
          impact: "medium",
          source: "feedback",
          trend: "stable",
          change: "Based on custom date range",
        },
        {
          id: 3,
          title: "Key issues during selected period",
          description: "Most important feedback items in your date range",
          recommendation: "Focus on high-impact items first",
          impact: "medium",
          source: "feedback",
          trend: "stable",
          change: "Based on custom date range",
        },
      ],
      taskInsights: [
        {
          id: 4,
          title: "Task performance for selected period",
          description: "Analysis of task completion in your date range",
          recommendation: "Identify patterns specific to this time period",
          impact: "medium",
          source: "tasks",
          trend: "stable",
          change: "Based on custom date range",
        },
        {
          id: 5,
          title: "Resource allocation during selected period",
          description: "How team resources were distributed in your date range",
          recommendation: "Optimize based on historical patterns",
          impact: "medium",
          source: "tasks",
          trend: "stable",
          change: "Based on custom date range",
        },
        {
          id: 6,
          title: "Task bottlenecks in selected period",
          description: "Common blockers during your date range",
          recommendation: "Address recurring issues to improve flow",
          impact: "medium",
          source: "tasks",
          trend: "stable",
          change: "Based on custom date range",
        },
      ],
      marketInsights: [
        {
          id: 7,
          title: "Market events during selected period",
          description: "Key market developments in your date range",
          recommendation: "Analyze impact on your strategy",
          impact: "medium",
          source: "market",
          trend: "stable",
          change: "Based on custom date range",
        },
        {
          id: 8,
          title: "Competitive moves in selected period",
          description: "Competitor activities during your date range",
          recommendation: "Evaluate your response to these moves",
          impact: "medium",
          source: "market",
          trend: "stable",
          change: "Based on custom date range",
        },
        {
          id: 9,
          title: "Market trends during selected period",
          description: "Emerging trends in your date range",
          recommendation: "Consider how these trends affect your roadmap",
          impact: "medium",
          source: "market",
          trend: "stable",
          change: "Based on custom date range",
        },
      ],
      keyMetrics: [
        {
          title: "Feedback Priority",
          value: 75,
          change: "N/A",
          trend: "stable",
          description: "Average priority score",
        },
        {
          title: "Task Completion",
          value: 65,
          change: "N/A",
          trend: "stable",
          description: "Percentage completed on time",
        },
        {
          title: "Market Opportunity",
          value: 70,
          change: "N/A",
          trend: "stable",
          description: "Based on trends & gaps",
        },
        {
          title: "Overall Health",
          value: 70,
          change: "N/A",
          trend: "stable",
          description: "Combined score",
        },
      ],
      upcomingDeadlines: [
        {
          id: 1,
          title: "Custom period analysis",
          dueDate: "Varies",
          priority: "medium",
          type: "task",
        },
        {
          id: 2,
          title: "Period comparison report",
          dueDate: "Varies",
          priority: "medium",
          type: "market",
        },
        {
          id: 3,
          title: "Trend analysis for selected dates",
          dueDate: "Varies",
          priority: "medium",
          type: "task",
        },
      ],
      lastUpdated: "Just now",
    },
  }

  // Get the current data based on selected time period
  const currentPeriodData = timePeriodsData[selectedTimePeriod as keyof typeof timePeriodsData]
  const feedbackInsights = currentPeriodData.feedbackInsights
  const taskInsights = currentPeriodData.taskInsights
  const marketInsights = currentPeriodData.marketInsights
  const keyMetrics = currentPeriodData.keyMetrics
  const upcomingDeadlines = currentPeriodData.upcomingDeadlines
  const lastUpdated = currentPeriodData.lastUpdated

  // Combined insights for the overview
  const allInsights = [...feedbackInsights, ...taskInsights, ...marketInsights].sort((a, b) => {
    // Sort by impact (high > medium > low)
    const impactOrder = { high: 3, medium: 2, low: 1 }
    return impactOrder[b.impact as keyof typeof impactOrder] - impactOrder[a.impact as keyof typeof impactOrder]
  })

  // Function to get trend icon
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      case "new":
        return <AlertCircle className="h-4 w-4 text-blue-500" />
      case "changed":
        return <AlertCircle className="h-4 w-4 text-amber-500" />
      default:
        return <LineChart className="h-4 w-4 text-muted-foreground" />
    }
  }

  // Function to get source icon
  const getSourceIcon = (source: string) => {
    switch (source) {
      case "feedback":
        return <MessageSquare className="h-4 w-4" />
      case "tasks":
        return <ListTodo className="h-4 w-4" />
      case "market":
        return <BarChart className="h-4 w-4" />
      default:
        return <Lightbulb className="h-4 w-4" />
    }
  }

  // Function to get impact badge variant
  const getImpactBadgeVariant = (impact: string) => {
    switch (impact) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }

  // Add this function after the getImpactBadgeVariant function
  const getTimePeriodDisplay = (period: string) => {
    switch (period) {
      case "last7Days":
        return "Last 7 Days"
      case "last30Days":
        return "Last 30 Days"
      case "last90Days":
        return "Last 90 Days"
      case "lastQuarter":
        return "Last Quarter"
      case "lastYear":
        return "Last Year"
      case "custom":
        return "Custom Range"
      default:
        return "Last 30 Days"
    }
  }

  // Add this function before the return statement
  const handleShareToSlack = () => {
    // In a real app, this would make an API call to share to Slack
    // For now, we'll just simulate success after a short delay
    setTimeout(() => {
      setShareSuccess(true)
      setTimeout(() => {
        setShareDialogOpen(false)
        setShareSuccess(false)
      }, 2000)
    }, 1000)
  }

  // Add this function before the return statement
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "notion":
        return <FileText className="h-4 w-4" />
      case "gdoc":
        return <FileText className="h-4 w-4 text-blue-600" />
      case "figma":
        return <FileText className="h-4 w-4 text-purple-600" />
      default:
        return <Link2 className="h-4 w-4" />
    }
  }

  // Add this function before the return statement
  const addDocument = () => {
    if (newDocument.title.trim() === "" || newDocument.url.trim() === "") return

    setDocuments([
      ...documents,
      {
        id: Date.now(),
        title: newDocument.title,
        type: newDocument.type,
        url: newDocument.url,
      },
    ])

    setNewDocument({ title: "", type: "link", url: "" })
  }

  // Add this function before the return statement
  const removeDocument = (id: number) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
  }

  // Add this function before the return statement
  const saveBusinessContext = () => {
    // In a real app, this would save to a database
    setBusinessContextDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Executive Insights</h2>
          {/* Replace the existing "Last updated" text with this: */}
          <p className="text-sm text-muted-foreground">
            Showing data for: {getTimePeriodDisplay(selectedTimePeriod)} • Last updated {lastUpdated}
          </p>
        </div>
        {/* Replace the existing Change Time Period button with this: */}
        <Button onClick={() => setTimeDialogOpen(true)}>
          <Calendar className="mr-2 h-4 w-4" />
          {getTimePeriodDisplay(selectedTimePeriod)}
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        {keyMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{metric.value}/100</div>
                <div
                  className={`flex items-center ${
                    metric.trend === "up" ? "text-green-500" : metric.trend === "down" ? "text-red-500" : ""
                  }`}
                >
                  {metric.trend === "up" ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : metric.trend === "down" ? (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowRight className="h-4 w-4 mr-1" />
                  )}
                  {metric.change}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="feedback">Feedback Insights</TabsTrigger>
          <TabsTrigger value="tasks">Task Insights</TabsTrigger>
          <TabsTrigger value="market">Market Insights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Top Insights Across All Areas</CardTitle>
                <CardDescription>High-impact insights requiring your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allInsights.slice(0, 5).map((insight) => (
                    <div key={insight.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div
                        className={`rounded-full p-2 ${
                          insight.source === "feedback"
                            ? "bg-blue-100"
                            : insight.source === "tasks"
                              ? "bg-purple-100"
                              : "bg-amber-100"
                        }`}
                      >
                        {getSourceIcon(insight.source)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{insight.title}</h3>
                          <Badge variant={getImpactBadgeVariant(insight.impact)}>{insight.impact} impact</Badge>
                          {getTrendIcon(insight.trend)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                        <div className="flex items-center gap-1 text-sm text-primary">
                          <Zap className="h-4 w-4" />
                          <span>Recommendation: {insight.recommendation}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Tasks and reports due soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline) => (
                    <div key={deadline.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div
                        className={`rounded-full p-1.5 ${deadline.type === "task" ? "bg-purple-100" : "bg-amber-100"}`}
                      >
                        {deadline.type === "task" ? <ListTodo className="h-4 w-4" /> : <BarChart className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm">{deadline.title}</h3>
                          <Badge variant={deadline.priority === "high" ? "destructive" : "default"}>
                            {deadline.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Due: {deadline.dueDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Strategic Recommendations</CardTitle>
                <CardDescription>Actions to consider based on all insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <Target className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Prioritize Onboarding Redesign</h4>
                      <p className="text-sm text-muted-foreground">
                        Based on feedback priority and task completion rates, focus on fixing the onboarding flow first.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <Target className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Leverage AI Capabilities</h4>
                      <p className="text-sm text-muted-foreground">
                        Users love your AI features, and AI is the top market trend. Expand these capabilities to gain
                        competitive advantage.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <Target className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Rebalance Team Workload</h4>
                      <p className="text-sm text-muted-foreground">
                        Product team is overloaded with tasks. Consider redistributing work or adding resources.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Feedback Insights Tab */}
        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Insights</CardTitle>
              <CardDescription>Key insights from user feedback analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Top Feedback Cluster</h3>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">Onboarding flow is confusing</h4>
                        <Badge>24 mentions</Badge>
                      </div>
                      <div className="mb-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs">Priority Score</span>
                          <span className="text-xs font-medium">92/100</span>
                        </div>
                        <Progress value={92} className="h-1.5" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Users consistently report difficulty with the initial setup process.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Sentiment Distribution</h3>
                    <div className="p-3 border rounded-lg">
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs flex items-center">
                              <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>
                              Negative
                            </span>
                            <span className="text-xs font-medium">45%</span>
                          </div>
                          <Progress value={45} className="h-1.5 bg-muted"  />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs flex items-center">
                              <span className="h-2 w-2 rounded-full bg-amber-500 mr-1"></span>
                              Neutral
                            </span>
                            <span className="text-xs font-medium">30%</span>
                          </div>
                          <Progress value={30} className="h-1.5 bg-muted"  />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs flex items-center">
                              <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                              Positive
                            </span>
                            <span className="text-xs font-medium">25%</span>
                          </div>
                          <Progress value={25} className="h-1.5 bg-muted"  />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Feedback Sources</h3>
                    <div className="p-3 border rounded-lg">
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">Zoom Calls</span>
                            <span className="text-xs font-medium">35%</span>
                          </div>
                          <Progress value={35} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">Email</span>
                            <span className="text-xs font-medium">25%</span>
                          </div>
                          <Progress value={25} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">Slack</span>
                            <span className="text-xs font-medium">20%</span>
                          </div>
                          <Progress value={20} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">Other</span>
                            <span className="text-xs font-medium">20%</span>
                          </div>
                          <Progress value={20} className="h-1.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Key Feedback Insights</h3>
                  <div className="space-y-3">
                    {feedbackInsights.map((insight) => (
                      <div key={insight.id} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="rounded-full bg-blue-100 p-2">
                          <Lightbulb className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{insight.title}</h3>
                            <Badge variant={getImpactBadgeVariant(insight.impact)}>{insight.impact} impact</Badge>
                            {getTrendIcon(insight.trend)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                          <div className="flex items-center gap-1 text-sm text-primary">
                            <Zap className="h-4 w-4" />
                            <span>Recommendation: {insight.recommendation}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">{insight.change}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Task Insights Tab */}
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Task Insights</CardTitle>
              <CardDescription>Key insights from task management analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Task Status Distribution</h3>
                    <div className="p-3 border rounded-lg">
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">To Do</span>
                            <span className="text-xs font-medium">40%</span>
                          </div>
                          <Progress value={40} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">In Progress</span>
                            <span className="text-xs font-medium">35%</span>
                          </div>
                          <Progress value={35} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">Done</span>
                            <span className="text-xs font-medium">25%</span>
                          </div>
                          <Progress value={25} className="h-1.5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Task Priority Distribution</h3>
                    <div className="p-3 border rounded-lg">
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs flex items-center">
                              <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>
                              High
                            </span>
                            <span className="text-xs font-medium">30%</span>
                          </div>
                          <Progress value={30} className="h-1.5 bg-muted"  />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs flex items-center">
                              <span className="h-2 w-2 rounded-full bg-amber-500 mr-1"></span>
                              Medium
                            </span>
                            <span className="text-xs font-medium">45%</span>
                          </div>
                          <Progress value={45} className="h-1.5 bg-muted" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs flex items-center">
                              <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                              Low
                            </span>
                            <span className="text-xs font-medium">25%</span>
                          </div>
                          <Progress value={25} className="h-1.5 bg-muted"  />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Task Completion Rate</h3>
                    <div className="p-3 border rounded-lg">
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">On Time</span>
                            <span className="text-xs font-medium">62%</span>
                          </div>
                          <Progress value={62} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">Delayed</span>
                            <span className="text-xs font-medium">28%</span>
                          </div>
                          <Progress value={28} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">Overdue</span>
                            <span className="text-xs font-medium">10%</span>
                          </div>
                          <Progress value={10} className="h-1.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Key Task Insights</h3>
                  <div className="space-y-3">
                    {taskInsights.map((insight) => (
                      <div key={insight.id} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="rounded-full bg-purple-100 p-2">
                          <ListTodo className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{insight.title}</h3>
                            <Badge variant={getImpactBadgeVariant(insight.impact)}>{insight.impact} impact</Badge>
                            {getTrendIcon(insight.trend)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                          <div className="flex items-center gap-1 text-sm text-primary">
                            <Zap className="h-4 w-4" />
                            <span>Recommendation: {insight.recommendation}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">{insight.change}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Market Insights Tab */}
        <TabsContent value="market" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Insights</CardTitle>
              <CardDescription>Key insights from market analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Competitor Market Share</h3>
                    <div className="p-3 border rounded-lg">
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">CompetitorX</span>
                            <span className="text-xs font-medium">35%</span>
                          </div>
                          <Progress value={35} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">LegacyZ</span>
                            <span className="text-xs font-medium">25%</span>
                          </div>
                          <Progress value={25} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">StartupY</span>
                            <span className="text-xs font-medium">15%</span>
                          </div>
                          <Progress value={15} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">NewcomerA</span>
                            <span className="text-xs font-medium">8%</span>
                          </div>
                          <Progress value={8} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">Others</span>
                            <span className="text-xs font-medium">17%</span>
                          </div>
                          <Progress value={17} className="h-1.5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Top Market Trends</h3>
                    <div className="p-3 border rounded-lg">
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">AI-Powered Analytics</span>
                            <span className="text-xs font-medium">90%</span>
                          </div>
                          <Progress value={90} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">Integration Ecosystems</span>
                            <span className="text-xs font-medium">85%</span>
                          </div>
                          <Progress value={85} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">Privacy-Focused Solutions</span>
                            <span className="text-xs font-medium">80%</span>
                          </div>
                          <Progress value={80} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">Mobile-First Experience</span>
                            <span className="text-xs font-medium">75%</span>
                          </div>
                          <Progress value={75} className="h-1.5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">User Demographics</h3>
                    <div className="p-3 border rounded-lg">
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">SaaS</span>
                            <span className="text-xs font-medium">35%</span>
                          </div>
                          <Progress value={35} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">E-commerce</span>
                            <span className="text-xs font-medium">25%</span>
                          </div>
                          <Progress value={25} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">Healthcare</span>
                            <span className="text-xs font-medium">15%</span>
                          </div>
                          <Progress value={15} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">Other</span>
                            <span className="text-xs font-medium">25%</span>
                          </div>
                          <Progress value={25} className="h-1.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Key Market Insights</h3>
                  <div className="space-y-3">
                    {marketInsights.map((insight) => (
                      <div key={insight.id} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="rounded-full bg-amber-100 p-2">
                          <BarChart className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{insight.title}</h3>
                            <Badge variant={getImpactBadgeVariant(insight.impact)}>{insight.impact} impact</Badge>
                            {getTrendIcon(insight.trend)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                          <div className="flex items-center gap-1 text-sm text-primary">
                            <Zap className="h-4 w-4" />
                            <span>Recommendation: {insight.recommendation}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">{insight.change}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Business Context</CardTitle>
            <CardDescription>Company information and product vision used to personalize insights</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => setBusinessContextDialogOpen(true)}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit Context
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium mb-2">Company Information</h3>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Company:</span>
                  <span className="col-span-2 font-medium">{companyInfo.name}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Industry:</span>
                  <span className="col-span-2">{companyInfo.industry}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Size:</span>
                  <span className="col-span-2">{companyInfo.size}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Target Market:</span>
                  <span className="col-span-2">{companyInfo.target}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Description:</span>
                  <span className="col-span-2">{companyInfo.description}</span>
                </div>
              </div>

              <h3 className="text-sm font-medium mt-4 mb-2">Product Vision</h3>
              <div className="text-sm border rounded-md p-3 bg-muted/30">{productVision}</div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Linked Documents</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Info className="h-3.5 w-3.5 mr-1" />
                        <span>Used for context</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-xs">
                        These documents are used to provide additional context for generating personalized insights.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="space-y-2">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center gap-2">
                      {getDocumentIcon(doc.type)}
                      <span className="text-sm">{doc.title}</span>
                    </div>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm flex items-center"
                    >
                      <Globe className="h-3.5 w-3.5 mr-1" />
                      View
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 border border-dashed rounded-md bg-muted/20">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Paperclip className="h-4 w-4" />
                  <span>How this context influences insights:</span>
                </div>
                <ul className="mt-2 space-y-1 text-sm pl-6 list-disc">
                  <li>Prioritizes insights relevant to {companyInfo.industry} industry</li>
                  <li>Focuses on feedback from {companyInfo.target}</li>
                  <li>Aligns recommendations with your product vision</li>
                  <li>Considers information from linked documents</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button variant="outline" className="gap-1 mr-2" onClick={() => setShareDialogOpen(true)}>
          <Share2 className="h-4 w-4" />
          Share to Slack
        </Button>
        <Button variant="outline" className="gap-1">
          <ExternalLink className="h-4 w-4" />
          Export Insights Report
        </Button>
      </div>

      {/* Time Period Dialog */}
      <Dialog open={timeDialogOpen} onOpenChange={setTimeDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select Time Period</DialogTitle>
            <DialogDescription>Choose a time period to view insights from different time frames.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: "last7Days", label: "Last 7 Days" },
                  { id: "last30Days", label: "Last 30 Days" },
                  { id: "last90Days", label: "Last 90 Days" },
                  { id: "lastQuarter", label: "Last Quarter" },
                  { id: "lastYear", label: "Last Year" },
                ].map((period) => (
                  <div
                    key={period.id}
                    className={`flex items-center justify-between p-3 rounded-md cursor-pointer border ${
                      selectedTimePeriod === period.id ? "border-primary bg-primary/5" : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedTimePeriod(period.id)}
                  >
                    <span>{period.label}</span>
                    {selectedTimePeriod === period.id && <CheckCircle className="h-4 w-4 text-primary" />}
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <div
                  className={`flex items-center justify-between p-3 rounded-md cursor-pointer border ${
                    selectedTimePeriod === "custom" ? "border-primary bg-primary/5" : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedTimePeriod("custom")}
                >
                  <span>Custom Range</span>
                  {selectedTimePeriod === "custom" && <CheckCircle className="h-4 w-4 text-primary" />}
                </div>

                {selectedTimePeriod === "custom" && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="space-y-1">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTimeDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                // In a real app, this would fetch data for the selected time period
                // For now, we'll just close the dialog and the UI will update with the new data
                if (selectedTimePeriod === "custom") {
                  // Here you would typically fetch data for the custom date range
                  // For now, we'll just log the date range
                  console.log(`Custom date range: ${startDate} to ${endDate}`)
                }
                setTimeDialogOpen(false)
              }}
            >
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share to Slack Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Share to Slack</DialogTitle>
            <DialogDescription>Share a summary of these insights with your team on Slack.</DialogDescription>
          </DialogHeader>

          {!shareSuccess ? (
            <>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="slack-channel">Slack Channel</Label>
                  <div className="flex items-center gap-2">
                    <Slack className="h-5 w-5 text-[#4A154B]" />
                    <Input
                      id="slack-channel"
                      value={slackChannel}
                      onChange={(e) => setSlackChannel(e.target.value)}
                      placeholder="#general"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Include in Summary</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="include-metrics"
                        checked={includeMetrics}
                        onChange={(e) => setIncludeMetrics(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="include-metrics" className="font-normal">
                        Key Metrics
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="include-insights"
                        checked={includeTopInsights}
                        onChange={(e) => setIncludeTopInsights(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="include-insights" className="font-normal">
                        Top Insights
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="include-recommendations"
                        checked={includeRecommendations}
                        onChange={(e) => setIncludeRecommendations(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="include-recommendations" className="font-normal">
                        Strategic Recommendations
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div className="border rounded-md p-4 bg-[#F8F8F8] text-sm space-y-3 max-h-[250px] overflow-y-auto">
                    <div className="font-bold">
                      📊 Executive Insights Summary - {getTimePeriodDisplay(selectedTimePeriod)}
                    </div>

                    {includeMetrics && (
                      <div>
                        <div className="font-semibold">Key Metrics:</div>
                        <ul className="list-disc pl-5 space-y-1">
                          {keyMetrics.map((metric) => (
                            <li key={metric.title}>
                              {metric.title}: {metric.value}/100 (
                              {metric.trend === "up" ? "↑" : metric.trend === "down" ? "↓" : "→"} {metric.change})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {includeTopInsights && (
                      <div>
                        <div className="font-semibold">Top Insights:</div>
                        <ul className="list-disc pl-5 space-y-1">
                          {allInsights.slice(0, 3).map((insight) => (
                            <li key={insight.id}>
                              {insight.title} ({insight.impact} impact)
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {includeRecommendations && (
                      <div>
                        <div className="font-semibold">Strategic Recommendations:</div>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Prioritize Onboarding Redesign</li>
                          <li>Leverage AI Capabilities</li>
                          <li>Rebalance Team Workload</li>
                        </ul>
                      </div>
                    )}

                    <div>
                      <a href="#" className="text-blue-600 hover:underline">
                        View full report →
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleShareToSlack} className="gap-1">
                  <Slack className="h-4 w-4" />
                  Share to Slack
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto bg-green-100 text-green-800 rounded-full w-12 h-12 flex items-center justify-center">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium">Shared Successfully!</h3>
              <p className="text-sm text-muted-foreground">Your insights summary has been shared to {slackChannel}.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Business Context Dialog */}
      <Dialog open={businessContextDialogOpen} onOpenChange={setBusinessContextDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Business Context</DialogTitle>
            <DialogDescription>
              Add information about your company and product to personalize insights.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div>
              <h3 className="text-sm font-medium mb-3">Company Information</h3>
              <div className="grid gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                      id="company-name"
                      value={companyInfo.name}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-industry">Industry</Label>
                    <Input
                      id="company-industry"
                      value={companyInfo.industry}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, industry: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="company-size">Company Size</Label>
                    <Input
                      id="company-size"
                      value={companyInfo.size}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, size: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="target-market">Target Market</Label>
                    <Input
                      id="target-market"
                      value={companyInfo.target}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, target: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-description">Brief Description</Label>
                  <Textarea
                    id="company-description"
                    value={companyInfo.description}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, description: e.target.value })}
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Product Vision</h3>
              <div className="space-y-2">
                <Label htmlFor="product-vision">Vision Statement</Label>
                <Textarea
                  id="product-vision"
                  value={productVision}
                  onChange={(e) => setProductVision(e.target.value)}
                  placeholder="Describe your product vision and long-term goals..."
                  rows={3}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium">Linked Documents</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Info className="h-3.5 w-3.5 mr-1" />
                        <span>Used for context</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-xs">
                        Link to external documents like Notion pages, Google Docs, or Figma files to provide additional
                        context for generating personalized insights.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="space-y-3">
                <div className="border rounded-md divide-y max-h-[200px] overflow-y-auto">
                  {documents.length > 0 ? (
                    documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-2">
                          {getDocumentIcon(doc.type)}
                          <span className="text-sm">{doc.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm"
                          >
                            View
                          </a>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                            onClick={() => removeDocument(doc.id)}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No documents linked yet. Add your first document below.
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-[1fr,auto,1fr,auto] gap-2 items-end">
                  <div className="space-y-1">
                    <Label htmlFor="doc-title" className="text-xs">
                      Document Title
                    </Label>
                    <Input
                      id="doc-title"
                      value={newDocument.title}
                      onChange={(e) => setNewDocument({ ...newDocument, title: e.target.value })}
                      placeholder="Q1 Roadmap"
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="doc-type" className="text-xs">
                      Type
                    </Label>
                    <select
                      id="doc-type"
                      value={newDocument.type}
                      onChange={(e) => setNewDocument({ ...newDocument, type: e.target.value })}
                      className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                    >
                      <option value="link">Link</option>
                      <option value="notion">Notion</option>
                      <option value="gdoc">Google Doc</option>
                      <option value="figma">Figma</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="doc-url" className="text-xs">
                      URL
                    </Label>
                    <Input
                      id="doc-url"
                      value={newDocument.url}
                      onChange={(e) => setNewDocument({ ...newDocument, url: e.target.value })}
                      placeholder="https://..."
                      className="h-9"
                    />
                  </div>
                  <Button onClick={addDocument} size="sm" className="gap-1">
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setBusinessContextDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveBusinessContext}>Save Context</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

