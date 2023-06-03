import { FC } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Add from '@mui/icons-material/Add'
import Logout from '@mui/icons-material/Logout'
import BookIcon from '@mui/icons-material/Book'
import PersonIcon from '@mui/icons-material/Person'
import UserStore from '../../../store/userStore'
import { DropdownMenuContentProps } from '../DropdownMenu.types'
import { useDropdownMenu } from '../hooks/useDropdownMenu'
import { DropdownItem } from '../DropdownMenu.styles'
import { UserBlogRole } from '../../../utils/globalTypes'

export const DropdownMenuContent: FC<DropdownMenuContentProps> = ({
  handleClose
}) => {
  const { redirectToBlog, handleAddBlog, handleProfile, handleLogout } =
    useDropdownMenu(handleClose)
  const ownerBlogs = UserStore.blogs.filter(
    (blog) => blog.userRole === UserBlogRole.Creator
  )

  return (
    <>
      {UserStore.isAuth && (
        <DropdownItem onClick={handleProfile}>
          <PersonIcon color={'secondary'} /> Profile
        </DropdownItem>
      )}
      {ownerBlogs.map((blog) => (
        <DropdownItem key={blog.id} onClick={() => redirectToBlog(blog.id)}>
          <BookIcon color={'secondary'} /> {blog.name}
        </DropdownItem>
      ))}
      <Divider />
      <MenuItem onClick={handleAddBlog}>
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
