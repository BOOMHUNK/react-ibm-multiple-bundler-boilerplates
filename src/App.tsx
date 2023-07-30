import React, { useState } from "react";
import {
  Content,
  SelectItem,
  Section,
  Heading,
  Grid,
  Column,
  Button,
  Row,
  Stack,
} from "@carbon/react";

import { ArrowRight } from "@carbon/react/icons";

import "./app.scss";

const App = (): JSX.Element => {
  return (
    <Content>
      <Grid style={{ position: "relative" }}>
        {/* <Row> */}
        <Column xlg={2} lg={3} md={2} sm={1} />
        <Column xlg={14} lg={13} md={6} sm={3}>
          <Stack className="darkBG">
            <Heading className="BigHeader InvertedTextColor">
              You Can Have Non Of These Problems With Fabizi!
            </Heading>
            <div id="ContentDiv">
              <span className="">
                In publishing and graphic design, Lorem ipsum is aIn publishing
                and graphic design, Lorem ipsum is In publishing and graphic
                design, Lorem ipsum is aIn publishing and
              </span>
              <Button renderIcon={ArrowRight}>
                <span>Try it now</span>
              </Button>
            </div>
          </Stack>
        </Column>
        {/* </Row> */}
      </Grid>
    </Content>
  );
};

export default App;
