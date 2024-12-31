import { Color } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const clickableInfoCardStyles = StyleSheet.create({
  clickableCardWrap: {
    backgroundColor: Color.updates.white,
    paddingVertical: 13,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 14,
  },
  clicableInfoWrap: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
});
