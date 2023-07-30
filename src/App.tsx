import { Content, Heading, Grid, Column, Button, Stack } from "@carbon/react";

import { ArrowRight } from "@carbon/react/icons";

import "./app.scss";

const App = (): JSX.Element => {
  return (
    <Content>
      <Grid className="testimonial-problemsGone">
        {/* <Row> */}
        <Column xlg={2} lg={3} md={1} sm={0} />
        <Column xlg={14} lg={13} md={7} sm={4}>
          <Stack className="darkBg">
            <Heading className="invertedText">
              You Can Have Non Of These Problems With Fabizi!
            </Heading>
            <div className="contentDiv">
              <Grid fullWidth>
                <Column xlg={10} lg={10} md={7} sm={4}>
                  <span className="">
                    In publishing and graphic design, Lorem ipsum is a In
                    publishing and graphic design, Lorem ipsum is In publishing
                    and graphic design, Lorem ipsum is aIn publishing and
                  </span>
                </Column>
                <Column lg={0} md={4} />
                <Column xlg={4} lg={3} md={3} sm={4}>
                  <Button className="button" renderIcon={ArrowRight}>
                    Try it now
                  </Button>
                </Column>
              </Grid>
            </div>
          </Stack>
        </Column>
        {/* </Row> */}
      </Grid>
    </Content>
  );
};

export default App;
