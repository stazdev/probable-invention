import { Color } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const petProfileCardStyles = ({ isFemale }: { isFemale: boolean }) =>
  StyleSheet.create({
    petProfileWrap: {
      paddingVertical: 12,
      paddingHorizontal: 14,
      backgroundColor: Color.updates.white,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 14,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    avatarProfileWrap: {
      flexDirection: "row",
      alignItems: "center",
      columnGap: 10,
    },
    petTypeInfo: {
      flexDirection: "row",
      alignItems: "center",
    },
    seperateBar: {
      marginHorizontal: 6,
      width: 1,
      backgroundColor: Color.grey[300],
      height: "50%",
    },
    genderBadgeBg: {
      borderRadius: 40 / 2,
      backgroundColor: isFemale
        ? "rgba(255, 225, 242, 0.5)"
        : "rgba(209, 230, 255, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
    },
  });
