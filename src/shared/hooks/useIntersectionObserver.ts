import React from "react";

const defaultOptions = {
  root: document,
  rootMargin: "0px",
  threshold: 0.5,
};

export const useIntersectionObserver = (
  cb: IntersectionObserverCallback,
  options: IntersectionObserverInit = defaultOptions
) => {
  const [element, callbackRef] = React.useState<HTMLElement | null>(null);
  const observer = React.useMemo(() => {
    return new IntersectionObserver(cb, options);
  }, [cb, options]);

  React.useEffect(() => {
    if (!element) return;
    observer.observe(element);

    return () => {
      if (!element) return;
      observer.unobserve(element);
    };
  }, [element, observer]);

  return callbackRef;
};
