"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Filter, RefreshCw, Zap, X, Eye, CheckCircle2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DashboardView() {
  // State for managing visible clusters
  const [visibleClusters, setVisibleClusters] = useState<number[]>([1, 2, 3, 4])

  // State for dialogs
  const [createTaskOpen, setCreateTaskOpen] = useState(false)
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false)
  const [dismissDialogOpen, setDismissDialogOpen] = useState(false)
  const [selectedCluster, setSelectedCluster] = useState<any>(null)

  // Sample feedback clusters
  const feedbackClusters = [
    {
      id: 1,
      title: "Onboarding flow is confusing",
      count: 24,
      priority: 92,
      sentiment: "negative",
      sources: ["Zoom Calls", "Email"],
      snippets: [
        "I couldn't figure out how to set up my account",
        "The onboarding steps weren't clear to me",
        "Got stuck during the initial setup",
      ],
      details:
        "Users consistently report difficulty with the initial setup process. The most common pain points include account creation, connecting data sources, and understanding the dashboard layout. This feedback comes primarily from new users in their first week.",
    },
    {
      id: 2,
      title: "Need better data visualization options",
      count: 18,
      priority: 78,
      sentiment: "neutral",
      sources: ["Slack", "User Interviews"],
      snippets: [
        "Would love to see more chart types",
        "The current graphs don't show what I need",
        "Can we get better export options for charts?",
      ],
      details:
        "Users are requesting additional visualization options beyond the current bar and line charts. Specific requests include heat maps, scatter plots, and customizable dashboards. This feedback comes primarily from power users who use the platform daily.",
    },
    {
      id: 3,
      title: "Love the AI recommendations feature",
      count: 15,
      priority: 65,
      sentiment: "positive",
      sources: ["Email", "In-app Feedback"],
      snippets: [
        "The AI suggestions are spot on!",
        "Recommendations feature saves me so much time",
        "Really impressed with how accurate the AI is",
      ],
      details:
        "Users are highly satisfied with the AI recommendation engine. They specifically mention the accuracy of suggestions and time savings. This positive feedback comes from users across all segments, with particularly strong sentiment from enterprise customers.",
    },
    {
      id: 4,
      title: "API documentation needs improvement",
      count: 12,
      priority: 81,
      sentiment: "negative",
      sources: ["GitHub Issues", "Slack"],
      snippets: [
        "Can't find examples for the API endpoints",
        "Documentation is outdated",
        "Need better API reference docs",
      ],
      details:
        "Developers are struggling with our API documentation. The main issues include outdated examples, missing endpoint descriptions, and lack of clear authentication guides. This feedback comes primarily from integration partners and developers building on our platform.",
    },
  ]

  // Handle dismiss cluster
  const handleDismiss = (id: number) => {
    setVisibleClusters(visibleClusters.filter((clusterId) => clusterId !== id))
    setDismissDialogOpen(false)
  }

  // Open create task dialog
  const openCreateTask = (cluster: any) => {
    setSelectedCluster(cluster)
    setCreateTaskOpen(true)
  }

  // Open view details dialog
  const openViewDetails = (cluster: any) => {
    setSelectedCluster(cluster)
    setViewDetailsOpen(true)
  }

  // Open dismiss confirmation dialog
  const openDismissDialog = (cluster: any) => {
    setSelectedCluster(cluster)
    setDismissDialogOpen(true)
  }

  // Filter clusters to only show visible ones
  const filteredClusters = feedbackClusters.filter((cluster) => visibleClusters.includes(cluster.id))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Feedback Insights</h2>
          <p className="text-sm text-muted-foreground">Last updated 2 hours ago</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1 rounded-md border px-3 py-1 text-sm hover:bg-muted">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          <button className="inline-flex items-center gap-1 rounded-md border px-3 py-1 text-sm hover:bg-muted">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">From 5 different sources</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Feedback Clusters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{visibleClusters.length}</div>
            <p className="text-xs text-muted-foreground">AI-generated themes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Priority Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76/100</div>
            <p className="text-xs text-muted-foreground">Based on impact & frequency</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Top Feedback Clusters</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <BarChart3 className="h-4 w-4" />
            <span>Sorted by priority</span>
          </div>
        </div>

        {filteredClusters.length > 0 ? (
          filteredClusters.map((cluster) => (
            <Card key={cluster.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="flex-1 p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{cluster.title}</h4>
                    <Badge
                      variant={
                        cluster.sentiment === "positive"
                          ? "default"
                          : cluster.sentiment === "negative"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {cluster.count} mentions
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Priority Score</span>
                      <span className="text-sm font-medium">{cluster.priority}/100</span>
                    </div>
                    <Progress value={cluster.priority} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Sources: {cluster.sources.join(", ")}</div>
                    <div className="text-sm">
                      <span className="font-medium">Sample feedback:</span>
                      <ul className="mt-1 space-y-1 text-muted-foreground">
                        {cluster.snippets.map((snippet, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="mt-1 h-1 w-1 rounded-full bg-muted-foreground"></span>
                            <span>"{snippet}"</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col gap-2 border-t sm:border-l sm:border-t-0 p-4 bg-muted/30 sm:w-48">
                  <button
                    className="inline-flex items-center justify-center gap-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    onClick={() => openCreateTask(cluster)}
                  >
                    <Zap className="h-4 w-4" />
                    <span>Create Task</span>
                  </button>
                  <button
                    className="inline-flex items-center justify-center gap-1 rounded-md border px-3 py-2 text-sm hover:bg-muted"
                    onClick={() => openViewDetails(cluster)}
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </button>
                  <button
                    className="inline-flex items-center justify-center gap-1 rounded-md border border-destructive/30 px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
                    onClick={() => openDismissDialog(cluster)}
                  >
                    <X className="h-4 w-4" />
                    <span>Dismiss</span>
                  </button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-3">
              <CheckCircle2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">All clusters processed</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              You've reviewed all feedback clusters. Check back later for new insights or refresh to analyze your data
              again.
            </p>
            <button
              className="mt-4 inline-flex items-center justify-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              onClick={() => setVisibleClusters([1, 2, 3, 4])}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Reset Clusters
            </button>
          </div>
        )}
      </div>

      {/* Create Task Dialog */}
      <Dialog open={createTaskOpen} onOpenChange={setCreateTaskOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Task from Feedback</DialogTitle>
            <DialogDescription>Convert this feedback cluster into an actionable task for your team.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="task-title">Task Title</Label>
              <Input id="task-title" defaultValue={selectedCluster ? `Fix: ${selectedCluster.title}` : ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-description">Description</Label>
              <Textarea
                id="task-description"
                rows={4}
                defaultValue={selectedCluster ? `Based on user feedback: "${selectedCluster.snippets[0]}"` : ""}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select defaultValue="high">
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignee">Assign To</Label>
                <Select defaultValue="product">
                  <SelectTrigger id="assignee">
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product">Product Team</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => {
                // Here you would typically send this to your task management system
                alert(`Task created: ${selectedCluster?.title}`)
                setCreateTaskOpen(false)
              }}
            >
              Create Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedCluster?.title}</DialogTitle>
            <DialogDescription>Detailed analysis of this feedback cluster</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <Badge
                variant={
                  selectedCluster?.sentiment === "positive"
                    ? "default"
                    : selectedCluster?.sentiment === "negative"
                      ? "destructive"
                      : "secondary"
                }
                className="px-3 py-1"
              >
                {selectedCluster?.count} mentions
              </Badge>
              <span className="text-sm font-medium">Priority: {selectedCluster?.priority}/100</span>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Analysis</h4>
              <p className="text-sm text-muted-foreground">{selectedCluster?.details}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Sources</h4>
              <div className="text-sm text-muted-foreground">{selectedCluster?.sources.join(", ")}</div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">All Feedback Snippets</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {selectedCluster?.snippets.map((snippet: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 p-2 rounded-md bg-muted">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0"></span>
                    <span>"{snippet}"</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setViewDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dismiss Confirmation Dialog */}
      <Dialog open={dismissDialogOpen} onOpenChange={setDismissDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dismiss Feedback Cluster</DialogTitle>
            <DialogDescription>
              Are you sure you want to dismiss this feedback cluster? It will be removed from your dashboard.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={() => selectedCluster && handleDismiss(selectedCluster.id)}>
              Dismiss
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

