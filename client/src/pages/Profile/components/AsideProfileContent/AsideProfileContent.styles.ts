import { styled } from '@mui/material'

export const AsideWrapper = styled('div')`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 1px;
    height: 80%;
    background: #d9d9d9;
  }
`

export const AsideContentContainer = styled('div')`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin: 50px 0;
`

export const ProfileAvatarBlock = styled('div')`
  display: flex;
  justify-content: start;
`

export const ProfileAvatar = styled('img')`
  border-radius: 100%;
  height: 100px;
  width: 100px;
  background: #d9d9d9;
`

export const ProfileForm = styled('form')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`
