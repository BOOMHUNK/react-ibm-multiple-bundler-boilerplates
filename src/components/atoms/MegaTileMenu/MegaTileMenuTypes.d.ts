type TileData = {
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
type SimpleTileButtonType = {
  IsButton: boolean;
  ButtonTitle: string;
  id?: number;
  ButtonAction?: (...args: any) => any;
};

type RawData = TileData | SimpleTileButtonType;
type MegaTileMenuDataType = RawData[];

type ProcessedTileData = TileData | SimpleTileButtonType | number;
type ProcessedMegaTileMenuData = ProcessedTileData[];
