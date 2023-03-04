import React, {FC} from 'react';
import {ConfigBlock, ConfigBlockHeader, ConfigBlockLabel, ConfigBlockRow} from "../Blog.styled";
import {translateConfig} from "../../../utils/translates";
import {ConfigSmartValue} from "./ConfigSmartValue";
import designStore from "../../../store/designStore";

interface ConfigNodeProps {
  objKey: string,
  objValue: any
}

const getOnlyConfig = (o: any) => {
  return Object.entries(o).filter(([key, _]) => key !== 'name' && key !== 'isGroup')
}

export const ConfigNode: FC<ConfigNodeProps> = ({objKey, objValue}) => {
  return (
    <>
      <ConfigBlock key={objValue.name}>
        <ConfigBlockHeader>{objValue.name}</ConfigBlockHeader>
          { getOnlyConfig(objValue).map(([key, value]) => (
            <>
              { !objValue.isGroup ? (
                <ConfigBlockRow>
                  <ConfigBlockLabel>{translateConfig[key as keyof typeof translateConfig] || ''}: </ConfigBlockLabel>
                  <ConfigSmartValue
                    value={value as any}
                    handleConfigValue={designStore.handleDesignParam(objKey, key as any)}
                  />
                </ConfigBlockRow>
              ) : ( <ConfigNode key={`${objKey}.${key}`} objKey={`${objKey}.${key}`} objValue={value}/> )}
            </>
          ))
          }
      </ConfigBlock>
    </>
  );
};