import { ReactElement, ReactNode, useEffect, useRef } from 'react';
import { ComboBox } from '@carbon/react';
import { ComboBoxProps } from 'carbon-components-react';
import './_filterableDropDown.scss';
import useQuerySelector from '../../../hooks/useQuerySelector';
import useElementResizeObserver from '../../../hooks/useElementResizeObserver';

type Props = Omit<ComboBoxProps<DropDownItemType, DropDownItemType>, 'items' | 'itemToElement'> & {
  id: string;
  items: DropDownItemType[];
  // itemToElement?: (item: any) => JSX.Element;
  suffix?: string;
}


export default function FilterableDropDown({ suffix, ...props }: Props): ReactElement {
  if (props.items) props.items = props.items.map(item => item.isCategory ? { ...item, disabled: true } : item);
  const ComboRef = useRef<HTMLDivElement | null>(null);
  const labelEl = useQuerySelector(ComboRef, '.cds--label')
  const { height: labelHeight } = useElementResizeObserver(labelEl);

  return (
    <div ref={ComboRef} className='filterable-dropdown-container' >
      <ComboBox

        className='filterable-dropdown'
        itemToElement={(item) => <div className={`item ${item.isCategory ? "category" : ""}`}>{item.label}</div>}
        {...props}
      />
      {
        suffix && (
          <span
            className='suffix'
            style={{
              top: `${((labelHeight) ? (labelHeight + 24) : 16)}px`
            }}
          >
            {suffix}
          </span>
        )
      }
    </div >
  );
}

