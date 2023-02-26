import React, {FC, ReactNode} from 'react';
import {styled} from "@mui/material";

interface AsideMenuProps {
  isOpen: boolean,
  children: ReactNode,
  background?: string,
}

const AsideMenuWrapper = styled('aside')<AsideMenuProps>
(({isOpen, background}) => ({
  gridRow: '1',
  gridColumn: isOpen ? '1 / 3' : '1',
  background: background,
}))

export const AsideMenu: FC<AsideMenuProps> = ({isOpen, children, background= '#D9D9D9'}) => {
  return (
    <AsideMenuWrapper background={background} isOpen={isOpen}>
      {children}
    </AsideMenuWrapper>
  );
};