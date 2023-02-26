import React from 'react';
import {Box, Typography} from "@mui/material";

export const UserPreview = () => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      gap: '10px',
    }}>
      <Box sx={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: 'yellow',
      }} />
      <Typography variant="h6">Username</Typography>
    </Box>
  );
};