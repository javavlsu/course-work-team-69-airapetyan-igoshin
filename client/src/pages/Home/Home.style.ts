import { styled } from '@mui/material'

export const MenuBlock = styled('div')<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  &:not(:last-child) {
    &::after {
      content: '';
      height: ${({ isOpen }) => (isOpen ? '1px' : 0)};
      width: 85%;
      position: absolute;
      background: #fff;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`

export const MenuHeader = styled('p')`
  padding: 0;
  margin: 20px;
  font-size: 16px;
`

export const MenuButton = styled('button')<{ isOpen: boolean }>`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  background: #969696;
  padding: 0 ${(props) => (props.isOpen ? '20px' : '10px')};
  border: none;
  cursor: pointer;
  ${(props) => !props.isOpen && 'justify-content: center;'}

  &:hover {
    background: #ecc5c5;
  }
`

export const MenuButtonIcon = styled('img')<{ isOpen: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: ${(props) => (props.isOpen ? '20px' : 0)};
  background: grey;
`

export const MenuButtonText = styled('p')`
  padding: 0;
  font-size: 15px;
`
