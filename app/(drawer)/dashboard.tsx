import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  FlatList,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { SearchIcon, MenuIcon } from "@/assets/icons";
import { Color } from "@/constants/Colors";
import { ThemedText } from "../../components/ThemedText";
import { NoProfile, RNTouchable } from "../../components";

import { BlueRightArrowIcon } from "@/assets/svg";
import { MENU_CARDS, USER_PETS } from "@/mock";
import EachPetCard from "@/components/each-pet-card";
import { SCREEN_WIDTH } from "@/resources/config";
import { router } from "expo-router";

interface DashboardProps {
  navigation: {
    openDrawer: () => void;
  };
}

export default function Dashboard({
  navigation: { openDrawer },
}: DashboardProps) {
  const inset = useSafeAreaInsets();
  const profilesLength = USER_PETS.length;
  const scrollX = useRef<any>(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const [viewIndex, setViewIndex] = useState<number>(0);
  const dotPosition = Animated.divide(scrollX, SCREEN_WIDTH);

  const onViewChangeRef = useRef<
    ({ viewableItems, changed }: { viewableItems: any; changed: any }) => void
  >(({ viewableItems, changed }) => {
    setViewIndex(viewableItems[0]?.index);
  });

  return (
    <SafeAreaView style={[styles.container, { paddingTop: inset.top }]}>
      <StatusBar barStyle={"dark-content"} />

      {/* Top Header Section */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: "https://picsum.photos/200/300/?random" }}
            style={styles.profileImage}
          />
          <View>
            <ThemedText family="NotoSans" color={Color.grey[600]} fontSize={14}>
              Hello,
            </ThemedText>
            <ThemedText type="Semibold" color={Color.grey[800]}>
              Esther
            </ThemedText>
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <SearchIcon />
          <View
            style={{ height: 20, width: 1, backgroundColor: Color.grey[200] }}
          />

          <RNTouchable onPress={openDrawer}>
            <MenuIcon />
          </RNTouchable>
        </View>
      </View>

      {profilesLength > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{}}>
            {/* Header section */}
            <View style={styles.section}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 6,
                  paddingHorizontal: 24,
                }}
              >
                <ThemedText type="Semibold" color={Color.grey[800]}>
                  Active pet profiles
                </ThemedText>

                <View style={styles.profileCount}>
                  <ThemedText type="Semibold" color={Color.grey[800]}>
                    {profilesLength}
                  </ThemedText>
                </View>
              </View>

              <FlatList
                data={USER_PETS}
                horizontal
                ref={flatListRef}
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewChangeRef.current}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: false }
                )}
                bounces={false}
                renderItem={({ item }) => <EachPetCard data={item} />}
              />
              <View style={styles.indicatorsWrap}>
                {USER_PETS.map((item, index) => {
                  const dotColor = dotPosition.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [
                      Color.grey[200],
                      Color.yellow[500],
                      Color.grey[200],
                    ],
                    extrapolate: "clamp",
                  });
                  const dotWidth = dotPosition.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [6, 22, 6],
                    extrapolate: "clamp",
                  });

                  return (
                    <Animated.View
                      key={index}
                      style={[
                        styles.eachIndicatorDot,
                        {
                          backgroundColor: dotColor,
                          width: dotWidth,
                        },
                      ]}
                    />
                  );
                })}
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 16,
                paddingVertical: 24,
                paddingHorizontal: 24,
              }}
            >
              <View style={styles.eachMenuCard}>
                <View>
                  <ThemedText
                    type="Semibold"
                    family="NotoSans"
                    style={{ lineHeight: 24 }}
                    color={Color.grey[800]}
                  >
                    Share profile
                  </ThemedText>
                  <ThemedText
                    color={Color.grey[600]}
                    family="NotoSans"
                    style={{ lineHeight: 14 }}
                    fontSize={12}
                  >
                    Easily share your pet’s profile or add a new one
                  </ThemedText>
                </View>
                <RNTouchable
                  style={{ alignSelf: "flex-end" }}
                  onPress={() =>
                    router.push("/(shareProfile)/ShareProfileScreen")
                  }
                >
                  <BlueRightArrowIcon />
                </RNTouchable>
              </View>

              {MENU_CARDS.map((card) => {
                const { title, bG, Icon, path } = card;
                return (
                  <RNTouchable
                    style={styles.eachMenuCard}
                    onPress={() => router.push(path)}
                  >
                    <>
                      <View style={styles.eachMenuRing}>
                        <Icon />
                        <View
                          style={[styles.eachRingBg, { backgroundColor: bG }]}
                        />
                      </View>
                      <ThemedText
                        fontSize={16}
                        type="Semibold"
                        color={Color.grey[800]}
                      >
                        {title}
                      </ThemedText>
                    </>
                  </RNTouchable>
                );
              })}
            </View>
          </View>
        </ScrollView>
      ) : (
        <NoProfile />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.grey[50],
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomColor: Color.grey[50],
    borderBottomWidth: 1,
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
  section: {
    rowGap: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
  },
  petProfileCard: {
    backgroundColor: Color.blue[500],
    borderRadius: 12,
    // paddingHorizontal: 20,
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
  eachMenuCard: {
    paddingHorizontal: 12,
    paddingVertical: 18,
    width: "46%",
    rowGap: 22,
    borderRadius: 14,
    borderColor: Color.grey[100],
    backgroundColor: Color.updates.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 168,
    justifyContent: "flex-end",
    // overflow: "hidden",
  },
  eachMenuRing: {
    height: 122,
    width: 122,
    borderRadius: 122 / 2,
    borderColor: Color.grey[150],
    borderWidth: 0.5,
    position: "absolute",
    top: -20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  eachRingBg: {
    width: 82,
    height: 82,
    borderRadius: 82 / 2,
    position: "absolute",
    top: 20,
    zIndex: -1,
  },
  shareCard: {
    margin: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  shareTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  shareSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  arrowIcon: {
    fontSize: 20,
    color: "#007AFF",
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
  },
  menuCard: {
    width: "45%",
    margin: "2.5%",
    aspectRatio: 1,
    borderRadius: 12,
    padding: 16,
    justifyContent: "space-between",
  },
  menuIcon: {
    width: 40,
    height: 40,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  profileCount: {
    backgroundColor: Color.grey[150],
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  indicatorsWrap: {
    columnGap: 4,
    flexDirection: "row",
    alignSelf: "center",
  },
  eachIndicatorDot: {
    height: 6,
    borderRadius: 6 / 2,
    borderWidth: 1,
    borderColor: Color.updates.transparent,
  },
});
