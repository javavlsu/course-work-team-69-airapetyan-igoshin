import React from 'react';
import editorStore from "../../../store/editorStore";
import {observer} from "mobx-react-lite";
import {blockStyles, inlineStyles} from "../TextEditor.config";
import {IconButton, styled} from "@mui/material";

const ToolsWrapper = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const ToolsLine = styled('div')`
  width: 100%;
  display: flex;
  gap: 4px;
`

const ToolsItem = styled(IconButton)`
  border-radius: 0;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`

const ToolPanelComponent = () => {

  return (
    <ToolsWrapper>
      <ToolsLine>
        {blockStyles.map(el => (
          <ToolsItem onClick={() => editorStore.toggleBlockType(el.style)}>{el.label}</ToolsItem>
        ))}
      </ToolsLine>
      <ToolsLine>
        {inlineStyles.map(el => (
          <ToolsItem onClick={() => editorStore.toggleInlineStyles(el.style)}>{el.icon}</ToolsItem>
        ))}
      </ToolsLine>
    </ToolsWrapper>
  );
};

export const ToolPanel = observer(ToolPanelComponent)