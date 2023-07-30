import { Content, Heading, Grid, Column, Button, Stack } from '@carbon/react';

import { ArrowRight } from '@carbon/react/icons';

import './app.scss';
import { DarkInvertedSection } from './components/molecules';

const App = (): JSX.Element => {
  return (
    <Content>
      <DarkInvertedSection
        Title="You Can Have Non Of These Problems With Fabizi!"
        Desc="In publishing and graphic design, Lorem ipsum is a In
                    publishing and graphic design, Lorem ipsum is In publishing
                    and graphic design, Lorem ipsum is aIn publishing and"
        ButtonTitle="Try it now"
        ButtonAction={(e) => console.log('Clicked!')}
      />
    </Content>
  );
};

export default App;
