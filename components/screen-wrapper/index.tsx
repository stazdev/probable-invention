import { SafeAreaView, View } from "react-native";
import React from "react";
import { Color } from "@/constants/Colors";
import HeaderBack from "../header-back";
import { ScreenWrapperProps } from "./types";

const ScreenWrapper = ({
  children,
  screenTitle,
  screenSubtitle,
  leftAlign,
  RightComponent,
}: ScreenWrapperProps) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.grey[50] }}>
      <HeaderBack
        headerTitle={screenTitle}
        headerSubtitle={screenSubtitle}
        leftAlign={leftAlign}
        RightComponent={RightComponent}
      />

      {children}
    </SafeAreaView>
  );
};

export default ScreenWrapper;
