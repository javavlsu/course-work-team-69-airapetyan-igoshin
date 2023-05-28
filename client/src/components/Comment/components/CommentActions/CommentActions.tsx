import { ThumbDown, ThumbUp } from '@mui/icons-material'
import { Button } from '@mui/material'
import { CommentActionsRoot, RatingActions } from './CommentActions.styles'

const CommentActions = () => {
  return (
    <CommentActionsRoot>
      <RatingActions>
        <Button
          sx={{ minWidth: '40px', fontSize: '12px', padding: '3px 6px' }}
          variant={'outlined'}
        >
          <ThumbUp sx={{ width: '16px', height: '16px' }} />
        </Button>
        <Button
          sx={{ minWidth: '40px', fontSize: '12px', padding: '3px 6px' }}
          variant={'outlined'}
        >
          <ThumbDown sx={{ width: '16px', height: '16px' }} />
        </Button>
      </RatingActions>
      <Button
        sx={{ fontSize: '12px', padding: '3px 6px' }}
        variant={'outlined'}
      >
        Ответить
      </Button>
    </CommentActionsRoot>
  )
}

export default CommentActions
