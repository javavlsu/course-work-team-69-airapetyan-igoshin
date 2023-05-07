import React, { FC } from 'react'
import { ToolsPanelRoot, ToolsItem } from './ToolsPanel.styles'
import { ToolsPanelProps } from './ToolsPanel.types'

const ToolsPanel: FC<ToolsPanelProps> = ({ items }) => {
  return (
    <ToolsPanelRoot>
      {items.map(
        (tool, index) =>
          tool.condition && (
            <ToolsItem
              $animated={tool.animated}
              key={index}
              onClick={tool.handler}
            >
              {tool.content}
            </ToolsItem>
          )
      )}
    </ToolsPanelRoot>
  )
}

export default ToolsPanel
