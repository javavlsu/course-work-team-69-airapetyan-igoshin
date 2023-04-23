import React, { FC } from 'react'
import { AsideMenuProps } from './AsideMenu.types'
import { AsideMenuWrapper } from './AsideMenu.style'

export const AsideMenu: FC<AsideMenuProps> = ({
  isOpen,
  children,
  background
}) => {
  return (
    <AsideMenuWrapper background={background} isOpen={isOpen}>
      {children}
    </AsideMenuWrapper>
  )
}
