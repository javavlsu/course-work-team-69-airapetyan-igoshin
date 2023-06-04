import { FormControlLabel, FormGroup, Switch, styled } from '@mui/material'
import {
  MenuBlock,
  MenuButtonIcon,
  MenuButtonText,
  MenuHeader,
  MenuButton
} from '../Home.style'
import { FC, useState } from 'react'
import { AsideContentProps } from '../Home.types'
import userStore from '../../../store/userStore'
import { UserBlogRole } from '../../../utils/globalTypes'
import { useNavigate } from 'react-router-dom'
import feedStore from '../../../store/feedStore'
import { DateRange, DateRangePicker } from '@mui/x-date-pickers-pro'
import { Dayjs } from 'dayjs'
import { Whatshot, TrendingDown } from '@mui/icons-material'

const PostDatePicker = styled(DateRangePicker)`
  margin: 15px 0;
  padding: 0 15px;
  input {
    padding: 10px;
  }
  label {
    top: -5px;
  }
`
const SettingIconSx = {
  width: '32px',
  height: '32px',
  borderRadius: '50%'
}

export const AsideContent: FC<AsideContentProps> = ({ isAsideOpen }) => {
  const navigate = useNavigate()
  const [selectedSetting, setSelectedSetting] = useState('')
  const settings = [
    {
      name: 'Популярное',
      handler: () => {
        setSelectedSetting('Популярное')
        feedStore.handlePopular()
      },
      icon: <Whatshot sx={SettingIconSx} />
    },
    {
      name: 'Свежее',
      handler: () => {
        setSelectedSetting('Свежее')
        feedStore.handleNewest()
      },
      icon: <TrendingDown sx={SettingIconSx} />
    }
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
            $selected={setting.name === selectedSetting}
          >
            {setting.icon}
            {isAsideOpen && <MenuButtonText>{setting.name}</MenuButtonText>}
          </MenuButton>
        ))}
        {isAsideOpen && (
          <>
            <PostDatePicker
              value={feedStore.dates}
              onChange={(newValue) =>
                feedStore.handleDates(newValue as DateRange<Dayjs>)
              }
            />
            <FormGroup row>
              <FormControlLabel
                value={!feedStore.reversed}
                onChange={feedStore.handleReversed}
                control={<Switch color="primary" />}
                label="Начать с конца"
                labelPlacement="start"
              />
            </FormGroup>
            {userStore.isAuth && subscribes.length > 0 && (
              <FormGroup row>
                <FormControlLabel
                  value={feedStore.onlySubscription}
                  onChange={feedStore.toggleSubscribes}
                  control={<Switch color="primary" />}
                  label="Только подписки"
                  labelPlacement="start"
                />
              </FormGroup>
            )}
          </>
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
