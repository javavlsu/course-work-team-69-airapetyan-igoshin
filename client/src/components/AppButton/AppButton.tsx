import React, {FC, ReactNode} from 'react';
import {Button} from "@mui/material";

interface AppButtonProps {
  children: ReactNode,
}

export const AppButton:FC<AppButtonProps> = ({children}) => {
  return (
    <Button sx={{ padding: '5px 15px', borderRadius: '10px'}} variant="contained">
      {children}
    </Button>
  );
};