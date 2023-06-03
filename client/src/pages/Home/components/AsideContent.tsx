import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import {
  MenuBlock,
  MenuButtonIcon,
  MenuButtonText,
  MenuHeader,
  MenuButton
} from '../Home.style'
import { FC } from 'react'
import { AsideContentProps } from '../Home.types'
import userStore from '../../../store/userStore'
import { UserBlogRole } from '../../../utils/globalTypes'
import { useNavigate } from 'react-router-dom'

export const AsideContent: FC<AsideContentProps> = ({
  isAsideOpen,
  onNewest,
  onPopular,
  onSubscribes
}) => {
  const navigate = useNavigate()
  const settings = [
    { name: 'Популярное', handler: onPopular },
    { name: 'Свежее', handler: onNewest }
  ]
  const subscribes = userStore.blogs.filter(
    (blog) => blog.userRole === UserBlogRole.Subscriber
  )

  const handleBlogClick = (blogId: number) => {
    navigate(`/blog/${blogId}`)
  }

  return (
    <>
      <MenuBlock isOpen={isAsideOpen}>
        <MenuHeader>{isAsideOpen && 'Настрройка ленты'}</MenuHeader>
        {settings.map((setting) => (
          <MenuButton
            onClick={setting.handler}
            isOpen={isAsideOpen}
            key={setting.name}
          >
            <MenuButtonIcon isOpen={isAsideOpen} />
            {isAsideOpen && <MenuButtonText>{setting.name}</MenuButtonText>}
          </MenuButton>
        ))}
        {isAsideOpen && (
          <FormGroup row>
            <FormControlLabel
              value="onlySubscribes"
              control={<Switch color="primary" />}
              label="Только подписки"
              labelPlacement="start"
              onChange={onSubscribes}
            />
          </FormGroup>
        )}
      </MenuBlock>
      <MenuBlock isOpen={isAsideOpen}>
        <MenuHeader>
          {isAsideOpen && subscribes.length > 0 && 'Ваши подписки'}
        </MenuHeader>
        {subscribes.map((subsribe) => (
          <MenuButton
            onClick={() => handleBlogClick(subsribe.id)}
            isOpen={isAsideOpen}
            key={subsribe.name}
          >
            <MenuButtonIcon isOpen={isAsideOpen} />
            {isAsideOpen && <MenuButtonText>{subsribe.name}</MenuButtonText>}
          </MenuButton>
        ))}
      </MenuBlock>
      {isAsideOpen && subscribes.length > 5 && 'Показать ещё'}
    </>
  )
}
