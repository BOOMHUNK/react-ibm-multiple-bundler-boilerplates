export function removeChild<T extends HTMLElement | null>(
  parentElement: T,
  querySelector: string
) {
  const parent = parentElement;
  if (parent) {
    const child = parent.querySelector(querySelector);
    if (child) {
      parent.removeChild(child);
    }
  }
}
