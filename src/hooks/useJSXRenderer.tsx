import { useRef, useEffect, useCallback } from 'react';
import { Root, createRoot } from 'react-dom/client';

export default function useJSXRenderer<T extends HTMLElement>(
  element: T | null
): [inject: (jsx: React.ReactNode) => void, removeRoot: () => void] {
  const rootRef = useRef<Root | null>();
  const containerId = 'dom-dummy-element';

  useEffect(() => {
    if (element && !rootRef.current) {
      rootRef.current = createRoot(element);
    }
  }, [element]);

  const render = useCallback<(jsx: React.ReactNode) => void>(
    (jsx) => {
      renderFunc(jsx);
    },
    [rootRef]
  );

  function renderFunc(jsx: React.ReactNode) {
    if (rootRef.current) {
      rootRef.current.render(jsx);
    }
  }
  const emptyJSX: React.ReactNode = (
    <div id={containerId} style={{ display: 'none' }}></div>
  );
  function removeRoot() {
    // if (rootRef.current) {
    //   rootRef.current.unmount();
    //   rootRef.current = null;
    // }
    if (rootRef.current) {
      rootRef.current.render(emptyJSX);
    }
  }

  return [render, removeRoot];
}