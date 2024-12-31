import { Color } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const headerStepperStyles = ({ currentStep }: { currentStep: number }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Color.updates.lightBackground,
    },
    headerContainer: {
      paddingBottom: 24,
      backgroundColor: Color.updates.lightBackground,
      shadowColor: Color.grey[200],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 4,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 24,
    },
    headerTitle: {
      alignItems: "center",
    },
    stepIndicator: {
      alignItems: "center",
    },
    title: {
      fontSize: 16,
      color: Color.grey[800],
    },
    subTitle: {
      fontSize: 14,
      color: Color.grey[600],
    },
    stepText: {
      fontSize: 12,
      color: Color.grey[800],
    },

    progressWrap: {
      width: "100%",
      alignSelf: "stretch",
      justifyContent: "center",
    },
    progressContainer: {
      marginTop: 18,
      paddingHorizontal: 24,

      //   alignItems: "center"
    },

    progressBar: {
      height: 3,
      backgroundColor: Color.grey[150],
      borderRadius: 2,
      width: "100%",
    },

    progressIndicator: {
      height: 6,
      backgroundColor: Color.yellow[500],
      borderRadius: 6/2,
      width: `${(currentStep / 7) * 100}%`,
      position: "absolute",
      zIndex: 1,
    },

    progressText: {
      fontSize: 16,
      fontWeight: "400",
      color: Color.grey[800],
    },
    activeStepText: {
      fontSize: 12,
      color: Color.grey[800],
    },
    totalStepText: {
      fontSize: 12,
      color: Color.grey[400],
    },
    contentContainer: {
      flexGrow: 1,
    },
    buttonContainer: {
      paddingVertical: 24,
      borderTopLeftRadius: 26,
      borderTopRightRadius: 26,
      shadowColor: Color.grey[400],
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 4,
    },
  });
