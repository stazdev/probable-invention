import { DimensionValue, ImageProps, ImageStyle } from "react-native";
export type RNImageProps = {
  uri: string;
  width?: DimensionValue;
  height: number;
  circle?: boolean;
  bR?: number;
  ui?: ImageStyle;
} & ImageProps;

