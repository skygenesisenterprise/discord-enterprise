import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'

interface ActivityItem {
  id: string
  type: 'moderation' | 'member' | 'ticket' | 'system' | 'command'
  title: string
  description: string
  timestamp: Date
  user?: {
    name: string
    avatar?: string
  }
}

interface ActivityFeedProps {
  items: ActivityItem[]
  className?: string
}

const typeColors = {
  moderation: 'bg-destructive/10 text-destructive',
  member: 'bg-chart-2/10 text-chart-2',
  ticket: 'bg-chart-1/10 text-chart-1',
  system: 'bg-muted text-muted-foreground',
  command: 'bg-chart-4/10 text-chart-4',
}

export function ActivityFeed({ items, className }: ActivityFeedProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50"
        >
          {item.user ? (
            <Avatar className="h-8 w-8">
              <AvatarImage src={item.user.avatar} alt={item.user.name} />
              <AvatarFallback className="text-xs">
                {item.user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full',
                typeColors[item.type]
              )}
            >
              <span className="text-xs font-medium">{item.type[0].toUpperCase()}</span>
            </div>
          )}
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium leading-none">{item.title}</p>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatDistanceToNow(item.timestamp, { addSuffix: true })}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
