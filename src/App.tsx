import React, { useState } from 'react';
import { Content, SelectItem } from '@carbon/react';
import { FluidSelect, FluidTextInput } from './components/atoms';

function generateSuffix(unitName: string) {
  return unitName == 'kg'
    ? 'Gram'
    : unitName == 'lbs'
    ? 'lbs'
    : unitName == 'other'
    ? 'suffix with any length'
    : '';
}

const App = (): JSX.Element => {
  const [amountSuffix, setAmountSuffix] = useState<string>('Gram');
  return (
    <Content>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <FluidSelect
          id={`select-2`}
          labelText="Select an option"
          onChange={(e) => setAmountSuffix(generateSuffix(e.target.value))}

        >
          <SelectItem value="kg" text="kg" />
          <SelectItem value="lbs" text="lbs" />
          <SelectItem value="other" text="suffix with any length" />
        </FluidSelect>

        <FluidTextInput
          type="text"
          labelText="Amount"
          id="text-input-2"
          suffix={amountSuffix}
          // warn={true}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <FluidTextInput
          type="text"
          labelText="Amount"
          id="text-input-3"
          suffix="suffix with any length"
          prefix="prefix"
        />
      </div>
    </Content>
  );
};

export default App;
