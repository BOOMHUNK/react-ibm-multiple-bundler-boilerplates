import React, { useState } from 'react';
import { Content, SelectItem } from '@carbon/react';
import { FluidSelect, FluidTextInput } from './components/atoms';

function generateSuffix(unitName: string) {
  return unitName == 'kg' ? 'Gram' : unitName == 'lbs' ? 'lbs' : '';
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
        </FluidSelect>

        <FluidTextInput
          type="text"
          labelText="Amount"
          id="text-input-2"
          suffix={amountSuffix}
        />
      </div>
    </Content>
  );
};

export default App;
