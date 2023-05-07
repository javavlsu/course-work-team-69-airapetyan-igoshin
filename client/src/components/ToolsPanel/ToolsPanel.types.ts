import { ReactNode } from 'react'

export interface ToolsPanelProps {
  items: ToolsItem[]
}

export interface ToolsItem {
  condition: boolean
  animated: boolean
  handler: () => void
  content: ReactNode
}
