import { IconButton, styled } from '@mui/material'

export const PostWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  border-radius: 10px;
  background: ${({ theme }) => theme.palette.app.main};
  color: ${({ theme }) => theme.palette.app.contrastText};
  width: 100%;
  word-wrap: break-word;
  overflow-x: hidden;
  box-shadow: ${({ theme }) => theme.shadows[1]};
  position: relative;
`

export const PostHeader = styled('h6')`
  margin: 5px 0 10px 20px;
  font-weight: 500;
  font-size: 20px;
`

export const PostDescription = styled('p')`
  padding: 0;
  margin: 10px 0 10px 20px;
  font-size: 14px;
`

export const PostPicture = styled('img')<{ isAsideOpen: boolean }>`
  margin: 10px 0;
  background: #9a9a9a;
  width: 100%;
  height: ${({ isAsideOpen }) => (isAsideOpen ? '260px' : '350px')};
`

export const PostFooter = styled('div')`
  display: flex;
  justify-content: end;
  width: 100%;
  gap: 30px;
  padding: 0 20px 5px;
`

export const PostFooterItem = styled('div')`
  display: flex;
  gap: 10px;
  font-size: 12px;
`

export const PostStatistics = styled('span')<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 14px;
`

export const DeleteButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
`
