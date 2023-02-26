import React, {FC} from 'react';
import {styled, TextField} from "@mui/material";

interface ProfileInputProps {
  type?: string,
  placeholder: string,
  isAsideOpen: boolean,
  value: string,
}

const ProfileTextField = styled('p')`
  padding: 0;
  margin: 0;
  font-size: 16px;
`

export const ProfileInput:FC<ProfileInputProps> = ({ isAsideOpen, placeholder, type="text", value }) => {
  return (
    <>
      {
        isAsideOpen
        ? (
            <TextField placeholder={placeholder} type={type} value={value} />
          )
        : (
            <ProfileTextField>{value}</ProfileTextField>
          )
      }
    </>
  );
};