import { StyledImagePlaceholder } from './ImagePlaceholder.styles';

export interface ImagePlaceholderProps {
  width?: number;
  height?: number;
  borderRadius?: number;
}

export const ImagePlaceholder = ({
  width,
  height,
  borderRadius,
}: ImagePlaceholderProps) => {
  return (
    <StyledImagePlaceholder
      width={width}
      height={height}
      $borderRadius={borderRadius}
    />
  );
};
