import { Color } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const rnToggleSwitchStyles = StyleSheet.create({
  toggleBgWrap: {
    width: 44,
    height: 24,
    borderRadius: 16,
    padding: 3,
  },
  toggleControlWrap: {
    height: 18,
    width: 18,
    backgroundColor: Color.updates.white,
    borderRadius: 18 / 2,
    position: "absolute",
    top: 3,
  },
});
