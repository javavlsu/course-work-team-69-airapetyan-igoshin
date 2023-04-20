import React, { FC } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Add from '@mui/icons-material/Add'
import Logout from '@mui/icons-material/Logout'
import { DropdownMenuContentProps } from '../DropdownMenu.types'
import User from '../../../domain/User'
import { useNavigate } from 'react-router-dom'
import UserStore from '../../../store/userStore'

export const DropdownMenuContent: FC<DropdownMenuContentProps> = ({
  handleClose
}) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    handleClose()
    User.logout(() => {
      navigate('/login')
    })
  }

  const handleProfile = () => {
    handleClose()
    navigate('/profile')
  }

  return (
    <>
      {UserStore.isAuth && (
        <MenuItem onClick={handleProfile}>
          <Avatar /> Profile
        </MenuItem>
      )}
      {/*тут будет много блогов*/}
      <MenuItem onClick={handleClose}>
        <Avatar /> My blog
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <Add fontSize="small" />
        </ListItemIcon>
        Add blog
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        {UserStore.isAuth ? 'Logout' : 'Login'}
      </MenuItem>
    </>
  )
}
