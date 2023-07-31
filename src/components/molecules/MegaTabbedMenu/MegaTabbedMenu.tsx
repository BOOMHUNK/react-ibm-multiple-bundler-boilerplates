import { Children, useEffect, useState } from 'react';
import './_megaTabbedMenu.scss';
import { Column, Grid } from '@carbon/react';
import useBreakpoints from '../../../hooks/useBreakpoints';

type TabData = {
  Icon: JSX.Element;
  Title: string;
  Desc: string;
  ContentTitle: string;
  ContentSections: {
    SectionTitle: string;
    SectionPoints: string[];
  }[];
};

type MegaTabbedMenuData = TabData[];
type ProcessedTabData = TabData | number;
type ProcessedMegaTabbedMenuData = ProcessedTabData[];

type Props = {
  Data: MegaTabbedMenuData;

  sm: number;
  md: number;
  lg: number;
  xl: number;
};
function processData(
  Data: MegaTabbedMenuData,
  rowAfterNTabs: number,
  setProcessedData: React.Dispatch<
    React.SetStateAction<ProcessedMegaTabbedMenuData>
  >
) {
  const processed: ProcessedMegaTabbedMenuData = [];
  for (let i = 0; i < Data.length; i++) {
    const singleTabData = Data[i];
    if (i != 0 && i % rowAfterNTabs == 0) {
      processed.push(i / rowAfterNTabs);
      processed.push(singleTabData);
    } else {
      processed.push(singleTabData);
    }
  }
  processed.push(Data.length / rowAfterNTabs);
  setProcessedData(processed);
}

export default function MegaTabbedMenu({ Data, ...Props }: Props) {
  const breakpoints = useBreakpoints(10);
  const [rowAfterNTabs, setRowAfterNTabs] = useState<number>(6);
  const [processedData, setProcessedData] =
    useState<ProcessedMegaTabbedMenuData>(Data);

  useEffect(() => {
    if (!Props.xl) {
      if (Props.lg) Props.xl = Props.lg;
      else if (Props.md) Props.xl = Props.md;
      else Props.xl = Props.sm;
    } else if (!Props.lg) {
      if (Props.md) Props.lg = Props.md;
      else Props.lg = Props.sm;
    } else if (!Props.md) Props.md = Props.sm;

    if (breakpoints.xl) setRowAfterNTabs(Props.xl);
    else if (breakpoints.lg) setRowAfterNTabs(Props.lg);
    else if (breakpoints.md) setRowAfterNTabs(Props.md);
    else setRowAfterNTabs(Props.sm);
  }, [Props.lg, Props.md, Props.sm, Props.xl, breakpoints]);

  useEffect(() => {
    console.log(rowAfterNTabs);
    processData(Data, rowAfterNTabs, setProcessedData);
  }, [rowAfterNTabs]);

  return (
    <Grid fullWidth>
      <Column className="mega-tabbed-menu" lg={16} md={8} sm={4}>
        {processedData?.length &&
          processedData.map((singleProcessedData, i) => {
            if (typeof singleProcessedData == 'number') {
              return <TabContent ID={singleProcessedData} key={i} />;
            } else {
              return <TabButtun Data={singleProcessedData} key={i} />;
            }
          })}
      </Column>
    </Grid>
  );
}

// //////////////////////////////////////////////////////////////////////////////// //

type TabButtunProps = {
  Data: TabData;
};

function TabButtun({ Data }: TabButtunProps) {
  return (
    <div className="tab-button">
      {Data.Icon}
      {Data.Title}
      {Data.Desc}
    </div>
  );
}

// //////////////////////////////////////////////////////////////////////////////// //

type TabContentProps = {
  ID: number;
};
function TabContent({ ID }: TabContentProps) {
  return <div className="tab-content">s</div>;
}
