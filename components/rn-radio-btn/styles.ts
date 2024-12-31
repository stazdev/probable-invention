import { Color } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const rnRadioBtnStyles = ({ isActive }: { isActive: boolean }) =>
  StyleSheet.create({
    outerCircle: {
      height: 16,
      width: 16,
      borderColor: isActive ? Color.blue[500] : Color.grey[200],
      borderWidth: 1,
      borderRadius: 16 / 2,
      justifyContent: "center",
      alignItems: "center",
    },
    innerCircle: {
      width: 9,
      height: 9,
      backgroundColor: isActive ? Color.blue[500] : Color.updates.transparent,
      borderRadius: 9 / 2,
    },
  });
