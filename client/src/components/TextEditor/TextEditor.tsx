import React from 'react'
import { Editor } from 'draft-js'
import { ToolPanel } from './components/ToolPanel'
import editorStore from '../../store/editorStore'
import { observer } from 'mobx-react-lite'

const TextEditorComponent = () => {
  return (
    <>
      <ToolPanel />
      <Editor editorState={editorStore.state} onChange={editorStore.onChange} />
    </>
  )
}

export const TextEditor = observer(TextEditorComponent)
