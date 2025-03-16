"use client"

import { ArrowRight, MessageSquare, ListTodo, LineChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface HomePageProps {
  onNavigate: (view: "home" | "dashboard" | "taskboard" | "marketinsights") => void
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Welcome Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Welcome to PuMi</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          This tool helps you quickly gather, prioritize, and track feedback or tasks, all in one place.
        </p>
      </div>

      {/* Main Options */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* UserSynthesizer Dashboard Option */}
        <Card className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="pb-3 bg-primary/5">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              User Feedback Dashboard
            </CardTitle>
            <CardDescription>AI-powered feedback analysis and prioritization</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <ArrowRight className="h-3 w-3 text-primary" />
                  </span>
                  <span>Automatically cluster and prioritize user feedback</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <ArrowRight className="h-3 w-3 text-primary" />
                  </span>
                  <span>Import feedback from multiple sources</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <ArrowRight className="h-3 w-3 text-primary" />
                  </span>
                  <span>Generate actionable insights with AI</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="pt-4 pb-6">
            <Button className="w-full" onClick={() => onNavigate("dashboard")}>
              View Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Lightweight Task Board Option */}
        <Card className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="pb-3 bg-primary/5">
            <CardTitle className="flex items-center gap-2">
              <ListTodo className="h-5 w-5" />
              Task Board
            </CardTitle>
            <CardDescription>Simple task management and tracking</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <ArrowRight className="h-3 w-3 text-primary" />
                  </span>
                  <span>Organize tasks with a simple Kanban board</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <ArrowRight className="h-3 w-3 text-primary" />
                  </span>
                  <span>Track progress with visual status indicators</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <ArrowRight className="h-3 w-3 text-primary" />
                  </span>
                  <span>Quickly add and manage tasks without complexity</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="pt-4 pb-6">
            <Button className="w-full" onClick={() => onNavigate("taskboard")}>
              Go to Task Board
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Market Insights */}
        <Card className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="pb-3 bg-primary/5">
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5" />
              Market Insights Dashboard
            </CardTitle>
            <CardDescription>Competitor analysis and market trends</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <ArrowRight className="h-3 w-3 text-primary" />
                  </span>
                  <span>Track competitor features and positioning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <ArrowRight className="h-3 w-3 text-primary" />
                  </span>
                  <span>Analyze market trends and opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <ArrowRight className="h-3 w-3 text-primary" />
                  </span>
                  <span>Monitor industry news and updates</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="pt-4 pb-6">
            <Button className="w-full" onClick={() => onNavigate("marketinsights")}>
              Go to Market Insights
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Additional Info */}
      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          Need help getting started? Check out our{" "}
          <a href="#" className="text-primary hover:underline">
            documentation
          </a>{" "}
          or{" "}
          <a href="#" className="text-primary hover:underline">
            contact support
          </a>
          .
        </p>
      </div>
    </div>
  )
}

