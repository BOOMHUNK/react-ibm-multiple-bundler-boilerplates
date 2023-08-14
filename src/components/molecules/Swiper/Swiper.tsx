import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { Column, Grid, Heading, Stack, } from '@carbon/react';

import './_swiper.scss';
import useBreakpoints from '../../../hooks/useBreakpoints';
import { breakpointsToColumns } from '../../../utils/BreakpointMaxColumnsCalculator';
import { Section } from '@carbon/react';

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



  const preprocessedTiles = useCallback(() => {
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


  const processedTiles = useCallback(() => {
    return preprocessedTiles().map(tile => {
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


  const gridData = useCallback(() => {
    let colsCount = 0;
    const ptiles = processedTiles();
    ptiles.forEach(tile => {
      colsCount += tile.colSpans;
    });
    const gridsCount = Math.ceil(colsCount / breakpointsToColumns(breakpoint));
    console.log("g count: ", gridsCount);


    const grids = [];
    let lastAddedTile = -1;
    for (let i = 0; i < gridsCount; i++) {
      const gridData: TileContainerGridData = [];
      let currentSpanNumber = 0;
      for (let j = lastAddedTile + 1; j < ptiles.length; j++) {
        const tile = ptiles[j];
        console.log("tile: ", tile);

        currentSpanNumber += tile.colSpans;
        if (breakpointsToColumns(breakpoint) >= currentSpanNumber) {
          gridData.push(tile);
          lastAddedTile = j;
        }
      }
      grids.push(gridData);
    }
    console.log("data: ", grids);
    return grids
  }, [processedTiles, breakpoint]);


  const [grids, setGrids] = useState<TileContainerGridData[]>([]);

  useEffect(() => {
    // console.log(preprocessedTiles());
    setGrids(gridData());

  }, [breakpoint.sm, breakpoint.md, breakpoint.lg, breakpoint.xl,])







  return (
    <Stack className="swiper-container">
      <br />
      <Heading> Swiper Component</Heading>
      <br />
      <Section className='swiper'>
        {
          grids.map((grid, i) => <Grid key={i} fullWidth className='swiper-grid'>
            {/* grid number   {i} */}
            {grid.map((tile, j) => <Column key={j} sm={tile.colSpans} className='swiper-grid-col'>
              {tile.element}
            </Column>)}
          </Grid>)
        }
      </Section>
    </Stack >
  );
}
