import React, { useState } from "react";
import { View, StyleSheet, Image, FlatList } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import Dashboard from "./dashboard";
import { CloseIcon } from "@/assets/icons";
import { Color } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { DrawerUserPets, RNTouchable } from "@/components";


import { SCREEN_HEIGHT } from "@/resources/config";
import { MENU_LISTS } from "@/mock";

export default function CustomSidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = useSharedValue(0);
  const router = useRouter();
  const inset = useSafeAreaInsets();

  const toggleMenu = () => {
    progress.value = menuOpen
      ? withTiming(0, { duration: 500 })
      : withTiming(1, { duration: 500 });
    setMenuOpen(!menuOpen);
  };

  const closeMenuAndNavigate = (route: any) => {
    progress.value = withTiming(0, { duration: 100 });
    setMenuOpen(false);
    setTimeout(() => router.push(route), 100);
  };

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [1, 0.75]);
    const translateX = interpolate(progress.value, [0, 1], [0, 300]);
    const translateY = interpolate(
      progress.value,
      [0, 1],
      [0, SCREEN_HEIGHT * 0.1]
    );

    return {
      transform: [{ scale }, { translateX }, { translateY }],
      borderRadius: interpolate(progress.value, [0, 1], [0, 24]),
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <View style={[styles.header, { top: inset.top }]}>
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: "https://picsum.photos/200/300/?random" }}
              style={styles.profileImage}
            />
            <View>
              <ThemedText
                family="NotoSans"
                color={Color.grey[200]}
                fontSize={14}
              >
                Hello,
              </ThemedText>
              <ThemedText type="Semibold" color={Color.updates.white}>
                Esther
              </ThemedText>
            </View>
          </View>

          <RNTouchable onPress={toggleMenu}>
            <CloseIcon />
          </RNTouchable>
        </View>

        <View style={styles.leftPane}>

          <DrawerUserPets />
          

          <View style={styles.horizontalLine} />
          <View style={styles.listMenuWrapper}>
            {MENU_LISTS.MIDDLE_LISTS.map((list) => {
              const { Icon, title, route } = list;
              return (
                <View style={{ padding: 12 }}>
                  <RNTouchable
                    onPress={() => closeMenuAndNavigate(`/${route}`)}
                  >
                    <View style={{ flexDirection: "row", columnGap: 12 }}>
                      <Icon />
                      <ThemedText color={Color.grey[100]} type="Medium">{title}</ThemedText>
                    </View>
                  </RNTouchable>
                </View>
              );
            })}
          </View>

          <View style={styles.horizontalLine} />

          <View style={styles.listMenuWrapper}>
            {MENU_LISTS.LAST_LISTS.map((list) => {
              const { Icon, title, route } = list;
              return (
                <View style={{ padding: 12 }}>
                  <RNTouchable
                    onPress={() => closeMenuAndNavigate(route)}
                  >
                    <View style={{ flexDirection: "row", columnGap: 12 }}>
                      <Icon />
                      <ThemedText color={Color.grey[100]} type="Medium">{title}</ThemedText>
                    </View>
                  </RNTouchable>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      <Animated.View style={[styles.content, animatedStyle]}>
        <Dashboard navigation={{ openDrawer: toggleMenu }} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f1f1f",
  },
  menu: {
    flex: 1,
    backgroundColor: Color.updates.background,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    justifyContent: "center",
  },
  menuText: {
    color: "white",
    fontSize: 20,
    marginBottom: 20,
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 24,
    paddingVertical: 12,
    borderBottomColor: Color.grey[50],
    borderBottomWidth: StyleSheet.hairlineWidth,
    position: "absolute",
    left: 0,
    right: 0,
  },
  leftPane: {
    width: "60%",
  },
  listMenuWrapper: {
    rowGap: 8,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 24,
    marginRight: 8,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: Color.grey[700],
    marginVertical: 24,
  },
});
