import React from 'react'
import {
  FormatItalic,
  FormatBold,
  FormatUnderlined,
  Code,
  InsertLink
} from '@mui/icons-material'
import editorStore from '../../store/editorStore'

export enum InlineStyle {
  BOLD = 'BOLD',
  ITALIC = 'ITALIC',
  UNDERLINE = 'UNDERLINE',
  CODE = 'CODE'
}

export const inlineStyles = [
  {
    style: InlineStyle.BOLD,
    icon: <FormatBold />
  },
  {
    style: InlineStyle.ITALIC,
    icon: <FormatItalic />
  },
  {
    style: InlineStyle.UNDERLINE,
    icon: <FormatUnderlined />
  },
  {
    style: InlineStyle.CODE,
    icon: <Code />
  }
]

const handleAddLink = () => {
  const url = prompt('URL: ')

  if (!url) return

  editorStore.addLink(url)
}

export const decorators = [
  {
    icon: <InsertLink />,
    handler: handleAddLink
  }
]

export enum BlockStyle {
  h1 = 'header-one',
  h2 = 'header-two',
  BLOCKQUOTE = 'blockquote',
  UNORDERED_LIST = 'unordered-list-item',
  ORDERED_LIST = 'ordered-list-item',
  DEFAULT = 'default'
}

export const blockStyles = [
  {
    style: BlockStyle.h1,
    label: 'Заголовок'
  },
  {
    style: BlockStyle.h2,
    label: 'Подзаголовок'
  },
  {
    style: BlockStyle.BLOCKQUOTE,
    label: 'Цитата'
  },
  {
    style: BlockStyle.UNORDERED_LIST,
    label: 'Лист (точки)'
  },
  {
    style: BlockStyle.ORDERED_LIST,
    label: 'Лист (цифры)'
  }
]

export enum EntityType {
  link = 'link'
}
