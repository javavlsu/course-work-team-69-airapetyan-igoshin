import { ContentState } from 'draft-js'

export interface LinkProps {
  contentState: ContentState
  entityKey: string
}

export interface TextEditorProps {
  html?: string
}
