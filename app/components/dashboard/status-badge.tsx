import { cn } from '@/lib/utils'

type StatusType = 'online' | 'offline' | 'warning' | 'error' | 'idle'

interface StatusBadgeProps {
  status: StatusType
  label?: string
  className?: string
  showPulse?: boolean
}

const statusConfig: Record<StatusType, { color: string; label: string }> = {
  online: { color: 'bg-success', label: 'Online' },
  offline: { color: 'bg-muted-foreground', label: 'Offline' },
  warning: { color: 'bg-warning', label: 'Warning' },
  error: { color: 'bg-destructive', label: 'Error' },
  idle: { color: 'bg-warning', label: 'Idle' },
}

export function StatusBadge({
  status,
  label,
  className,
  showPulse = true,
}: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative flex h-2 w-2">
        {showPulse && status === 'online' && (
          <span
            className={cn(
              'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
              config.color
            )}
          />
        )}
        <span
          className={cn('relative inline-flex h-2 w-2 rounded-full', config.color)}
        />
      </div>
      <span className="text-sm text-muted-foreground">{label || config.label}</span>
    </div>
  )
}
