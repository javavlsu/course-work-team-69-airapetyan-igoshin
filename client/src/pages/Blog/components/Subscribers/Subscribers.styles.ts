import { styled } from '@mui/material'

export const ModalContent = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  overflow-y: auto;
  max-height: 80vh;
  max-width: 70vw;
  min-width: 50vw;
  background: ${({ theme }) => theme.palette.base.main};
`
