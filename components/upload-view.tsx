import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUp, Link, MessageSquare, Mail, Slack, Github } from "lucide-react"

export default function UploadView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Upload Feedback</h2>
        <p className="text-muted-foreground mt-1">Import feedback from various sources or upload files directly</p>
      </div>

      <Tabs defaultValue="upload" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upload">Upload Files</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <Card className="border-dashed">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center space-y-2 py-12">
                <div className="rounded-full bg-primary/10 p-3">
                  <FileUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Upload Feedback Files</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  Drag and drop files or click to browse. We support .txt, .pdf, .docx, and .csv files.
                </p>
                <button className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  Browse Files
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Paste URL</CardTitle>
              <CardDescription>Import feedback from a web page or document URL</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Link className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="https://example.com/feedback"
                    className="w-full rounded-md border pl-9 py-2 px-3"
                  />
                </div>
                <button className="shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  Import
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <IntegrationCard
              title="Zoom Transcripts"
              description="Import feedback from your Zoom call transcripts"
              icon={MessageSquare}
              connected={true}
            />
            <IntegrationCard
              title="Slack"
              description="Connect to channels or export conversations"
              icon={Slack}
              connected={true}
            />
            <IntegrationCard
              title="Email"
              description="Import feedback from Gmail or Outlook"
              icon={Mail}
              connected={false}
            />
            <IntegrationCard
              title="GitHub Issues"
              description="Connect to your repositories"
              icon={Github}
              connected={false}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="rounded-md bg-muted p-4">
        <h3 className="font-medium mb-2">Recently Imported</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-md border bg-background p-3">
            <div className="flex items-center gap-3">
              <Slack className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">product-feedback.slack.com</p>
                <p className="text-xs text-muted-foreground">42 messages • Imported 2 hours ago</p>
              </div>
            </div>
            <span className="text-xs font-medium text-primary">Processing</span>
          </div>

          <div className="flex items-center justify-between rounded-md border bg-background p-3">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">User Interview - March 15.txt</p>
                <p className="text-xs text-muted-foreground">3 participants • Imported 1 day ago</p>
              </div>
            </div>
            <span className="text-xs font-medium text-green-500">Completed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function IntegrationCard({
  title,
  description,
  icon: Icon,
  connected,
}: {
  title: string
  description: string
  icon: React.ElementType
  connected: boolean
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="rounded-md bg-primary/10 p-2">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
            <button
              className={`mt-3 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium ${
                connected
                  ? "bg-muted hover:bg-muted/80 text-foreground"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground"
              }`}
            >
              {connected ? "Connected" : "Connect"}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

