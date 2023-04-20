import React from 'react'
import { Typography } from '@mui/material'
import { DropdownMenu } from '../DropdownMenu/DropdownMenu'
import Avatar from '@mui/material/Avatar'
import { UserPreviewWrapper } from './UserPreview.style'

export const UserPreview = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <>
      <UserPreviewWrapper onClick={handleClick}>
        <Avatar sx={{ width: '35px', height: '35px' }} />
        <Typography variant="h6">Username</Typography>
      </UserPreviewWrapper>
      <DropdownMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </>
  )
}
