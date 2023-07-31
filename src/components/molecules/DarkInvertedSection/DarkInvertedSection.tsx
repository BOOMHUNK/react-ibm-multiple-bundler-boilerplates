import { ReactElement } from "react";
import { Heading, Grid, Column, Button, Stack } from "@carbon/react";

import { ArrowRight } from "@carbon/react/icons";
import "./_darkInvertedSection.scss";

interface Props {
  Title: string;
  Desc: string;
  ButtonTitle?: string;
  ButtonAction?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function DarkInvertedSection({
  Title,
  Desc,
  ButtonTitle,
  ButtonAction,
}: Props): ReactElement {
  return (
    <Grid fullWidth className="testimonial-problemsGone">
      <Column xlg={1} lg={1} md={1} sm={0} />
      <Column xlg={15} lg={15} md={7} sm={4}>
        <Stack className="darkBg">
          <Heading className="invertedText">{Title}</Heading>
          <div className="content-grid-container">
            <Grid>
              <Column lg={1} />
              <Column lg={9} md={7} sm={4} className="desc-col">
                <span>{Desc}</span>
              </Column>
              <Column lg={0} md={4} />
              <Column lg={5} md={3} sm={4} className="btn-col">
                {ButtonTitle && (
                  <Button
                    className="button"
                    renderIcon={ArrowRight}
                    onClick={(e) => ButtonAction && ButtonAction(e)}
                  >
                    {ButtonTitle}
                  </Button>
                )}
              </Column>
            </Grid>
          </div>
        </Stack>
      </Column>
    </Grid>
  );
}
