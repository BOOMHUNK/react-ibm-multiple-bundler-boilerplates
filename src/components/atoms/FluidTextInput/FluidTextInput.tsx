import React, { ReactElement } from 'react';
import { FluidForm, TextInput } from '@carbon/react';
import { TextInputProps } from 'carbon-components-react';

interface Props extends TextInputProps {
  suffix?: string;
}

export default function FluidTextInput(props: Props): ReactElement {
  return (
    <FluidForm style={{position: "relative"}}>
      <TextInput {...props}  style={{padding:"32px 54px 13px 16px",}}/>
      {props.suffix && <span style={{position: "absolute", right: "16px", bottom: "16px",color: "#525252", fontSize:"12px", userSelect:"none" }}>{props.suffix}</span>}
    </FluidForm>
  );
}
