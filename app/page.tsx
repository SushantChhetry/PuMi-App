"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardView from "@/components/dashboard-view"
import UploadView from "@/components/upload-view"
import ExportView from "@/components/export-view"
import HomePage from "@/components/home-page"
import TaskBoard from "@/components/task-board"
import PricingModal from "@/components/pricing-modal"
import ProfileSettings from "@/components/profile-settings"
import DocumentationModal from "@/components/documentation-modal"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import MarketInsightsView from "@/components/market-insights-view"
import InsightsView from "@/components/insights-view"
import LoginPage from "@/components/login-page"

export default function Home() {
  const [currentView, setCurrentView] = useState<
    "home" | "dashboard" | "taskboard" | "profile" | "marketinsights" | "insights"
  >("home")
  const [isPricingOpen, setIsPricingOpen] = useState(false)
  const [isDocumentationOpen, setIsDocumentationOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check if user is logged in from localStorage on initial load
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn")
    if (loginStatus === "true") {
      setIsLoggedIn(true)
    }
  }, [])

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true)
    localStorage.setItem("isLoggedIn", "true")
  }

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("isLoggedIn")
  }

  // Function to navigate between views
  const navigateTo = (view: "home" | "dashboard" | "taskboard" | "profile" | "marketinsights" | "insights") => {
    setCurrentView(view)
  }

  // If not logged in, show login page
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6">
        <div className="flex items-center gap-2 font-semibold cursor-pointer" onClick={() => navigateTo("home")}>
          <img src="/Logo-transparent.png" alt="PuMi Logo" className="h-12 w-auto" />
        </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" className="text-sm font-medium" onClick={() => navigateTo("insights")}>
              Executive Insights
            </Button>
            <button
              className="text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setIsDocumentationOpen(true)}
            >
              Documentation
            </button>
            <Button
              className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-md hover:bg-primary/20"
              onClick={() => setIsPricingOpen(true)}
            >
              Upgrade
            </Button>
            <Avatar
              className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all"
              onClick={() => navigateTo("profile")}
            >
              <AvatarFallback className="text-sm font-medium">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container px-4 py-6 sm:px-6">
        {currentView === "home" && <HomePage onNavigate={navigateTo} />}

        {currentView === "dashboard" && (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight">Feedback Synthesis</h1>
              <p className="text-muted-foreground mt-1">
                Turn messy user feedback into clear product direction instantly
              </p>
            </div>

            <Tabs defaultValue="dashboard" className="space-y-4">
              <TabsList>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="upload">Upload Feedback</TabsTrigger>
                <TabsTrigger value="export">Export Insights</TabsTrigger>
              </TabsList>
              <TabsContent value="dashboard" className="space-y-4">
                <DashboardView />
              </TabsContent>
              <TabsContent value="upload" className="space-y-4">
                <UploadView />
              </TabsContent>
              <TabsContent value="export" className="space-y-4">
                <ExportView />
              </TabsContent>
            </Tabs>
          </>
        )}

        {currentView === "taskboard" && (
          <div className="space-y-4">
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight">Task Board</h1>
              <p className="text-muted-foreground mt-1">
                Manage and track your tasks in a simple, lightweight interface
              </p>
            </div>
            <TaskBoard />
          </div>
        )}

        {currentView === "marketinsights" && (
          <div className="space-y-4">
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight">Market Insights</h1>
              <p className="text-muted-foreground mt-1">
                Track competitors, market trends, and strategic opportunities
              </p>
            </div>
            <MarketInsightsView />
          </div>
        )}

        {currentView === "insights" && (
          <div className="space-y-4">
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight">Executive Insights</h1>
              <p className="text-muted-foreground mt-1">
                Consolidated insights across feedback, tasks, and market analysis
              </p>
            </div>
            <InsightsView />
          </div>
        )}

        {currentView === "profile" && (
          <ProfileSettings
            onClose={() => navigateTo("home")}
            setIsPricingOpen={setIsPricingOpen}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Modals */}
      <PricingModal open={isPricingOpen} onOpenChange={setIsPricingOpen} />
      <DocumentationModal open={isDocumentationOpen} onOpenChange={setIsDocumentationOpen} />
    </div>
  )
}

