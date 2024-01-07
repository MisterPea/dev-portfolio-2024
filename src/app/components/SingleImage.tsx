export type ImageSetSource = {
  minWidth: number | null, // Min-width in pixels: i.e. '800px' === 800
  maxWidth: number | null,
  images: string;   // Images - format: "circuitLarge_1x.webp 1x, circuitLarge_2x.webp 2x,..."
};

export interface SingleImageProps {
  imageSource: ImageSetSource[];
  defaultImage: string;
  altText: string;
}

export default function SingleImage({ imageSource, defaultImage, altText }: SingleImageProps) {

  return (
    <picture>
      {imageSource.map(({ minWidth, maxWidth, images }, index) => {
        let media = 'screen';
        if (minWidth) {
          media += ` and (min-width: ${minWidth}px)`;
        }
        if (maxWidth) {
          media += ` and (max-width: ${maxWidth}px)`;
        }
        return <source srcSet={images} media={media} key={`${index}-${media}`} />;
      })}
      <img src={defaultImage} alt={altText} key={`${defaultImage}-default`} />
    </picture>
  );
}