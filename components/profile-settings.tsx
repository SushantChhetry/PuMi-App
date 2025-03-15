"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CreditCard, HelpCircle, LogOut } from "lucide-react"

interface ProfileSettingsProps {
  onClose: () => void
  setIsPricingOpen?: (open: boolean) => void
}

export default function ProfileSettings({ onClose, setIsPricingOpen }: ProfileSettingsProps) {
  const [activeTab, setActiveTab] = useState("profile")

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    role: "Founder & CEO",
    company: "Startup Inc.",
    bio: "Building the next big thing. Passionate about product and user experience.",
    avatar: "",
    plan: "Free",
  }

  const handleOpenBilling = () => {
    if (setIsPricingOpen) {
      setIsPricingOpen(true)
      onClose()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your profile and preferences</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleOpenBilling}>
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </Button>
          <Button variant="outline" size="sm">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help
          </Button>
          <Button variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
          <Button onClick={onClose}>Back to Dashboard</Button>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and public profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-lg">JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" defaultValue={user.email} type="email" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" defaultValue={user.role} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" defaultValue={user.company} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" defaultValue={user.bio} rows={4} />
                    <p className="text-xs text-muted-foreground">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Preferences</CardTitle>
              <CardDescription>Manage your account settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-tasks" className="flex-1">
                      Task updates and assignments
                    </Label>
                    <Switch id="notify-tasks" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-feedback" className="flex-1">
                      New feedback insights
                    </Label>
                    <Switch id="notify-feedback" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-marketing" className="flex-1">
                      Product updates and announcements
                    </Label>
                    <Switch id="notify-marketing" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Security</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your subscription and payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Current Plan</h3>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{user.plan} Plan</span>
                      <Badge variant="outline">Current</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {user.plan === "Free"
                        ? "Limited features for individuals and small projects"
                        : "Upgraded features for growing startups"}
                    </p>
                  </div>
                  <Button variant="outline" onClick={handleOpenBilling}>
                    Upgrade Plan
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Payment Method</h3>
                <div className="p-4 border rounded-lg">
                  {user.plan === "Free" ? (
                    <p className="text-sm text-muted-foreground">No payment method required for the Free plan.</p>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-12 bg-muted rounded flex items-center justify-center">
                            <span className="text-xs font-medium">VISA</span>
                          </div>
                          <span>•••• •••• •••• 4242</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Billing History</h3>
                <div className="border rounded-lg overflow-hidden">
                  {user.plan === "Free" ? (
                    <div className="p-4">
                      <p className="text-sm text-muted-foreground">No billing history available.</p>
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left p-3 text-sm font-medium">Date</th>
                          <th className="text-left p-3 text-sm font-medium">Description</th>
                          <th className="text-right p-3 text-sm font-medium">Amount</th>
                          <th className="text-right p-3 text-sm font-medium">Receipt</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="p-3 text-sm">Mar 1, 2025</td>
                          <td className="p-3 text-sm">Monthly subscription</td>
                          <td className="p-3 text-sm text-right">$19.00</td>
                          <td className="p-3 text-sm text-right">
                            <Button variant="link" size="sm" className="h-auto p-0">
                              Download
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3 text-sm">Feb 1, 2025</td>
                          <td className="p-3 text-sm">Monthly subscription</td>
                          <td className="p-3 text-sm text-right">$19.00</td>
                          <td className="p-3 text-sm text-right">
                            <Button variant="link" size="sm" className="h-auto p-0">
                              Download
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Need help with billing?{" "}
                <a href="#" className="text-primary hover:underline">
                  Contact support
                </a>
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

