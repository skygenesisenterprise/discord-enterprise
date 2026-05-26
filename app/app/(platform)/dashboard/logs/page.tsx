'use client'

import { useState } from 'react'
import {
  ScrollText,
  Search,
  Filter,
  Download,
  RefreshCw,
  AlertCircle,
  Info,
  AlertTriangle,
  CheckCircle,
  Terminal,
  Shield,
  Clock,
  ChevronDown,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MetricCard } from '@/components/dashboard/metric-card'

type LogLevel = 'info' | 'warning' | 'error' | 'success'
type LogType = 'bot' | 'security' | 'moderation' | 'command'

interface LogEntry {
  id: string
  timestamp: Date
  level: LogLevel
  type: LogType
  message: string
  source: string
  details?: string
}

const logs: LogEntry[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    level: 'info',
    type: 'command',
    message: '/help command executed',
    source: 'CommandHandler',
    details: 'User: TechUser#1234, Channel: #support',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    level: 'warning',
    type: 'security',
    message: 'Rate limit triggered for user',
    source: 'RateLimiter',
    details: 'User: SpamAccount#5678, Limit: 10 req/min',
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    level: 'success',
    type: 'moderation',
    message: 'User verified successfully',
    source: 'VerificationSystem',
    details: 'User: NewMember#9012, Method: Captcha',
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    level: 'error',
    type: 'bot',
    message: 'Failed to send DM to user',
    source: 'MessageService',
    details: 'User: PrivateUser#3456, Reason: DMs disabled',
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    level: 'info',
    type: 'bot',
    message: 'Bot reconnected to gateway',
    source: 'DiscordGateway',
    details: 'Shard: 0, Latency: 42ms',
  },
  {
    id: '6',
    timestamp: new Date(Date.now() - 20 * 60 * 1000),
    level: 'warning',
    type: 'moderation',
    message: 'Auto-moderation action triggered',
    source: 'AutoMod',
    details: 'Rule: Anti-Spam, User: SpamBot#7890',
  },
  {
    id: '7',
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    level: 'success',
    type: 'command',
    message: '/ticket command executed',
    source: 'CommandHandler',
    details: 'User: SupportSeeker#0123, Ticket: #1248',
  },
  {
    id: '8',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    level: 'info',
    type: 'security',
    message: 'New login from admin account',
    source: 'AuthService',
    details: 'IP: 192.168.1.xxx, Location: US',
  },
  {
    id: '9',
    timestamp: new Date(Date.now() - 35 * 60 * 1000),
    level: 'error',
    type: 'bot',
    message: 'Database query timeout',
    source: 'DatabaseService',
    details: 'Query: getUserRoles, Duration: 5000ms',
  },
  {
    id: '10',
    timestamp: new Date(Date.now() - 40 * 60 * 1000),
    level: 'success',
    type: 'moderation',
    message: 'User ban executed',
    source: 'ModerationService',
    details: 'Target: MaliciousUser#4567, Moderator: Admin',
  },
  {
    id: '11',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    level: 'info',
    type: 'bot',
    message: 'Scheduled task completed',
    source: 'TaskScheduler',
    details: 'Task: Daily Backup, Duration: 12s',
  },
  {
    id: '12',
    timestamp: new Date(Date.now() - 50 * 60 * 1000),
    level: 'warning',
    type: 'security',
    message: 'Suspicious activity detected',
    source: 'SecurityMonitor',
    details: 'Type: Multiple failed verifications, User: Unknown',
  },
]

const levelConfig: Record<LogLevel, { icon: React.ElementType; color: string; bg: string }> = {
  info: { icon: Info, color: 'text-chart-1', bg: 'bg-chart-1/10' },
  warning: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10' },
  error: { icon: AlertCircle, color: 'text-destructive', bg: 'bg-destructive/10' },
  success: { icon: CheckCircle, color: 'text-success', bg: 'bg-success/10' },
}

const typeConfig: Record<LogType, { label: string; color: string }> = {
  bot: { label: 'Bot', color: 'bg-muted text-muted-foreground' },
  security: { label: 'Security', color: 'bg-destructive/10 text-destructive' },
  moderation: { label: 'Moderation', color: 'bg-warning/10 text-warning' },
  command: { label: 'Command', color: 'bg-chart-2/10 text-chart-2' },
}

export default function LogsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [levelFilter, setLevelFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter
    const matchesType = typeFilter === 'all' || log.type === typeFilter
    return matchesSearch && matchesLevel && matchesType
  })

  const logStats = {
    total: logs.length,
    errors: logs.filter((l) => l.level === 'error').length,
    warnings: logs.filter((l) => l.level === 'warning').length,
    info: logs.filter((l) => l.level === 'info').length,
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Logs</h1>
          <p className="text-sm text-muted-foreground">
            View and search through system and bot logs.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Total Logs"
          value={logStats.total}
          description="Last 24 hours"
          icon={<ScrollText className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Errors"
          value={logStats.errors}
          icon={<AlertCircle className="h-4 w-4 text-destructive" />}
        />
        <MetricCard
          title="Warnings"
          value={logStats.warnings}
          icon={<AlertTriangle className="h-4 w-4 text-warning" />}
        />
        <MetricCard
          title="Info"
          value={logStats.info}
          icon={<Info className="h-4 w-4 text-chart-1" />}
        />
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-medium">Log Explorer</CardTitle>
              <CardDescription>Search and filter system logs</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search logs..."
                  className="h-8 pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="h-8 w-[120px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="h-8 w-[130px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="bot">Bot</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="moderation">Moderation</SelectItem>
                  <SelectItem value="command">Command</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Logs</TabsTrigger>
              <TabsTrigger value="bot">Bot</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="moderation">Moderation</TabsTrigger>
              <TabsTrigger value="command">Commands</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">Timestamp</TableHead>
                      <TableHead className="w-[100px]">Level</TableHead>
                      <TableHead className="w-[120px]">Type</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead className="w-[150px]">Source</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map((log) => {
                      const LevelIcon = levelConfig[log.level].icon
                      return (
                        <TableRow key={log.id} className="font-mono text-xs">
                          <TableCell className="text-muted-foreground">
                            {log.timestamp.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <div
                                className={`flex h-5 w-5 items-center justify-center rounded ${levelConfig[log.level].bg}`}
                              >
                                <LevelIcon className={`h-3 w-3 ${levelConfig[log.level].color}`} />
                              </div>
                              <span className={levelConfig[log.level].color}>
                                {log.level.toUpperCase()}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`text-xs ${typeConfig[log.type].color}`}>
                              {typeConfig[log.type].label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium text-foreground">{log.message}</div>
                              {log.details && (
                                <div className="text-muted-foreground mt-0.5">{log.details}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{log.source}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {['bot', 'security', 'moderation', 'command'].map((type) => (
              <TabsContent key={type} value={type} className="mt-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[180px]">Timestamp</TableHead>
                        <TableHead className="w-[100px]">Level</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead className="w-[150px]">Source</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLogs
                        .filter((log) => log.type === type)
                        .map((log) => {
                          const LevelIcon = levelConfig[log.level].icon
                          return (
                            <TableRow key={log.id} className="font-mono text-xs">
                              <TableCell className="text-muted-foreground">
                                {log.timestamp.toLocaleString()}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1.5">
                                  <div
                                    className={`flex h-5 w-5 items-center justify-center rounded ${levelConfig[log.level].bg}`}
                                  >
                                    <LevelIcon className={`h-3 w-3 ${levelConfig[log.level].color}`} />
                                  </div>
                                  <span className={levelConfig[log.level].color}>
                                    {log.level.toUpperCase()}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium text-foreground">{log.message}</div>
                                  {log.details && (
                                    <div className="text-muted-foreground mt-0.5">{log.details}</div>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="text-muted-foreground">{log.source}</TableCell>
                            </TableRow>
                          )
                        })}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
