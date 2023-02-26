import React, {FormEvent, useState} from 'react';
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

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <LoginForm onSubmit={submit}>
      <FormHeader>Логин</FormHeader>
      <LoginTextFields>
        <TextField label="Логин"/>
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
      </LoginTextFields>
      <Button>Войти</Button>
    </LoginForm>
  );
};