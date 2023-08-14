import { useState, useEffect } from 'react';
import useDebouncedCallback from './useDebounce';

export type BreakPointsType = {
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
};

const BREAKPOINTS = {
  sm: 672,
  md: 1056,
  lg: 1312,
};

function useBreakpoints(debounceDelay = 0): BreakPointsType {
  const [isSM, setIsSM] = useState(false);
  const [isMD, setIsMD] = useState(false);
  const [isLG, setIsLG] = useState(false);
  const [isXL, setIsXL] = useState(false);

  const handleResize = useDebouncedCallback(() => {
    const mqlSM = window.matchMedia(`(max-width: ${BREAKPOINTS.sm}px)`);
    const mqlMD = window.matchMedia(
      `(min-width: ${BREAKPOINTS.sm}px) and (max-width: ${BREAKPOINTS.md}px)`
    );
    const mqlLG = window.matchMedia(
      `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg}px)`
    );
    const mqlXL = window.matchMedia(`(min-width: ${BREAKPOINTS.lg}px)`);

    isXL !== mqlXL.matches && setIsXL(mqlXL.matches);
    isLG !== mqlLG.matches && setIsLG(mqlLG.matches);
    isMD !== mqlMD.matches && setIsMD(mqlMD.matches);
    isSM !== mqlSM.matches && setIsSM(mqlSM.matches);
  }, debounceDelay);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [handleResize]);

  return { sm: isSM, md: isMD, lg: isLG, xl: isXL };
}

export default useBreakpoints;
