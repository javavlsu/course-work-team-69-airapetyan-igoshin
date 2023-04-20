import * as React from 'react'
import Menu from '@mui/material/Menu'
import { FC } from 'react'
import { DropdownMenuProps, paperProps } from './DropdownMenu.types'
import { DropdownMenuContent } from './components/DropdownMenuContent'

export const DropdownMenu: FC<DropdownMenuProps> = ({
  anchorEl,
  setAnchorEl
}) => {
  const open = Boolean(anchorEl)

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{ ...paperProps }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <DropdownMenuContent handleClose={handleClose} />
    </Menu>
  )
}
