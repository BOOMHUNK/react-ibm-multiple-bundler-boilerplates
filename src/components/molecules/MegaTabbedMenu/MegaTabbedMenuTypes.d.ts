type TabData = {
  Icon: FC<any>;
  Title: string;
  Desc: string;
  ContentTitle: string;
  ContentSections: {
    SectionTitle: string;
    SectionPoints: string[];
  }[];
  id?: number;
  ButtonTitle?: string;
  ButtonAction?: React.MouseEventHandler<HTMLElement> | undefined;
  SecondButtonAction?: React.MouseEventHandler<HTMLElement> | undefined;
};
type SimpleTabButtonType = {
  IsButton: boolean;
  ButtonTitle: string;
  id?: number;
  ButtonAction?: (...args: any) => any;
};

type RawData = TabData | SimpleTabButtonType;
type MegaTabbedMenuDataType = RawData[];

type ProcessedTabData = TabData | SimpleTabButtonType | number;
type ProcessedMegaTabbedMenuData = ProcessedTabData[];
