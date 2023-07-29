import React, { useState } from 'react';
import {
  Content,
  SelectItem,
  Section,
  Heading,
  Grid,
  Column,
  Button,
  Row,
} from '@carbon/react';
import { FluidSelect, FluidTextInput } from './components/atoms';
import './app.scss';

const App = (): JSX.Element => {
  return (
    <Content>
      <Grid fullWidth>
        <Column xlg={16} lg={16} md={8} sm={4}>
          
          <Heading className="BigHeader InvertedTextColor">
            You Can Have Non Of These Problems With Fabizi!
          </Heading>
          <div id='DarkRightPushedDiv'><span>In publishing and graphic design, Lorem ipsum is aIn publishing and graphic design, Lorem ipsum is In publishing and graphic design, Lorem ipsum is aIn publishing and</span><Button><span>Try it now</span></Button></div>
        </Column>
      </Grid>
    </Content>
  );
};

export default App;
