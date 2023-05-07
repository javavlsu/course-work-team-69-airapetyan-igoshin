import { makeAutoObservable } from 'mobx'
import { ReactNode } from 'react'

export interface IAlert {
  children: ReactNode
  type: 'success' | 'info' | 'warning' | 'error'
}

class AlertStore {
  alerts: IAlert[] = []

  constructor() {
    makeAutoObservable(this)
  }
  create = (alert: IAlert) => {
    this.alerts.push(alert)
  }
  close = (alert: IAlert) => {
    this.alerts = this.alerts.filter((item) => alert != item)
  }
}

export default new AlertStore()
