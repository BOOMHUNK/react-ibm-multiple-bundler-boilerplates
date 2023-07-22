import React, { useState } from "react";
import {
  Content,
  SelectItem,
  Section,
  Heading,
  Grid,
  Column,
  Row,
} from "@carbon/react";
import { FluidSelect, FluidTextInput } from "./components/atoms";

function generateSuffix(unitName: string) {
  return unitName == "kg"
    ? "Gram"
    : unitName == "lbs"
    ? "lbs"
    : unitName == "other"
    ? "suffix with any length"
    : "";
}

const completelyCustomSuffixHTML: JSX.Element = (
  <div
    style={{
      display: "flex",
      justifyContent: "right",
      alignItems: "center",
      gap: "8px",
    }}
  >
    <span>
      Suffix with any <strong>LAYOUT</strong>*
    </span>
    <img src="/images/calendar-icon.svg" width={16} />
  </div>
);
const completelyCustomPrefixHTML: JSX.Element = (
  <div
    style={{
      backgroundColor: "#0c71cfb0",
      borderRadius: "5px",
      padding: "3px",
      marginTop: "-7px",
      display: "flex",
      justifyContent: "left",
      alignItems: "center",
      gap: "8px",
    }}
  >
    <img src="/images/calendar-icon.svg" width={16} />
    <span style={{ color: "#fff" }}>
      Prefix with any <strong>LAYOUT</strong>*
    </span>
  </div>
);

const App = (): JSX.Element => {
  const [amountSuffix, setAmountSuffix] = useState<string>("Gram");
  return (
    <Content>
      <Grid fullWidth>
        <Column xlg={3} lg={4} md={1} sm={0} />
        <Column xlg={10} lg={8} md={6} sm={4}>
          <Section style={{ marginBottom: "32px" }}>
            <Section>
              <Heading>Purchase Unit</Heading>
              <p>
                Define different packaging indexes, set their names, choose a
                unit of measurment and their amount for more control over items.
              </p>
            </Section>
          </Section>

          <Grid fullWidth>
            <Column xlg={5} lg={4} md={3} sm={4}>
              <FluidSelect
                id={`select-2`}
                labelText="Select an option"
                onChange={(e) =>
                  setAmountSuffix(generateSuffix(e.target.value))
                }
              >
                <SelectItem value="kg" text="kg" />
                <SelectItem value="lbs" text="lbs" />
                <SelectItem value="other" text="suffix with any length" />
              </FluidSelect>
            </Column>
            <Column xlg={5} lg={4} md={3} sm={4}>
              <FluidTextInput
                type="number"
                labelText="Amount"
                id="text-input-2"
                suffix={amountSuffix}
              />
            </Column>
          </Grid>

          <Section>
            <p style={{ color: "#428cdb" }}>
              Every "Kilogram" is equal to 1000 Gram.
            </p>
          </Section>
          <FluidTextInput
            type="text"
            labelText="Amount"
            id="text-input-3"
            suffix={<span>suffix with any length</span>}
            prefix={
              amountSuffix == "Gram" ? (
                <span>span prefix</span>
              ) : (
                <div>div prefix</div>
              )
            }
            warn={true}
            warnText="Note: Any react JSX Element Can be used as suffix and prefix"
          />

          <FluidTextInput
            placeholder="placeholder text"
            type="text"
            labelText="Amount"
            id="text-input-3"
            prefix={completelyCustomPrefixHTML}
            suffix={completelyCustomSuffixHTML}
          />
        </Column>
        <Column xlg={3} lg={4} md={1} sm={0} />
      </Grid>
    </Content>
  );
};

export default App;
