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
      background: ${({ theme }) => theme.palette.neutral.light};
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`

export const MenuHeader = styled('p')`
  padding: 0;
  margin: 20px;
  font-size: 18px;
  font-weight: 700;
`

export const MenuButton = styled('button')<{
  isOpen: boolean
  $selected?: boolean
}>`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  background: ${({ theme, $selected }) =>
    $selected ? theme.palette.app.light : theme.palette.app.main};
  color: ${({ theme }) => theme.palette.app.contrastText};
  padding: 0 ${(props) => (props.isOpen ? '20px' : '10px')};
  border: none;
  cursor: pointer;
  ${(props) => !props.isOpen && 'justify-content: center;'}

  &:hover {
    background: ${({ theme }) => theme.palette.app.light};
    color: ${({ theme }) => theme.palette.app.contrastText};
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
  padding: 0 0 0 10px;
  font-size: 15px;
`

export const HomeWrapper = styled('div')(() => ({
  display: 'grid',
  gridTemplate: '1fr / 70px 210px 1fr',
  width: '100%',
  height: '100%'
}))

export const MainContent = styled('div')<{ isAsideOpen: boolean }>`
  grid-row: 1;
  grid-column: ${({ isAsideOpen }) => (isAsideOpen ? '3' : '2')} / -1;
  display: grid;
  grid-template: 150px 1fr / 2fr 8fr 3fr;
  overflow-y: scroll;
`

export const PostList = styled('div')`
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
  grid-column: 2;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  gap: 60px;
`

export const SearchBarBlock = styled('div')`
  margin: 0 auto;
  width: 100%;
  max-width: 700px;
  grid-column: 2;
  grid-row: 1;
  display: flex;
  align-items: center;
`
