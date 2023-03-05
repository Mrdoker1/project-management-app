const getHtmlElement = (
  node: EventTarget | Node | null,
  errorMessage = `${node} is not instanceof HTMLElement`
) => {
  if (node instanceof HTMLElement) {
    return node;
  }

  throw new Error(errorMessage);
};

export { getHtmlElement };
