import {
  BarChart3,
  Code2,
  Compass,
  Palette,
  PenTool,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'

export type ServiceId = 'strategy' | 'design' | 'web' | 'mobile' | 'branding' | 'growth'

export const SERVICES: readonly { id: ServiceId; icon: LucideIcon }[] = [
  { id: 'strategy', icon: Compass },
  { id: 'design', icon: PenTool },
  { id: 'web', icon: Code2 },
  { id: 'mobile', icon: Smartphone },
  { id: 'branding', icon: Palette },
  { id: 'growth', icon: BarChart3 },
]
