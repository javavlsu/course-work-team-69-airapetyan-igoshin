import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import {
  MenuBlock,
  MenuButtonIcon,
  MenuButtonText,
  MenuHeader,
  MenuButton
} from '../Home.style'
import React, { FC } from 'react'
import { AsideContentProps } from '../Home.types'

export const AsideContent: FC<AsideContentProps> = ({
  isAsideOpen,
  onNewest,
  onPopular,
  onSubscribes
}) => {
  const settings = [
    { name: 'Популярное', handler: onPopular },
    { name: 'Свежее', handler: onNewest }
  ]
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
          <MenuButton
            onClick={setting.handler}
            isOpen={isAsideOpen}
            key={setting.name}
          >
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
              onChange={onSubscribes}
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
