import { styled } from '@mui/material'

export const ProfileWrapper = styled('div')`
  height: 100%;
  display: grid;
  grid-template: 1fr / 2fr 1fr 7fr;
`

export const ProfileContentWrapper = styled('div')<{ isAsideOpen: boolean }>`
  grid-column: ${({ isAsideOpen }) => (isAsideOpen ? '3' : '2')} / -1;
  display: grid;
  grid-template: 1fr / 1fr 10fr 2fr;
  height: 100%;
  overflow-y: auto;
`

export const ProfileContent = styled('div')`
  grid-column: 2;
`

export const ProfileContentHeader = styled('h2')`
  font-size: 24px;
  margin: 10px 0;
`

export const BlogList = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`
