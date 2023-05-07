import React from 'react'
import { Typography, useTheme } from '@mui/material'
import { DropdownMenu } from '../DropdownMenu/DropdownMenu'
import Avatar from '@mui/material/Avatar'
import { UserPreviewWrapper } from './UserPreview.style'
import userStore from '../../store/userStore'
import { observer } from 'mobx-react-lite'

const UserPreview = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const theme = useTheme()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <>
      <UserPreviewWrapper onClick={handleClick}>
        <Avatar
          sx={{
            width: '35px',
            height: '35px',
            border: '1px solid ' + theme.palette.secondary.main
          }}
        />
        <Typography variant="h6" color={theme.palette.secondary.main}>
          {userStore.name}
        </Typography>
      </UserPreviewWrapper>
      <DropdownMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </>
  )
}

export default observer(UserPreview)
