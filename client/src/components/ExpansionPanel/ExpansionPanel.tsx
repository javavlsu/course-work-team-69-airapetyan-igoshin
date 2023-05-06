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
        sx={{
          background: theme.palette.neutral.main,
          color: theme.palette.neutral.contrastText
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: '0'
          }}
        >
          {children}
        </AccordionDetails>
      </Accordion>
    </ExpansionPanelWrapper>
  )
}
