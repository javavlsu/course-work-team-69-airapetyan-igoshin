import { styled } from '@mui/material'

export const BlogCardWrapper = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 10px;
  gap: 15px;
  background: ${({ theme }) => theme.palette.app.main};
  color: ${({ theme }) => theme.palette.app.contrastText};
  box-shadow: ${({ theme }) => theme.shadows[1]};
  height: 100px;
  padding-right: 20px;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows[4]};
  }
`

export const BlogCardPicture = styled('img')`
  width: 100px;
  height: 100%;
  border-radius: 10px;
  background: #878787;
`

export const BlogCardContent = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex-grow: 1;
`

// color: ${({ theme }) => theme.palette.postColors.main};
export const BlogTitle = styled('h3')`
  margin: 0;
  font-size: 18px;
`

export const BlogDescription = styled('p')`
  margin: 0;
  padding: 0;
  font-size: 12px;
`

export const StatisticsBlock = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  gap: 5px;
  font-size: 12px;
`

export const StatisticsItem = styled('div')`
  display: flex;
  align-items: center;
`

export const StatisticsCount = styled('span')<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 16px;
  margin-left: 10px;
`
