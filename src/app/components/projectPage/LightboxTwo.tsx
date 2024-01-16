'use client';
import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from 'react-dom';
import createId from "../createId";
import ExportedImage from "next-image-export-optimizer";

type ImageRatio = {
  paddingBottom: string,
  width: string;
};

export type GalleryImage = {
  smallUrl: string,
  largeUrl: string,
  alt: string,
  blurData?: string,
  /** height to width ratio in percent */
  ratio?: ImageRatio,
  description?: string,
};

interface LightboxProps {
  baseCssClass?: string;
  imageArray: GalleryImage[];
}

export default function LightboxTwo({ imageArray, baseCssClass }: LightboxProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currIndex, setCurrIndex] = useState<number>(0);
  const mountNode = useRef<HTMLDivElement | null>(null);
  const [xOffsets, setXOffsets] = useState<number[]>([]);
  const galleryRef = useRef<HTMLUListElement>(null);
  const firstRun = useRef<boolean>(true);
  // calledFromButton tracks times we change state via scroll - so we can prevent rerenders
  const calledFromButton = useRef<boolean>(false);
  const id = createId();

  const createDiv = () => {
    const newDiv = document.createElement('div');
    const appRoot = document.querySelector('.app_wrap');
    newDiv.id = 'lightbox-portal';
    newDiv.className = 'lightbox-enter';
    document.body.insertBefore(newDiv, appRoot);
    mountNode.current = newDiv;
    setIsMounted(true);
  };

  const handleOpen = (index: number) => {
    setCurrIndex(index);
    setIsOpen(true);
  };

  // * Handle Button Presses * //
  const handleButtonPress = useCallback((e: KeyboardEvent) => {
    const keyPressed = e.key;
    if (keyPressed === 'Escape') {
      setIsOpen(false);
    }
    if (keyPressed === 'ArrowLeft') {
      if (currIndex > 0) {
        setCurrIndex((i) => i - 1);
        calledFromButton.current = true;
      }
    }
    if (keyPressed === 'ArrowRight') {
      if (currIndex < imageArray.length - 1) {
        setCurrIndex((i) => i + 1);
        calledFromButton.current = true;
      }
    }
  }, [currIndex, imageArray.length]);

  useEffect(() => {
    document.addEventListener('keydown', handleButtonPress);
    return () => {
      document.removeEventListener('keydown', handleButtonPress);
    };
  }, [handleButtonPress]);

  // * Portal Actions: Creation Call & Cleanup * //
  useEffect(() => {
    if (isOpen) {
      createDiv();
    } else if (mountNode.current) {
      const handleAnimationEnd = () => {
        mountNode.current?.remove();
        mountNode.current = null;
        setIsMounted(false);
      };

      // Add the animation end event listener
      mountNode.current.addEventListener('animationend', handleAnimationEnd, { once: true });

      // Start the exit animation
      mountNode.current.className = 'lightbox-exit';

      // Cleanup function
      return () => {
        if (mountNode.current) {
          mountNode.current.removeEventListener('animationend', handleAnimationEnd);
          mountNode.current.remove();
          mountNode.current = null;
        }
      };
    }
  }, [isOpen]);

  // * Scroll Logic - Listening / Changing * //
  const handleScrollWatch = useCallback(() => {
    console.log(xOffsets);
    if (calledFromButton.current === false && galleryRef.current) {
      const currScroll = galleryRef.current.scrollLeft;
      const newIndex = xOffsets.indexOf(currScroll!);
      console.log(newIndex, xOffsets);
      setCurrIndex(newIndex);
    };
  }, [xOffsets]);


  useEffect(() => {
    if (isMounted) {
      const localGalleryRef = galleryRef.current;

      if (localGalleryRef) {
        localGalleryRef.addEventListener('scrollend', handleScrollWatch);
        const liArray = Array.from(localGalleryRef.querySelectorAll('li'));
        xOffsets.length === 0 ? setXOffsets(liArray.map((li) => li.offsetLeft)) : null;
      }
      return () => {
        localGalleryRef?.removeEventListener('scrollend', handleScrollWatch);
      };
    }
  }, [isMounted, handleScrollWatch, xOffsets]);

  useEffect(() => {
    if (xOffsets.length) {
      galleryRef.current?.scrollTo({
        left: xOffsets[currIndex],
        behavior: firstRun.current ? 'instant' : 'smooth'
      });
      firstRun.current = false;
      calledFromButton.current = false;
    }
  }, [currIndex, xOffsets]);

  // inter-lightbox navigation 
  const handleClose = () => {
    setXOffsets([]);
    setIsOpen(false);
  };

  const handleLeftNav = () => {

    if (currIndex > 0) {
      console.log('LEFT');
      setCurrIndex((i: number) => i - 1);
    }
  };

  const handleRightNav = () => {
    if (currIndex < imageArray.length - 1) {
      setCurrIndex((i: number) => i + 1);
    }
  };

  return (
    <>
      {isMounted && mountNode.current ? createPortal(
        <>
          <div className="lightbox-strip">
            <nav className='lightbox-strip-nav'>
              <button
                onClick={handleClose}
                className={`lightbox-strip-nav-btn lightbox-strip-nav-close${imageArray.length === 1 ? ' --single' : ''}`}>X</button>
              <div className='lightbox-strip-nav_arrows'>
                <button
                  onClick={handleLeftNav}
                  className={`lightbox-strip-nav-btn lightbox-strip-nav_arrows-btn${currIndex === 0 ? '--hide' : '--show'}`}>{'<'}</button>
                <button
                  onClick={handleRightNav}
                  className={`lightbox-strip-nav-btn lightbox-strip-nav_arrows-btn${currIndex === imageArray.length - 1 ? '--hide' : '--show'}`}>{'>'}</button>
              </div>
            </nav >
            <ul ref={galleryRef} className='lightbox-strip-ul'>
              {imageArray.map(({ alt, largeUrl, ratio, description }, index) => (
                <li key={`${index}-${alt}`} className='lightbox-strip-li'>
                  <div className='lightbox-strip-li-inner' style={{ paddingBottom: ratio?.paddingBottom, width: ratio?.width }}>
                    <ExportedImage
                      src={largeUrl}
                      alt={alt}
                      fill
                      style={{ objectFit: 'scale-down' }}
                    />
                  </div>
                  {description && <p>{description}</p>}
                </li>
              ))}
            </ul>
          </div>
        </>, mountNode.current
      ) : null}
      <div className={`${baseCssClass ? baseCssClass + ' ' : ''}lightbox-wrap`}>
        <ul className='lightbox-ul'>
          {imageArray.map(({ smallUrl, alt }, index) => (
            <li key={`${id}-${index}`}
              onClick={handleOpen.bind(null, index)}
              role='button'
            >
              <ExportedImage
                src={smallUrl}
                alt={alt}
                fill
                style={{ objectFit: "contain" }}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}