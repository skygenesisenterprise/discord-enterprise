'use client'

import {
  Settings,
  Globe,
  Shield,
  Bell,
  Palette,
  Code,
  Save,
  RotateCcw,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Configure your Discord Enterprise platform settings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Globe className="h-4 w-4" />
                General Configuration
              </CardTitle>
              <CardDescription>Basic settings for your Discord Enterprise instance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="server-name">Server Name</Label>
                  <Input id="server-name" defaultValue="Sky Genesis Enterprise" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="server-id">Server ID</Label>
                  <Input id="server-id" defaultValue="123456789012345678" disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Server Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter server description..."
                  defaultValue="The official Discord server for Sky Genesis Enterprise - where innovation meets community."
                  rows={3}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Preferences</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Default Language</div>
                    <div className="text-xs text-muted-foreground">
                      Set the default language for bot responses
                    </div>
                  </div>
                  <Select defaultValue="en">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Timezone</div>
                    <div className="text-xs text-muted-foreground">
                      Set the default timezone for scheduled events
                    </div>
                  </div>
                  <Select defaultValue="utc">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">EST (UTC-5)</SelectItem>
                      <SelectItem value="pst">PST (UTC-8)</SelectItem>
                      <SelectItem value="cet">CET (UTC+1)</SelectItem>
                      <SelectItem value="jst">JST (UTC+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Maintenance Mode</div>
                    <div className="text-xs text-muted-foreground">
                      Enable maintenance mode to disable bot commands
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Branding
              </CardTitle>
              <CardDescription>Customize the appearance of your bot and dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="bot-name">Bot Display Name</Label>
                  <Input id="bot-name" defaultValue="SGE Bot" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bot-prefix">Command Prefix (Legacy)</Label>
                  <Input id="bot-prefix" defaultValue="!" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Brand Colors</Label>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color" className="text-xs text-muted-foreground">
                      Primary
                    </Label>
                    <div className="flex gap-2">
                      <Input id="primary-color" defaultValue="#FFFFFF" className="flex-1" />
                      <div className="h-9 w-9 rounded-md border bg-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accent-color" className="text-xs text-muted-foreground">
                      Accent
                    </Label>
                    <div className="flex gap-2">
                      <Input id="accent-color" defaultValue="#3B82F6" className="flex-1" />
                      <div className="h-9 w-9 rounded-md border bg-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="background-color" className="text-xs text-muted-foreground">
                      Background
                    </Label>
                    <div className="flex gap-2">
                      <Input id="background-color" defaultValue="#171717" className="flex-1" />
                      <div className="h-9 w-9 rounded-md border bg-neutral-900" />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Embed Settings</h3>

                <div className="space-y-2">
                  <Label htmlFor="embed-footer">Default Embed Footer</Label>
                  <Input id="embed-footer" defaultValue="Sky Genesis Enterprise | discord.skygenesisenterprise.com" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Show Timestamp</div>
                    <div className="text-xs text-muted-foreground">
                      Include timestamps in embed messages
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure security and access control settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Access Control</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Two-Factor Authentication</div>
                    <div className="text-xs text-muted-foreground">
                      Require 2FA for dashboard access
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">IP Allowlist</div>
                    <div className="text-xs text-muted-foreground">
                      Restrict API access to specific IP addresses
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Session Timeout</div>
                    <div className="text-xs text-muted-foreground">
                      Automatically logout after inactivity
                    </div>
                  </div>
                  <Select defaultValue="60">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                      <SelectItem value="480">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Audit Logging</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Enable Audit Logs</div>
                    <div className="text-xs text-muted-foreground">
                      Log all administrative actions
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Log Retention</div>
                    <div className="text-xs text-muted-foreground">
                      How long to keep audit logs
                    </div>
                  </div>
                  <Select defaultValue="90">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select retention" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Rate Limiting</h3>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="rate-limit-commands">Commands per minute</Label>
                    <Input id="rate-limit-commands" type="number" defaultValue="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rate-limit-api">API requests per minute</Label>
                    <Input id="rate-limit-api" type="number" defaultValue="60" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Module Configuration
              </CardTitle>
              <CardDescription>Enable or disable platform modules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: 'Moderation',
                  description: 'Warnings, bans, mutes, and auto-moderation',
                  enabled: true,
                },
                {
                  name: 'Tickets',
                  description: 'Support ticket system and management',
                  enabled: true,
                },
                {
                  name: 'Verification',
                  description: 'Member verification and captcha system',
                  enabled: true,
                },
                {
                  name: 'Leveling',
                  description: 'XP and level progression system',
                  enabled: false,
                },
                {
                  name: 'Giveaways',
                  description: 'Create and manage server giveaways',
                  enabled: false,
                },
                {
                  name: 'Music',
                  description: 'Music playback in voice channels',
                  enabled: false,
                },
                {
                  name: 'Welcome Messages',
                  description: 'Custom welcome and goodbye messages',
                  enabled: true,
                },
                {
                  name: 'Logging',
                  description: 'Message and action logging',
                  enabled: true,
                },
              ].map((module) => (
                <div
                  key={module.name}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <div className="font-medium">{module.name}</div>
                    <div className="text-sm text-muted-foreground">{module.description}</div>
                  </div>
                  <Switch defaultChecked={module.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Code className="h-4 w-4" />
                API Configuration
              </CardTitle>
              <CardDescription>Configure API settings and endpoints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Discord Bot Configuration</h3>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="bot-token">Bot Token</Label>
                    <Input id="bot-token" type="password" defaultValue="••••••••••••••••••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-id">Client ID</Label>
                    <Input id="client-id" defaultValue="123456789012345678" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client-secret">Client Secret</Label>
                  <Input
                    id="client-secret"
                    type="password"
                    defaultValue="••••••••••••••••••••••••"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">API Endpoints</h3>

                <div className="space-y-2">
                  <Label htmlFor="api-url">API Base URL</Label>
                  <Input
                    id="api-url"
                    defaultValue="https://discord.skygenesisenterprise.com/api"
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook Base URL</Label>
                  <Input
                    id="webhook-url"
                    defaultValue="https://discord.skygenesisenterprise.com/api/webhooks"
                    disabled
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">CORS Settings</h3>

                <div className="space-y-2">
                  <Label htmlFor="allowed-origins">Allowed Origins</Label>
                  <Textarea
                    id="allowed-origins"
                    placeholder="Enter allowed origins (one per line)"
                    defaultValue={`https://skygenesisenterprise.com\nhttps://discord.skygenesisenterprise.com`}
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
