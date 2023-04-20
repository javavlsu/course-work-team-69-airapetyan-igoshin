import React, { FC, useState } from 'react'
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  styled
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { ProfileInput } from './ProfileInput'

const AsideWrapper = styled('div')`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 1px;
    height: 80%;
    background: #d9d9d9;
  }
`
const AsideContentContainer = styled('div')`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin: 50px 0;
`
const ProfileAvatarBlock = styled('div')`
  display: flex;
  justify-content: start;
`
const ProfileAvatar = styled('img')`
  border-radius: 100%;
  height: 100px;
  width: 100px;
  background: #d9d9d9;
`
const ProfileForm = styled('form')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`
const initialUser = {
  username: 'Денис Игошин',
  birthdate: '22.04.2003',
  status: 'Какой-то статус...',
  email: 'd.igoschin.igoshin@gmail.com',
  password: '12345a!'
}

export const AsideProfileContent: FC<{ isAsideOpen: boolean }> = ({
  isAsideOpen
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [user, setUser] = useState(initialUser)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <AsideWrapper>
      <AsideContentContainer>
        <ProfileAvatarBlock>
          <ProfileAvatar />
        </ProfileAvatarBlock>
        <ProfileForm>
          <ProfileInput
            isAsideOpen={isAsideOpen}
            placeholder="Имя пользователя"
            value={user.username}
          />
          <ProfileInput
            isAsideOpen={isAsideOpen}
            placeholder="Дата рождения"
            type="date"
            value={user.birthdate}
          />
          <ProfileInput
            isAsideOpen={isAsideOpen}
            placeholder="Статус"
            value={user.status}
          />
          <ProfileInput
            isAsideOpen={isAsideOpen}
            placeholder="E-mail"
            type="email"
            value={user.email}
          />
          {isAsideOpen && (
            <>
              <FormControl variant="outlined">
                <OutlinedInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Пароль"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button>Сохранить</Button>
            </>
          )}
        </ProfileForm>
      </AsideContentContainer>
    </AsideWrapper>
  )
}
