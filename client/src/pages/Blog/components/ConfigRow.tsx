import React, {FC} from 'react';
import {ConfigBlockLabel, ConfigBlockRow} from "../Blog.styled";
import {ConfigSmartValue} from "./ConfigSmartValue";

interface ConfigRowProps {
  label: string,
  value: string,
  handler: (v: string) => void,
}

export const ConfigRow:FC<ConfigRowProps> = ({ label , value, handler}) => {
  return (
    <ConfigBlockRow>
      <ConfigBlockLabel>{label}: </ConfigBlockLabel>
      <ConfigSmartValue
        value={value}
        handleConfigValue={handler}
      />
    </ConfigBlockRow>
  );
};