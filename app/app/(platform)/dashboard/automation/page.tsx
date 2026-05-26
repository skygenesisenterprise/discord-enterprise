'use client'

import {
  Zap,
  Play,
  Pause,
  Plus,
  MoreHorizontal,
  Terminal,
  Webhook,
  Clock,
  GitBranch,
  Settings,
  ArrowRight,
  Code,
  Calendar,
  RefreshCw,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MetricCard } from '@/components/dashboard/metric-card'
import { Switch } from '@/components/ui/switch'

const slashCommands = [
  {
    id: '1',
    name: '/help',
    description: 'Display help information and command list',
    category: 'General',
    usage: 2456,
    enabled: true,
  },
  {
    id: '2',
    name: '/ticket',
    description: 'Create a new support ticket',
    category: 'Support',
    usage: 1823,
    enabled: true,
  },
  {
    id: '3',
    name: '/verify',
    description: 'Verify your account to access the server',
    category: 'Moderation',
    usage: 1567,
    enabled: true,
  },
  {
    id: '4',
    name: '/report',
    description: 'Report a user or issue to moderators',
    category: 'Moderation',
    usage: 892,
    enabled: true,
  },
  {
    id: '5',
    name: '/info',
    description: 'Display server or user information',
    category: 'General',
    usage: 756,
    enabled: true,
  },
  {
    id: '6',
    name: '/giveaway',
    description: 'Create and manage giveaways',
    category: 'Fun',
    usage: 234,
    enabled: false,
  },
]

const webhooks = [
  {
    id: '1',
    name: 'GitHub Notifications',
    description: 'Push events from skygenesis/enterprise repo',
    channel: '#dev-updates',
    lastTriggered: new Date(Date.now() - 15 * 60 * 1000),
    status: 'active',
    events: 1245,
  },
  {
    id: '2',
    name: 'Server Status',
    description: 'Infrastructure monitoring alerts',
    channel: '#alerts',
    lastTriggered: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'active',
    events: 89,
  },
  {
    id: '3',
    name: 'Welcome Messages',
    description: 'Custom welcome announcements',
    channel: '#welcome',
    lastTriggered: new Date(Date.now() - 30 * 60 * 1000),
    status: 'active',
    events: 3421,
  },
  {
    id: '4',
    name: 'Twitch Notifications',
    description: 'Stream alerts for community streamers',
    channel: '#streams',
    lastTriggered: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: 'inactive',
    events: 156,
  },
]

const workflows = [
  {
    id: '1',
    name: 'New Member Onboarding',
    description: 'Welcome new members with roles and DM',
    trigger: 'Member Join',
    actions: ['Assign Role', 'Send DM', 'Log Event'],
    enabled: true,
    runs: 3421,
  },
  {
    id: '2',
    name: 'Auto Role Assignment',
    description: 'Assign roles based on reactions',
    trigger: 'Reaction Add',
    actions: ['Check Emoji', 'Assign Role'],
    enabled: true,
    runs: 8920,
  },
  {
    id: '3',
    name: 'Ticket Auto-Close',
    description: 'Close inactive tickets after 48 hours',
    trigger: 'Scheduled',
    actions: ['Check Activity', 'Send Warning', 'Close Ticket'],
    enabled: true,
    runs: 234,
  },
  {
    id: '4',
    name: 'Level Up Notification',
    description: 'Notify users when they level up',
    trigger: 'Level Up',
    actions: ['Check Level', 'Send Message', 'Assign Role'],
    enabled: false,
    runs: 12450,
  },
]

const scheduledTasks = [
  {
    id: '1',
    name: 'Daily Backup',
    description: 'Backup server configuration and data',
    schedule: 'Every day at 3:00 AM',
    lastRun: new Date(Date.now() - 8 * 60 * 60 * 1000),
    nextRun: new Date(Date.now() + 16 * 60 * 60 * 1000),
    status: 'active',
  },
  {
    id: '2',
    name: 'Weekly Report',
    description: 'Generate weekly analytics report',
    schedule: 'Every Monday at 9:00 AM',
    lastRun: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    nextRun: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    status: 'active',
  },
  {
    id: '3',
    name: 'Inactive Cleanup',
    description: 'Remove users inactive for 90 days',
    schedule: 'Every month on the 1st',
    lastRun: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    nextRun: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    status: 'active',
  },
]

const categoryColors: Record<string, string> = {
  General: 'bg-chart-1/10 text-chart-1 border-chart-1/20',
  Support: 'bg-chart-2/10 text-chart-2 border-chart-2/20',
  Moderation: 'bg-warning/10 text-warning border-warning/20',
  Fun: 'bg-chart-4/10 text-chart-4 border-chart-4/20',
}

export default function AutomationPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Automation</h1>
          <p className="text-sm text-muted-foreground">
            Manage slash commands, webhooks, and automated workflows.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Automation
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Active Commands"
          value={slashCommands.filter((c) => c.enabled).length}
          icon={<Terminal className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Webhooks"
          value={webhooks.filter((w) => w.status === 'active').length}
          icon={<Webhook className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Active Workflows"
          value={workflows.filter((w) => w.enabled).length}
          icon={<GitBranch className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Scheduled Tasks"
          value={scheduledTasks.length}
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <Tabs defaultValue="commands" className="space-y-4">
        <TabsList>
          <TabsTrigger value="commands">Slash Commands</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>

        <TabsContent value="commands" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-medium">Slash Commands</CardTitle>
                  <CardDescription>Manage bot slash commands</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-3.5 w-3.5" />
                  Add Command
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {slashCommands.map((command) => (
                  <div
                    key={command.id}
                    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <Terminal className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <code className="font-mono font-medium">{command.name}</code>
                          <Badge
                            variant="outline"
                            className={`text-xs ${categoryColors[command.category] || ''}`}
                          >
                            {command.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{command.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">{command.usage.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">uses</div>
                      </div>
                      <Switch checked={command.enabled} />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Command</DropdownMenuItem>
                          <DropdownMenuItem>View Usage</DropdownMenuItem>
                          <DropdownMenuItem>Permissions</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-medium">Webhook Endpoints</CardTitle>
                  <CardDescription>Manage incoming webhook integrations</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-3.5 w-3.5" />
                  Add Webhook
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {webhooks.map((webhook) => (
                  <div
                    key={webhook.id}
                    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          webhook.status === 'active' ? 'bg-success/10' : 'bg-muted'
                        }`}
                      >
                        <Webhook
                          className={`h-5 w-5 ${
                            webhook.status === 'active' ? 'text-success' : 'text-muted-foreground'
                          }`}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{webhook.name}</span>
                          <Badge variant="secondary" className="text-xs font-mono">
                            {webhook.channel}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{webhook.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">{webhook.events.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">events</div>
                      </div>
                      <Badge variant={webhook.status === 'active' ? 'default' : 'secondary'}>
                        {webhook.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Configure</DropdownMenuItem>
                          <DropdownMenuItem>View Logs</DropdownMenuItem>
                          <DropdownMenuItem>Copy URL</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-medium">Automation Workflows</CardTitle>
                  <CardDescription>Create and manage automated workflows</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-3.5 w-3.5" />
                  Create Workflow
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {workflows.map((workflow) => (
                  <div
                    key={workflow.id}
                    className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                            workflow.enabled ? 'bg-success/10' : 'bg-muted'
                          }`}
                        >
                          <GitBranch
                            className={`h-5 w-5 ${
                              workflow.enabled ? 'text-success' : 'text-muted-foreground'
                            }`}
                          />
                        </div>
                        <div>
                          <div className="font-medium">{workflow.name}</div>
                          <p className="text-sm text-muted-foreground">{workflow.description}</p>
                        </div>
                      </div>
                      <Switch checked={workflow.enabled} />
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Badge variant="outline" className="text-xs">
                          <Zap className="mr-1 h-3 w-3" />
                          {workflow.trigger}
                        </Badge>
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        <div className="flex flex-wrap gap-1">
                          {workflow.actions.map((action) => (
                            <Badge key={action} variant="secondary" className="text-xs">
                              {action}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{workflow.runs.toLocaleString()} total runs</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <Settings className="mr-1 h-3 w-3" />
                              Configure
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Workflow</DropdownMenuItem>
                            <DropdownMenuItem>View Logs</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-medium">Scheduled Tasks</CardTitle>
                  <CardDescription>Manage recurring automated tasks</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-3.5 w-3.5" />
                  Schedule Task
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scheduledTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-1/10">
                        <Calendar className="h-5 w-5 text-chart-1" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{task.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {task.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{task.schedule}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right text-sm">
                        <div className="text-muted-foreground">Next run</div>
                        <div className="font-medium">{task.nextRun.toLocaleDateString()}</div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Schedule</DropdownMenuItem>
                          <DropdownMenuItem>Run Now</DropdownMenuItem>
                          <DropdownMenuItem>View History</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
