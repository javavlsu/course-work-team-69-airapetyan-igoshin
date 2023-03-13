import React, {FC, useState} from 'react';
import {Box} from "@mui/material";
import {AsideToggleButton, ConfigContainer} from "../Blog.styled";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import designStore from "../../../store/designStore";
import {ConfigNode} from "./ConfigNode";
import {AsideMenu} from "../../../components/AsideMenu";
import {observer} from "mobx-react-lite";

interface BlogAsideProps {
  isOpen: boolean,
  toggle: () => void,
}

const BlogAsideComponent:FC<BlogAsideProps> = ({ isOpen, toggle }) => {

  return (
    <AsideMenu isOpen={isOpen}>
      <Box sx={{display: 'flex', width: '100%', justifyContent: 'end', cursor: 'pointer'}}>
        <AsideToggleButton onClick={toggle}>
          {isOpen ? <ArrowCircleLeftIcon/> : <ArrowCircleRightIcon/>}
        </AsideToggleButton>
      </Box>
      {
        isOpen && (
          <ConfigContainer>
            {
              Object.entries(designStore.config).map(([objKey, objValue]) => (
                <ConfigNode key={objKey} objKey={objKey} objValue={objValue}/>
              ))
            }
          </ConfigContainer>
        )
      }
    </AsideMenu>
  );
};

export const BlogAside = observer(BlogAsideComponent)