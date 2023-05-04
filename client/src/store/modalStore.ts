import { makeAutoObservable } from 'mobx'
import { ReactNode } from 'react'

class ModalStore {
  isOpen = false
  children: ReactNode

  constructor() {
    makeAutoObservable(this)
  }
  open = (children: ReactNode) => {
    this.isOpen = true
    this.children = children
  }
  close = () => {
    this.isOpen = false
  }
}

export default new ModalStore()
