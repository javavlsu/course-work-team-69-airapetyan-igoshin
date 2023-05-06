import User from '../../../domain/User'
import modalStore from '../../../store/modalStore'
import { BlogForm } from '../components/BlogForm'
import { useNavigate } from 'react-router-dom'

export const useDropdownMenu = (close: () => void) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    close()
    User.logout(() => {
      navigate('/login')
    })
  }

  const handleProfile = () => {
    close()
    navigate('/profile')
  }

  const handleAddBlog = () => {
    close()
    modalStore.open(<BlogForm />)
  }

  const redirectToBlog = (id: number) => {
    close()
    navigate(`/blog/${id}`)
  }

  return {
    handleLogout,
    handleProfile,
    handleAddBlog,
    redirectToBlog
  }
}
