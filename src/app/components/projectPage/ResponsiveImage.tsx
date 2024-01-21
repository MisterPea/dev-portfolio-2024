import React, { useEffect, useRef, RefObject } from 'react';
import ExportedImage from 'next-image-export-optimizer';

export type ImageSize = {
  width: number,
  height: number,
};

interface ResponsiveImageProps {
  src: string;
  alt: string;
  description?: string;
  imageSize: ImageSize;
  clickHandler: (direction: 'prev' | 'next') => void;
  leftBtnRef: RefObject<HTMLDivElement>;
  rightBtnRef: RefObject<HTMLDivElement>;
}

export default function ResponsiveImage({ src, alt, description, imageSize, clickHandler, leftBtnRef, rightBtnRef }: ResponsiveImageProps) {
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  interface Style {
    [CSSStyleRule: string]: string;
  }


  useEffect(() => {
    const adjustAspectRatio = () => {
      if (imgWrapRef.current && textRef.current) {

        const image_text = imgWrapRef.current;
        const text = textRef.current;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const aspectRatio = imageSize.width / imageSize.height;

        let newWidth = viewportHeight * aspectRatio;
        let newHeight = viewportHeight;

        if (newWidth > viewportWidth) {
          newWidth = viewportWidth;
          newHeight = viewportWidth / aspectRatio;
        }

        const padding = imageSize.height * 0.007;
        const negativeMargin = -2;

        image_text.style.width = `${Math.min(newWidth, imageSize.width)}px`;
        image_text.style.height = `${Math.min(newHeight, imageSize.height)}px`;
        image_text.style.padding = `${padding}px ${padding}px ${padding + 10}px`;
        text.style.marginTop = `${negativeMargin}px`;
      }
    };

    // Adjust on initial load
    adjustAspectRatio();

    // Adjust on window resize
    window.addEventListener('resize', adjustAspectRatio);

    // Cleanup listener when component unmounts
    return () => window.removeEventListener('resize', adjustAspectRatio);
  }, [imageSize]);


  // Convenience component to abstract out the hit areas
  /*  
  This is done so we can move the click action away from the arrow button, and
  turn the whole half of the image into a button. The problem is the image size
  is dynamic, so to have access we have to create the button on the image layer 
  and pass the references to the button action into it (the button). 
  */
  interface ClickableAreaProps {
    side: 'left' | 'right';
    elemToModify: any;
  }
  const ClickableArea = ({ side, elemToModify }: ClickableAreaProps) => {
    const clickableRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const moveTo = side === 'left' ? 1 : -1;
      const hoverOn = () => {
        if (elemToModify.current) {
          elemToModify.current.style.transform = `translateX(${moveTo * 19}px)`;
        }
      };
      const hoverOff = () => {
        if (elemToModify.current) {
          elemToModify.current.style.transform = `translateX(${moveTo * 25}px)`;
        }
      };
      const clickableRefLocal = clickableRef.current;

      if (clickableRefLocal) {
        clickableRefLocal.addEventListener('mouseover', hoverOn);
        clickableRefLocal.addEventListener('mouseout', hoverOff);
      }
      return () => {
        clickableRefLocal?.removeEventListener('mouseover', hoverOn);
        clickableRefLocal?.removeEventListener('mouseout', hoverOff);
      };
    }, [elemToModify, side]);

    const direction = side === 'left' ? 'prev' : 'next';

    return (
      <div
        ref={clickableRef}
        className={`image_text-clickable ${side}`}
        style={{ flex: 1, height: '100%' }}
        onClick={clickHandler.bind(null, direction)}
        role='button'
      />
    );
  };


  return (
    <>
      <div ref={imgWrapRef} className='image_text-wrap'>
        <div className='button-hold' style={{ position: 'absolute', display: 'flex', inset: 0 }}>
          <ClickableArea side='left' elemToModify={leftBtnRef} />
          <ClickableArea side='right' elemToModify={rightBtnRef} />
        </div >
        <ExportedImage
          src={src}
          style={{
            objectFit: 'scale-down',
            position: 'relative',
            maxWidth: '100%',
            maxHeight: '100%',
          }}
          alt={alt}
          width={imageSize.width}
          height={imageSize.height}
          priority
          key={`${alt}-img-main`}
        />
        <p ref={textRef}>{description ? description : ''}</p>
      </div>

    </>
  );
};


