import React, { useEffect, useRef } from 'react';
import ExportedImage from 'next-image-export-optimizer';

export type ImageSize = {
  width: number,
  height: number,
};

interface ResponsiveImageProps {
  src: string;
  alt: string;
  imageSize: ImageSize;
}

export default function ResponsiveImage({ src, alt, imageSize }: ResponsiveImageProps) {
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

  return (
    <>
      <div ref={imgWrapRef} className='image_text-wrap'>
        <div className='button-hold' style={{ position: 'absolute', display:'flex',inset:0}}>
          <div style={{flex:1, height:'100%', backgroundColor:'yellow'}}/>
          <div style={{flex:1, height:'100%', backgroundColor:'blue'}}/>
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
        <p ref={textRef}>sss</p>
      </div>

    </>
  );
};


