'use client'

import { useState } from 'react'
import {
  Search,
  Filter,
  MoreHorizontal,
  Shield,
  Crown,
  UserCheck,
  Users,
  Hash,
  AtSign,
  Calendar,
  ChevronDown,
  X,
} from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { MetricCard } from '@/components/dashboard/metric-card'

const members = [
  {
    id: '1',
    username: 'TechEnthusiast',
    discriminator: '1234',
    avatar: null,
    nickname: 'Tech Lead',
    roles: ['Administrator', 'Developer'],
    joinedAt: new Date('2023-01-15'),
    messages: 12450,
    status: 'online',
    warnings: 0,
  },
  {
    id: '2',
    username: 'CommunityManager',
    discriminator: '5678',
    avatar: null,
    nickname: 'CM Sarah',
    roles: ['Moderator', 'Support'],
    joinedAt: new Date('2023-03-22'),
    messages: 8920,
    status: 'online',
    warnings: 0,
  },
  {
    id: '3',
    username: 'NewMember',
    discriminator: '9012',
    avatar: null,
    nickname: null,
    roles: ['Member'],
    joinedAt: new Date('2024-01-10'),
    messages: 156,
    status: 'offline',
    warnings: 1,
  },
  {
    id: '4',
    username: 'ActiveContributor',
    discriminator: '3456',
    avatar: null,
    nickname: 'Contributor',
    roles: ['Developer', 'Member'],
    joinedAt: new Date('2023-06-05'),
    messages: 5678,
    status: 'idle',
    warnings: 0,
  },
  {
    id: '5',
    username: 'SupportHero',
    discriminator: '7890',
    avatar: null,
    nickname: 'Support Lead',
    roles: ['Support', 'Moderator'],
    joinedAt: new Date('2023-02-18'),
    messages: 15230,
    status: 'dnd',
    warnings: 0,
  },
  {
    id: '6',
    username: 'DesignPro',
    discriminator: '2345',
    avatar: null,
    nickname: 'Designer',
    roles: ['Designer', 'Member'],
    joinedAt: new Date('2023-09-12'),
    messages: 3421,
    status: 'online',
    warnings: 0,
  },
  {
    id: '7',
    username: 'QuietObserver',
    discriminator: '6789',
    avatar: null,
    nickname: null,
    roles: ['Member'],
    joinedAt: new Date('2024-02-01'),
    messages: 42,
    status: 'offline',
    warnings: 2,
  },
  {
    id: '8',
    username: 'CodeWarrior',
    discriminator: '0123',
    avatar: null,
    nickname: 'Dev',
    roles: ['Developer', 'Contributor'],
    joinedAt: new Date('2023-04-30'),
    messages: 7890,
    status: 'online',
    warnings: 0,
  },
]

const roles = [
  { name: 'Administrator', color: 'bg-red-500', members: 3 },
  { name: 'Moderator', color: 'bg-blue-500', members: 8 },
  { name: 'Developer', color: 'bg-green-500', members: 24 },
  { name: 'Support', color: 'bg-yellow-500', members: 12 },
  { name: 'Designer', color: 'bg-purple-500', members: 6 },
  { name: 'Contributor', color: 'bg-orange-500', members: 45 },
  { name: 'Member', color: 'bg-gray-500', members: 15320 },
]

const channels = [
  { name: 'general', type: 'text', category: 'General', members: 15420 },
  { name: 'announcements', type: 'text', category: 'General', members: 15420 },
  { name: 'introductions', type: 'text', category: 'General', members: 12340 },
  { name: 'development', type: 'text', category: 'Tech', members: 2450 },
  { name: 'design', type: 'text', category: 'Tech', members: 890 },
  { name: 'support', type: 'text', category: 'Support', members: 8900 },
  { name: 'tickets', type: 'text', category: 'Support', members: 156 },
  { name: 'voice-lounge', type: 'voice', category: 'Voice', members: 0 },
]

const statusColors = {
  online: 'bg-success',
  idle: 'bg-warning',
  dnd: 'bg-destructive',
  offline: 'bg-muted-foreground',
}

const roleColors: Record<string, string> = {
  Administrator: 'bg-red-500/10 text-red-500 border-red-500/20',
  Moderator: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  Developer: 'bg-green-500/10 text-green-500 border-green-500/20',
  Support: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  Designer: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  Contributor: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  Member: 'bg-muted text-muted-foreground border-border',
}

type Member = typeof members[0]

export default function CommunityPage() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredMembers = members.filter(
    (member) =>
      member.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.nickname?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Community</h1>
          <p className="text-sm text-muted-foreground">
            Manage members, roles, and channels in your server.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Total Members"
          value="15,420"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 5.2, isPositive: true }}
        />
        <MetricCard
          title="Online Now"
          value="3,842"
          icon={<UserCheck className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Total Roles"
          value={roles.length.toString()}
          icon={<Shield className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Channels"
          value={channels.length.toString()}
          icon={<Hash className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-medium">Member Directory</CardTitle>
                  <CardDescription>View and manage all server members</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search members..."
                      className="h-8 pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="sm" className="h-8">
                    <Filter className="mr-2 h-3.5 w-3.5" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Roles</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Messages</TableHead>
                    <TableHead className="text-right">Warnings</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow
                      key={member.id}
                      className="cursor-pointer"
                      onClick={() => setSelectedMember(member)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={member.avatar || undefined} />
                              <AvatarFallback className="text-xs">
                                {member.username.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${
                                statusColors[member.status as keyof typeof statusColors]
                              }`}
                            />
                          </div>
                          <div>
                            <div className="font-medium">
                              {member.nickname || member.username}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              @{member.username}#{member.discriminator}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {member.roles.slice(0, 2).map((role) => (
                            <Badge
                              key={role}
                              variant="outline"
                              className={`text-xs ${roleColors[role] || ''}`}
                            >
                              {role}
                            </Badge>
                          ))}
                          {member.roles.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{member.roles.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {member.joinedAt.toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {member.messages.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {member.warnings > 0 ? (
                          <Badge variant="destructive" className="text-xs">
                            {member.warnings}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Message</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit Roles</DropdownMenuItem>
                            <DropdownMenuItem>Change Nickname</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-warning">Warn</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Kick</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Ban</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-medium">Server Roles</CardTitle>
                  <CardDescription>Manage role hierarchy and permissions</CardDescription>
                </div>
                <Button size="sm">Create Role</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {roles.map((role, index) => (
                  <div
                    key={role.name}
                    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className={`h-3 w-3 rounded-full ${role.color}`} />
                      <div>
                        <div className="font-medium">{role.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {role.members.toLocaleString()} members
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {role.name === 'Administrator' && (
                        <Crown className="h-4 w-4 text-warning" />
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Role</DropdownMenuItem>
                          <DropdownMenuItem>View Members</DropdownMenuItem>
                          <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete Role</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-medium">Server Channels</CardTitle>
                  <CardDescription>Manage text and voice channels</CardDescription>
                </div>
                <Button size="sm">Create Channel</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['General', 'Tech', 'Support', 'Voice'].map((category) => (
                  <div key={category}>
                    <div className="mb-2 flex items-center gap-2">
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-semibold uppercase text-muted-foreground">
                        {category}
                      </span>
                    </div>
                    <div className="space-y-1 pl-6">
                      {channels
                        .filter((c) => c.category === category)
                        .map((channel) => (
                          <div
                            key={channel.name}
                            className="flex items-center justify-between rounded-md px-3 py-2 transition-colors hover:bg-muted"
                          >
                            <div className="flex items-center gap-2">
                              <Hash className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium">{channel.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-xs text-muted-foreground">
                                {channel.members.toLocaleString()} members
                              </span>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <MoreHorizontal className="h-3.5 w-3.5" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Edit Channel</DropdownMenuItem>
                                  <DropdownMenuItem>View Permissions</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    Delete Channel
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Sheet open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          {selectedMember && (
            <>
              <SheetHeader>
                <SheetTitle>Member Profile</SheetTitle>
                <SheetDescription>View detailed member information</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={selectedMember.avatar || undefined} />
                      <AvatarFallback className="text-lg">
                        {selectedMember.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background ${
                        statusColors[selectedMember.status as keyof typeof statusColors]
                      }`}
                    />
                  </div>
                  <div>
                    <div className="text-lg font-semibold">
                      {selectedMember.nickname || selectedMember.username}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      @{selectedMember.username}#{selectedMember.discriminator}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-2">Roles</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.roles.map((role) => (
                        <Badge
                          key={role}
                          variant="outline"
                          className={roleColors[role] || ''}
                        >
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4" />
                        Joined
                      </div>
                      <div className="font-medium">
                        {selectedMember.joinedAt.toLocaleDateString()}
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <AtSign className="h-4 w-4" />
                        Messages
                      </div>
                      <div className="font-medium font-mono">
                        {selectedMember.messages.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {selectedMember.warnings > 0 && (
                    <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                      <div className="flex items-center gap-2 text-sm text-destructive mb-1">
                        <Shield className="h-4 w-4" />
                        Warnings
                      </div>
                      <div className="font-medium text-destructive">
                        {selectedMember.warnings} active warning(s)
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button className="flex-1">Message</Button>
                  <Button variant="outline">Edit Roles</Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Change Nickname</DropdownMenuItem>
                      <DropdownMenuItem>View Moderation History</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-warning">Warn</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Kick</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Ban</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
