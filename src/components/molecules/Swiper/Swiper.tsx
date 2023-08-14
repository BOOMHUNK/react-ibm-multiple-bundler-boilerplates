import { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Column, Grid, Heading, Stack, } from '@carbon/react';
import { ChevronLeft, ChevronRight } from '@carbon/react/icons';

import './_swiper.scss';
import useBreakpoints from '../../../hooks/useBreakpoints';
import { breakpointsToColumns } from '../../../utils/BreakpointMaxColumnsCalculator';
import { Section } from '@carbon/react';
import useElementResizeObserver from '../../../hooks/useElementResizeObserver';

type TileData = {
  colSpans: {
    sm: number,
    md?: number,
    lg?: number,
    xl?: number,
  }
  element: JSX.Element
}

type ProcessedTileData = {
  colSpans: number,
  element: JSX.Element
}

type TileContainerGridData = ProcessedTileData[];

interface Props {
  tiles: TileData[];
}

export default function Swiper({
  tiles
}: Props): ReactElement {
  const breakpoint = useBreakpoints(50);
  const [currentSlideNum, setCurrentSlideNum] = useState<number>(0);
  const [totalSlidesCount, setTotalSlidesCount] = useState<number>(0);
  const swiperContainerRef = useRef<HTMLDivElement | null>(null);
  const { width: containerWidth } = useElementResizeObserver(swiperContainerRef.current, 50);
  const swiperRef = useRef<HTMLDivElement | null>(null);
  const { height: swiperHeight } = useElementResizeObserver(swiperContainerRef.current, 50);


  const preprocessedTiles = useMemo(() => {
    return tiles.map(tile => {
      if (!tile.colSpans.md)
        tile.colSpans.md = tile.colSpans.sm;
      if (!tile.colSpans.lg)
        tile.colSpans.lg = tile.colSpans.md;
      if (!tile.colSpans.xl)
        tile.colSpans.xl = tile.colSpans.lg;
      return tile;
    });
  }, [tiles])


  const processedTiles = useMemo(() => {
    return preprocessedTiles.map(tile => {
      const pt: ProcessedTileData = {
        colSpans: tile.colSpans.sm,
        element: tile.element
      }
      if (breakpoint.md)
        pt.colSpans = tile.colSpans.md!;
      else if (breakpoint.lg)
        pt.colSpans = tile.colSpans.lg!;
      else if (breakpoint.xl)
        pt.colSpans = tile.colSpans.xl!;

      return pt;
    });
  }, [preprocessedTiles, breakpoint])


  const gridData = useMemo(() => {
    let colsCount = 0;
    const ptiles = processedTiles;
    ptiles.forEach(tile => {
      colsCount += tile.colSpans;
    });
    const gridsCount = Math.ceil(colsCount / breakpointsToColumns(breakpoint));
    if (totalSlidesCount != gridsCount) {
      setTotalSlidesCount(gridsCount);
      setCurrentSlideNum(0);
    }

    // console.log("g count: ", gridsCount);


    const grids = [];
    let lastAddedTile = -1;
    for (let i = 0; i < gridsCount; i++) {
      const gridData: TileContainerGridData = [];
      let currentSpanNumber = 0;
      for (let j = lastAddedTile + 1; j < ptiles.length; j++) {
        const tile = ptiles[j];
        // console.log("tile: ", tile);

        currentSpanNumber += tile.colSpans;
        if (breakpointsToColumns(breakpoint) >= currentSpanNumber) {
          gridData.push(tile);
          lastAddedTile = j;
        }
      }
      grids.push(gridData);
    }
    // console.log("data: ", grids);
    return grids
  }, [processedTiles, breakpoint.sm, breakpoint.md, breakpoint.lg, breakpoint.xl]);


  const [grids, setGrids] = useState<TileContainerGridData[]>([]);

  useEffect(() => {
    // console.log(preprocessedTiles());
    setGrids(gridData);

  }, [breakpoint.sm, breakpoint.md, breakpoint.lg, breakpoint.xl,])


  function handlePrevSlideBtn() {
    // console.log("clicked prev");
    setCurrentSlideNum(p => p > 0 ? p - 1 : 0);
  }
  function handleNextSlideBtn() {
    // console.log("clicked next");
    setCurrentSlideNum(p => p < totalSlidesCount - 1 ? p + 1 : p);
  }

  return (
    <Stack className="swiper-parent-container">
      <br />
      <Heading> Swiper Component</Heading>
      <br />
      <div className='swiper-container' ref={swiperContainerRef}>
        <div className='swiper' style={{ right: `${containerWidth * (currentSlideNum - 0)}px` }} ref={swiperRef}>
          {
            grids.map((grid, i) => <Grid key={i} fullWidth className='swiper-grid'>
              {/* grid number   {i} */}
              {grid.map((tile, j) => <Column key={j} sm={tile.colSpans} md={tile.colSpans} lg={tile.colSpans} xlg={tile.colSpans} className='swiper-grid-col'>
                {tile.element}
              </Column>)}
            </Grid>)
          }
        </div>
      </div>
      <br />
      <Section className='swiper-buttons-container'
        style={{ top: `${swiperHeight}px` }}
      >

        <ChevronLeft className={`${currentSlideNum != 0 ? "chevron-icon" : "chevron-icon-disabled"}`} onClick={handlePrevSlideBtn} />

        <ChevronRight className={`${currentSlideNum != totalSlidesCount - 1 ? "chevron-icon" : "chevron-icon-disabled"}`} onClick={handleNextSlideBtn} />

      </Section>
    </Stack >
  );
}
