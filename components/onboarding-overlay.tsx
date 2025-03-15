"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function OnboardingOverlay() {
  const [isVisible, setIsVisible] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)

  if (!isVisible) return null

  const steps = [
    {
      title: "Welcome to Insight Synthesizer!",
      description: "Let's get you started with turning feedback into actionable insights.",
      target: "Connect your feedback sources or upload files to begin.",
      position: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
      highlight: null,
    },
    {
      title: "Connect Your Feedback Sources",
      description: "Start by connecting Slack, Zoom, or upload files directly.",
      target: "Click on the Upload Feedback tab to get started.",
      position: { top: "120px", left: "25%", transform: "translateX(-50%)" },
      highlight: "upload-tab",
    },
    {
      title: "Review AI-Generated Insights",
      description: "Your feedback will be automatically clustered and prioritized.",
      target: "Review clusters, merge similar ones, and adjust priorities if needed.",
      position: { top: "40%", left: "50%", transform: "translate(-50%, -50%)" },
      highlight: "dashboard-tab",
    },
    {
      title: "Export to Your Favorite Tools",
      description: "Send insights to Notion, GitHub, or download as CSV/PDF.",
      target: "Click on the Export Insights tab when you're ready.",
      position: { top: "120px", left: "75%", transform: "translateX(-50%)" },
      highlight: "export-tab",
    },
  ]

  const currentStepData = steps[currentStep]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsVisible(false)
    }
  }

  const handleSkip = () => {
    setIsVisible(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      {/* Highlight elements based on current step */}
      {currentStepData.highlight && (
        <div
          className="absolute border-2 border-sky-blue animate-pulse rounded-md"
          style={{
            top:
              currentStepData.highlight === "upload-tab"
                ? "110px"
                : currentStepData.highlight === "dashboard-tab"
                  ? "110px"
                  : "110px",
            left:
              currentStepData.highlight === "upload-tab"
                ? "25%"
                : currentStepData.highlight === "dashboard-tab"
                  ? "15%"
                  : "75%",
            width: "120px",
            height: "40px",
            transform: "translateX(-50%)",
            zIndex: 60,
          }}
        />
      )}

      {/* Tooltip/modal */}
      <div
        className="bg-white border rounded-lg shadow-lg p-6 max-w-md relative z-50 animate-in fade-in duration-300"
        style={{
          position: "absolute",
          top: currentStepData.position.top,
          left: currentStepData.position.left,
          transform: currentStepData.position.transform,
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 text-deep-navy hover:bg-muted"
          onClick={handleSkip}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>

        <div className="mb-4">
          <h3 className="text-lg font-semibold font-montserrat text-deep-navy">{currentStepData.title}</h3>
          <p className="text-muted-foreground mt-1 font-roboto">{currentStepData.description}</p>
        </div>

        <div className="bg-muted p-3 rounded-md text-sm mb-4 font-roboto">
          <p>{currentStepData.target}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 w-6 rounded-full ${index === currentStep ? "bg-sky-blue" : "bg-muted"}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleSkip}
              className="font-montserrat border-ocean-blue text-ocean-blue hover:bg-ocean-blue/10"
            >
              Skip
            </Button>
            <Button onClick={handleNext} className="font-montserrat bg-sky-blue hover:bg-ocean-blue">
              {currentStep < steps.length - 1 ? "Next" : "Get Started"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

