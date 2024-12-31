import { Color } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const eachPetCardStyles = StyleSheet.create({
  petProfileCard: {
    backgroundColor: Color.blue[500],
    borderRadius: 12,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  petInfo: {
    rowGap: 4,
  },
  petName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 4,
  },
  petBreed: {
    color: "#fff",
    fontSize: 16,
  },
  petImage: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
});
