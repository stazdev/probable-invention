import { Color } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const drawerUserPostStyles = ({ isActive }: { isActive: boolean }) =>
  StyleSheet.create({
    listWrapper: {
      flexDirection: "row",
      columnGap: 10,
      alignItems: "center",
    },
    petAvatarWrap: {
      alignItems: "center",
      rowGap: 8,
    },
    avatarStyle: {
      height: 60,
      width: 60,
      borderRadius: 60 / 2,
      backgroundColor: Color.grey[200],
      borderWidth: isActive ? 2 : 1,
      borderColor: isActive ? Color.blue[500] : Color.grey[700],
    },
    addNewBtn: {
      height: 60,
      width: 60,
      borderWidth: 1.5,
      borderColor: Color.grey[500],
      borderRadius: 60 / 2,
      backgroundColor: Color.grey[900],
    },
    petNameText: {
      color: isActive ? Color.blue[500] : Color.grey[200],
    },
  });
