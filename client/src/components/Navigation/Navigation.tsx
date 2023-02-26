import React, {FC} from 'react';
import {Box, IconButton, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import {UserPreview} from "../UserPreview";
import {AppButton} from "../AppButton";

interface NavigationProps {
  toggleAside: () => void
}

export const Navigation:FC<NavigationProps> = ({ toggleAside }) => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      width: '100%',
      margin: '0 50px 0 40px',
    }}>
      <IconButton onClick={toggleAside} color="default">
        <MenuIcon/>
      </IconButton>
      <Typography variant="h5">CustomBlog</Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        width: '100%',
        gap: '20px',
      }}>
        <UserPreview />
        <AppButton><ControlPointIcon /> Создать</AppButton>
      </Box>
    </Box>
  );
};