// declare module '@carbon/react';
declare module '@carbon/react' {
  import * as CarbonComponentsReact from 'carbon-components-react';
  const Stack, Section, Heading: any;
  const Types = { ...CarbonComponentsReact, Stack, Section, Heading };
  export = Types;
}
declare module '@carbon/react/icons';
declare module 'carbon-for-ibm-cloud';
declare module '@carbon/ibm-products';
declare module '@carbon/ibmdotcom-react';
