"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  MessageSquare,
  ListTodo,
  Upload,
  Download,
  Settings,
  Users,
  Search,
  ArrowRight,
  ExternalLink,
} from "lucide-react"

interface DocumentationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function DocumentationModal({ open, onOpenChange }: DocumentationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">PuMi Documentation</DialogTitle>
          <DialogDescription>Learn how to use PuMi to manage feedback and tasks for your startup</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="getting-started" className="mt-4">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="feedback">Feedback Synthesis</TabsTrigger>
            <TabsTrigger value="tasks">Task Board</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          {/* Getting Started */}
          <TabsContent value="getting-started" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Welcome to PuMi</h3>
              <p>
                PuMi is designed to help early-stage startups collect, analyze, and act on user feedback while managing
                tasks efficiently. Here's how to get started:
              </p>

              <div className="grid gap-4 mt-6">
                <div className="flex items-start gap-3 p-4 border rounded-lg">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">1. Collect Feedback</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Upload feedback from various sources or connect integrations like Slack, Email, or Zoom.
                    </p>
                    <Button variant="link" className="px-0 text-sm h-auto" onClick={() => onOpenChange(false)}>
                      Go to Upload <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border rounded-lg">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">2. Analyze Insights</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Review AI-generated feedback clusters and prioritized insights on your dashboard.
                    </p>
                    <Button variant="link" className="px-0 text-sm h-auto" onClick={() => onOpenChange(false)}>
                      Go to Dashboard <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border rounded-lg">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <ListTodo className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">3. Create Tasks</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Convert insights into actionable tasks and manage them in the Task Board.
                    </p>
                    <Button variant="link" className="px-0 text-sm h-auto" onClick={() => onOpenChange(false)}>
                      Go to Task Board <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg mt-6">
                <h4 className="font-medium">Pro Tips for Startups</h4>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      Focus on high-priority feedback clusters first to maximize impact with limited resources.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Use the Task Board to assign clear owners and deadlines for accountability.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Regularly export insights to share with your team or investors.</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* Feedback Synthesis */}
          <TabsContent value="feedback" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Feedback Synthesis</h3>
              <p>
                The Feedback Synthesis tool helps you make sense of user feedback by automatically clustering similar
                comments and prioritizing them based on frequency, sentiment, and impact.
              </p>

              <div className="grid gap-4 mt-6">
                <div className="flex items-start gap-3 p-4 border rounded-lg">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Upload className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Uploading Feedback</h4>
                    <p className="text-sm text-muted-foreground mt-1">Upload feedback from various sources:</p>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span>Direct file uploads (.txt, .csv, .pdf)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span>Integrations with Slack, Email, Zoom, etc.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span>URL imports from websites or documents</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border rounded-lg">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Understanding Clusters</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Feedback clusters are groups of similar comments organized by theme. Each cluster shows:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span>Priority score (based on frequency, sentiment, and impact)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span>Number of mentions across all sources</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span>Sample feedback snippets</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span>Sources of the feedback</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border rounded-lg">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Download className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Exporting Insights</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Export your feedback insights in various formats:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span>CSV/Excel for data analysis</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span>PDF reports for sharing with stakeholders</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span>Direct integration with tools like Notion, GitHub, or Trello</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Task Board */}
          <TabsContent value="tasks" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Task Board</h3>
              <p>
                The Task Board helps you organize and track work items in a simple Kanban-style interface. It's perfect
                for small teams that need a lightweight task management solution.
              </p>

              <div className="grid gap-4 mt-6">
                <div className="flex items-start gap-3 p-4 border rounded-lg">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <ListTodo className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Creating Tasks</h4>
                    <p className="text-sm text-muted-foreground mt-1">Create tasks in two ways:</p>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span>Directly from feedback clusters using the "Create Task" button</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span>Manually by adding a new task in the Task Board</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border rounded-lg">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Task Details</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Each task can include startup-relevant information:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span>Title and description</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span>Priority level and business value</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span>Assignee and due date</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span>Tags, dependencies, and resource links</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span>Effort estimation</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border rounded-lg">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Settings className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Managing Tasks</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      The Task Board offers several management features:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span>Drag-and-drop between To Do, In Progress, and Done columns</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span>Edit task details by clicking on any task</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span>Quick actions menu for moving or deleting tasks</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* FAQ */}
          <TabsContent value="faq" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Frequently Asked Questions</h3>

              <div className="space-y-4 mt-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">How does the AI prioritize feedback?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Our AI analyzes feedback based on frequency (how often it's mentioned), sentiment
                    (positive/negative), and potential impact on users. This creates a priority score that helps you
                    focus on what matters most.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Can I customize the priority scoring?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Yes, on paid plans you can adjust the weighting of different factors in the priority algorithm to
                    match your startup's specific needs and goals.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">How many team members can I add?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    The Free plan supports 1 user, Starter plan supports up to 5 team members, Pro plan supports up to
                    15, and Enterprise offers unlimited team members.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Can I import tasks from other tools?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Yes, on paid plans you can import tasks from tools like Trello, Asana, or GitHub Issues. Contact
                    support for help with custom imports.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Is my data secure?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Yes, we use industry-standard encryption and security practices. Your data is encrypted at rest and
                    in transit. Enterprise plans offer additional security features like SSO and custom data retention
                    policies.
                  </p>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg mt-6">
                <h4 className="font-medium">Need more help?</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  If you can't find the answer you're looking for, reach out to our support team.
                </p>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm">
                    Contact Support
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Visit Knowledge Base
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-4">
          <DialogClose asChild>
            <Button>Close Documentation</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

