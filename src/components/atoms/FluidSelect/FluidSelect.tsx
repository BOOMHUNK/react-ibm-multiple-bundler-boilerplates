import React, { ReactElement } from 'react';
import { FluidForm, Select, SelectItem, TextInput } from '@carbon/react';
import { SelectProps } from 'carbon-components-react';

interface Props extends Omit<SelectProps, "size"> {
  suffix?: string;
  children?: React.ReactNode[]
}


export default function FluidTextInput(props: Props): ReactElement {
  return (
    <FluidForm style={{ position: 'relative' }}>
      <Select {...props} style={{ minHeight: '4rem', padding: '32px 16px 13px', minWidth:"13rem" }}>
        {props.children?.length && [...props.children]}
      </Select>
      {props.suffix && (
        <span
          style={{
            position: 'absolute',
            right: '16px',
            bottom: '13px',
            color: '#525252',
            fontSize: '12px',
            userSelect: 'none',
          }}
        >
          {props.suffix}
        </span>
      )}
    </FluidForm>
  );
}
