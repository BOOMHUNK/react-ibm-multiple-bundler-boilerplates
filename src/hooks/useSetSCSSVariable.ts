import { useEffect } from 'react';

export default function useSetSCSSVariable(
  element: HTMLElement | undefined | null,
  variable: string,
  value: string
) {
  useEffect(() => {
    element && element.style.setProperty(`--${variable}`, value);
  }, [variable, value, element]);
  return;
}
