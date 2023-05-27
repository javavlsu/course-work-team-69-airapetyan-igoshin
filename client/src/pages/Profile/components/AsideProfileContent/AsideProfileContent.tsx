import { FC, useState } from 'react'
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { SmartInput } from '../../../../components/SmartInput/SmartInput'
import {
  AsideContentContainer,
  AsideWrapper,
  ProfileAvatar,
  ProfileAvatarBlock,
  ProfileForm
} from './AsideProfileContent.styles'
import { initialUser } from './AsideProfileContent.data'

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
          {/* Todo как в BlogPreview */}
          <SmartInput
            editable={isAsideOpen}
            placeholder="Имя пользователя"
            value={user.username}
          />
          <SmartInput
            editable={isAsideOpen}
            placeholder="Дата рождения"
            type="date"
            value={user.birthdate}
          />
          <SmartInput
            editable={isAsideOpen}
            placeholder="Статус"
            value={user.status}
          />
          <SmartInput
            editable={isAsideOpen}
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
