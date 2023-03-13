import React, {FC} from 'react';
import {ConfigBlock} from "../Blog.styled";
import {translateConfig} from "../../../utils/translates";
import designStore from "../../../store/designStore";
import {ExpansionPanel} from "../../../components/ExpansionPanel";
import {ConfigRow} from "./ConfigRow";

interface ConfigNodeProps {
  objKey: string,
  objValue: any
}

const getConfigRows = (o: any) => {
  return Object.entries(o).filter(([key, _]) => key !== 'name' && key !== 'isGroup')
}

export const ConfigNode: FC<ConfigNodeProps> = ({objKey, objValue}) => {
  const isDrawRow = !objValue.isGroup
  const configValues = getConfigRows(objValue)

  return (
    <ConfigBlock>
      <ExpansionPanel title={objValue.name}>
        { configValues.map(([key, value]) => (
          <>
            { isDrawRow
              ? (<ConfigRow
                  label={translateConfig[key as keyof typeof translateConfig] || ''}
                  value={value as any}
                  handler={designStore.handleDesignParam(objKey, key as any)}
                />)
              : (<ConfigNode key={`${objKey}.${key}`} objKey={`${objKey}.${key}`} objValue={value}/>)}
          </>
        ))
        }
      </ExpansionPanel>
    </ConfigBlock>
  );
};