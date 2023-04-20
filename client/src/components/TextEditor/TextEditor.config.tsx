import React from 'react'
import {
  FormatItalic,
  FormatBold,
  FormatUnderlined,
  Code
} from '@mui/icons-material'

export const inlineStyles = [
  {
    style: 'BOLD',
    icon: <FormatBold />
  },
  {
    style: 'ITALIC',
    icon: <FormatItalic />
  },
  {
    style: 'UNDERLINE',
    icon: <FormatUnderlined />
  },
  {
    style: 'CODE',
    icon: <Code />
  }
]

export const blockStyles = [
  {
    style: 'header-one',
    label: 'Заголовок'
  },
  {
    style: 'header-two',
    label: 'Подзаголовок'
  },
  {
    style: 'blockquote',
    label: 'Цитата'
  },
  {
    style: 'unordered-list-item',
    label: 'Лист (точки)'
  },
  {
    style: 'ordered-list-item',
    label: 'Лист (цифры)'
  }
]

// type CoreDraftBlockType =
//   | 'header-one'
//   | 'header-two'
//   | 'header-three'
//   | 'header-four'
//   | 'header-five'
//   | 'header-six'
//   | 'section'
//   | 'article'
//   | 'unordered-list-item'
//   | 'ordered-list-item'
//   | 'blockquote'
//   | 'atomic'
//   | 'code-block'
//   | 'unstyled';
