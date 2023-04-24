import React, { FC } from 'react'
import { InlineStyle } from '../TextEditor/TextEditor.config'
import { css, styled } from '@mui/material'

const textStyles = {
  CODE: css`
    font-family: 'Consolas', sans-serif;
  `,
  BOLD: css`
    font-weight: 700;
  `,
  UNDERLINE: css`
    text-decoration: underline;
  `,
  ITALIC: css`
    font-style: italic;
  `
}
const StyledText = styled('span')<{ $type: InlineStyle }>`
  ${({ $type }) => textStyles[$type]}
`

const DecoratedText: FC<{ type: InlineStyle }> = ({ type }) => {
  return <StyledText $type={type} />
}

export default DecoratedText
