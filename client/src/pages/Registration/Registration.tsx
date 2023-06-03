import React, { useState } from 'react'
import {
  FormHeader,
  LoginForm,
  LoginTextFields
} from '../../components/Login/Login.styled'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { RegistrationData } from '../../service/user'
import { useNavigate, Link } from 'react-router-dom'
import User from '../../domain/User'

export const Registration = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false)
  const [repeatedPassword, setRepeatedPassword] = useState('')
  const { register, handleSubmit } = useForm<RegistrationData>()
  const navigate = useNavigate()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleRepeatedPassword = (value: string) => {
    setRepeatedPassword(value)
  }

  const handleClickShowPasswordRepeat = () => {
    setShowPasswordRepeat(!showPasswordRepeat)
  }
  const submit = handleSubmit(async (data) => {
    if (data.password !== repeatedPassword) {
      console.log('ПАРОЛИ НЕ СОВПАДАЮТ!')
      return
    }

    const response = await User.register(data)

    console.log(response)

    if (!response?.ok) {
      console.error('Неверный логин или пароль!')
    }

    navigate('/login')
  })

  return (
    <LoginForm onSubmit={submit}>
      <FormHeader>Регистрация</FormHeader>
      <LoginTextFields>
        <TextField {...register('email')} label="E-mail" />
        <TextField {...register('name')} label="Ваше имя" />
        <TextField {...register('birthdate')} type="date" />
        <FormControl variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="password-repeat">repeat password</InputLabel>
          <OutlinedInput
            id="password-repeat"
            type={showPasswordRepeat ? 'text' : 'password'}
            value={repeatedPassword}
            onChange={(v) => handleRepeatedPassword(v.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPasswordRepeat} edge="end">
                  {showPasswordRepeat ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="repeat password"
          />
        </FormControl>
      </LoginTextFields>
      <Button type="submit">Зарегистрироваться</Button>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        Уже есть аккаунт?&nbsp;<Link to={'/login'}>Вход</Link>
      </Box>
    </LoginForm>
  )
}
