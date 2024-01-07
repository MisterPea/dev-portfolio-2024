'use client';
import { useRef } from "react";
import createId from "../createId";
import SingleImage, { ImageSetSource } from "../SingleImage";

interface Image extends ImageSetSource {
  mainImages: string;
}
// export type Image = {
//   thumbImg: ImageSetSource[],
//   mainImg?: ImageSetSource,
//   defaultImg: string,
//   alt: string,
//   bottomLabel?: string,
// };

export interface ImageViewerProps {
  images: Image[];
}

export default function ImageViewer({ images }: ImageViewerProps) {
  const idRef = useRef<string | null>();
  if (idRef.current === null) {
    idRef.current = createId();
  }

  return (
    <div className="image_viewer" key={`${idRef.current}-base`}>
      <ul className="image_viewer-ul">
        {/* {images.map(({ bottomLabel, thumbImg, mainImg, alt, defaultImg }, index) => (
          <li className="image_viewer-li" key={`${idRef}-li-${index}`}>
            <SingleImage altText={alt} imageSource={thumbImg} defaultImage={defaultImg} />
          </li>
        ))} */}
      </ul>
    </div>
  );
}