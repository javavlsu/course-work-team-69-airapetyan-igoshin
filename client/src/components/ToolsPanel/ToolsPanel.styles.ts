import { css, styled } from '@mui/material'

export const ToolsPanelRoot = styled('div')`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  overflow: hidden;
  gap: 20px;
`

export const ToolsItem = styled('div')<{ $animated: boolean }>`
  padding: 15px 0;
  height: 100%;
  display: flex;
  min-width: 40px;
  transition: 0.1s;
  cursor: pointer;
  ${({ $animated }) =>
    $animated &&
    css`
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          opacity: 1;
          transform: scale(1.1);
        }
      }
    `}
`
