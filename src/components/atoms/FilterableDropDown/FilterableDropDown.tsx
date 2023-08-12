import { ReactElement, ReactNode, useEffect, useRef } from 'react';
import { ComboBox } from '@carbon/react';
import { ComboBoxProps } from 'carbon-components-react';
import './_filterableDropDown.scss';
import useQuerySelector from '../../../hooks/useQuerySelector';
import useJSXRenderer from '../../../hooks/useJSXRenderer';

type Props = Omit<ComboBoxProps<DropDownItemType, DropDownItemType>, 'items' | 'itemToElement'> & {
  id: string;
  items: DropDownItemType[];
  // itemToElement?: (item: any) => JSX.Element;
  suffix?: string;
}

export default function FilterableDropDown({ suffix, ...props }: Props): ReactElement {
  if (props.items) props.items = props.items.map(item => item.isCategory ? { ...item, disabled: true } : item);

  const ComboRef = useRef<HTMLDivElement | null>(null);
  const container = useQuerySelector(ComboRef, '.cds--list-box__field')
  const [injectToFileContainer, removeFileContainerRoot] =
    useJSXRenderer(container, suffix && <span
      className='suffix'
    >
      {suffix}
    </span>, { style: "position: absolute; right: 0; bottom: 0rem; top: 0; left: 0; pointer-events:none;" });

  return (
    <div ref={ComboRef} className='filterable-dropdown-container' >
      <ComboBox
        className='filterable-dropdown'
        itemToElement={(item) => <div className={`item ${item.isCategory ? "category" : ""}`}>{item.label}</div>}
        {...props}
      />
    </div >
  );
}

