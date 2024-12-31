import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useAnimatedGestureHandler,
  runOnJS,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { ThemedText } from "@/components/ThemedText";
import { Color } from "@/constants/Colors";

const RULER_HEIGHT = 40;
const TICK_WIDTH = 2;
const TICK_HEIGHT = 15;
const MAJOR_TICK_HEIGHT = 24;
const TICK_GAP = 10;
const VALUE_RANGE = { min: 0, max: 50 };

const WeightRulerSlider = ({ onWeightChange, initialWeight = 22.2 }) => {
  const translateX = useSharedValue(0);
  const previousValue = useSharedValue(initialWeight);

  const weightToPosition = (weight: number) => {
    return -((weight - VALUE_RANGE.min) * TICK_GAP);
  };

  const positionToWeight = (position: number) => {
    return -(position / TICK_GAP) + VALUE_RANGE.min;
  };

  useEffect(() => {
    translateX.value = weightToPosition(initialWeight);
  }, [initialWeight]);

  const triggerHaptic = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      const newValue = ctx.startX + event.translationX;
      const maxTranslation = 0;
      const minTranslation = -((VALUE_RANGE.max - VALUE_RANGE.min) * TICK_GAP);

      translateX.value = Math.max(
        Math.min(newValue, maxTranslation),
        minTranslation
      );

      const currentValue =
        Math.round(positionToWeight(translateX.value) * 10) / 10;
      if (Math.abs(currentValue - previousValue.value) >= 0.1) {
        runOnJS(triggerHaptic)();
        runOnJS(onWeightChange)(currentValue);
        previousValue.value = currentValue;
      }
    },
    onEnd: () => {
      const snapValue =
        Math.round(positionToWeight(translateX.value) * 10) / 10;
      translateX.value = withSpring(weightToPosition(snapValue), {
        damping: 20,
        stiffness: 200,
      });
    },
  });

  const rulerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const renderTicks = () => {
    const ticks = [];
    const totalTicks = (VALUE_RANGE.max - VALUE_RANGE.min) * 10;

    for (let i = 0; i <= totalTicks; i++) {
      const isMajorTick = i % 10 === 0;
      ticks.push(
        <View
          key={i}
          style={[
            styles.tick,
            {
              height: isMajorTick ? MAJOR_TICK_HEIGHT : TICK_HEIGHT,
              backgroundColor: isMajorTick ? Color.grey[800] : Color.grey[400],
            },
          ]}
        />
      );
    }
    return ticks;
  };

  const currentWeight = Math.abs(
    Math.round(positionToWeight(translateX.value) * 10) / 10
  );

  return (
    <View style={styles.container}>
      <View style={styles.valueContainer}>
        <ThemedText
          color={Color.blue[500]}
          fontWeight={700}
          fontSize={40}
          style={styles.valueText}
        >
          {currentWeight.toFixed(1)}
        </ThemedText>
      </View>
      <View style={styles.rulerContainer}>
        <View style={styles.centerIndicator} />
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.ruler, rulerStyle]}>
            {renderTicks()}
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
  },
  valueContainer: {
    marginBottom: 20,
    height: 48,
    justifyContent: "center",
  },
  valueText: {
    textAlign: "center",
  },
  rulerContainer: {
    height: RULER_HEIGHT,
    width: "100%",
    overflow: "hidden",
    position: "relative",
  },
  centerIndicator: {
    position: "absolute",
    width: 3,
    height: MAJOR_TICK_HEIGHT,
    backgroundColor: Color.blue[500],
    left: "50%",
    marginLeft: -1.5,
    zIndex: 1,
  },
  ruler: {
    flexDirection: "row",
    height: "100%",
    alignItems: "flex-end",
    paddingHorizontal: "50%",
  },
  tick: {
    width: TICK_WIDTH,
    marginHorizontal: (TICK_GAP - TICK_WIDTH) / 2,
  },
});

export default WeightRulerSlider;
