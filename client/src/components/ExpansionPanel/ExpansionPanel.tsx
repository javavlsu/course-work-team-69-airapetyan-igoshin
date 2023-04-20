import React, { FC, ReactNode } from 'react'
import { ExpansionPanelWrapper } from './ExpansionPanel.styled'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
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
  return (
    <ExpansionPanelWrapper>
      <Accordion>
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
