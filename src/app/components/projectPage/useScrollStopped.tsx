import { useEffect, useState, useCallback } from 'react';

// Type for the function that returns the element
type ElementGetter = () => HTMLElement | null;

/**
 * This is essentially a method to detect when we've stopped scrolling by doing a debounce.
 * @param getElement A ref tied to a function. A pure ref won't trigger the call from the 
 * dependency array. We then set that locally via state.
 * @returns 
 */
const useScrollStopped = (getElement: ElementGetter): boolean => {
  const [scrollStopped, setScrollStopped] = useState<boolean>(false);
  const [element, setElement] = useState<HTMLElement | null>(null);

  const updateElement = useCallback(() => {
    setElement(getElement());
  }, [getElement]);

  useEffect(() => {
    updateElement();
  }, [updateElement]);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      setScrollStopped(false);
      if (timerId !== null) {
        clearTimeout(timerId);
      }
      // We can adjust this timeout
      timerId = setTimeout(() => setScrollStopped(true), 150);
    };

    if (element) {
      element.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
      if (timerId !== null) {
        clearTimeout(timerId);
      }
    };
  }, [element]);

  return scrollStopped;
};

export default useScrollStopped;