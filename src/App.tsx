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
          suffix={<span>{amountSuffix}</span>}
          warn={true}
          warnText="awdawd"
        />
      </div>
      <FluidTextInput
          type="text"
          labelText="Amount"
          id="text-input-3"
          suffix={<span>suffix with any length</span>}
          prefix={<span>prefix</span>}
        />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          flexDirection: 'column',
          marginTop: '8px',
          gap: '8px',
        }}
      >
        
   
        <FluidTextInput
          type="text"
          labelText="Amount"
          id="text-input-3"
          suffix={
            <div
              style={{
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>suffix with any Icon</span>
              <img src="/images/calendar-icon.svg" width={16} />
            </div>
          }
          prefix={
            <div
              style={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <img src="/images/calendar-icon.svg" width={16} />
              <span>Prefix with any Icon</span>
            </div>
          }
        />
      </div>
    </Content>
  );
};

export default App;
