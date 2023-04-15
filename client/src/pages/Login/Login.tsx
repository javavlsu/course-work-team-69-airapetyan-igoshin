import React, {useState} from 'react';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  styled,
  TextField
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {FormHeader, LoginForm, LoginTextFields} from "../../components/Login/Login.styled";
import User from '../../domain/User'
import {useForm} from "react-hook-form";
import {LoginData} from "../../service/user";
import {useNavigate} from "react-router-dom";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, setValue } = useForm<LoginData>()
  const navigate = useNavigate()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const submit = handleSubmit(async data => {
    const response = await User.login(data)
    console.log(response)

    if (!response?.ok) {
      console.error('Неверный логин или пароль!')
    }

    navigate('/')

  })

  return (
    <LoginForm onSubmit={submit}>
      <FormHeader>Логин</FormHeader>
      <LoginTextFields>
        <TextField {...register("username")} type="email" label="username"/>
        <FormControl variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </LoginTextFields>
      <Button type="submit">Войти</Button>
    </LoginForm>
  );
};