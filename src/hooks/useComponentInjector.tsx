import { useRef, useEffect, useCallback, useState, createElement } from "react";
import { Root, createRoot } from "react-dom/client";

type RootElementOptions = {
  tag?: 'div' | 'span';
  style?: string;
  class?: string;
}

type ComponentInjectorOptions<T> = {
  component: React.FC<T>;
  props?: T;
  rootElementOptions?: RootElementOptions;
};

export default function useComponentInjector<T extends Record<string, any>>(
  element: HTMLElement | null, options: ComponentInjectorOptions<T>, isInitiallyRendered = true
): [render: () => void, remove: () => void, isRendered: boolean, setIsRendered: React.Dispatch<React.SetStateAction<boolean>>] {

  const containerRef = useRef<HTMLElement | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);
  const rootRef = useRef<Root | null>();
  const containerClass = "dom-dummy-element";

  const [isRendered, setIsRendered] = useState(isInitiallyRendered);

  useEffect(() => {
    const renderTimeout = setTimeout(() => {
      if (element && !rootRef.current) {
        containerRef.current = document.createElement(
          `${options.rootElementOptions?.tag ? options.rootElementOptions.tag : 'div'}`
        );

        containerRef.current.setAttribute('class', containerClass);
        options.rootElementOptions?.class &&
          containerRef.current.setAttribute('class', options.rootElementOptions.class);
        containerRef.current.setAttribute(
          'style',
          ` ${options.rootElementOptions?.style ? options.rootElementOptions.style + " " : "width: 100%; height: 100%; "}`
        );

        rootRef.current = createRoot(containerRef.current);

        if (isRendered) {
          rootRef.current.render(createElement(options.component, options.props));
          element.appendChild(containerRef.current);
        }
        elementRef.current = element;
      }
    });

    return () => {
      clearTimeout(renderTimeout);
    };
  }, [element, options, isRendered]);

  const render = useCallback(() => {
    setIsRendered(true);
  }, []);

  useEffect(() => {
    if (elementRef.current && containerRef.current && rootRef.current) {
      const existing = Array.from(elementRef.current.getElementsByClassName(containerClass));
      existing.forEach(element => {
        element.remove();
      });

      if (isRendered) {
        rootRef.current.render(createElement(options.component, options.props));
        elementRef.current.appendChild(containerRef.current);
      }
    }
  }, [element, options, isRendered]);

  function remove() {
    if (elementRef.current) {
      const existing = Array.from(elementRef.current.getElementsByClassName(containerClass));
      existing.forEach(element => {
        element.remove();
      });
    }

    const root = rootRef.current;
    rootRef.current = null;
    setTimeout(() => {
      if (root) {
        root.unmount();
      }
    });
    setIsRendered(false);
  }

  return [render, remove, isRendered, setIsRendered];
}




/* usage example:

import { useRef, useState } from "react";
import useComponentInjector from "./hooks/useComponentInjector";
import useQuerySelector from "./hooks/useQuerySelector";

function MyComponent(props: { message: string }) {
  return <div>{props.message}</div>;
}

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string>("Hello, World!");
  const thaDiv = useQuerySelector(containerRef, "#thaContainer");

  const [render, remove, isComponentRendered, setIsComponentRendered] = useComponentInjector(
    document.getElementById("thaContainer"),
    {
      component: MyComponent,
      props: { message: text },
    },
    false
  );

  const handleRenderClick = () => {
    setIsComponentRendered(true);
  };

  const handleRemoveClick = () => {
    setIsComponentRendered(false);
  };

  return (
    <div ref={containerRef}>
      <div id="thaContainer" />
      <button onClick={handleRenderClick}>Render Component</button>
      <button onClick={handleRemoveClick}>Remove Component</button>
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
}

export default App; 
*/