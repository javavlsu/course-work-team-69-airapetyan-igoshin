import React from 'react'
import { TextEditor } from '../../components/TextEditor'
import { styled } from '@mui/material'

const PageContainer = styled('div')`
  width: 80%;
  margin: 0 auto;
`
const EditArea = styled('div')`
  padding: 20px;
  border-radius: 10px;
  border: 1px solid black;
`

export const PostEdit = () => {
  return (
    <PageContainer>
      <EditArea>
        <TextEditor />
      </EditArea>
    </PageContainer>
  )
}
