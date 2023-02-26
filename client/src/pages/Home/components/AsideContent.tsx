import {FormControlLabel, FormGroup, styled, Switch} from "@mui/material";
import React, {FC} from 'react';

const MenuBlock = styled('div')<{isOpen: boolean}>`
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;
  position: relative;
  &:not(:last-child) {
    &::after {
      content: '';
      height: ${({isOpen}) => isOpen ? '1px' : 0};
      width: 85%;
      position: absolute;
      background: #fff;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`

const MenuHeader = styled('p')`
  padding: 0;
  margin: 20px;
  font-size: 16px;
`

const MenuButton = styled('button')<{isOpen: boolean}>`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background: #969696;
  padding: 0 ${(props) => props.isOpen ? '20px' : '10px'};
  border: none;
  cursor: pointer;
  border-radius: 10px;
  ${(props) => !props.isOpen && 'justify-content: center;'}

  &:hover {
    background: #ECC5C5;
  }
`

const MenuButtonIcon = styled('img')<{isOpen: boolean}>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: ${(props) => props.isOpen ? '20px' : 0};
  background: grey;
`

const MenuButtonText = styled('p')`
  padding: 0;
  font-size: 16px;
`

export const AsideContent:FC<{isAsideOpen: boolean}> = ({isAsideOpen}) => {
  const settings = [
    {
      name: 'Популярное',
    },
    {
      name: 'Свежее',
    }
  ]
  const subsribes = [
    {name : 'Блог-1'},
    {name : 'Блог-2'},
    {name : 'Блог-3'},
    {name : 'Блог-4'},
  ]

  return (
    <>
      <MenuBlock isOpen={isAsideOpen}>
        <MenuHeader>{isAsideOpen && 'Настрройка ленты'}</MenuHeader>
        {settings.map(setting => (
            <MenuButton isOpen={isAsideOpen} key={setting.name}>
              <MenuButtonIcon isOpen={isAsideOpen}/>
              { isAsideOpen && <MenuButtonText>{setting.name}</MenuButtonText> }
            </MenuButton>
          )
        )}
        {isAsideOpen && <FormGroup row>
          <FormControlLabel
            value="onlySubscribes"
            control={<Switch color="primary"/>}
            label="Только подписки"
            labelPlacement="start"
          />
        </FormGroup>}
      </MenuBlock>
      <MenuBlock isOpen={isAsideOpen}>
        <MenuHeader>{isAsideOpen && 'Ваши подписки'}</MenuHeader>
        {subsribes.map(subsribe => (
            <MenuButton isOpen={isAsideOpen} key={ subsribe.name }>
              <MenuButtonIcon isOpen={isAsideOpen}/>
              { isAsideOpen && <MenuButtonText>{ subsribe.name }</MenuButtonText> }
            </MenuButton>
          )
        )}
      </MenuBlock>
      {isAsideOpen && 'Показать ещё'}
    </>
  );
};