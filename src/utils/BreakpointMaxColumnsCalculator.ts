import { BreakPointsType } from "../hooks/useBreakpoints";

export function breakpointsToColumns(breakpoints: BreakPointsType) {
  if (breakpoints.sm) return 4;
  if (breakpoints.md) return 8;
  return 16;
}
