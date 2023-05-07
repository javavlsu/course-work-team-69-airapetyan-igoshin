import alertStore, { IAlert } from '../../store/alertStore'
import React, { FC, useEffect } from 'react'
import { Alert, styled } from '@mui/material'
import { observer } from 'mobx-react-lite'

const AlertRoot = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5px 0;
`

const AppAlert: FC<{ alert: IAlert }> = ({ alert }) => {
  useEffect(() => {
    setTimeout(() => {
      alertStore.close(alert)
    }, 4000)
  }, [])
  return (
    <AlertRoot>
      <Alert onClose={() => alertStore.close(alert)} severity={alert.type}>
        {alert.children}
      </Alert>
    </AlertRoot>
  )
}

export default observer(AppAlert)
