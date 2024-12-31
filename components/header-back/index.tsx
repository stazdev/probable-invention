import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { BackArrowIcon } from "@/assets/svg";
import { ThemedText } from "../ThemedText";
import { Color } from "@/constants/Colors";
import { router } from "expo-router";
import RNTouchable from "../rn-touchable";

type HeaderBackProps = {
  headerTitle: string;
  headerSubtitle?: string;
  leftAlign?: boolean;
  onBackPress?: () => void;
  RightComponent?: any;
};

const HeaderBack = ({
  headerTitle,
  headerSubtitle,
  leftAlign = false,
  onBackPress = () => router.back(),
  RightComponent,
}: HeaderBackProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 24,
      }}
    >
      <RNTouchable onPress={onBackPress}>
        <BackArrowIcon />
      </RNTouchable>

      {leftAlign ? (
        <>
          <View
            style={{
              backgroundColor: Color.grey[150],
              width: 1,
              height: "50%",
              marginHorizontal: 8,
            }}
          />
          <View style={{ flex: 1 }}>
            {headerTitle && <ThemedText
              family="NotoSans"
              style={{ color: Color.grey[600], fontSize: 14 }}
            >
              {headerTitle}
            </ThemedText>}
            {headerSubtitle && (
              <ThemedText
                family="NotoSans"
                type="Medium"
                style={{ color: Color.grey[800] }}
              >
                {headerSubtitle}
              </ThemedText>
            )}
          </View>
        </>
      ) : (
        <View style={{ alignItems: "center", flex: 1 }}>
          <ThemedText
            type="Semibold"
            style={{ fontSize: 16, color: Color.grey[800] }}
          >
            {headerTitle}
          </ThemedText>
          {headerSubtitle && (
            <ThemedText
              family="NotoSans"
              style={{ fontSize: 12, color: Color.grey[800] }}
            >
              {headerSubtitle}
            </ThemedText>
          )}
        </View>
      )}

      {RightComponent ? (
        RightComponent
      ) : (
        <View style={{ width: 3, height: 30 }} />
      )}
    </View>
  );
};

export default HeaderBack;
