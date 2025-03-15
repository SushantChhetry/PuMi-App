"use client"

import { useState } from "react"
import { Check, X, Zap } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface PricingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function PricingModal({ open, onOpenChange }: PricingModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isAnnual, setIsAnnual] = useState(true)

  const plans = [
    {
      id: "free",
      name: "Free",
      description: "For individuals and small projects",
      price: {
        monthly: 0,
        annually: 0,
      },
      features: [
        "Up to 3 projects",
        "Basic task management",
        "Limited feedback analysis",
        "1 team member",
        "Community support",
      ],
      limitations: ["No AI insights", "Limited integrations", "Basic analytics"],
      cta: "Current Plan",
      disabled: true,
    },
    {
      id: "starter",
      name: "Starter",
      description: "For early-stage startups",
      price: {
        monthly: 19,
        annually: 15,
      },
      features: [
        "Up to 10 projects",
        "Advanced task management",
        "Basic AI feedback analysis",
        "5 team members",
        "Email support",
        "Basic integrations (Slack, GitHub)",
        "Export to CSV/PDF",
      ],
      limitations: ["Limited AI insights", "Basic analytics"],
      cta: "Upgrade",
      popular: true,
    },
    {
      id: "pro",
      name: "Pro",
      description: "For growing startups",
      price: {
        monthly: 49,
        annually: 39,
      },
      features: [
        "Unlimited projects",
        "Advanced AI feedback analysis",
        "Custom dashboards",
        "15 team members",
        "Priority support",
        "Advanced integrations",
        "Advanced analytics",
        "Custom tags and fields",
      ],
      limitations: [],
      cta: "Upgrade",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For scaling companies",
      price: {
        monthly: 99,
        annually: 79,
      },
      features: [
        "Everything in Pro",
        "Unlimited team members",
        "Dedicated account manager",
        "Custom AI training",
        "SSO & advanced security",
        "API access",
        "Custom integrations",
        "Data retention controls",
      ],
      limitations: [],
      cta: "Contact Sales",
      enterprise: true,
    },
  ]

  const handleUpgrade = () => {
    if (selectedPlan) {
      // In a real app, this would redirect to a payment page or process
      alert(`Upgrading to ${selectedPlan} plan! (${isAnnual ? "Annual" : "Monthly"} billing)`)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Upgrade Your Plan</DialogTitle>
          <DialogDescription>Choose the right plan for your startup's growth stage</DialogDescription>
        </DialogHeader>

        <div className="flex justify-center my-4">
          <div className="bg-muted p-1 rounded-lg flex items-center">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${!isAnnual ? "bg-background shadow-sm" : ""}`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${isAnnual ? "bg-background shadow-sm" : ""}`}
              onClick={() => setIsAnnual(true)}
            >
              Annual <span className="text-xs text-primary">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative overflow-hidden ${
                selectedPlan === plan.id
                  ? "border-primary ring-2 ring-primary ring-opacity-50"
                  : plan.popular
                    ? "border-primary/50"
                    : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <Badge className="rounded-tl-none rounded-br-none">Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-2">
                  <span className="text-3xl font-bold">${isAnnual ? plan.price.annually : plan.price.monthly}</span>
                  <span className="text-muted-foreground ml-1">{plan.price.monthly > 0 ? "/month" : ""}</span>
                </div>
                {isAnnual && plan.price.monthly > 0 && <p className="text-xs text-muted-foreground">Billed annually</p>}
              </CardHeader>
              <CardContent className="h-64 overflow-y-auto">
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-4 w-4 text-primary mr-2 mt-1 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, i) => (
                    <li key={i} className="flex items-start text-muted-foreground">
                      <X className="h-4 w-4 mr-2 mt-1 shrink-0" />
                      <span className="text-sm">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.enterprise ? "outline" : "default"}
                  disabled={plan.disabled}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleUpgrade}
            disabled={!selectedPlan || plans.find((p) => p.id === selectedPlan)?.disabled}
            className="gap-1"
          >
            <Zap className="h-4 w-4" />
            {selectedPlan === "enterprise" ? "Contact Sales" : "Confirm Upgrade"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

