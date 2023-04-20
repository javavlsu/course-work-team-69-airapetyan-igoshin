import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import {
  MenuBlock,
  MenuButtonIcon,
  MenuButtonText,
  MenuHeader,
  MenuButton
} from '../Home.style'
import React, { FC } from 'react'

export const AsideContent: FC<{ isAsideOpen: boolean }> = ({ isAsideOpen }) => {
  const settings = [{ name: 'Популярное' }, { name: 'Свежее' }]
  const subsribes = [
    { name: 'Блог-1' },
    { name: 'Блог-2' },
    { name: 'Блог-3' },
    { name: 'Блог-4' }
  ]

  return (
    <>
      <MenuBlock isOpen={isAsideOpen}>
        <MenuHeader>{isAsideOpen && 'Настрройка ленты'}</MenuHeader>
        {settings.map((setting) => (
          <MenuButton isOpen={isAsideOpen} key={setting.name}>
            <MenuButtonIcon isOpen={isAsideOpen} />
            {isAsideOpen && <MenuButtonText>{setting.name}</MenuButtonText>}
          </MenuButton>
        ))}
        {isAsideOpen && (
          <FormGroup row>
            <FormControlLabel
              value="onlySubscribes"
              control={<Switch color="primary" />}
              label="Только подписки"
              labelPlacement="start"
            />
          </FormGroup>
        )}
      </MenuBlock>
      <MenuBlock isOpen={isAsideOpen}>
        <MenuHeader>{isAsideOpen && 'Ваши подписки'}</MenuHeader>
        {subsribes.map((subsribe) => (
          <MenuButton isOpen={isAsideOpen} key={subsribe.name}>
            <MenuButtonIcon isOpen={isAsideOpen} />
            {isAsideOpen && <MenuButtonText>{subsribe.name}</MenuButtonText>}
          </MenuButton>
        ))}
      </MenuBlock>
      {isAsideOpen && 'Показать ещё'}
    </>
  )
}
