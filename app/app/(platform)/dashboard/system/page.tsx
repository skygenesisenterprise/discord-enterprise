'use client'

import {
  Server,
  Database,
  Activity,
  Cpu,
  HardDrive,
  MemoryStick,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  TrendingUp,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { MetricCard } from '@/components/dashboard/metric-card'
import { StatusBadge } from '@/components/dashboard/status-badge'

const services = [
  {
    name: 'PostgreSQL Database',
    status: 'online',
    latency: 12,
    uptime: '99.99%',
    lastCheck: new Date(Date.now() - 30 * 1000),
    details: 'Primary database cluster',
  },
  {
    name: 'API Server',
    status: 'online',
    latency: 8,
    uptime: '99.95%',
    lastCheck: new Date(Date.now() - 30 * 1000),
    details: 'REST API endpoints',
  },
  {
    name: 'Discord Gateway',
    status: 'online',
    latency: 42,
    uptime: '99.98%',
    lastCheck: new Date(Date.now() - 30 * 1000),
    details: 'WebSocket connection to Discord',
  },
  {
    name: 'Redis Cache',
    status: 'online',
    latency: 2,
    uptime: '100%',
    lastCheck: new Date(Date.now() - 30 * 1000),
    details: 'In-memory cache layer',
  },
  {
    name: 'CDN',
    status: 'online',
    latency: 15,
    uptime: '99.99%',
    lastCheck: new Date(Date.now() - 30 * 1000),
    details: 'Static asset delivery',
  },
  {
    name: 'Backup Service',
    status: 'idle',
    latency: null,
    uptime: '100%',
    lastCheck: new Date(Date.now() - 8 * 60 * 60 * 1000),
    details: 'Next backup in 16 hours',
  },
]

const resourceUsage = {
  cpu: 34,
  memory: 67,
  disk: 45,
  network: 23,
}

const uptimeData = [
  { time: '00:00', uptime: 100 },
  { time: '04:00', uptime: 100 },
  { time: '08:00', uptime: 99.8 },
  { time: '12:00', uptime: 100 },
  { time: '16:00', uptime: 100 },
  { time: '20:00', uptime: 99.95 },
  { time: 'Now', uptime: 100 },
]

const responseTimeData = [
  { time: '00:00', api: 12, gateway: 45, db: 8 },
  { time: '04:00', api: 10, gateway: 42, db: 6 },
  { time: '08:00', api: 15, gateway: 48, db: 12 },
  { time: '12:00', api: 18, gateway: 52, db: 14 },
  { time: '16:00', api: 14, gateway: 44, db: 10 },
  { time: '20:00', api: 11, gateway: 41, db: 7 },
  { time: 'Now', api: 8, gateway: 42, db: 5 },
]

const incidentHistory = [
  {
    id: '1',
    title: 'API latency spike',
    status: 'resolved',
    startTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    endTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000),
    impact: 'minor',
  },
  {
    id: '2',
    title: 'Database maintenance',
    status: 'resolved',
    startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000),
    impact: 'maintenance',
  },
  {
    id: '3',
    title: 'Discord Gateway reconnection',
    status: 'resolved',
    startTime: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    endTime: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000 + 5 * 60 * 1000),
    impact: 'minor',
  },
]

const statusConfig = {
  online: { icon: CheckCircle, color: 'text-success', bg: 'bg-success/10' },
  idle: { icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
  offline: { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10' },
  degraded: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10' },
}

const impactColors = {
  minor: 'bg-warning/10 text-warning border-warning/20',
  major: 'bg-destructive/10 text-destructive border-destructive/20',
  maintenance: 'bg-chart-1/10 text-chart-1 border-chart-1/20',
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-3 shadow-lg">
        <p className="text-sm font-medium">{label}</p>
        <div className="mt-1 space-y-1">
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.name === 'uptime' ? '%' : 'ms'}
            </p>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export default function SystemPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">System</h1>
          <p className="text-sm text-muted-foreground">
            Monitor infrastructure health and system performance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status="online" label="All Systems Operational" />
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Overall Uptime"
          value="99.99%"
          description="Last 30 days"
          icon={<Activity className="h-4 w-4 text-success" />}
        />
        <MetricCard
          title="Avg Response Time"
          value="42ms"
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 5.2, isPositive: true }}
        />
        <MetricCard
          title="Active Services"
          value={`${services.filter((s) => s.status === 'online').length}/${services.length}`}
          icon={<Server className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Incidents (30d)"
          value={incidentHistory.length.toString()}
          icon={<AlertTriangle className="h-4 w-4 text-warning" />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-medium">Service Status</CardTitle>
            <CardDescription>Real-time status of all system services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {services.map((service) => {
                const config = statusConfig[service.status as keyof typeof statusConfig]
                const StatusIcon = config.icon
                return (
                  <div
                    key={service.name}
                    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.bg}`}>
                        <StatusIcon className={`h-5 w-5 ${config.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{service.name}</span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              service.status === 'online'
                                ? 'bg-success/10 text-success border-success/20'
                                : service.status === 'idle'
                                ? 'bg-warning/10 text-warning border-warning/20'
                                : 'bg-destructive/10 text-destructive border-destructive/20'
                            }`}
                          >
                            {service.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{service.details}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      {service.latency !== null && (
                        <div className="text-right">
                          <div className="font-medium">{service.latency}ms</div>
                          <div className="text-xs text-muted-foreground">latency</div>
                        </div>
                      )}
                      <div className="text-right">
                        <div className="font-medium">{service.uptime}</div>
                        <div className="text-xs text-muted-foreground">uptime</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Resource Usage</CardTitle>
            <CardDescription>Current system resource utilization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                  <span>CPU</span>
                </div>
                <span className="font-medium">{resourceUsage.cpu}%</span>
              </div>
              <Progress value={resourceUsage.cpu} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <MemoryStick className="h-4 w-4 text-muted-foreground" />
                  <span>Memory</span>
                </div>
                <span className="font-medium">{resourceUsage.memory}%</span>
              </div>
              <Progress value={resourceUsage.memory} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-muted-foreground" />
                  <span>Disk</span>
                </div>
                <span className="font-medium">{resourceUsage.disk}%</span>
              </div>
              <Progress value={resourceUsage.disk} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span>Network</span>
                </div>
                <span className="font-medium">{resourceUsage.network}%</span>
              </div>
              <Progress value={resourceUsage.network} className="h-2" />
            </div>

            <div className="pt-4 border-t">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Total Memory</div>
                  <div className="font-medium">16 GB</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Total Storage</div>
                  <div className="font-medium">500 GB</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Response Times</CardTitle>
            <CardDescription>Average response time by service (24h)</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseTimeData}>
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
                  unit="ms"
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="gateway"
                  name="Gateway"
                  stroke="oklch(0.55 0.2 250)"
                  strokeWidth={2}
                  dot={{ fill: 'oklch(0.55 0.2 250)', r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="api"
                  name="API"
                  stroke="oklch(0.6 0.18 165)"
                  strokeWidth={2}
                  dot={{ fill: 'oklch(0.6 0.18 165)', r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="db"
                  name="Database"
                  stroke="oklch(0.65 0.18 85)"
                  strokeWidth={2}
                  dot={{ fill: 'oklch(0.65 0.18 85)', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Uptime History</CardTitle>
            <CardDescription>System uptime percentage (24h)</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={uptimeData}>
                <defs>
                  <linearGradient id="colorUptime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.55 0.2 145)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.55 0.2 145)" stopOpacity={0} />
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
                  domain={[99, 100]}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground"
                  unit="%"
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="uptime"
                  name="Uptime"
                  stroke="oklch(0.55 0.2 145)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorUptime)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Incident History</CardTitle>
          <CardDescription>Recent incidents and maintenance events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {incidentHistory.map((incident) => (
              <div
                key={incident.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{incident.title}</span>
                      <Badge
                        variant="outline"
                        className={`text-xs ${impactColors[incident.impact as keyof typeof impactColors]}`}
                      >
                        {incident.impact}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {incident.startTime.toLocaleDateString()} -{' '}
                      {Math.round((incident.endTime.getTime() - incident.startTime.getTime()) / 60000)}{' '}
                      min duration
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {incident.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
