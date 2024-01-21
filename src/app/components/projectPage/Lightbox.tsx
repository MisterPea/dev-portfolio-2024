'use client';
import ExportedImage from "next-image-export-optimizer";
import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from 'react-dom';
import ResponsiveImage, { ImageSize } from "./ResponsiveImage";
import { SlClose, SlArrowLeft, SlArrowRight } from "react-icons/sl";
import useScrollStopped from "./useScrollStopped";

export type GalleryImage = {
  smallUrl: string,
  largeUrl: string,
  alt: string,
  blurData?: string,
  /** height to width ratio in percent */
  imageSize: ImageSize,
  description?: string,
};

interface LightboxProps {
  baseCssClass?: string;
  imageArray: GalleryImage[];
}

export default function Lightbox({ imageArray, baseCssClass }: LightboxProps) {
  const mountNode = useRef<HTMLDivElement>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const galleryRef = useRef<HTMLUListElement>(null);
  const [xOffsets, setXOffsets] = useState<number[]>([]);
  const [currIndex, setCurrIndex] = useState<number | undefined>(undefined);
  const firstRun = useRef<boolean>(true);
  const calledFromButton = useRef<boolean>(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getGalleryRef = useCallback(() => galleryRef.current, [isOpen]);
  const scrollStopped = useScrollStopped(getGalleryRef);
  const leftBtnRef = useRef<HTMLDivElement>(null);
  const rightBtnRef = useRef<HTMLDivElement>(null);

  const handleOpen = (index: number) => {
    setCurrIndex(index);
    setIsOpen(true);
    createDiv();
    // Add a history state to deal with navigation away while in lightbox
    window.history.pushState({ lightboxOpen: true }, '');
  };

  const createDiv = () => {
    const newDiv = document.createElement('div');
    const appRoot = document.querySelector('.app_wrap');
    newDiv.id = 'lightbox-portal';
    newDiv.className = 'lightbox-enter';
    newDiv.style.opacity = '0';
    document.body.insertBefore(newDiv, appRoot);
    mountNode.current = newDiv;
  };

  const handleClose = () => {
    if (mountNode.current) {
      const handleDivRemoval = () => {
        setCurrIndex(undefined);
        firstRun.current = true;
        galleryRef.current?.remove();
        mountNode.current?.remove();
        setIsOpen(false);
      };
      mountNode.current.addEventListener('transitionend', handleDivRemoval, { once: true });
      mountNode.current.style.opacity = '0';
    }
  };

  // ****************** Navigation ****************** //
  const handleLeftNav = useCallback(() => {
    if (typeof currIndex === 'number' && currIndex > 0) {
      setCurrIndex((i) => i === undefined ? 0 : i - 1);
      calledFromButton.current = true;
    }
  }, [currIndex]);

  const handleRightNav = useCallback(() => {
    if (typeof currIndex === 'number' && currIndex < imageArray.length - 1) {
      setCurrIndex((i) => i === undefined ? imageArray.length - 1 : i + 1);
      calledFromButton.current = true;
    }
  }, [currIndex, imageArray]);

  // ** Handler for clicks - from ResponsiveImage Component ** //
  const handleInnerClicks = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      return handleLeftNav();
    }
    return handleRightNav();
  };

  useEffect(() => {
    const handleButtonPress = (e: KeyboardEvent) => {
      const keyPressed = e.key;
      if (keyPressed === 'Escape') handleClose();
      if (keyPressed === 'ArrowLeft') handleLeftNav();
      if (keyPressed === 'ArrowRight') handleRightNav();
    };

    document.addEventListener('keydown', handleButtonPress);
    return () => document.removeEventListener('keydown', handleButtonPress);
  }, [handleLeftNav, handleRightNav]);

  // **************** Find xOffsets **************** //
  // Get reference to the ul so we can measure the xOffsets
  // We need to measure initially and on resize
  useEffect(() => {
    const measureOffset = () => {
      if (galleryRef.current) {
        const liArray = Array.from(galleryRef.current.querySelectorAll('li'));
        setXOffsets(liArray.map((li) => li.offsetLeft));
      }
    };
    measureOffset();
    window.addEventListener('resize', measureOffset);
    return () => window.removeEventListener('resize', measureOffset);
  }, [getGalleryRef]);

  // *********** Update index if scrolled *********** //
  useEffect(() => {
    if (scrollStopped) {
      if (calledFromButton.current === false && galleryRef.current) {
        const currScroll = galleryRef.current.scrollLeft;
        const newIndex = xOffsets.indexOf(currScroll);
        setCurrIndex(newIndex);
      }
    }
  }, [scrollStopped, xOffsets]);

  // ********** Nav - index change listen ********** // 
  useEffect(() => {
    // Implicitly showing the proper image.
    if (xOffsets.length && currIndex !== undefined && galleryRef.current) {
      galleryRef.current.scrollTo({
        left: xOffsets[currIndex],
        behavior: firstRun.current ? 'instant' : 'smooth'
      });
      if (firstRun.current && mountNode.current) {
        mountNode.current.style.opacity = '1';
      }
      firstRun.current = false;
      calledFromButton.current = false;
    }
  }, [currIndex, xOffsets]);

  return (
    <>
      {isOpen && mountNode.current && createPortal(
        <>
          <div>
            <nav className='lightbox-strip-nav'>
              <button
                onClick={handleClose}
                className={`lightbox-strip-nav-btn lightbox-strip-nav-close${imageArray.length === 1 ? ' --single' : ''}`}>
                <SlClose />
              </button>
              <div className='lightbox-strip-nav_arrows'>
                <div
                  // onClick={handleLeftNav}
                  ref={leftBtnRef}
                  className={`lightbox-strip-nav-btn btn_left lightbox-strip-nav_arrows-btn${currIndex === 0 ? '--hide' : '--show'}`}>
                  <SlArrowLeft />
                </div>
                <div
                  // onClick={handleRightNav}
                  ref={rightBtnRef}
                  className={`lightbox-strip-nav-btn btn_right lightbox-strip-nav_arrows-btn${currIndex === imageArray.length - 1 ? '--hide' : '--show'}`}>
                  <SlArrowRight />
                </div>
              </div>
            </nav >
            <ul key="ul-wrap" ref={galleryRef} className='lightbox-strip-ul'>
              {imageArray.map(({ alt, largeUrl, imageSize, description }) => (
                <li key={`image-${alt}-li`} className='lightbox-strip-li'>
                  <ResponsiveImage
                    src={largeUrl}
                    alt={alt}
                    description={description}
                    imageSize={imageSize}
                    clickHandler={handleInnerClicks}
                    key={`image-${alt}-img`}
                    leftBtnRef={leftBtnRef}
                    rightBtnRef={rightBtnRef}
                  />
                </li>
              ))}
            </ul>
          </div>
        </>, mountNode.current)}
      <div className={`${baseCssClass ? baseCssClass + ' ' : ''}lightbox-wrap`}>
        <ul className='lightbox-ul'>
          {imageArray.map(({ smallUrl, alt }, index) => (
            <li key={`${alt}-${index}`}
              onClick={handleOpen.bind(null, index)}
              role='button'
            >
              <ExportedImage
                src={smallUrl}
                alt={alt}
                fill
                style={{ objectFit: "contain" }}
                priority
                key={alt}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}