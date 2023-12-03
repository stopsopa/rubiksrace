import debounce from "./debounce.js";

export default function resizeEvent(element, event) {
  const internalEvent = debounce(() => {
    window.requestAnimationFrame(() => event());
    window.requestAnimationFrame(() => event());
  }, 5);

  window.addEventListener("resize", internalEvent);
  document.addEventListener("scroll", internalEvent);

  const observer = new ResizeObserver(internalEvent);
  observer.observe(element);

  internalEvent();

  return {
    internalEvent,
    unmountEvent: () => {
      window.removeEventListener("resize", internalEvent);
      document.removeEventListener("scroll", internalEvent);
      observer.disconnect();
    },
  };
}
