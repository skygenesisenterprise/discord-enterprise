'use client'

import {
  Shield,
  AlertTriangle,
  Ban,
  VolumeX,
  Search,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  MoreHorizontal,
  Eye,
  MessageSquare,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MetricCard } from '@/components/dashboard/metric-card'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { Switch } from '@/components/ui/switch'

const moderationStats = {
  warningsToday: 12,
  bansToday: 2,
  mutesToday: 8,
  reportsQueue: 3,
}

const recentWarnings = [
  {
    id: '1',
    user: { name: 'ShadowUser', discriminator: '1234' },
    reason: 'Spam in #general',
    moderator: { name: 'Mod Alex' },
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: '2',
    user: { name: 'TrollMaster', discriminator: '5678' },
    reason: 'Inappropriate language',
    moderator: { name: 'Mod Sarah' },
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: '3',
    user: { name: 'NewUser', discriminator: '9012' },
    reason: 'Self-promotion without permission',
    moderator: { name: 'Mod Alex' },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '4',
    user: { name: 'SpamBot', discriminator: '3456' },
    reason: 'Sending suspicious links',
    moderator: { name: 'AutoMod' },
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
]

const recentBans = [
  {
    id: '1',
    user: { name: 'MaliciousUser', discriminator: '0000' },
    reason: 'Multiple rule violations',
    moderator: { name: 'Admin' },
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    duration: 'Permanent',
  },
  {
    id: '2',
    user: { name: 'RaidAccount', discriminator: '1111' },
    reason: 'Raid participation',
    moderator: { name: 'Mod Sarah' },
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    duration: '7 days',
  },
]

const reports = [
  {
    id: '1',
    reporter: { name: 'CommunityMember', discriminator: '1234' },
    reported: { name: 'SuspectUser', discriminator: '5678' },
    reason: 'Harassment in DMs',
    status: 'pending',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    evidence: 'Screenshots provided',
  },
  {
    id: '2',
    reporter: { name: 'TechUser', discriminator: '9012' },
    reported: { name: 'Impersonator', discriminator: '3456' },
    reason: 'Impersonating staff',
    status: 'pending',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    evidence: 'Profile screenshot',
  },
  {
    id: '3',
    reporter: { name: 'NewMember', discriminator: '7890' },
    reported: { name: 'ScamAccount', discriminator: '0123' },
    reason: 'Scam attempt',
    status: 'pending',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    evidence: 'Message logs',
  },
]

const autoModRules = [
  {
    id: '1',
    name: 'Anti-Spam',
    description: 'Block repeated messages and excessive mentions',
    enabled: true,
    triggered: 156,
  },
  {
    id: '2',
    name: 'Link Filter',
    description: 'Block suspicious and non-whitelisted links',
    enabled: true,
    triggered: 89,
  },
  {
    id: '3',
    name: 'Profanity Filter',
    description: 'Filter inappropriate language',
    enabled: true,
    triggered: 234,
  },
  {
    id: '4',
    name: 'Raid Protection',
    description: 'Detect and prevent server raids',
    enabled: true,
    triggered: 12,
  },
  {
    id: '5',
    name: 'Invite Blocker',
    description: 'Block Discord invite links',
    enabled: false,
    triggered: 45,
  },
]

const moderationActivity = [
  {
    id: '1',
    type: 'moderation' as const,
    title: 'User warned',
    description: 'ShadowUser#1234 warned for spam',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    user: { name: 'Mod Alex' },
  },
  {
    id: '2',
    type: 'moderation' as const,
    title: 'User muted',
    description: 'TrollMaster#5678 muted for 1 hour',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    user: { name: 'Mod Sarah' },
  },
  {
    id: '3',
    type: 'system' as const,
    title: 'AutoMod triggered',
    description: 'Blocked spam message in #general',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: '4',
    type: 'moderation' as const,
    title: 'User banned',
    description: 'MaliciousUser#0000 permanently banned',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    user: { name: 'Admin' },
  },
  {
    id: '5',
    type: 'system' as const,
    title: 'Raid protection activated',
    description: 'Temporarily locked server joins',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
]

export default function ModerationPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Moderation</h1>
          <p className="text-sm text-muted-foreground">
            Manage moderation actions and auto-moderation settings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status="online" label="AutoMod Active" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Warnings Today"
          value={moderationStats.warningsToday}
          icon={<AlertTriangle className="h-4 w-4 text-warning" />}
        />
        <MetricCard
          title="Bans Today"
          value={moderationStats.bansToday}
          icon={<Ban className="h-4 w-4 text-destructive" />}
        />
        <MetricCard
          title="Mutes Today"
          value={moderationStats.mutesToday}
          icon={<VolumeX className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Reports Queue"
          value={moderationStats.reportsQueue}
          description="Awaiting review"
          icon={<Shield className="h-4 w-4 text-chart-1" />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-medium">Moderation Queue</CardTitle>
            <CardDescription>Pending reports and actions requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="reports">
              <TabsList>
                <TabsTrigger value="reports">
                  Reports
                  <Badge variant="secondary" className="ml-2 h-5 min-w-5 px-1">
                    {reports.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="warnings">Warnings</TabsTrigger>
                <TabsTrigger value="bans">Bans</TabsTrigger>
              </TabsList>

              <TabsContent value="reports" className="mt-4">
                <div className="space-y-3">
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-start justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/10">
                          <AlertTriangle className="h-5 w-5 text-warning" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{report.reported.name}</span>
                            <span className="text-xs text-muted-foreground">
                              #{report.reported.discriminator}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="mr-1 h-3 w-3" />
                              Pending
                            </Badge>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{report.reason}</p>
                          <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                            <span>
                              Reported by {report.reporter.name}#{report.reporter.discriminator}
                            </span>
                            <span>{report.evidence}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-success">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="warnings" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Moderator</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentWarnings.map((warning) => (
                      <TableRow key={warning.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarFallback className="text-xs">
                                {warning.user.name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium">{warning.user.name}</div>
                              <div className="text-xs text-muted-foreground">
                                #{warning.user.discriminator}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{warning.reason}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {warning.moderator.name}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {warning.timestamp.toLocaleTimeString()}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>View User</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                Revoke Warning
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="bans" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Moderator</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentBans.map((ban) => (
                      <TableRow key={ban.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarFallback className="text-xs">
                                {ban.user.name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium">{ban.user.name}</div>
                              <div className="text-xs text-muted-foreground">
                                #{ban.user.discriminator}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{ban.reason}</TableCell>
                        <TableCell>
                          <Badge
                            variant={ban.duration === 'Permanent' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {ban.duration}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {ban.moderator.name}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-warning">Unban User</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Moderation Activity</CardTitle>
            <CardDescription>Recent moderation actions</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[480px] overflow-auto">
            <ActivityFeed items={moderationActivity} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-medium">Auto-Moderation Rules</CardTitle>
              <CardDescription>Configure automated moderation systems</CardDescription>
            </div>
            <Button size="sm">Add Rule</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {autoModRules.map((rule) => (
              <div
                key={rule.id}
                className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      rule.enabled ? 'bg-success/10' : 'bg-muted'
                    }`}
                  >
                    <Shield
                      className={`h-5 w-5 ${rule.enabled ? 'text-success' : 'text-muted-foreground'}`}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{rule.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {rule.triggered.toLocaleString()} triggered
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rule.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Switch checked={rule.enabled} />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Configure</DropdownMenuItem>
                      <DropdownMenuItem>View Logs</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete Rule</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
