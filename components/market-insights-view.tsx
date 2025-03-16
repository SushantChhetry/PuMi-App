"use client"

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  LineChart,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  RefreshCw,
  ExternalLink,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MarketInsightsView() {
  // State for dialogs
  const [addCompetitorOpen, setAddCompetitorOpen] = useState(false)
  const [addMarketTrendOpen, setAddMarketTrendOpen] = useState(false)
  const [selectedCompetitor, setSelectedCompetitor] = useState<any>(null)
  const [competitorDetailsOpen, setCompetitorDetailsOpen] = useState(false)

  // Sample competitors data
  const competitors = [
    {
      id: 1,
      name: "CompetitorX",
      description: "Leading solution in the market with strong enterprise presence",
      marketShare: 35,
      strengths: ["Enterprise relationships", "Robust feature set", "Strong brand recognition"],
      weaknesses: ["Expensive pricing", "Complex UI", "Slow to innovate"],
      keyFeatures: ["Advanced analytics", "Enterprise SSO", "24/7 support"],
      pricePoint: "High ($99/mo+)",
      targetAudience: "Enterprise",
      lastUpdated: "2 weeks ago",
      trend: "stable",
    },
    {
      id: 2,
      name: "StartupY",
      description: "Fast-growing startup with innovative approach and modern UI",
      marketShare: 15,
      strengths: ["Modern UI/UX", "Fast innovation cycle", "Competitive pricing"],
      weaknesses: ["Limited feature set", "Small customer base", "Less mature product"],
      keyFeatures: ["AI-powered insights", "Simple onboarding", "Freemium model"],
      pricePoint: "Medium ($49/mo)",
      targetAudience: "SMBs",
      lastUpdated: "1 week ago",
      trend: "up",
    },
    {
      id: 3,
      name: "LegacyZ",
      description: "Established player with comprehensive but aging product",
      marketShare: 25,
      strengths: ["Comprehensive features", "Large customer base", "Industry expertise"],
      weaknesses: ["Outdated technology", "Poor mobile experience", "Slow support"],
      keyFeatures: ["Extensive integrations", "Customization options", "On-premise option"],
      pricePoint: "High ($79/mo+)",
      targetAudience: "Mid-market",
      lastUpdated: "1 month ago",
      trend: "down",
    },
    {
      id: 4,
      name: "NewcomerA",
      description: "Recent entrant with niche focus and innovative features",
      marketShare: 8,
      strengths: ["Specialized features", "Excellent customer service", "Modern architecture"],
      weaknesses: ["Limited market presence", "Narrow focus", "Small team"],
      keyFeatures: ["Unique collaboration tools", "Industry-specific templates", "Fast performance"],
      pricePoint: "Low ($29/mo)",
      targetAudience: "Small businesses",
      lastUpdated: "3 days ago",
      trend: "up",
    },
  ]

  // Sample market trends data
  const marketTrends = [
    {
      id: 1,
      title: "AI-Powered Analytics",
      description:
        "Growing adoption of AI and machine learning for advanced data analysis and automated insights generation",
      impact: "High",
      timeframe: "Current",
      relevance: 90,
      sources: ["Industry reports", "Competitor features", "User interviews"],
      opportunities: [
        "Develop AI-powered recommendation engine",
        "Automate insight generation from feedback",
        "Create predictive analytics features",
      ],
      threats: ["Competitors already implementing AI features", "High development cost", "Data privacy concerns"],
    },
    {
      id: 2,
      title: "Mobile-First Experience",
      description: "Increasing demand for fully-featured mobile experiences rather than desktop-focused solutions",
      impact: "Medium",
      timeframe: "Current",
      relevance: 75,
      sources: ["User feedback", "App store trends", "Industry blogs"],
      opportunities: [
        "Redesign for mobile-first approach",
        "Develop native mobile apps",
        "Create offline capabilities",
      ],
      threats: ["Resource-intensive development", "Fragmented device landscape", "User resistance to change"],
    },
    {
      id: 3,
      title: "Privacy-Focused Solutions",
      description:
        "Growing concern for data privacy and security, with users preferring solutions that prioritize their data protection",
      impact: "Medium",
      timeframe: "Emerging",
      relevance: 80,
      sources: ["Regulatory changes", "Market surveys", "Competitor positioning"],
      opportunities: [
        "Implement enhanced security features",
        "Develop privacy-first marketing message",
        "Create transparent data handling policies",
      ],
      threats: ["Increasing regulatory requirements", "Technical complexity", "Balancing privacy with functionality"],
    },
    {
      id: 4,
      title: "Integration Ecosystems",
      description: "Users increasingly expect products to integrate seamlessly with their existing tools and workflows",
      impact: "High",
      timeframe: "Current",
      relevance: 85,
      sources: ["Customer requests", "Industry standards", "Competitor analysis"],
      opportunities: [
        "Build extensive API and integration library",
        "Create partnership program with complementary tools",
        "Develop no-code integration builder",
      ],
      threats: ["Resource-intensive to maintain integrations", "Dependency on third-party APIs", "Technical debt"],
    },
  ]

  // Sample user demographics data
  const userDemographics = {
    industries: [
      { name: "SaaS", percentage: 35 },
      { name: "E-commerce", percentage: 25 },
      { name: "Healthcare", percentage: 15 },
      { name: "Finance", percentage: 10 },
      { name: "Education", percentage: 8 },
      { name: "Other", percentage: 7 },
    ],
    companySize: [
      { name: "1-10", percentage: 20 },
      { name: "11-50", percentage: 35 },
      { name: "51-200", percentage: 25 },
      { name: "201-1000", percentage: 15 },
      { name: "1000+", percentage: 5 },
    ],
    roles: [
      { name: "Product", percentage: 40 },
      { name: "Engineering", percentage: 25 },
      { name: "Marketing", percentage: 15 },
      { name: "Customer Success", percentage: 10 },
      { name: "Other", percentage: 10 },
    ],
  }

  // Sample SWOT analysis data
  const swotAnalysis = {
    strengths: [
      "Innovative AI-powered feedback clustering",
      "Simple and intuitive user interface",
      "Fast time-to-value for customers",
      "Competitive pricing model",
    ],
    weaknesses: [
      "Limited feature set compared to established competitors",
      "Small customer base and brand recognition",
      "Limited resources for marketing and sales",
      "Few integrations with other tools",
    ],
    opportunities: [
      "Growing market for user feedback tools",
      "Increasing focus on customer-centric product development",
      "Potential partnerships with complementary tools",
      "International market expansion",
    ],
    threats: [
      "Established competitors with more resources",
      "Potential new entrants with similar AI capabilities",
      "Economic downturn affecting SaaS spending",
      "Changing privacy regulations affecting data collection",
    ],
  }

  // Function to view competitor details
  const viewCompetitorDetails = (competitor: any) => {
    setSelectedCompetitor(competitor)
    setCompetitorDetailsOpen(true)
  }

  // Function to get trend icon
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <LineChart className="h-4 w-4 text-muted-foreground" />
    }
  }

  // Function to get impact badge variant
  const getImpactBadgeVariant = (impact: string) => {
    switch (impact) {
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      case "Low":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Market Insights</h2>
          <p className="text-sm text-muted-foreground">Last updated 3 days ago</p>
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
            <CardTitle className="text-sm font-medium">Total Competitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{competitors.length}</div>
            <p className="text-xs text-muted-foreground">Actively monitored</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Market Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marketTrends.length}</div>
            <p className="text-xs text-muted-foreground">Tracked industry shifts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Market Opportunity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68/100</div>
            <p className="text-xs text-muted-foreground">Based on trends & gaps</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="competitors" className="space-y-4">
        <TabsList>
          <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
          <TabsTrigger value="trends">Market Trends</TabsTrigger>
          <TabsTrigger value="demographics">User Demographics</TabsTrigger>
          <TabsTrigger value="swot">SWOT Analysis</TabsTrigger>
        </TabsList>

        {/* Competitors Tab */}
        <TabsContent value="competitors" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search competitors..." className="w-[250px] pl-8" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by target audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Audiences</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="midmarket">Mid-Market</SelectItem>
                  <SelectItem value="smb">SMB</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setAddCompetitorOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Competitor
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {competitors.map((competitor) => (
              <Card key={competitor.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {competitor.name}
                      {getTrendIcon(competitor.trend)}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{competitor.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Market Share</span>
                        <span className="text-sm font-medium">{competitor.marketShare}%</span>
                      </div>
                      <Progress value={competitor.marketShare} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Price Point:</span>{" "}
                        <span className="text-muted-foreground">{competitor.pricePoint}</span>
                      </div>
                      <div>
                        <span className="font-medium">Target:</span>{" "}
                        <span className="text-muted-foreground">{competitor.targetAudience}</span>
                      </div>
                    </div>

                    <div className="text-sm">
                      <span className="font-medium">Key Features:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {competitor.keyFeatures.map((feature, index) => (
                          <Badge key={index} variant="outline" className="font-normal">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Updated {competitor.lastUpdated}</span>
                      <Button variant="link" className="p-0 h-auto" onClick={() => viewCompetitorDetails(competitor)}>
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Market Trends Tab */}
        <TabsContent value="trends" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search trends..." className="w-[250px] pl-8" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by impact" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Impacts</SelectItem>
                  <SelectItem value="high">High Impact</SelectItem>
                  <SelectItem value="medium">Medium Impact</SelectItem>
                  <SelectItem value="low">Low Impact</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setAddMarketTrendOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Trend
            </Button>
          </div>

          <div className="space-y-4">
            {marketTrends.map((trend) => (
              <Card key={trend.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{trend.title}</CardTitle>
                      <Badge variant={getImpactBadgeVariant(trend.impact)}>{trend.impact} Impact</Badge>
                      <Badge variant="outline">{trend.timeframe}</Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{trend.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Relevance to Our Product</span>
                        <span className="text-sm font-medium">{trend.relevance}%</span>
                      </div>
                      <Progress value={trend.relevance} className="h-2" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Opportunities</h4>
                        <ul className="space-y-1">
                          {trend.opportunities.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Threats</h4>
                        <ul className="space-y-1">
                          {trend.threats.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="text-sm">
                      <span className="font-medium">Sources:</span>{" "}
                      <span className="text-muted-foreground">{trend.sources.join(", ")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* User Demographics Tab */}
        <TabsContent value="demographics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Industries</CardTitle>
                <CardDescription>Distribution of users by industry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userDemographics.industries.map((item) => (
                    <div key={item.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{item.name}</span>
                        <span className="text-sm font-medium">{item.percentage}%</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Company Size</CardTitle>
                <CardDescription>Distribution of users by company size</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userDemographics.companySize.map((item) => (
                    <div key={item.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{item.name} employees</span>
                        <span className="text-sm font-medium">{item.percentage}%</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">User Roles</CardTitle>
                <CardDescription>Distribution of users by role</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userDemographics.roles.map((item) => (
                    <div key={item.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{item.name}</span>
                        <span className="text-sm font-medium">{item.percentage}%</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Insights</CardTitle>
              <CardDescription>Important takeaways from demographic data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-muted rounded-md">
                  <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">SaaS and E-commerce Dominance</h4>
                    <p className="text-sm text-muted-foreground">
                      SaaS and E-commerce companies make up 60% of our user base, suggesting our product resonates
                      strongly with digital-first businesses.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted rounded-md">
                  <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">SMB Focus</h4>
                    <p className="text-sm text-muted-foreground">
                      Companies with fewer than 200 employees represent 80% of our users, indicating our product is
                      particularly valuable for smaller teams with limited resources.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted rounded-md">
                  <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Product-Led Adoption</h4>
                    <p className="text-sm text-muted-foreground">
                      Product teams are our primary users (40%), suggesting our tool is being adopted in product-led
                      organizations focused on user feedback.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SWOT Analysis Tab */}
        <TabsContent value="swot" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-green-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-green-600">Strengths</CardTitle>
                <CardDescription>What we do well</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {swotAnalysis.strengths.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-red-600">Weaknesses</CardTitle>
                <CardDescription>Areas for improvement</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {swotAnalysis.weaknesses.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-blue-600">Opportunities</CardTitle>
                <CardDescription>Potential areas for growth</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {swotAnalysis.opportunities.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-amber-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-amber-600">Threats</CardTitle>
                <CardDescription>Challenges to be aware of</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {swotAnalysis.threats.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Strategic Recommendations</CardTitle>
              <CardDescription>Based on SWOT analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-md">
                  <h4 className="font-medium">Leverage AI capabilities for competitive advantage</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Continue to invest in and highlight our AI-powered feedback clustering as a key differentiator
                    against larger competitors with more traditional approaches.
                  </p>
                </div>

                <div className="p-3 border rounded-md">
                  <h4 className="font-medium">Expand integrations ecosystem</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Address the weakness of limited integrations by developing connections with popular tools used by
                    our target audience, particularly in the SaaS and e-commerce sectors.
                  </p>
                </div>

                <div className="p-3 border rounded-md">
                  <h4 className="font-medium">Focus marketing on product-led growth</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Given our limited marketing resources and the high percentage of product team users, invest in
                    product-led growth strategies rather than traditional marketing.
                  </p>
                </div>

                <div className="p-3 border rounded-md">
                  <h4 className="font-medium">Develop SMB-focused pricing and features</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Continue to optimize our offering for small and medium businesses where we're seeing the most
                    traction, while gradually building capabilities for larger organizations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Competitor Dialog */}
      <Dialog open={addCompetitorOpen} onOpenChange={setAddCompetitorOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Competitor</DialogTitle>
            <DialogDescription>Add details about a competitor to track in your market analysis.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="competitor-name">Competitor Name</Label>
                <Input id="competitor-name" placeholder="e.g., CompetitorX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="market-share">Market Share (%)</Label>
                <Input id="market-share" type="number" placeholder="e.g., 25" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Brief description of the competitor" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price-point">Price Point</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="price-point">
                    <SelectValue placeholder="Select price point" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low ($0-$49/mo)</SelectItem>
                    <SelectItem value="medium">Medium ($50-$99/mo)</SelectItem>
                    <SelectItem value="high">High ($100+/mo)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-audience">Target Audience</Label>
                <Select defaultValue="smb">
                  <SelectTrigger id="target-audience">
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                    <SelectItem value="midmarket">Mid-Market</SelectItem>
                    <SelectItem value="smb">SMB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="key-features">Key Features</Label>
              <Input id="key-features" placeholder="Comma-separated list of key features" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="strengths">Strengths</Label>
                <Input id="strengths" placeholder="Comma-separated list of strengths" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weaknesses">Weaknesses</Label>
                <Input id="weaknesses" placeholder="Comma-separated list of weaknesses" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button>Add Competitor</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Market Trend Dialog */}
      <Dialog open={addMarketTrendOpen} onOpenChange={setAddMarketTrendOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Market Trend</DialogTitle>
            <DialogDescription>Add details about an industry trend to track in your market analysis.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="trend-title">Trend Title</Label>
              <Input id="trend-title" placeholder="e.g., AI-Powered Analytics" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trend-description">Description</Label>
              <Input id="trend-description" placeholder="Brief description of the trend" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="impact">Impact</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="impact">
                    <SelectValue placeholder="Select impact level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeframe">Timeframe</Label>
                <Select defaultValue="current">
                  <SelectTrigger id="timeframe">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emerging">Emerging</SelectItem>
                    <SelectItem value="current">Current</SelectItem>
                    <SelectItem value="established">Established</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="relevance">Relevance to Product (%)</Label>
              <Input id="relevance" type="number" placeholder="e.g., 85" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sources">Sources</Label>
              <Input id="sources" placeholder="Comma-separated list of sources" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="opportunities">Opportunities</Label>
              <Input id="opportunities" placeholder="Comma-separated list of opportunities" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="threats">Threats</Label>
              <Input id="threats" placeholder="Comma-separated list of threats" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button>Add Trend</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Competitor Details Dialog */}
      <Dialog open={competitorDetailsOpen} onOpenChange={setCompetitorDetailsOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedCompetitor?.name}
              {selectedCompetitor && getTrendIcon(selectedCompetitor.trend)}
            </DialogTitle>
            <DialogDescription>{selectedCompetitor?.description}</DialogDescription>
          </DialogHeader>
          {selectedCompetitor && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Market Share</h4>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{selectedCompetitor.name}</span>
                      <span className="text-sm font-medium">{selectedCompetitor.marketShare}%</span>
                    </div>
                    <Progress value={selectedCompetitor.marketShare} className="h-2" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Key Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price Point:</span>
                      <span>{selectedCompetitor.pricePoint}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Target Audience:</span>
                      <span>{selectedCompetitor.targetAudience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Updated:</span>
                      <span>{selectedCompetitor.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Strengths</h4>
                  <ul className="space-y-1">
                    {selectedCompetitor.strengths.map((strength: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Weaknesses</h4>
                  <ul className="space-y-1">
                    {selectedCompetitor.weaknesses.map((weakness: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Key Features</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCompetitor.keyFeatures.map((feature: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
                    <Badge key={index} variant="outline" className="font-normal">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <ExternalLink className="h-4 w-4" />
                  Visit Website
                </Button>
                <Button variant="outline" size="sm">
                  Edit Competitor
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

