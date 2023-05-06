import React, { FC, useEffect } from 'react'
import { Editor } from 'draft-js'
import { ToolPanel } from './components/ToolPanel'
import editorStore from '../../store/editorStore'
import { observer } from 'mobx-react-lite'
import { TextEditorProps } from './TextEditor.types'

const TextEditorComponent: FC<TextEditorProps> = ({ html }) => {
  useEffect(() => {
    html && editorStore.loadContent(html)
  }, [html])
  return (
    <>
      <ToolPanel />
      <Editor editorState={editorStore.state} onChange={editorStore.onChange} />
    </>
  )
}

export const TextEditor = observer(TextEditorComponent)
