'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import createId from '../createId';

type Image = {
  thumbs: string,
  larger: string;
};

interface LightboxProps {
  // isOpen: boolean;
  images: Image[];
}
/* is open will be local */
/* we'll need to know the array of images and to keep track of current images */

export default function Lightbox() {

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const mountNode = useRef<HTMLDivElement | null>();
  const isOpen = false;
  useEffect(() => {
    if (isOpen) {
      createDiv();
    } else {
      removeDiv();
    }
  }, [isOpen]);

  useEffect(() => {
    // Listener for the end of the transition
    const handleTransitionEnd = () => {
      if (!isOpen) {
        mountNode.current?.remove();
        setIsMounted(false);
      }
    };
    mountNode.current?.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      mountNode.current?.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [isOpen]);

  /**
   * Function to create div
   */
  function createDiv() {
    // Create the div and append it to the body
    const div = document.createElement('div');
    div.id = 'lightbox-portal';
    div.className = 'lightbox-enter'; // Initial class for animation
    document.body.appendChild(div);
    mountNode.current = div;
    setIsMounted(true);
  }

  /**
 * Function to remove div
  */
  function removeDiv() {
    if (mountNode.current) {
      // Start the fade-out animation
      mountNode.current.className = 'lightbox-exit';
    }
  }

  // Render the portal content only if mounted
  return (
    <>
      {isMounted && mountNode.current ? createPortal(
        <div>content here</div>,
        mountNode.current
      ) : null}
    </>);
}