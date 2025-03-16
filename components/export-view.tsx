import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, FileDown } from "lucide-react"

// Use the public URL instead of importing them
const NotionLogo = "/assets/notion-logo.png"; // PNG version since SVG isn't in public
const TrelloLogo = "/assets/trello-logo.jpeg";
const GitHubLogo = "/assets/github-logo.svg";
const AirtableLogo = "/assets/airtable-logo.png";

export default function ExportView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Export Insights</h2>
        <p className="text-muted-foreground mt-1">Export prioritized feedback to your preferred tools</p>
      </div>

      <Tabs defaultValue="integrations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="integrations">Tool Integrations</TabsTrigger>
          <TabsTrigger value="download">Download</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ExportCard title="Notion" description="Export insights to Notion pages or databases" icon={NotionLogo} />
            <ExportCard title="GitHub Issues" description="Create issues from feedback clusters" icon={GitHubLogo} />
            <ExportCard title="Trello" description="Create cards for each feedback theme" icon={TrelloLogo} />
            <ExportCard title="Airtable" description="Export to your Airtable bases" icon={AirtableLogo} />
          </div>
        </TabsContent>

        <TabsContent value="download" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Download Options</CardTitle>
              <CardDescription>Export your feedback insights in various formats</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <DownloadOption title="CSV Export" description="Raw data with all feedback points" fileSize="2.4 MB" />
                <DownloadOption
                  title="PDF Report"
                  description="Formatted report with visualizations"
                  fileSize="4.1 MB"
                />
                <DownloadOption title="JSON Data" description="Structured data for developers" fileSize="1.8 MB" />
                <DownloadOption
                  title="Excel Spreadsheet"
                  description="Tabular data with multiple sheets"
                  fileSize="3.2 MB"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Recent Exports</CardTitle>
          <CardDescription>Your recently exported feedback insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-md border p-3">
              <div className="flex items-center gap-3">
                <img src={GitHubLogo} alt="GitHub" className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">GitHub Issues Export</p>
                  <p className="text-xs text-muted-foreground">14 issues created • March 15, 2025</p>
                </div>
              </div>
              <button className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                <span>View</span>
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>

            <div className="flex items-center justify-between rounded-md border p-3">
              <div className="flex items-center gap-3">
                <FileDown className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Feedback_Report_Q1.pdf</p>
                  <p className="text-xs text-muted-foreground">4.1 MB • March 10, 2025</p>
                </div>
              </div>
              <button className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                <span>Download</span>
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ExportCard({
  title,
  description,
  icon: Icon,
}: {
  title: string
  description: string
  icon: string | React.ElementType
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="rounded-md bg-primary/10 p-2">
            {typeof Icon === "string" ? (
              <img src={Icon} alt={title} className="h-6 w-6 text-primary" />
            ) : (
              <Icon className="h-6 w-6 text-primary" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
            <div className="mt-3 flex gap-2">
              <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Connect
              </button>
              <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DownloadOption({
  title,
  description,
  fileSize,
}: {
  title: string
  description: string
  fileSize: string
}) {
  return (
    <div className="flex items-start gap-4 rounded-md border p-4">
      <div className="rounded-md bg-primary/10 p-2">
        <FileDown className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{fileSize}</span>
          <button className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90">
            Download
          </button>
        </div>
      </div>
    </div>
  )
}