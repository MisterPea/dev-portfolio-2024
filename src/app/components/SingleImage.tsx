type ImageSetSource = {
  minWidth: string, // Min-width in pixels: i.e. '800px'
  images: string;   // Images - format: "circuitLarge_1x.webp 1x, circuitLarge_2x.webp 2x,..."
};

interface SingleImageProps {
  imageSource: ImageSetSource[];
  defaultImage: string;
  altText: string;
}

export default function SingleImage({ imageSource, defaultImage, altText }: SingleImageProps) {
  return (
    <picture>
      {imageSource.map(({ minWidth, images }, index) => (
        <source srcSet={images} media={`(min-width: ${minWidth})`} key={`${index}-${minWidth}`} />
      ))}
      <img src={defaultImage} alt={altText} key={`${defaultImage}-default`} />
    </picture>
  );
}