import { Dimensions, Platform } from "react-native";

const { height: screenHeight, width: screenWidth } = Dimensions.get("screen");
export const isAndroid = Platform.OS === "android";
export const isIOS = Platform.OS === "ios";
export { screenHeight as SCREEN_HEIGHT, screenWidth as SCREEN_WIDTH };
