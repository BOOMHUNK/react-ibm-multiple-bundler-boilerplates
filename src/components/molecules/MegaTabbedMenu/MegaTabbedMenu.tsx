import { Children, FC, useEffect, useRef, useState } from 'react';
import './_megaTabbedMenu.scss';
import { Button, Column, Grid, Row } from '@carbon/react';
import { ChevronDown, ArrowRight } from '@carbon/react/icons';
import useBreakpoints from '../../../hooks/useBreakpoints';
import useElementResizeObserver from '../../../hooks/useElementResizeObserver';

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
  ButtonAction?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

type MegaTabbedMenuData = TabData[];
type ProcessedTabData = TabData | number;
type ProcessedMegaTabbedMenuData = ProcessedTabData[];

type Props = {
  Data: MegaTabbedMenuData;

  sm: number;
  md?: number;
  lg?: number;
  xl?: number;
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
    const singleTabData = { ...Data[i] };
    singleTabData.id = i;
    // console.log('singleTabData id: ', singleTabData.id);

    if (i != 0 && i % rowAfterNTabs == 0) {
      processed.push(i / rowAfterNTabs);
      processed.push(singleTabData);
    } else {
      processed.push(singleTabData);
    }
  }
  processed.push(Math.ceil(Data.length / rowAfterNTabs));
  setProcessedData(processed);
}

export default function MegaTabbedMenu({ Data, ...Props }: Props) {
  const breakpoints = useBreakpoints(10);
  const [rowCapacity, setRowCapacity] = useState<number>(6);
  const [processedData, setProcessedData] =
    useState<ProcessedMegaTabbedMenuData>(Data);
  const [activeTab, setActiveTab] = useState<TabData | null>(null);

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
    // console.log(rowAfterNTabs);
    processData(Data, rowCapacity, setProcessedData);
  }, [rowCapacity]);

  useEffect(() => {
    console.log(activeTab?.id);
  }, [activeTab]);

  return (
    <Grid fullWidth>
      <Column className="mega-tabbed-menu" lg={16} md={8} sm={4}>
        {processedData?.length &&
          processedData.map((singleProcessedData, i) => {
            if (typeof singleProcessedData == 'number') {
              // console.log('rowOrder: ', singleProcessedData);
              return (
                <TabContent
                  IsActive={
                    activeTab?.id || activeTab?.id == 0
                      ? singleProcessedData ==
                        Math.floor(activeTab.id / rowCapacity) + 1
                      : false
                  }
                  ActiveData={activeTab as TabData}
                  order={singleProcessedData}
                  key={i}
                />
              );
            } else {
              const makeBorderClasses = (): string => {
                const s = new Set<string>();
                if (singleProcessedData?.id || singleProcessedData?.id == 0) {
                  if (singleProcessedData.id == 0) {
                    s.add('top-border');
                    s.add('left-border');
                    s.add('bottom-border');
                    s.add('right-border');
                  } else if (singleProcessedData.id == Data.length - 1) {
                    s.add('bottom-border');
                    s.add('right-border');
                    if (
                      singleProcessedData.id < rowCapacity ||
                      ((activeTab?.id || activeTab?.id == 0) &&
                        Math.floor(activeTab.id / rowCapacity) + 1 ==
                          Math.floor(singleProcessedData.id / rowCapacity))
                    )
                      s.add('top-border');
                  } else {
                    s.add('right-border');
                    s.add('bottom-border');
                    if (
                      singleProcessedData.id < rowCapacity ||
                      ((activeTab?.id || activeTab?.id == 0) &&
                        Math.floor(activeTab.id / rowCapacity) + 1 ==
                          Math.floor(singleProcessedData.id / rowCapacity))
                    )
                      s.add('top-border');
                    if (
                      singleProcessedData.id % rowCapacity == 0 ||
                      activeTab?.id == singleProcessedData.id - 1
                    )
                      s.add('left-border');
                  }
                }
                return [...s].join(' ');
              };

              return (
                <TabButtun
                  BordersClasses={makeBorderClasses()}
                  Data={singleProcessedData}
                  TotalTabsCount={rowCapacity}
                  IsActive={activeTab?.id == singleProcessedData.id}
                  OnClick={(isActive) =>
                    !isActive
                      ? setActiveTab(singleProcessedData)
                      : setActiveTab(null)
                  }
                  key={i}
                />
              );
            }
          })}
      </Column>
    </Grid>
  );
}

// //////////////////////////////////////////////////////////////////////////////// //

type TabButtunProps = {
  Data: TabData;
  IsActive: boolean;
  TotalTabsCount: number;
  OnClick: (isActive: boolean) => any;
  BordersClasses: string;
};

function TabButtun({
  Data,
  TotalTabsCount,
  IsActive,
  OnClick,
  BordersClasses,
}: TabButtunProps) {
  return (
    <div
      className={`tab-button ${
        IsActive && 'tab-button-active'
      } ${BordersClasses}
      )}`}
      style={{
        width: `${100.0 / TotalTabsCount}%`,
      }}
      onClick={() => OnClick(IsActive)}
    >
      <div className="title-container">
        <div className="title">
          <Data.Icon className="icon" />
          {Data.Title}
        </div>
        <div
          className={`expand-btn expand-btn-top  ${
            IsActive && 'expand-btn-active'
          }`}
        >
          <ChevronDown className={`chevron ${IsActive && 'chevron-active'}`} />
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
}

// //////////////////////////////////////////////////////////////////////////////// //

type TabContentProps = {
  ActiveData: TabData;
  IsActive?: boolean;
  order: number;
};
function TabContent({ order, IsActive, ActiveData }: TabContentProps) {
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
      className={`tab-content-parent ${
        IsActive && 'tab-content-parent-active'
      }`}
      style={{ width: '100%', height: contentHeight || 0 }}
    >
      <div className={`tab-content`} ref={contentRef}>
        {ActiveData && IsActive && (
          <div className="tab-content-container">
            <div className="tab-content-title">{ActiveData.ContentTitle}</div>
            <div className="tab-content-sections">
              {ActiveData.ContentSections?.length &&
                ActiveData.ContentSections.map((currentSection, i) => {
                  return (
                    <div className="tab-content-section" key={i}>
                      <span className="tab-content-section-title">
                        {currentSection.SectionTitle}
                      </span>
                      {currentSection.SectionPoints?.length && (
                        <ul className="tab-content-section-points">
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
              <div className="tab-content-button-container">
                <span className="tab-content-tryItNow">Try it now</span>
                <Button
                  size="md"
                  className="tab-content-button"
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
