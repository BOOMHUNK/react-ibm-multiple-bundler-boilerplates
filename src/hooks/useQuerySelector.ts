import { useEffect, useState } from 'react';

function useQuerySelector<T extends HTMLElement>(
  ref: React.RefObject<T>,
  selector: string
): T | null {
  const [element, setElement] = useState<T | null>(null);

  useEffect(() => {
    if (ref.current) {
      const el = ref.current.querySelector(selector);
      setElement(el as T);
    }
  }, [ref.current, selector]);

  return element;
}
