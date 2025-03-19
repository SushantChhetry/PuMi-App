"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  MessageSquare,
  X,
  Send,
  Zap,
  ChevronUp,
  ChevronDown,
  BarChart,
  ListTodo,
  Users,
  Calendar,
  Lightbulb,
  Clock,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

type Message = {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
  type?: "text" | "task" | "chart" | "feedback" | "notification"
  data?: any
}

type SuggestedQuery = {
  text: string
  icon: React.ReactNode
}

export function ChatAssistant({ onNavigate }: { onNavigate?: ((view: "home" | "dashboard" | "taskboard" | "profile" | "marketinsights" | "insights") => void )}) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi there! I'm your AI assistant. How can I help you today?",
      sender: "assistant",
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Suggested queries that founders might want to ask
  const suggestedQueries: SuggestedQuery[] = [
    { text: "Show me pending tasks", icon: <ListTodo className="h-3.5 w-3.5" /> },
    { text: "Summarize top feedback", icon: <MessageSquare className="h-3.5 w-3.5" /> },
    { text: "Any competitor updates?", icon: <BarChart className="h-3.5 w-3.5" /> },
    { text: "Team workload status", icon: <Users className="h-3.5 w-3.5" /> },
  ]

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)
    setShowSuggestions(false)

    // Simulate AI thinking
    setTimeout(() => {
      generateResponse(inputValue)
      setIsTyping(false)
    }, 1000)
  }

  const generateResponse = (query: string) => {
    const lowerQuery = query.toLowerCase()
    let response: Message

    // Task-related queries
    if (
      lowerQuery.includes("pending task") ||
      lowerQuery.includes("show me task") ||
      lowerQuery.includes("critical task")
    ) {
      response = {
        id: Date.now().toString(),
        content: "Here are your pending critical tasks:",
        sender: "assistant",
        timestamp: new Date(),
        type: "task",
        data: {
          tasks: [
            { id: 1, title: "Fix mobile login crash", dueDate: "Today", assignee: "Engineering", priority: "high" },
            { id: 2, title: "Simplify onboarding flow", dueDate: "Tomorrow", assignee: "Product", priority: "high" },
            { id: 3, title: "Prepare investor update", dueDate: "Today", assignee: "You", priority: "high" },
          ],
        },
      }
    }
    // Feedback-related queries
    else if (lowerQuery.includes("feedback") || lowerQuery.includes("user comment")) {
      response = {
        id: Date.now().toString(),
        content: "Here's a summary of top feedback this week:",
        sender: "assistant",
        timestamp: new Date(),
        type: "feedback",
        data: {
          insights: [
            { title: "Onboarding flow is confusing", mentions: 24, sentiment: "negative" },
            { title: "Users love the new AI feature", mentions: 15, sentiment: "positive" },
            { title: "Mobile app crashes on login", mentions: 8, sentiment: "negative" },
          ],
        },
      }
    }
    // Competitor or market-related queries
    else if (lowerQuery.includes("competitor") || lowerQuery.includes("market")) {
      response = {
        id: Date.now().toString(),
        content: "Here are the latest competitor updates:",
        sender: "assistant",
        timestamp: new Date(),
        type: "chart",
        data: {
          updates: [
            { title: "CompetitorX secured $10M funding", impact: "high", date: "Yesterday", risk: "high" },
            { title: "New market entrant with similar product", impact: "medium", date: "3 days ago", risk: "medium" },
          ],
          trends: ["AI-Powered Analytics", "Mobile-First Experience"],
        },
      }
    }
    // Team-related queries
    else if (lowerQuery.includes("team") || lowerQuery.includes("workload")) {
      response = {
        id: Date.now().toString(),
        content: "Here's the current team workload status:",
        sender: "assistant",
        timestamp: new Date(),
        type: "chart",
        data: {
          team: [
            { name: "Sarah", role: "Product", tasks: 5, capacity: 50 },
            { name: "Mike", role: "Engineering", tasks: 8, capacity: 80 },
            { name: "Alex", role: "Design", tasks: 3, capacity: 30 },
          ],
        },
      }
    }
    // Assignment or delegation
    else if (lowerQuery.includes("assign") || lowerQuery.includes("delegate")) {
      const taskMatch = lowerQuery.match(/assign (.*?) to (.*)/i)
      let task = "the task"
      let person = "the team"

      if (taskMatch && taskMatch.length >= 3) {
        task = taskMatch[1]
        person = taskMatch[2]
      }

      response = {
        id: Date.now().toString(),
        content: `I've assigned "${task}" to ${person}. They've been notified and the task has been added to their queue.`,
        sender: "assistant",
        timestamp: new Date(),
        type: "notification",
        data: {
          action: "assign",
          task,
          person,
        },
      }
    }
    // Default response for other queries
    else {
      response = {
        id: Date.now().toString(),
        content: `I've analyzed your query about "${query}". Based on your dashboard data, here are some insights:
        
1. Your user growth is trending up by 15% this month
2. The most critical issue to address is the mobile login crash
3. CompetitorX's recent funding might impact your market position

Would you like me to help you take any specific actions based on these insights?`,
        sender: "assistant",
        timestamp: new Date(),
      }
    }

    setMessages((prev) => [...prev, response])
  }

  const handleSuggestedQuery = (query: string) => {
    setInputValue(query)
    setTimeout(() => {
      handleSendMessage()
    }, 100)
  }

  const renderMessageContent = (message: Message) => {
    if (message.sender === "user" || message.type === "text") {
      return <p className="whitespace-pre-wrap">{message.content}</p>
    }

    switch (message.type) {
      case "task":
        return (
          <div className="space-y-2">
            <p>{message.content}</p>
            <div className="space-y-2 mt-2">
              {message.data.tasks.map((task: any) => (
                <div key={task.id} className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      task.priority === "high"
                        ? "bg-red-500"
                        : task.priority === "medium"
                          ? "bg-orange-500"
                          : "bg-green-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{task.title}</p>
                      <Badge
                        variant={
                          task.priority === "high"
                            ? "destructive"
                            : task.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                        className={
                          task.priority === "high"
                            ? "bg-red-500"
                            : task.priority === "medium"
                              ? "bg-orange-500"
                              : "bg-green-500"
                        }
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {task.dueDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {task.assignee}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-between mt-1"
                onClick={() => onNavigate && onNavigate("taskboard")}
              >
                <span>View All Tasks</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )

      case "feedback":
        return (
          <div className="space-y-2">
            <p>{message.content}</p>
            <div className="space-y-2 mt-2">
              {message.data.insights.map((insight: any, index: number) => (
                <div key={index} className="p-2 bg-muted rounded-md">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{insight.title}</p>
                    <Badge
                      variant={insight.sentiment === "positive" ? "default" : "destructive"}
                      className={insight.sentiment === "positive" ? "bg-green-500" : "bg-red-500"}
                    >
                      {insight.mentions} mentions
                    </Badge>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-between mt-1"
                onClick={() => onNavigate && onNavigate("dashboard")}
              >
                <span>View All Feedback</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )

      case "chart":
        if (message.data.updates) {
          return (
            <div className="space-y-2">
              <p>{message.content}</p>
              <div className="space-y-2 mt-2">
                {message.data.updates.map((update: any, index: number) => (
                  <div key={index} className="p-2 bg-muted rounded-md">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{update.title}</p>
                      <div className="flex items-center gap-1">
                        <Badge
                          variant={update.impact === "high" ? "destructive" : "default"}
                          className={update.impact === "high" ? "bg-red-500" : "bg-orange-500"}
                        >
                          {update.impact} impact
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            update.risk === "high" ? "border-red-500 text-red-500" : "border-orange-500 text-orange-500"
                          }
                        >
                          {update.risk} risk
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Reported {update.date}</p>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between mt-1"
                  onClick={() => onNavigate && onNavigate("marketinsights")}
                >
                  <span>View Market Insights</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          )
        } else if (message.data.team) {
          return (
            <div className="space-y-2">
              <p>{message.content}</p>
              <div className="space-y-2 mt-2">
                {message.data.team.map((member: any, index: number) => (
                  <div key={index} className="p-2 bg-muted rounded-md">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">
                            {member.name} ({member.role})
                          </p>
                          <span className="text-xs">{member.tasks} tasks</span>
                        </div>
                        <Progress
                          value={member.capacity}
                          className="h-1.5 mt-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        }
        return <p>{message.content}</p>

      case "notification":
        return (
          <div className="space-y-2">
            <p>{message.content}</p>
            <div className="flex items-center gap-2 mt-2">
              <Button variant="outline" size="sm">
                Undo
              </Button>
              <Button size="sm">View Task</Button>
            </div>
          </div>
        )

      default:
        return <p>{message.content}</p>
    }
  }

  return (
    <>
      {/* Chat toggle button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 z-50 rounded-full shadow-lg ${isOpen ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"}`}
        size="icon"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-16 right-4 z-50 w-80 md:w-96 shadow-xl flex flex-col h-[500px] max-h-[80vh] border">
          <div className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center gap-2">
              <div className="bg-primary rounded-full p-1.5">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <h3 className="font-medium">AI Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setShowSuggestions(!showSuggestions)}
            >
              {showSuggestions ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
          </div>

          {/* Suggested queries */}
          {showSuggestions && (
            <div className="p-2 border-b bg-muted/50">
              <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-1.5">
                {suggestedQueries.map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => handleSuggestedQuery(query.text)}
                  >
                    {query.icon}
                    <span className="ml-1">{query.text}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Messages container */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {renderMessageContent(message)}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-lg p-3 bg-muted">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce"></div>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce delay-75"></div>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-3 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-muted rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Button type="submit" size="icon" className="h-8 w-8" disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1">
                <Lightbulb className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">AI-powered insights</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Updated just now</span>
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}

