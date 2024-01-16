'use client';
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import createId from '../createId';
import ExportedImage from 'next-image-export-optimizer';

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

interface LargeImageProps extends LightboxProps {
  imageIndex: number;
  updateIndex: Dispatch<SetStateAction<number>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}


/**
 * Component to render the actual filmstrip gallery. Placed here for purpose of clarity.
 * @prop {GalleryImage[]} props.imageArray Array of images 
 * @prop {number} props.imageIndex Index of current image - state is handled by parent
 * @prop {Dispatch<SetStateAction<number>>} props.updateIndex - reference to the setState for image index
 * @prop {Dispatch<SetStateAction<boolean>>} props.setIsOpen - reference to the open/close lightbox setState
 */
function LargeImage({ imageArray, imageIndex, updateIndex, setIsOpen }: LargeImageProps) {
  const galleryRef = useRef<HTMLUListElement>(null);
  const [xOffsets, setXOffsets] = useState<number[]>([]);
  const firstRun = useRef<boolean>(true);
  const numImages = imageArray.length;
  const calledByButton = useRef<boolean>(false);

  const handleScrollWatch = useCallback(() => {
    if (calledByButton.current === false) {
      const currScroll = galleryRef.current?.scrollLeft;
      const newIndex = xOffsets.indexOf(currScroll!);
      updateIndex(newIndex);
    }
  }, [xOffsets, updateIndex]);

  useEffect(() => {
    if (galleryRef.current) {
      galleryRef.current.addEventListener('scrollend', handleScrollWatch);
      const liArray = Array.from(galleryRef.current.querySelectorAll('li'));
      setXOffsets(liArray.map((li) => li.offsetLeft));
    }
  }, []);

  useEffect(() => {
    if (xOffsets.length) {
      galleryRef.current?.scrollTo({
        left: xOffsets[imageIndex],
        behavior: firstRun.current ? 'instant' : 'smooth'
      });
      firstRun.current = false;
      // reset after scrollTo executes
      calledByButton.current = false;
    }
  }, [imageIndex, xOffsets]);

  const handleClose = () => {
    setXOffsets([]);
    setIsOpen(false);
  };

  const handleLeftNav = () => {
    if (imageIndex > 0) {
      updateIndex((i: number) => i - 1);
      calledByButton.current = true;
    }
  };

  const handleRightNav = () => {
    if (imageIndex < imageArray.length - 1) {
      updateIndex((i: number) => i + 1);
      calledByButton.current = true;
    }
  };

  return (
    <div className='lightbox-strip-wrap'>
      <nav className='lightbox-strip-nav'>
        <button
          onClick={handleClose}
          className={`lightbox-strip-nav-btn lightbox-strip-nav-close${imageArray.length === 1 ? ' --single' : ''}`}>X</button>
        <div className='lightbox-strip-nav_arrows'>
          <button
            onClick={handleLeftNav}
            className={`lightbox-strip-nav-btn lightbox-strip-nav_arrows-btn${imageIndex === 0 ? '--hide' : '--show'}`}>{'<'}</button>
          <button
            onClick={handleRightNav}
            className={`lightbox-strip-nav-btn lightbox-strip-nav_arrows-btn${imageIndex === numImages - 1 ? '--hide' : '--show'}`}>{'>'}</button>
        </div>
      </nav >
      <ul ref={galleryRef} className='lightbox-strip-ul'>
        {imageArray.map(({ alt, largeUrl, ratio, description }, index) => (
          <li key={`${index}-${alt}`}
            className='lightbox-strip-li'
          >
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
    </div >
  );
}

/**
 * 
 * @prop {GalleryImage[]} props.imageArray Array of GalleryImage types
 * @prop {string?} props.baseCssClass Optional string to append a custom CSS class to the lightbox
 * @returns 
 */
export default function Lightbox({ imageArray, baseCssClass }: LightboxProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currIndex, setCurrIndex] = useState<number>(0);
  const mountNode = useRef<HTMLDivElement | null>(null);
  const id = createId();
  /* console.log({ isMounted, isOpen, mountNode: mountNode.current }); */

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

  const handleButtonPress = useCallback((e: KeyboardEvent) => {
    const keyPressed = e.key;
    if (keyPressed === 'Escape') {
      setIsOpen(false);
    }
    if (keyPressed === 'ArrowLeft') {
      if (currIndex > 0) {
        setCurrIndex((i) => i - 1);
      }
    }
    if (keyPressed === 'ArrowRight') {
      if (currIndex < imageArray.length - 1) {
        setCurrIndex((i) => i + 1);
      }
    }
  }, [currIndex, imageArray.length]);

  useEffect(() => {
    document.addEventListener('keydown', handleButtonPress);
    return () => {
      document.removeEventListener('keydown', handleButtonPress);
    };
  }, [handleButtonPress]);

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


  return (
    <>
      {isMounted && mountNode.current ? createPortal(
        <LargeImage
          imageArray={imageArray}
          imageIndex={currIndex}
          updateIndex={setCurrIndex}
          setIsOpen={setIsOpen}
        />, mountNode.current
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