import { styled } from '@mui/material'

export const SubscribersListRoot = styled('ul')`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 5px;
`

export const SubscribersListItem = styled('li')`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.neutral.main};
  }
`
