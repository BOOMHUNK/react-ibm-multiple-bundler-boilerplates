import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { FluidForm, TextInput } from '@carbon/react';
import { TextInputProps } from 'carbon-components-react';
import useElementResizeObserver from '../../../hooks/useElementResizeObserver';
import './_fluidTextInput.scss';

interface Props extends Omit<TextInputProps, 'prefix'> {
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
}

export default function FluidTextInput({
  suffix,
  prefix,
  ...props
}: Props): ReactElement {
  
  const [suffixRef, suffixSize] = useElementResizeObserver<HTMLElement>();
  const [prefixRef, prefixSize] = useElementResizeObserver<HTMLElement>();

  return (
    <FluidForm style={{ position: 'relative' }}>
      <TextInput
        {...props}
        style={{
          padding: `32px ${
            suffix && suffixSize.width ? suffixSize.width + 24 : '16'
          }px 13px ${
            prefix && prefixSize.width ? prefixSize.width + 24 : '16'
          }px`,
        }}
      />
      {prefix &&
        React.cloneElement(prefix as React.ReactElement, {
          ref: prefixRef,
          style: {
            ...((prefix as React.ReactElement)?.props?.style || {}),
            position: 'absolute',
            left: '16px',
            top: '36px',
            color: '#525252',
            fontSize: '12px',
            userSelect: 'none',
          },
        })}
      {suffix &&
        React.cloneElement(suffix as React.ReactElement, {
          ref: suffixRef,
          style: {
            ...((suffix as React.ReactElement)?.props?.style || {}),
            position: 'absolute',
            right: '16px',
            top: '36px',
            color: '#525252',
            fontSize: '12px',
            userSelect: 'none',
          },
        })}
    </FluidForm>
  );
}
