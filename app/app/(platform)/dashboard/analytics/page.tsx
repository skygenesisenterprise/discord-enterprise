'use client'

import {
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  Terminal,
  Hash,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MetricCard } from '@/components/dashboard/metric-card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const memberGrowthData = [
  { date: 'Jan', members: 12450, joined: 320, left: 45 },
  { date: 'Feb', members: 12890, joined: 480, left: 40 },
  { date: 'Mar', members: 13420, joined: 590, left: 60 },
  { date: 'Apr', members: 13890, joined: 520, left: 50 },
  { date: 'May', members: 14350, joined: 510, left: 50 },
  { date: 'Jun', members: 14920, joined: 620, left: 50 },
  { date: 'Jul', members: 15420, joined: 15420, left: 50 },
]

const messageActivityData = [
  { hour: '00:00', messages: 890 },
  { hour: '02:00', messages: 420 },
  { hour: '04:00', messages: 180 },
  { hour: '06:00', messages: 340 },
  { hour: '08:00', messages: 1560 },
  { hour: '10:00', messages: 2340 },
  { hour: '12:00', messages: 2890 },
  { hour: '14:00', messages: 2650 },
  { hour: '16:00', messages: 3450 },
  { hour: '18:00', messages: 3890 },
  { hour: '20:00', messages: 3120 },
  { hour: '22:00', messages: 1780 },
]

const channelActivityData = [
  { name: '#general', messages: 24560 },
  { name: '#support', messages: 18920 },
  { name: '#development', messages: 12450 },
  { name: '#announcements', messages: 8920 },
  { name: '#off-topic', messages: 6780 },
]

const commandUsageData = [
  { name: '/help', count: 2456, change: 12 },
  { name: '/ticket', count: 1823, change: 8 },
  { name: '/verify', count: 1567, change: -5 },
  { name: '/report', count: 892, change: 15 },
  { name: '/info', count: 756, change: 3 },
  { name: '/giveaway', count: 234, change: -12 },
]

const moderationStatsData = [
  { week: 'Week 1', warnings: 45, bans: 8, mutes: 32 },
  { week: 'Week 2', warnings: 52, bans: 5, mutes: 28 },
  { week: 'Week 3', warnings: 38, bans: 3, mutes: 24 },
  { week: 'Week 4', warnings: 47, bans: 6, mutes: 35 },
]

const memberDistribution = [
  { name: 'Members', value: 15320, color: 'oklch(0.55 0.2 250)' },
  { name: 'Contributors', value: 45, color: 'oklch(0.6 0.18 165)' },
  { name: 'Developers', value: 24, color: 'oklch(0.55 0.2 145)' },
  { name: 'Moderators', value: 8, color: 'oklch(0.65 0.18 85)' },
  { name: 'Admins', value: 3, color: 'oklch(0.55 0.22 25)' },
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

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Track community growth and engagement metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="7d">
            <SelectTrigger className="h-8 w-30">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Total Members"
          value="15,420"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <MetricCard
          title="Messages This Week"
          value="48,920"
          icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 8.2, isPositive: true }}
        />
        <MetricCard
          title="Commands Executed"
          value="7,528"
          icon={<Terminal className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 3.1, isPositive: false }}
        />
        <MetricCard
          title="Active Channels"
          value="24"
          icon={<Hash className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Member Growth</CardTitle>
            <CardDescription>Total members over time</CardDescription>
          </CardHeader>
          <CardContent className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={memberGrowthData}>
                <defs>
                  <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.55 0.2 250)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.55 0.2 250)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="date"
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
                  name="Total Members"
                  stroke="oklch(0.55 0.2 250)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorGrowth)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Message Activity</CardTitle>
            <CardDescription>Messages per hour (24h average)</CardDescription>
          </CardHeader>
          <CardContent className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={messageActivityData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="hour"
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
                <Bar
                  dataKey="messages"
                  name="Messages"
                  fill="oklch(0.6 0.18 165)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-medium">Moderation Statistics</CardTitle>
            <CardDescription>Weekly moderation actions</CardDescription>
          </CardHeader>
          <CardContent className="h-70">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moderationStatsData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="week"
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
                  dataKey="warnings"
                  name="Warnings"
                  stroke="oklch(0.65 0.18 85)"
                  strokeWidth={2}
                  dot={{ fill: 'oklch(0.65 0.18 85)', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="bans"
                  name="Bans"
                  stroke="oklch(0.55 0.22 25)"
                  strokeWidth={2}
                  dot={{ fill: 'oklch(0.55 0.22 25)', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="mutes"
                  name="Mutes"
                  stroke="oklch(0.55 0.2 250)"
                  strokeWidth={2}
                  dot={{ fill: 'oklch(0.55 0.2 250)', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Role Distribution</CardTitle>
            <CardDescription>Members by role type</CardDescription>
          </CardHeader>
          <CardContent className="h-70">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={memberDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {memberDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => Number(value).toLocaleString()}
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              {memberDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5 text-xs">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Top Channels</CardTitle>
            <CardDescription>Most active channels by message count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {channelActivityData.map((channel, index) => (
                <div key={channel.name} className="flex items-center gap-4">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-xs font-medium">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium font-mono">{channel.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {channel.messages.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-chart-1"
                        style={{
                          width: `${(channel.messages / channelActivityData[0].messages) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Command Usage</CardTitle>
            <CardDescription>Most used commands this week</CardDescription>
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
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {command.count.toLocaleString()}
                        </span>
                        <span
                          className={`flex items-center text-xs ${
                            command.change >= 0 ? 'text-success' : 'text-destructive'
                          }`}
                        >
                          {command.change >= 0 ? (
                            <ArrowUpRight className="h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3" />
                          )}
                          {Math.abs(command.change)}%
                        </span>
                      </div>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-chart-2"
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
    </div>
  )
}
