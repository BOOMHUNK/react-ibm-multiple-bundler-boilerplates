// declare module '@carbon/react';
declare module '@carbon/react' {
  import * as CarbonComponentsReact from 'carbon-components-react'
  const Stack: any
  const Types = { ...CarbonComponentsReact, Stack }
  export = Types
}
declare module '@carbon/react/icons';
declare module 'carbon-for-ibm-cloud';
declare module '@carbon/ibm-products';
declare module '@carbon/ibmdotcom-react';
