import React, { useEffect, useRef, RefObject } from 'react';
import ExportedImage from 'next-image-export-optimizer';
import ClickableAreas from './ClickableArea';

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

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const aspectRatio = imageSize.width / imageSize.height;

        let newWidth = viewportHeight * aspectRatio;
        let newHeight = viewportHeight;

        if (newWidth > viewportWidth) {
          newWidth = viewportWidth;
          newHeight = viewportWidth / aspectRatio;
        }

        image_text.style.width = `${Math.min(newWidth, imageSize.width)}px`;
        image_text.style.height = `${Math.min(newHeight, imageSize.height)}px`;
      }
    };
    // Adjust on initial load
    adjustAspectRatio();
    // Adjust on window resize
    window.addEventListener('resize', adjustAspectRatio);
    // Cleanup listener when component unmounts
    return () => window.removeEventListener('resize', adjustAspectRatio);
  }, [imageSize]);

  return (
    <>
      <div ref={imgWrapRef} className='image_text-wrap' style={{ width: '100vw' }} >
        <ClickableAreas
          leftBtnRef={leftBtnRef}
          rightBtnRef={rightBtnRef}
          clickHandler={clickHandler}
        />
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


