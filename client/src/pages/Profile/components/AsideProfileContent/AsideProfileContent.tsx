import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
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
import { ChangeProfileData } from '../../../../service'
import User from '../../../../domain/User'
import { useProfile } from '../../../../hooks/useProfile'

export const AsideProfileContent: FC<{ isAsideOpen: boolean }> = ({
  isAsideOpen
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [user, setUser] = useState(initialUser)
  const { register, handleSubmit, setValue } = useForm<ChangeProfileData>()
  const { profile, profileRequest } = useProfile()

  useEffect(() => {
    if (!profile) return
    setValue('email', profile.email)
    setValue('birthdate', profile.birthdate)
    setValue('name', profile.name)
    setValue('status', profile.status)
  }, [profile])

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleProfileSubmit = handleSubmit(async (data) => {
    await User.changeProfile(data)
    profileRequest()
  })

  return (
    <AsideWrapper>
      <AsideContentContainer>
        <ProfileAvatarBlock>
          <ProfileAvatar />
        </ProfileAvatarBlock>
        <ProfileForm onSubmit={handleProfileSubmit}>
          <SmartInput
            editable={isAsideOpen}
            placeholder="Имя пользователя"
            value={profile?.name}
            inputProps={register('name')}
          />
          <SmartInput
            editable={isAsideOpen}
            placeholder="Дата рождения"
            type="date"
            value={profile?.birthdate}
            inputProps={register('birthdate')}
          />
          <SmartInput
            editable={isAsideOpen}
            placeholder="Статус"
            value={profile?.status}
            inputProps={register('status')}
          />
          <SmartInput
            editable={isAsideOpen}
            placeholder="E-mail"
            type="email"
            value={profile?.email}
            inputProps={{ ...register('email') }}
          />
          {isAsideOpen && (
            <>
              <FormControl variant="outlined">
                <OutlinedInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Пароль"
                  {...register('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button type={'submit'}>Сохранить</Button>
            </>
          )}
        </ProfileForm>
      </AsideContentContainer>
    </AsideWrapper>
  )
}
