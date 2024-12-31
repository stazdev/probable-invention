import { Color } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const eachRecipesStyles = StyleSheet.create({
  shadowWrap: {
    width: "50%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  eachRecipeWrap: {
    backgroundColor: Color.updates.white,
    borderRightColor: "red",
    minHeight: 174,
    borderRadius: 14,

    paddingHorizontal: 6.5,
    paddingVertical: 8,
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
  },
  recipeImgWrap: {
    position: "absolute",
    top: -20,
  },
  rippleIconBg: {
    position: "absolute",
    top: 0,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  recipeDescText: {
    textAlign: "center",
    color: Color.grey[800],
    paddingVertical: 6.5,
  },
});
