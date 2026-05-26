'use client'

import {
  Users,
  MessageSquare,
  Shield,
  Ticket,
  Activity,
  Zap,
  TrendingUp,
  Clock,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricCard } from '@/components/dashboard/metric-card'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const activityData = [
  { time: '00:00', members: 1240, messages: 890 },
  { time: '04:00', members: 856, messages: 420 },
  { time: '08:00', members: 2100, messages: 1560 },
  { time: '12:00', members: 3400, messages: 2890 },
  { time: '16:00', members: 4200, messages: 3450 },
  { time: '20:00', members: 3890, messages: 3120 },
  { time: '23:59', members: 2100, messages: 1780 },
]

const weeklyModerationData = [
  { day: 'Mon', warnings: 12, bans: 2, mutes: 8 },
  { day: 'Tue', warnings: 18, bans: 1, mutes: 14 },
  { day: 'Wed', warnings: 8, bans: 0, mutes: 5 },
  { day: 'Thu', warnings: 22, bans: 3, mutes: 16 },
  { day: 'Fri', warnings: 15, bans: 1, mutes: 11 },
  { day: 'Sat', warnings: 28, bans: 4, mutes: 19 },
  { day: 'Sun', warnings: 24, bans: 2, mutes: 15 },
]

const commandUsageData = [
  { name: '/help', count: 2456 },
  { name: '/ticket', count: 1823 },
  { name: '/verify', count: 1567 },
  { name: '/report', count: 892 },
  { name: '/info', count: 756 },
]

const recentActivity = [
  {
    id: '1',
    type: 'moderation' as const,
    title: 'User warned',
    description: 'ShadowUser#1234 was warned for spam',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    user: { name: 'Moderator Alex' },
  },
  {
    id: '2',
    type: 'ticket' as const,
    title: 'New ticket opened',
    description: 'Support request: Account verification issue',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    user: { name: 'NewUser#5678' },
  },
  {
    id: '3',
    type: 'member' as const,
    title: 'Member joined',
    description: 'TechEnthusiast#9012 joined the server',
    timestamp: new Date(Date.now() - 32 * 60 * 1000),
  },
  {
    id: '4',
    type: 'system' as const,
    title: 'Auto-moderation triggered',
    description: 'Blocked suspicious link in #general',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: '5',
    type: 'command' as const,
    title: 'Slash command executed',
    description: '/setup-verification ran by Administrator',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    user: { name: 'Administrator' },
  },
]

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-3 shadow-lg">
        <p className="text-sm font-medium">{label}</p>
        <div className="mt-1 space-y-1">
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back. Here&apos;s an overview of your Discord server.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <StatusBadge status="online" label="Bot Online" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Last sync: 2 min ago</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Members"
          value="15,420"
          description="Active community members"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <MetricCard
          title="Messages Today"
          value="8,942"
          description="Across all channels"
          icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 8.2, isPositive: true }}
        />
        <MetricCard
          title="Moderation Actions"
          value="47"
          description="In the last 24 hours"
          icon={<Shield className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 3.1, isPositive: false }}
        />
        <MetricCard
          title="Open Tickets"
          value="12"
          description="Awaiting response"
          icon={<Ticket className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-base font-medium">Server Activity</CardTitle>
            <CardDescription>Active members and message volume over 24h</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="activity" className="space-y-4">
              <TabsList>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="growth">Growth</TabsTrigger>
              </TabsList>
              <TabsContent value="activity" className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <defs>
                      <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.55 0.2 250)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="oklch(0.55 0.2 250)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.6 0.18 165)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="oklch(0.6 0.18 165)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis
                      dataKey="time"
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                      className="text-muted-foreground"
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                      className="text-muted-foreground"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="members"
                      name="Active Members"
                      stroke="oklch(0.55 0.2 250)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorMembers)"
                    />
                    <Area
                      type="monotone"
                      dataKey="messages"
                      name="Messages"
                      stroke="oklch(0.6 0.18 165)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorMessages)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="growth" className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis
                      dataKey="time"
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                      className="text-muted-foreground"
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                      className="text-muted-foreground"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="members"
                      name="Active Members"
                      stroke="oklch(0.55 0.2 250)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
            <CardDescription>Latest actions in your server</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[340px] overflow-auto">
            <ActivityFeed items={recentActivity} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Weekly Moderation</CardTitle>
            <CardDescription>Warnings, bans, and mutes this week</CardDescription>
          </CardHeader>
          <CardContent className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyModerationData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="warnings" name="Warnings" fill="oklch(0.65 0.18 85)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="bans" name="Bans" fill="oklch(0.55 0.22 25)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="mutes" name="Mutes" fill="oklch(0.55 0.2 250)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Top Commands</CardTitle>
            <CardDescription>Most used slash commands today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {commandUsageData.map((command, index) => (
                <div key={command.name} className="flex items-center gap-4">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-xs font-medium">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium font-mono">{command.name}</span>
                      <span className="text-sm text-muted-foreground">{command.count.toLocaleString()}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-chart-1"
                        style={{
                          width: `${(command.count / commandUsageData[0].count) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">API Latency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold">42</span>
              <span className="text-sm text-muted-foreground">ms</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Activity className="h-4 w-4 text-success" />
              <span className="text-sm text-success">Excellent</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Gateway Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold">99.9%</span>
              <span className="text-sm text-muted-foreground">uptime</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-success" />
              <span className="text-sm text-success">All systems operational</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Growth Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold">+234</span>
              <span className="text-sm text-muted-foreground">this week</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm text-success">+12.5% from last week</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
