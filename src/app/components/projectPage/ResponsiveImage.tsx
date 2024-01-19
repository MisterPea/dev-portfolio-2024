import React, { useState, useEffect, useRef } from 'react';
import ExportedImage from 'next-image-export-optimizer';

export default function ResponsiveImage({ src, alt }: { src: string, alt: string; }) {
  const [dimensions, setDimensions] = useState({ width: '', paddingBottom: '' });
  const imgRef = useRef<HTMLImageElement>(null);
  const isMounted = useRef(true); // to track the mounted state

  const handleLoad = () => {
    if (imgRef.current) {
      const { naturalWidth, naturalHeight } = imgRef.current;
      const styleString = { width: '', paddingBottom: '' };
      styleString.width = '100%';
      styleString.paddingBottom = `${((naturalHeight / naturalWidth) * 100).toFixed(1)}%`;
      setDimensions(styleString);
    }
  };

  console.log(dimensions);
  return (
    <>
      <div style={{
        ...dimensions,
        position: 'relative',
      }}>
        <ExportedImage
          src={src}
          style={{
            objectFit: 'scale-down',
            maxWidth: '100%',
            maxHeight: '100%',
            position: 'absolute',
          }}
          alt={alt}
          fill
          onLoad={handleLoad}
          ref={imgRef}
        />
      </div>
    </>
  );
};


