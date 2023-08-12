import { Children, FC, useEffect, useRef, useState } from 'react';
import './_megaTileMenu.scss';
import { Button, Column, Grid, Row } from '@carbon/react';
import { ChevronDown, ArrowRight } from '@carbon/react/icons';
import useBreakpoints from '../../../hooks/useBreakpoints';
import useElementResizeObserver from '../../../hooks/useElementResizeObserver';

type Props = {
  Data: MegaTileMenuDataType;

  sm: number;
  md?: number;
  lg?: number;
  xl?: number;
};

function processData(
  Data: MegaTileMenuDataType,
  rowAfterNTiles: number,
  setProcessedData: React.Dispatch<
    React.SetStateAction<ProcessedMegaTileMenuData>
  >
) {
  const processed: ProcessedMegaTileMenuData = [];
  for (let i = 0; i < Data.length; i++) {
    const singleTileData: RawData = { ...Data[i] };
    singleTileData.id = i;
    // console.log('singleTileData id: ', singleTileData.id);

    if (i != 0 && i % rowAfterNTiles == 0) {
      processed.push(i / rowAfterNTiles);
      processed.push(singleTileData);
    } else {
      processed.push(singleTileData);
    }
  }
  // processed.push({ IsButton: true, ButtonTitle: "Watch pricing" });
  processed.push(Math.ceil(Data.length / rowAfterNTiles));

  setProcessedData(processed);
}

export default function MegaTileMenu({ Data, ...Props }: Props) {
  const breakpoints = useBreakpoints(10);
  const [rowCapacity, setRowCapacity] = useState<number>(6);
  const [processedData, setProcessedData] =
    useState<ProcessedMegaTileMenuData>(Data);
  const [activeTile, setActiveTile] = useState<TileData | null>(null);

  useEffect(() => {
    if (!Props.xl) {
      if (Props.lg) Props.xl = Props.lg;
      else if (Props.md) Props.xl = Props.md;
      else Props.xl = Props.sm;
    } else if (!Props.lg) {
      if (Props.md) Props.lg = Props.md;
      else Props.lg = Props.sm;
    } else if (!Props.md) Props.md = Props.sm;

    if (breakpoints.xl && Props.xl) setRowCapacity(Props.xl);
    else if (breakpoints.lg && Props.lg) setRowCapacity(Props.lg);
    else if (breakpoints.md && Props.md) setRowCapacity(Props.md);
    else setRowCapacity(Props.sm);
  }, [Props.lg, Props.md, Props.sm, Props.xl, breakpoints]);

  useEffect(() => {
    // console.log(rowAfterNTiles);
    processData(Data, rowCapacity, setProcessedData);
  }, [rowCapacity]);

  useEffect(() => {
    // console.log(activeTile?.id);
  }, [activeTile]);

  return (
    <Grid fullWidth>
      <Column className="mega-tile-menu" lg={16} md={8} sm={4}>
        {processedData?.length &&
          processedData.map((singleProcessedData, i) => {
            if (typeof singleProcessedData == 'number') {
              // console.log('rowOrder: ', singleProcessedData);
              return (
                <TileContent
                  IsActive={
                    activeTile?.id || activeTile?.id == 0
                      ? singleProcessedData ==
                        Math.floor(activeTile.id / rowCapacity) + 1
                      : false
                  }
                  ActiveData={activeTile as TileData}
                  order={singleProcessedData}
                  key={i}
                />
              );
            } else {
              const simpleButtonData =
                singleProcessedData as SimpleTileButtonType;
              if (simpleButtonData.IsButton) {
                return (
                  <TileButtun
                    ButtonTitle={simpleButtonData.ButtonTitle}
                    TotalTilesCount={rowCapacity}
                    OnClick={(e) => {
                      simpleButtonData.ButtonAction &&
                        simpleButtonData.ButtonAction(e);
                    }}
                    key={i}
                  />
                );
              } else {
                const tileData: TileData = singleProcessedData as TileData;
                const makeBorderClasses = (): string => {
                  const s = new Set<string>();
                  if (tileData?.id || tileData?.id == 0) {
                    if (tileData.id == 0) {
                      s.add('top-border');
                      s.add('left-border');
                      s.add('bottom-border');
                      s.add('right-border');
                    } else if (tileData.id == Data.length - 1) {
                      s.add('bottom-border');
                      s.add('right-border');
                      if (
                        tileData.id < rowCapacity ||
                        ((activeTile?.id || activeTile?.id == 0) &&
                          Math.floor(activeTile.id / rowCapacity) + 1 ==
                            Math.floor(tileData.id / rowCapacity))
                      )
                        s.add('top-border');
                    } else {
                      s.add('right-border');
                      s.add('bottom-border');
                      if (
                        tileData.id < rowCapacity ||
                        ((activeTile?.id || activeTile?.id == 0) &&
                          Math.floor(activeTile.id / rowCapacity) + 1 ==
                            Math.floor(tileData.id / rowCapacity))
                      )
                        s.add('top-border');
                      if (
                        tileData.id % rowCapacity == 0 ||
                        activeTile?.id == tileData.id - 1
                      )
                        s.add('left-border');
                    }
                  }
                  return [...s].join(' ');
                };
                return (
                  <TileButtun
                    BordersClasses={makeBorderClasses()}
                    Data={tileData}
                    TotalTilesCount={rowCapacity}
                    IsActive={activeTile?.id == tileData.id}
                    OnClick={(isActive) =>
                      !isActive ? setActiveTile(tileData) : setActiveTile(null)
                    }
                    key={i}
                  />
                );
              }
            }
          })}
      </Column>
    </Grid>
  );
}

// //////////////////////////////////////////////////////////////////////////////// //

type TileButtunProps = {
  Data?: TileData;
  ButtonTitle?: string;
  IsActive?: boolean;
  TotalTilesCount: number;
  OnClick: (...args: any) => any;
  BordersClasses?: string;
};

function TileButtun({
  Data,
  ButtonTitle,
 TotalTilesCount,
  IsActive,
  OnClick,
  BordersClasses,
}: TileButtunProps) {
  if (Data && IsActive != undefined) {
    // console.log("It's a Tile button.");
    return (
      <div
        className={`tile-button ${
          IsActive && 'tile-button-active'
        } ${BordersClasses}
      )}`}
        style={{
          width: `${100.0 / TotalTilesCount}%`,
        }}
        onClick={() => OnClick(IsActive)}
      >
        <div className="title-container">
          <div className="title">
            {Data.Icon && <Data.Icon className="icon" />}
            {Data.Title}
          </div>
          <div
            className={`expand-btn expand-btn-top  ${
              IsActive && 'expand-btn-active'
            }`}
          >
            <ChevronDown
              className={`chevron ${IsActive && 'chevron-active'}`}
            />
          </div>
        </div>
        <div className="desc">{Data.Desc}</div>
        <div
          className={`expand-btn expand-btn-bottom ${
            IsActive && 'expand-btn-active'
          }`}
        >
          <span>Open</span>
          <ChevronDown className={`chevron ${IsActive && 'chevron-active'}`} />
        </div>
      </div>
    );
  } else if (ButtonTitle) {
    // console.log("It's a simple button.");
    return (
      <div
        className={`simple-button`}
        style={{
          width: `${100 / TotalTilesCount}%`,
        }}
        onClick={() => OnClick()}
      >
        <div className={`button-title`}>
          <span>{ButtonTitle}</span>
          <ArrowRight className={`arrow`} />
        </div>
      </div>
    );
  }
}

// //////////////////////////////////////////////////////////////////////////////// //

type TileContentProps = {
  ActiveData: TileData;
  IsActive?: boolean;
  order: number;
};
function TileContent({ order, IsActive, ActiveData }: TileContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<string | null>(null);
  const { height } = useElementResizeObserver(contentRef.current, 100);

  useEffect(() => {
    if (IsActive && contentRef.current) {
      setContentHeight(`${Math.max(contentRef.current.scrollHeight, 128)}px`);
    } else {
      setContentHeight(null);
    }
  }, [IsActive, height]);

  return (
    <div
      className={`tile-content-parent ${
        IsActive && 'tile-content-parent-active'
      }`}
      style={{ width: '100%', height: contentHeight || 0 }}
    >
      <div className={`tile-content`} ref={contentRef}>
        {ActiveData && IsActive && (
          <div className="tile-content-container">
            <div className="tile-content-title">{ActiveData.ContentTitle}</div>
            <div className="tile-content-sections">
              {ActiveData.ContentSections?.length &&
                ActiveData.ContentSections.map((currentSection, i) => {
                  return (
                    <div className="tile-content-section" key={i}>
                      <span className="tile-content-section-title">
                        {currentSection.SectionTitle}
                      </span>
                      {currentSection.SectionPoints?.length && (
                        <ul className="tile-content-section-points">
                          {currentSection.SectionPoints.map(
                            (sectionPoint, i) => (
                              <li key={i}>{sectionPoint}</li>
                            )
                          )}
                        </ul>
                      )}
                    </div>
                  );
                })}
            </div>
            {ActiveData.ButtonTitle && (
              <div className="tile-content-button-container">
                <span
                  onClick={(e) => {
                    ActiveData.SecondButtonAction &&
                      ActiveData.SecondButtonAction(e);
                  }}
                  className="tile-content-tryItNow"
                >
                  Try it now
                </span>
                <Button
                  size="md"
                  className="tile-content-button"
                  renderIcon={ArrowRight}
                  onClick={(e) =>
                    ActiveData.ButtonAction && ActiveData.ButtonAction(e)
                  }
                >
                  {ActiveData.ButtonTitle}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
