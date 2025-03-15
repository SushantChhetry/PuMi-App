"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Plus,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertCircle,
  Grip,
  Calendar,
  User,
  Tag,
  LinkIcon,
  ArrowUpRight,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Enhanced Task type definition with startup-relevant fields
type Task = {
  id: string
  title: string
  description: string
  status: "todo" | "inProgress" | "done"
  priority: "low" | "medium" | "high"
  dueDate: string | null
  assignee: string | null
  tags: string[]
  businessValue: "low" | "medium" | "high"
  effort: "small" | "medium" | "large"
  dependencies: string[]
  links: { title: string; url: string }[]
}

// Column type definition
type Column = "todo" | "inProgress" | "done"

export default function TaskBoard() {
  // Sample tasks with enhanced fields
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Fix onboarding flow issues",
      description:
        "Users are getting stuck during the signup process. Need to simplify the form and add better error messages.",
      status: "todo",
      priority: "high",
      dueDate: "2025-03-25",
      assignee: "Sarah (Design)",
      tags: ["UX", "Onboarding"],
      businessValue: "high",
      effort: "medium",
      dependencies: ["User research"],
      links: [
        { title: "Figma Design", url: "https://figma.com/file/123" },
        { title: "User Feedback", url: "https://feedback.app/123" },
      ],
    },
    {
      id: "2",
      title: "Add more data visualization options",
      description: "Customers are requesting additional chart types for better data analysis.",
      status: "inProgress",
      priority: "medium",
      dueDate: "2025-04-10",
      assignee: "Mike (Engineering)",
      tags: ["Feature", "Analytics"],
      businessValue: "medium",
      effort: "large",
      dependencies: ["API updates"],
      links: [{ title: "Requirements Doc", url: "https://docs.google.com/123" }],
    },
    {
      id: "3",
      title: "Update API documentation",
      description: "Current docs are outdated and missing examples for new endpoints.",
      status: "todo",
      priority: "high",
      dueDate: "2025-03-30",
      assignee: "Alex (Engineering)",
      tags: ["Documentation", "API"],
      businessValue: "medium",
      effort: "medium",
      dependencies: [],
      links: [],
    },
    {
      id: "4",
      title: "Implement user feedback from latest survey",
      description: "Analyze and prioritize feedback from the Q1 user survey.",
      status: "inProgress",
      priority: "medium",
      dueDate: "2025-04-05",
      assignee: "Jamie (Product)",
      tags: ["Research", "Feedback"],
      businessValue: "high",
      effort: "small",
      dependencies: ["Survey completion"],
      links: [{ title: "Survey Results", url: "https://survey.app/results/123" }],
    },
    {
      id: "5",
      title: "Optimize loading performance",
      description: "Dashboard is loading too slowly for users with large datasets.",
      status: "done",
      priority: "medium",
      dueDate: "2025-03-15",
      assignee: "Taylor (Engineering)",
      tags: ["Performance", "Technical"],
      businessValue: "medium",
      effort: "medium",
      dependencies: [],
      links: [{ title: "Performance Metrics", url: "https://analytics.app/perf/123" }],
    },
    {
      id: "6",
      title: "Fix mobile responsive issues",
      description: "Several UI components don't render correctly on mobile devices.",
      status: "done",
      priority: "low",
      dueDate: "2025-03-10",
      assignee: "Sarah (Design)",
      tags: ["Mobile", "Bug"],
      businessValue: "medium",
      effort: "small",
      dependencies: [],
      links: [],
    },
  ])

  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [draggedTask, setDraggedTask] = useState<string | null>(null)

  // State for task editing
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // State for new link in task editor
  const [newLinkTitle, setNewLinkTitle] = useState("")
  const [newLinkUrl, setNewLinkUrl] = useState("")

  // State for new tag in task editor
  const [newTag, setNewTag] = useState("")

  // Filter tasks by status
  const todoTasks = tasks.filter((task) => task.status === "todo")
  const inProgressTasks = tasks.filter((task) => task.status === "inProgress")
  const doneTasks = tasks.filter((task) => task.status === "done")

  // Add a new task
  const addTask = () => {
    if (newTaskTitle.trim() === "") return

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: "",
      status: "todo",
      priority: "medium",
      dueDate: null,
      assignee: null,
      tags: [],
      businessValue: "medium",
      effort: "medium",
      dependencies: [],
      links: [],
    }

    setTasks([...tasks, newTask])
    setNewTaskTitle("")

    // Open the edit dialog for the new task
    setEditingTask(newTask)
    setIsEditDialogOpen(true)
  }

  // Move a task to a different status
  const moveTask = (taskId: string, newStatus: "todo" | "inProgress" | "done") => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
  }

  // Delete a task
  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  // Open edit dialog
  const openEditDialog = (task: Task) => {
    setEditingTask({ ...task })
    setIsEditDialogOpen(true)
  }

  // Save edited task
  const saveTask = () => {
    if (editingTask) {
      setTasks(tasks.map((task) => (task.id === editingTask.id ? editingTask : task)))
      setIsEditDialogOpen(false)
      setEditingTask(null)
    }
  }

  // Add a new link to the task being edited
  const addLink = () => {
    if (newLinkTitle.trim() === "" || newLinkUrl.trim() === "" || !editingTask) return

    const newLink = {
      title: newLinkTitle,
      url: newLinkUrl,
    }

    setEditingTask({
      ...editingTask,
      links: [...editingTask.links, newLink],
    })

    setNewLinkTitle("")
    setNewLinkUrl("")
  }

  // Remove a link from the task being edited
  const removeLink = (index: number) => {
    if (!editingTask) return

    const newLinks = [...editingTask.links]
    newLinks.splice(index, 1)

    setEditingTask({
      ...editingTask,
      links: newLinks,
    })
  }

  // Add a new tag to the task being edited
  const addTag = () => {
    if (newTag.trim() === "" || !editingTask) return

    if (!editingTask.tags.includes(newTag)) {
      setEditingTask({
        ...editingTask,
        tags: [...editingTask.tags, newTag],
      })
    }

    setNewTag("")
  }

  // Remove a tag from the task being edited
  const removeTag = (tag: string) => {
    if (!editingTask) return

    setEditingTask({
      ...editingTask,
      tags: editingTask.tags.filter((t) => t !== tag),
    })
  }

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTask(taskId)
    e.dataTransfer.setData("text/plain", taskId)
    // Make the drag image semi-transparent
    if (e.target instanceof HTMLElement) {
      e.dataTransfer.effectAllowed = "move"
    }
  }

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  // Handle drop
  const handleDrop = (e: React.DragEvent, columnStatus: Column) => {
    e.preventDefault()

    if (draggedTask) {
      moveTask(draggedTask, columnStatus)
      setDraggedTask(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Add Task Form */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Input
              placeholder="Add a new task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              className="flex-1"
            />
            <Button onClick={addTask}>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Task Board */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* To Do Column */}
        <div onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "todo")} className="h-full">
          <TaskColumn
            title="To Do"
            count={todoTasks.length}
            tasks={todoTasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
            onDragStart={handleDragStart}
            onEditTask={openEditDialog}
          />
        </div>

        {/* In Progress Column */}
        <div onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "inProgress")} className="h-full">
          <TaskColumn
            title="In Progress"
            count={inProgressTasks.length}
            tasks={inProgressTasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
            onDragStart={handleDragStart}
            onEditTask={openEditDialog}
          />
        </div>

        {/* Done Column */}
        <div onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "done")} className="h-full">
          <TaskColumn
            title="Done"
            count={doneTasks.length}
            tasks={doneTasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
            onDragStart={handleDragStart}
            onEditTask={openEditDialog}
          />
        </div>
      </div>

      {/* Task Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>Make changes to your task here. Click save when you're done.</DialogDescription>
          </DialogHeader>

          {editingTask && (
            <div className="grid gap-4 py-4">
              {/* Title */}
              <div className="grid gap-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                />
              </div>

              {/* Description */}
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  rows={3}
                />
              </div>

              {/* Status and Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={editingTask.status}
                    onValueChange={(value: "todo" | "inProgress" | "done") =>
                      setEditingTask({ ...editingTask, status: value })
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="inProgress">In Progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={editingTask.priority}
                    onValueChange={(value: "low" | "medium" | "high") =>
                      setEditingTask({ ...editingTask, priority: value })
                    }
                  >
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
              </div>

              {/* Due Date and Assignee */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="dueDate"
                      type="date"
                      value={editingTask.dueDate || ""}
                      onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="assignee">Assignee</Label>
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="assignee"
                      value={editingTask.assignee || ""}
                      onChange={(e) => setEditingTask({ ...editingTask, assignee: e.target.value })}
                      placeholder="Name (Role)"
                    />
                  </div>
                </div>
              </div>

              {/* Business Value and Effort */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="businessValue">Business Value</Label>
                  <Select
                    value={editingTask.businessValue}
                    onValueChange={(value: "low" | "medium" | "high") =>
                      setEditingTask({ ...editingTask, businessValue: value })
                    }
                  >
                    <SelectTrigger id="businessValue">
                      <SelectValue placeholder="Select value" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Impact</SelectItem>
                      <SelectItem value="medium">Medium Impact</SelectItem>
                      <SelectItem value="high">High Impact</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="effort">Effort</Label>
                  <Select
                    value={editingTask.effort}
                    onValueChange={(value: "small" | "medium" | "large") =>
                      setEditingTask({ ...editingTask, effort: value })
                    }
                  >
                    <SelectTrigger id="effort">
                      <SelectValue placeholder="Select effort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (Days)</SelectItem>
                      <SelectItem value="medium">Medium (Weeks)</SelectItem>
                      <SelectItem value="large">Large (Months)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tags */}
              <div className="grid gap-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editingTask.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="ml-1 rounded-full hover:bg-muted p-0.5">
                        <span className="sr-only">Remove</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M9 3L3 9M3 3L9 9"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center flex-1">
                    <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      placeholder="Add tag..."
                    />
                  </div>
                  <Button type="button" variant="outline" onClick={addTag}>
                    Add
                  </Button>
                </div>
              </div>

              {/* Dependencies */}
              <div className="grid gap-2">
                <Label htmlFor="dependencies">Dependencies</Label>
                <Textarea
                  id="dependencies"
                  value={editingTask.dependencies.join(", ")}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      dependencies: e.target.value
                        .split(",")
                        .map((dep) => dep.trim())
                        .filter((dep) => dep !== ""),
                    })
                  }
                  placeholder="Comma-separated list of dependencies"
                  rows={2}
                />
              </div>

              {/* Links */}
              <div className="grid gap-2">
                <Label>Links & Resources</Label>
                <div className="space-y-2 mb-2">
                  {editingTask.links.map((link, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted">
                      <div className="flex items-center gap-2">
                        <LinkIcon className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center"
                        >
                          {link.title}
                          <ArrowUpRight className="ml-1 h-3 w-3" />
                        </a>
                      </div>
                      <button
                        onClick={() => removeLink(index)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <span className="sr-only">Remove</span>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <Input value={newLinkTitle} onChange={(e) => setNewLinkTitle(e.target.value)} placeholder="Title" />
                  </div>
                  <div className="col-span-1">
                    <Input value={newLinkUrl} onChange={(e) => setNewLinkUrl(e.target.value)} placeholder="URL" />
                  </div>
                  <Button type="button" variant="outline" onClick={addLink}>
                    Add Link
                  </Button>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveTask}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Task Column Component
function TaskColumn({
  title,
  count,
  tasks,
  moveTask,
  deleteTask,
  onDragStart,
  onEditTask,
}: {
  title: string
  count: number
  tasks: Task[]
  moveTask: (taskId: string, status: "todo" | "inProgress" | "done") => void
  deleteTask: (taskId: string) => void
  onDragStart: (e: React.DragEvent, taskId: string) => void
  onEditTask: (task: Task) => void
}) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex justify-between items-center">
          <span>{title}</span>
          <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">{count}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 min-h-[200px]">
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-sm text-muted-foreground">No tasks</div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                moveTask={moveTask}
                deleteTask={deleteTask}
                onDragStart={onDragStart}
                onEditTask={onEditTask}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Task Card Component
function TaskCard({
  task,
  moveTask,
  deleteTask,
  onDragStart,
  onEditTask,
}: {
  task: Task
  moveTask: (taskId: string, status: "todo" | "inProgress" | "done") => void
  deleteTask: (taskId: string) => void
  onDragStart: (e: React.DragEvent, taskId: string) => void
  onEditTask: (task: Task) => void
}) {
  return (
    <div
      className="p-3 bg-background border rounded-md cursor-move hover:border-primary/50 transition-colors"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onClick={() => onEditTask(task)}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Grip className="h-4 w-4 text-muted-foreground cursor-grab" />
            {task.priority === "high" && <AlertCircle className="h-4 w-4 text-destructive" />}
            {task.priority === "medium" && <Clock className="h-4 w-4 text-amber-500" />}
            {task.priority === "low" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
            <span className="text-sm font-medium">{task.title}</span>
          </div>

          {/* Preview of task details */}
          <div className="space-y-1 mt-2 text-xs">
            {task.description && <p className="text-muted-foreground line-clamp-2">{task.description}</p>}

            <div className="flex flex-wrap gap-1 mt-2">
              {task.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between mt-2 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{task.dueDate || "No date"}</span>
              </div>

              {task.assignee && (
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{task.assignee}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                onEditTask(task)
              }}
            >
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                moveTask(task.id, "todo")
              }}
              disabled={task.status === "todo"}
            >
              Move to To Do
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                moveTask(task.id, "inProgress")
              }}
              disabled={task.status === "inProgress"}
            >
              Move to In Progress
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                moveTask(task.id, "done")
              }}
              disabled={task.status === "done"}
            >
              Move to Done
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                deleteTask(task.id)
              }}
              className="text-destructive"
            >
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

