import { Color } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const rnSegmentedTabStyles = ({}) =>
  StyleSheet.create({
    tabWrap: {
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 24,
    },
    segmentedTabWrap: {
      flexDirection: "row",
      backgroundColor: Color.grey[150],
      borderRadius: 20,
      height: 54,
      borderWidth: 1,
      borderColor: Color.grey[200],
      alignItems: "center",
    },
    movingTab: {
      position: "absolute",
      height: 44,
      top: 4,
      backgroundColor: Color.updates.yellow,
      borderRadius: 18,
    },
  });
