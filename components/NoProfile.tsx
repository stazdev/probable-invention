import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { DogIllustration, DoubleCaretIcon } from "@/assets/icons";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  interpolateColor,
  runOnJS,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { Color } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";

const { width } = Dimensions.get("window");
const BUTTON_WIDTH = width - 50;
const BUTTON_HEIGHT = 54;
const BUTTON_PADDING = 10;
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;

const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;
const NoProfile = () => {
  // Animated value for X translation
  const X = useSharedValue(0);
  // Toggled State
  const [toggled, setToggled] = useState(false);

  // Fires when animation ends
  const handleComplete = (isToggled: boolean) => {
    if (isToggled !== toggled) {
      setToggled(isToggled);
      if (isToggled) {
        // Navigate to the new screen
        router.replace("/(petProfile)");
      }
    }
  };

  // Gesture Handler Events
  const animatedGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.completed = toggled;
      // Light haptic feedback on start
      runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
    },
    onActive: (e, ctx) => {
      let newValue;
      if (ctx.completed) {
        newValue = H_SWIPE_RANGE + e.translationX;
      } else {
        newValue = e.translationX;
      }

      // Constrain the swipe value between 0 and H_SWIPE_RANGE
      newValue = Math.max(0, Math.min(newValue, H_SWIPE_RANGE));

      X.value = newValue;

      // Haptic feedback during active swipe
      runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Soft);
    },
    onEnd: () => {
      if (X.value < H_SWIPE_RANGE / 2) {
        X.value = withSpring(0);
        runOnJS(handleComplete)(false);
      } else {
        X.value = withSpring(H_SWIPE_RANGE);
        // Haptic feedback on complete swipe
        runOnJS(Haptics.notificationAsync)(
          Haptics.NotificationFeedbackType.Success
        );
        runOnJS(handleComplete)(true);
      }
    },
  });

  const InterpolateXInput = [0, H_SWIPE_RANGE];
  const AnimatedStyles = {
    swipeable: useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(
        X.value,
        [0, H_SWIPE_RANGE],
        [Color.blue[500], Color.blue[300]]
      ),
      transform: [{ translateX: X.value }],
    })),
    swipeText: useAnimatedStyle(() => ({
      opacity: interpolate(
        X.value,
        InterpolateXInput,
        [0.7, 0],
        Extrapolate.CLAMP
      ),
      transform: [
        {
          translateX: interpolate(
            X.value,
            InterpolateXInput,
            [0, BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS],
            Extrapolate.CLAMP
          ),
        },
      ],
    })),
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View style={styles.contentContainer}>
        <DogIllustration />
        <ThemedText
          color={Color.grey[800]}
          fontSize={26}
          fontWeight={"700"}
          style={{ textAlign: "center", marginTop: 32 }}
        >
          Uh Ho!
        </ThemedText>
        <ThemedText
          color={Color.grey[600]}
          fontSize={16}
          fontWeight={"500"}
          style={{ textAlign: "center", marginTop: 10 }}
        >
          Looks like you have no profiles set up at this moment, add your pet
          now
        </ThemedText>
      </View>
      <View style={styles.swipeCont}>
        <PanGestureHandler onGestureEvent={animatedGestureHandler}>
          <Animated.View
            style={[
              styles.swipeable,
              AnimatedStyles.swipeable,
              {
                // Ensure the swipeable stays within the container
                left: BUTTON_PADDING,
                right: BUTTON_PADDING,
              },
            ]}
          >
            <DoubleCaretIcon />
          </Animated.View>
        </PanGestureHandler>
        <Animated.Text style={[styles.swipeText, AnimatedStyles.swipeText]}>
          Swipe to continue
        </Animated.Text>
      </View>
    </View>
  );
};

export default NoProfile;

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    paddingTop: 60,
  },
  searchContainer: {},
  menuContainer: {},
  swipeCont: {
    height: BUTTON_HEIGHT,
    backgroundColor: Color.blue[100],
    borderRadius: 18,
    padding: BUTTON_PADDING,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    margin: 24,
  },
  swipeable: {
    position: "absolute",
    height: 42,
    width: 42,
    borderRadius: 14,
    zIndex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  swipeText: {
    alignSelf: "center",
    fontSize: 14,
    fontWeight: "500",
    zIndex: 2,
    color: Color.blue[500],
  },
});
