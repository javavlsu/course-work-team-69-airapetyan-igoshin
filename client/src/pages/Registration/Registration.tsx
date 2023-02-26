import React, {FormEvent, useState} from 'react';
import {FormHeader, LoginForm, LoginTextFields} from "../../components/Login/Login.styled";
import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export const Registration = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleClickShowPasswordRepeat = () => {
    setShowPasswordRepeat(!showPasswordRepeat)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <LoginForm onSubmit={submit}>
      <FormHeader>Регистрация</FormHeader>
      <LoginTextFields>
        <TextField label="Логин"/>
        <TextField label="Ваше имя"/>
        <TextField type="email" label="E-mail"/>
        <FormControl variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
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
        <FormControl variant="outlined">
          <InputLabel htmlFor="password-repeat">Password</InputLabel>
          <OutlinedInput
            id="password-repeat"
            type={showPasswordRepeat ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPasswordRepeat}
                  edge="end"
                >
                  {showPasswordRepeat ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </LoginTextFields>
      <Button>Зарегистрироваться</Button>
    </LoginForm>
  );
};