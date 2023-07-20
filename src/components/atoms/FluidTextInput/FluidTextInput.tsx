import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { FluidForm, TextInput } from '@carbon/react';
import { TextInputProps } from 'carbon-components-react';
import useElementResizeObserver from '../../../hooks/useElementResizeObserver';
import './_fluidTextInput.scss';

interface Props extends Omit<TextInputProps, 'prefix'> {
  suffix?: React.ReactNode | string | undefined;
  prefix?: React.ReactNode | string | undefined;
}

export default function FluidTextInput({
  suffix,
  prefix,
  ...props
}: Props): ReactElement {
  const [prefixRefState, setPrefixRefState] = useState<HTMLElement>();
  const [suffixRefState, setSuffixRefState] = useState<HTMLElement>();

  const prefixSize = useElementResizeObserver(prefixRefState);
  const suffixSize = useElementResizeObserver(suffixRefState);

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
        (typeof prefix == 'string' ? (
          <span
            ref={(el: HTMLElement) => {
              setPrefixRefState(el);
            }}
            style={{
              position: 'absolute',
              right: '16px',
              top: '36px',
              color: '#525252',
              fontSize: '12px',
              userSelect: 'none',
            }}
          >{prefix}</span>
        ) : (
          React.cloneElement(prefix as React.ReactElement, {
            ref: (el: HTMLElement) => {
              setPrefixRefState(el);
            },
            style: {
              position: 'absolute',
              left: '16px',
              top: '36px',
              color: '#525252',
              fontSize: '12px',
              userSelect: 'none',
              ...((prefix as React.ReactElement)?.props?.style || {}),
            },
          })
        ))}

      {suffix &&
        (typeof suffix == 'string' ? (
          <span
            ref={(el: HTMLElement) => {
              setSuffixRefState(el);
            }}
            style={{
              position: 'absolute',
              right: '16px',
              top: '36px',
              color: '#525252',
              fontSize: '12px',
              userSelect: 'none',
            }}
          >{suffix}</span>
        ) : (
          React.cloneElement(suffix as React.ReactElement, {
            ref: (el: HTMLElement) => {
              setSuffixRefState(el);
            },
            style: {
              position: 'absolute',
              right: '16px',
              top: '36px',
              color: '#525252',
              fontSize: '12px',
              userSelect: 'none',
              ...((suffix as React.ReactElement)?.props?.style || {}),
            },
          })
        ))}
    </FluidForm>
  );
}
