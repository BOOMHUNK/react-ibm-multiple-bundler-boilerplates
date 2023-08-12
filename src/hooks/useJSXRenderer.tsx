import { useRef, useEffect, useCallback, useState } from "react";
import { Root, createRoot } from "react-dom/client";

type RootElementOptions = {
  tag?: 'div' | 'span';
  style?: string;
  class?: string;
}

export default function useJSXRenderer<T extends HTMLElement>(
  element: T | null, jsx: React.ReactNode, rootElementOptions?: RootElementOptions
): [render: () => void, remove: () => void] {

  const containerRef = useRef<HTMLElement | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);
  const rootRef = useRef<Root | null>();
  const containerClass = "dom-dummy-element";

  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {

    const renderTimeout = setTimeout(() => {

      if ((element && !rootRef.current)) {

        containerRef.current = document.createElement(`${rootElementOptions?.tag ? rootElementOptions.tag : 'div'}`);

        containerRef.current.setAttribute('class', containerClass);
        rootElementOptions?.class && containerRef.current.setAttribute('class', rootElementOptions.class);
        containerRef.current.setAttribute('style', ` ${rootElementOptions?.style ? rootElementOptions.style + " " : "width: 100%; height: 100%; "}`);
        // console.log("component mount");
        rootRef.current = createRoot(containerRef.current);

        if (isRendered) {
          rootRef.current.render(jsx);
          element.appendChild(containerRef.current);
        }
        elementRef.current = element;
      }
    });
    return () => {
      clearTimeout(renderTimeout);
      // const root = rootRef.current;
      // rootRef.current = null;
      // setTimeout(() => {
      //   if (root) root.unmount();
      //   // console.log("*removed");
      // }, 1000);
    };
  }, [element, rootElementOptions?.style, rootElementOptions?.class, rootElementOptions?.tag]);


  const render = useCallback<() => void>(
    () => {
      setIsRendered(true);
    },
    [jsx]
  );

  useEffect(() => {
    if (elementRef.current && containerRef.current && rootRef.current) {
      const exisiting = Array.from(elementRef.current?.getElementsByClassName(containerClass));
      // console.log("removing existing: ", exisiting);
      exisiting.forEach(element => {
        element.remove();
      });

      if (isRendered) {
        rootRef.current.render(jsx);
        elementRef.current.appendChild(containerRef.current);
      }
    }
  }, [element, jsx, isRendered]);

  function remove() {
    if (elementRef.current) {

      const exisiting = Array.from(elementRef.current?.getElementsByClassName(containerClass));
      // console.log("removing existing: ", exisiting);
      exisiting.forEach(element => {
        element.remove();
      });
    }
    // else console.log("no element given");



    const root = rootRef.current;
    rootRef.current = null;
    setTimeout(() => { if (root) root.unmount(); });
    setIsRendered(false);

  }

  return [render, remove];
}
