import React from 'react'
import editorStore from '../../../store/editorStore'
import { observer } from 'mobx-react-lite'
import { blockStyles, decorators, inlineStyles } from '../TextEditor.config'
import { ToolsItem, ToolsLine, ToolsWrapper } from '../TextEditor.styles'

const ToolPanelComponent = () => {
  return (
    <ToolsWrapper>
      <ToolsLine>
        {blockStyles.map((el, index) => (
          <ToolsItem
            key={index}
            onClick={() => editorStore.toggleBlockType(el.style)}
          >
            {el.label}
          </ToolsItem>
        ))}
      </ToolsLine>
      <ToolsLine>
        {inlineStyles.map((el, index) => (
          <ToolsItem
            key={index}
            onClick={() => editorStore.toggleInlineStyles(el.style)}
          >
            {el.icon}
          </ToolsItem>
        ))}
        {decorators.map((decorator, index) => (
          <ToolsItem key={index} onClick={decorator.handler}>
            {decorator.icon}
          </ToolsItem>
        ))}
      </ToolsLine>
    </ToolsWrapper>
  )
}

export const ToolPanel = observer(ToolPanelComponent)
