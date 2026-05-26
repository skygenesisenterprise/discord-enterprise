'use client'

import { useState } from 'react'
import {
  Ticket,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  User,
  Tag,
  Calendar,
  ChevronRight,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { Separator } from '@/components/ui/separator'
import { MetricCard } from '@/components/dashboard/metric-card'

type TicketStatus = 'open' | 'in-progress' | 'pending' | 'resolved' | 'closed'

interface TicketData {
  id: string
  number: number
  subject: string
  description: string
  status: TicketStatus
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: string
  createdBy: { name: string; discriminator: string }
  assignedTo: { name: string } | null
  createdAt: Date
  updatedAt: Date
  messages: number
}

const tickets: TicketData[] = [
  {
    id: '1',
    number: 1247,
    subject: 'Unable to verify my account',
    description: 'I completed the verification process but my roles were not assigned',
    status: 'open',
    priority: 'high',
    category: 'Verification',
    createdBy: { name: 'NewUser', discriminator: '1234' },
    assignedTo: null,
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000),
    messages: 2,
  },
  {
    id: '2',
    number: 1246,
    subject: 'Request for Developer role',
    description: 'I would like to apply for the Developer role to access dev channels',
    status: 'in-progress',
    priority: 'medium',
    category: 'Role Request',
    createdBy: { name: 'TechEnthusiast', discriminator: '5678' },
    assignedTo: { name: 'Mod Sarah' },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 45 * 60 * 1000),
    messages: 5,
  },
  {
    id: '3',
    number: 1245,
    subject: 'Appeal for warning removal',
    description: 'I believe my warning was issued in error and would like to appeal',
    status: 'pending',
    priority: 'medium',
    category: 'Appeal',
    createdBy: { name: 'CommunityMember', discriminator: '9012' },
    assignedTo: { name: 'Mod Alex' },
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    messages: 8,
  },
  {
    id: '4',
    number: 1244,
    subject: 'Bug report: Bot not responding to commands',
    description: 'The /help command is not working in #support channel',
    status: 'resolved',
    priority: 'high',
    category: 'Bug Report',
    createdBy: { name: 'BugHunter', discriminator: '3456' },
    assignedTo: { name: 'Admin' },
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    messages: 12,
  },
  {
    id: '5',
    number: 1243,
    subject: 'Partnership inquiry',
    description: 'Our community would like to explore partnership opportunities',
    status: 'in-progress',
    priority: 'low',
    category: 'Partnership',
    createdBy: { name: 'PartnerRep', discriminator: '7890' },
    assignedTo: { name: 'Admin' },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    messages: 4,
  },
  {
    id: '6',
    number: 1242,
    subject: 'Question about server rules',
    description: 'Can you clarify the rules about self-promotion in the server?',
    status: 'closed',
    priority: 'low',
    category: 'General',
    createdBy: { name: 'NewMember', discriminator: '0123' },
    assignedTo: { name: 'Mod Sarah' },
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
    messages: 6,
  },
]

const categories = [
  { name: 'Verification', count: 23 },
  { name: 'Role Request', count: 45 },
  { name: 'Appeal', count: 12 },
  { name: 'Bug Report', count: 8 },
  { name: 'Partnership', count: 5 },
  { name: 'General', count: 67 },
]

const moderators = [
  { name: 'Mod Alex', tickets: 12, avatar: null },
  { name: 'Mod Sarah', tickets: 8, avatar: null },
  { name: 'Admin', tickets: 5, avatar: null },
]

const statusConfig: Record<TicketStatus, { color: string; icon: React.ElementType; label: string }> = {
  open: { color: 'bg-chart-1/10 text-chart-1 border-chart-1/20', icon: Clock, label: 'Open' },
  'in-progress': { color: 'bg-chart-2/10 text-chart-2 border-chart-2/20', icon: MessageSquare, label: 'In Progress' },
  pending: { color: 'bg-warning/10 text-warning border-warning/20', icon: Clock, label: 'Pending' },
  resolved: { color: 'bg-success/10 text-success border-success/20', icon: CheckCircle, label: 'Resolved' },
  closed: { color: 'bg-muted text-muted-foreground border-border', icon: XCircle, label: 'Closed' },
}

const priorityColors: Record<string, string> = {
  low: 'text-muted-foreground',
  medium: 'text-chart-1',
  high: 'text-warning',
  urgent: 'text-destructive',
}

export default function TicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.number.toString().includes(searchQuery)
  )

  const openTickets = tickets.filter((t) => t.status === 'open' || t.status === 'in-progress' || t.status === 'pending')
  const resolvedTickets = tickets.filter((t) => t.status === 'resolved' || t.status === 'closed')

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Tickets</h1>
          <p className="text-sm text-muted-foreground">
            Manage support tickets and user requests.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Ticket
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Open Tickets"
          value={openTickets.length}
          description="Awaiting response"
          icon={<Ticket className="h-4 w-4 text-chart-1" />}
        />
        <MetricCard
          title="In Progress"
          value={tickets.filter((t) => t.status === 'in-progress').length}
          icon={<MessageSquare className="h-4 w-4 text-chart-2" />}
        />
        <MetricCard
          title="Resolved Today"
          value="8"
          icon={<CheckCircle className="h-4 w-4 text-success" />}
        />
        <MetricCard
          title="Avg. Response Time"
          value="2.4h"
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-medium">Ticket Queue</CardTitle>
                  <CardDescription>Manage and respond to support tickets</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search tickets..."
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
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="open">Open</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                  <TabsTrigger value="resolved">Resolved</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4">
                  <div className="space-y-2">
                    {filteredTickets.map((ticket) => {
                      const StatusIcon = statusConfig[ticket.status].icon
                      return (
                        <div
                          key={ticket.id}
                          className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50 cursor-pointer"
                          onClick={() => setSelectedTicket(ticket)}
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center">
                              <span className="text-xs text-muted-foreground">#</span>
                              <span className="font-mono font-medium">{ticket.number}</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{ticket.subject}</span>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${statusConfig[ticket.status].color}`}
                                >
                                  <StatusIcon className="mr-1 h-3 w-3" />
                                  {statusConfig[ticket.status].label}
                                </Badge>
                              </div>
                              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {ticket.createdBy.name}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Tag className="h-3 w-3" />
                                  {ticket.category}
                                </span>
                                <span className={priorityColors[ticket.priority]}>
                                  {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            {ticket.assignedTo && (
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-[10px]">
                                    {ticket.assignedTo.name.slice(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                              </div>
                            )}
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MessageSquare className="h-3 w-3" />
                              {ticket.messages}
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="open" className="mt-4">
                  <div className="space-y-2">
                    {filteredTickets
                      .filter((t) => t.status === 'open')
                      .map((ticket) => {
                        const StatusIcon = statusConfig[ticket.status].icon
                        return (
                          <div
                            key={ticket.id}
                            className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50 cursor-pointer"
                            onClick={() => setSelectedTicket(ticket)}
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex flex-col items-center">
                                <span className="text-xs text-muted-foreground">#</span>
                                <span className="font-mono font-medium">{ticket.number}</span>
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{ticket.subject}</span>
                                  <Badge
                                    variant="outline"
                                    className={`text-xs ${statusConfig[ticket.status].color}`}
                                  >
                                    <StatusIcon className="mr-1 h-3 w-3" />
                                    {statusConfig[ticket.status].label}
                                  </Badge>
                                </div>
                                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {ticket.createdBy.name}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Tag className="h-3 w-3" />
                                    {ticket.category}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )
                      })}
                  </div>
                </TabsContent>

                <TabsContent value="in-progress" className="mt-4">
                  <div className="space-y-2">
                    {filteredTickets
                      .filter((t) => t.status === 'in-progress')
                      .map((ticket) => {
                        const StatusIcon = statusConfig[ticket.status].icon
                        return (
                          <div
                            key={ticket.id}
                            className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50 cursor-pointer"
                            onClick={() => setSelectedTicket(ticket)}
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex flex-col items-center">
                                <span className="text-xs text-muted-foreground">#</span>
                                <span className="font-mono font-medium">{ticket.number}</span>
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{ticket.subject}</span>
                                  <Badge
                                    variant="outline"
                                    className={`text-xs ${statusConfig[ticket.status].color}`}
                                  >
                                    <StatusIcon className="mr-1 h-3 w-3" />
                                    {statusConfig[ticket.status].label}
                                  </Badge>
                                </div>
                                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {ticket.createdBy.name}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Tag className="h-3 w-3" />
                                    {ticket.category}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )
                      })}
                  </div>
                </TabsContent>

                <TabsContent value="resolved" className="mt-4">
                  <div className="space-y-2">
                    {filteredTickets
                      .filter((t) => t.status === 'resolved' || t.status === 'closed')
                      .map((ticket) => {
                        const StatusIcon = statusConfig[ticket.status].icon
                        return (
                          <div
                            key={ticket.id}
                            className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50 cursor-pointer"
                            onClick={() => setSelectedTicket(ticket)}
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex flex-col items-center">
                                <span className="text-xs text-muted-foreground">#</span>
                                <span className="font-mono font-medium">{ticket.number}</span>
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{ticket.subject}</span>
                                  <Badge
                                    variant="outline"
                                    className={`text-xs ${statusConfig[ticket.status].color}`}
                                  >
                                    <StatusIcon className="mr-1 h-3 w-3" />
                                    {statusConfig[ticket.status].label}
                                  </Badge>
                                </div>
                                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {ticket.createdBy.name}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Tag className="h-3 w-3" />
                                    {ticket.category}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )
                      })}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className="flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                  >
                    <span>{category.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Assigned Moderators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {moderators.map((mod) => (
                  <div
                    key={mod.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="text-xs">
                          {mod.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{mod.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {mod.tickets} tickets
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Sheet open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <SheetContent className="w-[500px] sm:w-[600px]">
          {selectedTicket && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-muted-foreground">#{selectedTicket.number}</span>
                  <Badge
                    variant="outline"
                    className={statusConfig[selectedTicket.status].color}
                  >
                    {statusConfig[selectedTicket.status].label}
                  </Badge>
                </div>
                <SheetTitle className="text-left">{selectedTicket.subject}</SheetTitle>
                <SheetDescription className="text-left">
                  {selectedTicket.description}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground mb-1">Created by</div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {selectedTicket.createdBy.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {selectedTicket.createdBy.name}#{selectedTicket.createdBy.discriminator}
                      </span>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground mb-1">Assigned to</div>
                    {selectedTicket.assignedTo ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {selectedTicket.assignedTo.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                          {selectedTicket.assignedTo.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Unassigned</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground mb-1">Category</div>
                    <Badge variant="secondary">{selectedTicket.category}</Badge>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground mb-1">Priority</div>
                    <span className={`text-sm font-medium ${priorityColors[selectedTicket.priority]}`}>
                      {selectedTicket.priority.charAt(0).toUpperCase() + selectedTicket.priority.slice(1)}
                    </span>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground mb-1">Messages</div>
                    <span className="text-sm font-medium">{selectedTicket.messages}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  Created {selectedTicket.createdAt.toLocaleString()}
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button className="flex-1">Reply</Button>
                  <Button variant="outline">Assign</Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Change Priority</DropdownMenuItem>
                      <DropdownMenuItem>Change Category</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-success">Mark Resolved</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Close Ticket</DropdownMenuItem>
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
