import React, { FC, ReactNode } from 'react'
import { ExpansionPanelWrapper } from './ExpansionPanel.styled'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  useTheme
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface ExpansionPanelProps {
  title: string
  children: ReactNode
}

export const ExpansionPanel: FC<ExpansionPanelProps> = ({
  title,
  children
}) => {
  const theme = useTheme()

  return (
    <ExpansionPanelWrapper>
      <Accordion
        variant={'outlined'}
        sx={{
          background: theme.palette.app.main,
          color: theme.palette.app.contrastText,
          borderRadius: '0 !important'
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: '5px 0',
            background: theme.palette.base.main
          }}
        >
          {children}
        </AccordionDetails>
      </Accordion>
    </ExpansionPanelWrapper>
  )
}
