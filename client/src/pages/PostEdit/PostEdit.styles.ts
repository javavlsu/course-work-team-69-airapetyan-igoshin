import { Button, styled } from '@mui/material'

export const PageContainer = styled('div')`
  width: 80%;
  height: 90%;
  margin: 20px auto 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const EditArea = styled('div')`
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  flex-grow: 1;
  overflow-y: scroll;
`

export const PublishButtons = styled('div')`
  display: flex;
  gap: 20px;
`

export const PublishButton = styled(Button)`
  flex-grow: 1;
`
