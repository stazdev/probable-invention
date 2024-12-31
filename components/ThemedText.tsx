import { Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Color } from "@/constants/Colors";

type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "Black"
    | "Bold"
    | "ExtraBold"
    | "ExtraLight"
    | "Light"
    | "Medium"
    | "Regular"
    | "Semibold"
    | "Thin";
  fontSize?: number;
  lineHeight?: number;
  color?: string;
  family?: "Catamaran" | "NotoSans";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "Regular",
  fontSize = 16,
  lineHeight = 24,
  color = Color.grey[600],
  family = "NotoSans",
  ...rest
}: ThemedTextProps) {
  const themeColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );


  return (
    <Text
      style={[
        {
          color: color,
          fontSize,
          lineHeight,
          fontFamily: `${family}-${type}`,
        },
        style,
      ]}
      {...rest}
    />
  );
}
