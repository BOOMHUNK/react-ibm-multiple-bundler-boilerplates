import { useRef, useEffect, useCallback, useId } from 'react';
import { Root, createRoot } from 'react-dom/client';

export default function useJSXRenderer<T extends HTMLElement>(
  element: T | null
): [inject: (jsx: React.ReactNode) => void, removeRoot: () => void] {
  const rootRef = useRef<Root | null>();
  const containerId = 'dom-root-element';

  useEffect(() => {
    if (element && !rootRef.current) {
      let container = element.querySelector(`#${containerId}`);
      if (!container) {
        container = document.createElement('div');

        container.setAttribute(
          'style',
          'width: 100%; height: 100%;position: absolute; top: 0; left:0; right:0;'
        );
        container.setAttribute('id', containerId);
        element.appendChild(container);
      }
      rootRef.current = createRoot(container);
    }
    return () => {
      if (rootRef.current) {
        rootRef.current.unmount();
        rootRef.current = null;
      }
    };
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
  const emptyJSX: React.ReactNode = <></>;
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
