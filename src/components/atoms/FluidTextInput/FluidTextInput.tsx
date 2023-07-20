import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { FluidForm, TextInput } from '@carbon/react';
import { TextInputProps } from 'carbon-components-react';
import useResizeObserver from '../../../hooks/useResizeObserver';

interface Props extends TextInputProps {
  suffix?: string;
}

export default function FluidTextInput({
  suffix,
  prefix,
  ...props
}: Props): ReactElement {
  const [suffixRef, suffixSize] = useResizeObserver<HTMLElement>();
  const [prefixRef, prefixSize] = useResizeObserver<HTMLElement>();

  return (
    <FluidForm style={{ position: 'relative' }}>
      <TextInput
        {...props}
        style={{
          padding: `32px ${
             suffix && suffixSize.width ? suffixSize.width + 24 : '16'
          }px 13px ${
            prefix && prefixSize.width ? prefixSize.width + 24  : '16'
          }px`,
        }}
      />
      {prefix && (
        <span
          ref={prefixRef}
          style={{
            position: 'absolute',
            left: '16px',
            bottom: '16px',
            color: '#525252',
            fontSize: '12px',
            userSelect: 'none',
          }}
        >
          {prefix}
        </span>
      )}
      {suffix && (
        <span
          ref={suffixRef}
          style={{
            position: 'absolute',
            right: '16px',
            bottom: '16px',
            color: '#525252',
            fontSize: '12px',
            userSelect: 'none',
          }}
        >
          {suffix}
        </span>
      )}
    </FluidForm>
  );
}
