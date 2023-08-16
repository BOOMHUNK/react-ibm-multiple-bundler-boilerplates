import { useCallback, useState } from 'react';

interface DragPosition {
  x: number;
  y: number;
}

interface UseDragAndDropParams {
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
}

export default function useDragAndDrop({
  onDragStart,
  onDragEnd,
  onDragOver,
}: UseDragAndDropParams = {}) {
  const [dragActive, setDragActive] = useState(false);
  const [dragPosition, setPosition] = useState<DragPosition>({ x: 0, y: 0 });

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      setDragActive(true);
      document.body.style.userSelect = 'none';
      if (onDragStart) onDragStart(e);
    },
    [onDragStart]
  );

  const handleDragEnd = useCallback(
    (e: React.DragEvent) => {
      setDragActive(false);
      document.body.style.userSelect = 'text';
      if (onDragEnd) onDragEnd(e);
    },
    [onDragEnd]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });

      if (onDragOver) onDragOver(e);
    },
    [onDragOver]
  );

  return {
    dragActive,
    dragPosition,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  };
}

// usage:
// const {  dragActive, dragPosition, handleDragStart, handleDragOver} = useDragAndDrop({
//   onDragOver: () => {/* custom logic */}
// })

// return <div
//   onDragStart={handleDragStart}
//   onDragOver={handleDragOver}
// >
// </div>
