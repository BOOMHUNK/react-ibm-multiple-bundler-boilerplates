import { Children, useEffect, useState } from "react";
import "./_megaTabbedMenu.scss";
import { Column, Grid, Row } from "@carbon/react";
import useBreakpoints from "../../../hooks/useBreakpoints";
import { flushSync } from "react-dom";
// import { UserProfile } from "@carbon/react/icons";
type TabData = {
  Icon: JSX.Element;
  Title: string;
  Desc: string;
  ContentTitle: string;
};

type Props = {
  Data: TabData[];
};

export default function MegaTabbedMenu({ Data }: Props) {
  const breakpoints = useBreakpoints(0);
  const [rowAfterNTabs, setRowAfterNTabs] = useState<number>(6);

  useEffect(() => {
    setTimeout(() => {
      flushSync(() => {
        if (breakpoints.sm) setRowAfterNTabs(1);
        else if (breakpoints.md) setRowAfterNTabs(2);
        else setRowAfterNTabs(6);
      });
      console.log(rowAfterNTabs);
    }, 0);
  }, [breakpoints]);

  return (
    <Grid fullWidth>
      <Column className="mega-tabbed-menu" lg={16} md={8} sm={4}>
        <TabButtun>a</TabButtun>
        <TabButtun>a</TabButtun>
        <TabButtun>a</TabButtun>
        <TabButtun>a</TabButtun>
        <TabButtun>a</TabButtun>
        <TabButtun>a</TabButtun>
        <TabButtun>a</TabButtun>
        <TabButtun>a</TabButtun>
        <TabButtun>a</TabButtun>
        <TabButtun>a</TabButtun>
        <TabButtun>a</TabButtun>
        <TabButtun>a</TabButtun>
        <TabButtun>a</TabButtun>
      </Column>
    </Grid>
  );
}

type TabButtunProps = {
  Data: any;
  children?: React.ReactNode;
};
function TabButtun({ Data, children }: TabButtunProps) {
  return <div className="tab-button">{children}</div>;
}

type TabContentProps = {
  Data: any;
};
function TabContent({ Data }: TabContentProps) {
  return <div>TabContent</div>;
}
