import "react-native-gesture-handler";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Load all the fonts
  const [fontsLoaded] = useFonts({
    "Catamaran-Black": require("../assets/fonts/Catamaran-Black.ttf"),
    "Catamaran-Bold": require("../assets/fonts/Catamaran-Bold.ttf"),
    "Catamaran-ExtraBold": require("../assets/fonts/Catamaran-ExtraBold.ttf"),
    "Catamaran-ExtraLight": require("../assets/fonts/Catamaran-ExtraLight.ttf"),
    "Catamaran-Light": require("../assets/fonts/Catamaran-Light.ttf"),
    "Catamaran-Medium": require("../assets/fonts/Catamaran-Medium.ttf"),
    "Catamaran-Regular": require("../assets/fonts/Catamaran-Regular.ttf"),
    "Catamaran-SemiBold": require("../assets/fonts/Catamaran-SemiBold.ttf"),
    "Catamaran-Thin": require("../assets/fonts/Catamaran-Thin.ttf"),

    "NotoSans-Black": require("../assets/fonts/NotoSans-Black.ttf"),
    "NotoSans-Bold": require("../assets/fonts/NotoSans-Bold.ttf"),
    "NotoSans-ExtraBold": require("../assets/fonts/NotoSans-ExtraBold.ttf"),
    "NotoSans-ExtraLight": require("../assets/fonts/NotoSans-ExtraLight.ttf"),
    "NotoSans-Light": require("../assets/fonts/NotoSans-Light.ttf"),
    "NotoSans-Medium": require("../assets/fonts/NotoSans-Medium.ttf"),
    "NotoSans-Regular": require("../assets/fonts/NotoSans-Regular.ttf"),
    "NotoSans-SemiBold": require("../assets/fonts/NotoSans-SemiBold.ttf"),
    "NotoSans-Thin": require("../assets/fonts/NotoSans-Thin.ttf"),

    "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DefaultTheme : DefaultTheme}
        >
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(drawer)" />
            <Stack.Screen name="(petProfile)" />
            <Stack.Screen name="index" />
            <Stack.Screen name="(shareProfile)/ShareProfileScreen" />
            <Stack.Screen name="(nutrition)/NutritionScreen" />
            <Stack.Screen name="(health)/HealthCardScreen" />
            <Stack.Screen name="(activities)/activityScreen" />
            <Stack.Screen name="(settings)/SettingsScreen" />
            <Stack.Screen name="(account)/AccountScreen" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
