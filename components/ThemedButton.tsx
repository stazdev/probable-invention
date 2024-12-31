import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Color } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";

type ThemedButtonProps = TouchableOpacityProps & {
  title: string;
  variant?: "primary" | "secondary" | "link";
  textType?: "default" | "defaultSemiBold" | "link";
  customTextStyle?: TextStyle;
  customButtonStyle?: ViewStyle;
};

export function ThemedButton({
  title,
  variant = "primary",
  textType,
  customTextStyle,
  customButtonStyle,
  disabled,
  ...rest
}: ThemedButtonProps) {
  // Default styles based on variant
  const buttonStyles = {
    primary: {
      backgroundColor: Color.blue[500],
      paddingVertical: 17,
      borderRadius: 14,
      alignItems: "center",
      marginBottom: 16,
    },
    secondary: {
      backgroundColor: "transparent",
      paddingVertical: 14,
      borderRadius: 14,
      alignItems: "center",
      marginBottom: 16,
      borderWidth: 1,
      borderColor: Color.blue[500],
    },
    link: {
      backgroundColor: "transparent",
      alignItems: "center",
      marginBottom: 16,
    },
  };

  const textStyles = {
    primary: {
      color: "#fff",
      textAlign: "center",
    },
    secondary: {
      color: Color.blue[500],
      textAlign: "center",
    },
    link: {
      color: Color.blue[500],
      textAlign: "center",
    },
  };

  // Determine text type if not explicitly provided
  const defaultTextType =
    variant === "primary"
      ? "defaultSemiBold"
      : variant === "secondary"
      ? "default"
      : "link";

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      style={[buttonStyles[variant], customButtonStyle, {opacity: disabled ? 0.5 : 1}]}
      {...rest}
    >
      <ThemedText
        type={textType || defaultTextType}
        style={[textStyles[variant], customTextStyle]}
      >
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}
