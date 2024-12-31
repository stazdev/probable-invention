import { Color } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const petHeaderCardStyles = StyleSheet.create({
  petHeaderWrap: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: Color.grey[150],
    flexDirection: "row",
    borderColor: Color.grey[200],
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    columnGap: 4,
  },
});
