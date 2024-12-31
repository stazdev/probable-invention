import React from "react";
import { View } from "react-native";
import { headerStepperStyles } from "./styles";
import { ThemedText } from "../ThemedText";
import Animated, { LinearTransition } from "react-native-reanimated";

import { HeaderStepperBarProps } from "./types";
import HeaderBack from "../header-back";

function HeaderStepperBar({
  headerText,
  subHeaderText,
  currentStep,
  totalStep,
  onBackPress,
}: HeaderStepperBarProps) {
  const {
    headerContainer,
    progressContainer,
    progressBar,
    progressIndicator,
    progressWrap,
    stepIndicator,
    stepText,
    activeStepText,
    totalStepText,
  } = headerStepperStyles({ currentStep });

  const RightComponent = () => {
    return (
      <View style={stepIndicator}>
        <ThemedText family="NotoSans" style={stepText}>
          Step
        </ThemedText>
        <ThemedText family="NotoSans" type="Semibold" style={activeStepText}>
          {currentStep}
          <ThemedText family="NotoSans" type="Regular" style={totalStepText}>
            /{totalStep}
          </ThemedText>
        </ThemedText>
      </View>
    );
  };
  return (
    <View style={headerContainer}>
      <HeaderBack
        headerTitle={headerText}
        headerSubtitle={subHeaderText}
        RightComponent={<RightComponent />}
      />

      <Animated.View style={progressContainer}>
        <Animated.View style={progressWrap}>
          <Animated.View
            layout={LinearTransition}
            style={[progressIndicator]}
          />
          <Animated.View style={progressBar} />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

export default HeaderStepperBar;
