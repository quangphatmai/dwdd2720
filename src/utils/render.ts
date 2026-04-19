export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function renderList<T>(
  container: HTMLElement,
  items: T[],
  renderItem: (item: T) => HTMLElement
): void {
  container.innerHTML = "";
  for (const item of items) {
    container.append(renderItem(item));
  }
}
