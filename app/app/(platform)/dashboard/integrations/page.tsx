'use client'

import {
  Puzzle,
  Plus,
  ExternalLink,
  Key,
  Copy,
  Eye,
  EyeOff,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  FolderGit,
  Webhook,
  Globe,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import { MetricCard } from '@/components/dashboard/metric-card'
import { useState } from 'react'

const integrations = [
  {
    id: '1',
    name: 'GitHub',
    description: 'Connect GitHub repositories for notifications and automation',
    icon: FolderGit,
    status: 'connected',
    connectedAt: new Date('2024-01-15'),
    config: {
      repository: 'skygenesis/enterprise',
      events: ['push', 'pull_request', 'issues'],
    },
  },
  {
    id: '2',
    name: 'Giteria',
    description: 'Custom Git integration for code deployments',
    icon: Globe,
    status: 'connected',
    connectedAt: new Date('2024-02-20'),
    config: {
      endpoint: 'giteria.skygenesis.com',
      webhooks: 3,
    },
  },
  {
    id: '3',
    name: 'Twitch',
    description: 'Stream notifications and subscriber alerts',
    icon: Globe,
    status: 'disconnected',
    connectedAt: null,
    config: null,
  },
  {
    id: '4',
    name: 'Twitter/X',
    description: 'Social media posting and monitoring',
    icon: Globe,
    status: 'disconnected',
    connectedAt: null,
    config: null,
  },
]

const webhooks = [
  {
    id: '1',
    name: 'GitHub Push Events',
    url: 'https://discord.skygenesisenterprise.com/api/webhooks/github',
    secret: 'ghwh_****************************',
    events: ['push', 'pull_request'],
    lastUsed: new Date(Date.now() - 15 * 60 * 1000),
    status: 'active',
  },
  {
    id: '2',
    name: 'Status Updates',
    url: 'https://discord.skygenesisenterprise.com/api/webhooks/status',
    secret: 'stwh_****************************',
    events: ['status_change', 'incident'],
    lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'active',
  },
  {
    id: '3',
    name: 'Form Submissions',
    url: 'https://discord.skygenesisenterprise.com/api/webhooks/forms',
    secret: 'fmwh_****************************',
    events: ['submission'],
    lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: 'inactive',
  },
]

const oauthApps = [
  {
    id: '1',
    name: 'Sky Genesis Bot',
    clientId: 'sg_bot_**********************',
    scopes: ['bot', 'applications.commands'],
    createdAt: new Date('2023-06-15'),
    lastUsed: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: '2',
    name: 'Admin Dashboard',
    clientId: 'sg_admin_**********************',
    scopes: ['identify', 'guilds', 'guilds.members.read'],
    createdAt: new Date('2023-06-20'),
    lastUsed: new Date(Date.now() - 30 * 60 * 1000),
  },
]

const apiKeys = [
  {
    id: '1',
    name: 'Production API Key',
    key: 'sk_prod_****************************',
    permissions: ['read', 'write', 'admin'],
    createdAt: new Date('2024-01-01'),
    lastUsed: new Date(Date.now() - 2 * 60 * 1000),
    status: 'active',
  },
  {
    id: '2',
    name: 'Development API Key',
    key: 'sk_dev_****************************',
    permissions: ['read', 'write'],
    createdAt: new Date('2024-02-15'),
    lastUsed: new Date(Date.now() - 6 * 60 * 60 * 1000),
    status: 'active',
  },
  {
    id: '3',
    name: 'Testing API Key',
    key: 'sk_test_****************************',
    permissions: ['read'],
    createdAt: new Date('2024-03-01'),
    lastUsed: null,
    status: 'inactive',
  },
]

export default function IntegrationsPage() {
  const [showApiKey, setShowApiKey] = useState<string | null>(null)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Integrations</h1>
          <p className="text-sm text-muted-foreground">
            Manage third-party integrations, webhooks, and API keys.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Integration
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title="Connected"
          value={integrations.filter((i) => i.status === 'connected').length}
          icon={<Puzzle className="h-4 w-4 text-success" />}
        />
        <MetricCard
          title="Webhooks"
          value={webhooks.filter((w) => w.status === 'active').length}
          icon={<Webhook className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="OAuth Apps"
          value={oauthApps.length}
          icon={<Key className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="API Keys"
          value={apiKeys.filter((k) => k.status === 'active').length}
          icon={<Key className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <Tabs defaultValue="integrations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="oauth">OAuth</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {integrations.map((integration) => {
              const Icon = integration.icon
              return (
                <Card key={integration.id}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                            integration.status === 'connected'
                              ? 'bg-success/10'
                              : 'bg-muted'
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 ${
                              integration.status === 'connected'
                                ? 'text-success'
                                : 'text-muted-foreground'
                            }`}
                          />
                        </div>
                        <div>
                          <CardTitle className="text-base">{integration.name}</CardTitle>
                          <CardDescription className="text-sm">
                            {integration.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant={integration.status === 'connected' ? 'default' : 'secondary'}
                      >
                        {integration.status === 'connected' ? (
                          <>
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Connected
                          </>
                        ) : (
                          <>
                            <XCircle className="mr-1 h-3 w-3" />
                            Disconnected
                          </>
                        )}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {integration.status === 'connected' && integration.config && (
                      <div className="space-y-2 text-sm">
                        {'repository' in integration.config && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Repository</span>
                            <span className="font-mono">{integration.config.repository}</span>
                          </div>
                        )}
                        {'endpoint' in integration.config && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Endpoint</span>
                            <span className="font-mono">{integration.config.endpoint}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Connected</span>
                          <span>{integration.connectedAt?.toLocaleDateString()}</span>
                        </div>
                      </div>
                    )}
                    <div className="mt-4 flex gap-2">
                      {integration.status === 'connected' ? (
                        <>
                          <Button variant="outline" size="sm" className="flex-1">
                            Configure
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" className="flex-1">
                          Connect
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-medium">Webhook Endpoints</CardTitle>
                  <CardDescription>Manage incoming webhook configurations</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-3.5 w-3.5" />
                  Create Webhook
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {webhooks.map((webhook) => (
                  <div
                    key={webhook.id}
                    className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{webhook.name}</span>
                          <Badge
                            variant={webhook.status === 'active' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {webhook.status}
                          </Badge>
                        </div>
                        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <span>URL:</span>
                            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                              {webhook.url}
                            </code>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>Events:</span>
                            <div className="flex gap-1">
                              {webhook.events.map((event) => (
                                <Badge key={event} variant="outline" className="text-xs">
                                  {event}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={webhook.status === 'active'} />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>View Logs</DropdownMenuItem>
                            <DropdownMenuItem>Regenerate Secret</DropdownMenuItem>
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

        <TabsContent value="oauth" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-medium">OAuth Applications</CardTitle>
                  <CardDescription>Manage OAuth 2.0 applications and credentials</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-3.5 w-3.5" />
                  Create App
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {oauthApps.map((app) => (
                  <div
                    key={app.id}
                    className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{app.name}</div>
                        <div className="mt-2 space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span>Client ID:</span>
                            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                              {app.clientId}
                            </code>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Scopes:</span>
                            <div className="flex gap-1">
                              {app.scopes.map((scope) => (
                                <Badge key={scope} variant="outline" className="text-xs">
                                  {scope}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Last used: {app.lastUsed.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Reset Secret</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Revoke</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-keys" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-medium">API Keys</CardTitle>
                  <CardDescription>Manage API access keys for the platform</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-3.5 w-3.5" />
                  Generate Key
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div
                    key={apiKey.id}
                    className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{apiKey.name}</span>
                          <Badge
                            variant={apiKey.status === 'active' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {apiKey.status}
                          </Badge>
                        </div>
                        <div className="mt-2 space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span>Key:</span>
                            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                              {showApiKey === apiKey.id
                                ? 'sk_prod_abcdefghijklmnopqrstuvwxyz123456'
                                : apiKey.key}
                            </code>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() =>
                                setShowApiKey(showApiKey === apiKey.id ? null : apiKey.id)
                              }
                            >
                              {showApiKey === apiKey.id ? (
                                <EyeOff className="h-3 w-3" />
                              ) : (
                                <Eye className="h-3 w-3" />
                              )}
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Permissions:</span>
                            <div className="flex gap-1">
                              {apiKey.permissions.map((perm) => (
                                <Badge key={perm} variant="outline" className="text-xs">
                                  {perm}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {apiKey.lastUsed
                              ? `Last used: ${apiKey.lastUsed.toLocaleString()}`
                              : 'Never used'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={apiKey.status === 'active'} />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Regenerate</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Revoke</DropdownMenuItem>
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
      </Tabs>
    </div>
  )
}
