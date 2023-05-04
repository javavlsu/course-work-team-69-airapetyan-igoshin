import { styled } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'

export const PostPageWrapper = styled('section')`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const PostTitle = styled('h2')`
  font-size: 30px;
  margin: 50px 0 0 0;
`

export const PostContent = styled('p')`
  font-size: 14px;
`

export const PostFooter = styled('div')`
  display: flex;
  gap: 20px;
  border-radius: 10px;
  overflow: hidden;
  background: #d9d9d9;
`

export const PostPicture = styled('img')`
  background: #858585;
  width: 145px;
  align-self: stretch;
`

export const PostPath = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const PostPathTitle = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`

export const PostRating = styled('div')`
  display: flex;
  flex-grow: 1;
  justify-content: end;
  align-items: center;
  padding: 0 20px;
  gap: 10px;
`

export const IconRemove = styled(RemoveIcon)`
  width: 20px;
  height: 20px;
  color: red;
`

export const IconAdd = styled(AddIcon)`
  width: 20px;
  height: 20px;
  color: green;
`

export const RatingButton = styled('button')`
  border: none;
  border-radius: 50%;
  background: #969696;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export const PostRatingCount = styled('p')`
  font-weight: 500;
`

export const CommentsWrapper = styled('div')``
