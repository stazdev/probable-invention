import { ViewStyle } from "react-native";

export type RNTouchableProps = {
  children: React.ReactElement;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
};
