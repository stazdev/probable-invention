import { StyleSheet, View, Image, Dimensions } from "react-native";
import React, { useState, useCallback } from "react";
import { ThemedText } from "@/components/ThemedText";
import { Color } from "@/constants/Colors";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useAnimatedGestureHandler,
  runOnJS,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { RNRadioBtn, RNTouchable } from "@/components";
import usePetStore from "@/store/usePetStore";

const SCREEN_WIDTH = Dimensions.get("window").width;
const RULER_HEIGHT = 60;
const TICK_WIDTH = 2;
const TICK_HEIGHT = 15;
const MAJOR_TICK_HEIGHT = 24;
const TICK_GAP = 10;
const VALUE_RANGE = { min: 0, max: 50 };
const HANDLE_SIZE = 24;
const WEIGHT_TYPES = ["kg", "lb"];

const WeightRulerSlider = ({ onWeightChange, initialWeight = 22.2 }) => {
  const translateX = useSharedValue(
    -((initialWeight - VALUE_RANGE.min) * TICK_GAP)
  );
  const isGestureActive = useSharedValue(false);

  const getWeightFromTranslation = useCallback((translation) => {
    const position = -translation / TICK_GAP;
    return Math.round((position + VALUE_RANGE.min) * 10) / 10;
  }, []);

  const getTranslationFromWeight = useCallback((weight) => {
    return -((weight - VALUE_RANGE.min) * TICK_GAP);
  }, []);

  React.useEffect(() => {
    if (!isGestureActive.value) {
      translateX.value = getTranslationFromWeight(initialWeight);
    }
  }, [initialWeight]);

  const triggerHaptic = useCallback(() => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    } catch (error) {
      console.log("Haptic feedback error:", error);
    }
  }, []);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      isGestureActive.value = true;
    },
    onActive: (event, ctx) => {
      const newValue = ctx.startX + event.translationX;
      const maxTranslation = 0;
      const minTranslation = -((VALUE_RANGE.max - VALUE_RANGE.min) * TICK_GAP);

      const clampedValue = Math.max(
        Math.min(newValue, maxTranslation),
        minTranslation
      );

      if (translateX.value !== clampedValue) {
        translateX.value = clampedValue;
        const currentWeight = getWeightFromTranslation(clampedValue);
        runOnJS(onWeightChange)(currentWeight);
      }
    },
    onEnd: () => {
      const currentWeight = getWeightFromTranslation(translateX.value);
      const snappedWeight = Math.round(currentWeight * 10) / 10;
      translateX.value = withSpring(getTranslationFromWeight(snappedWeight), {
        damping: 20,
        stiffness: 200,
      });
      runOnJS(triggerHaptic)();
      isGestureActive.value = false;
    },
  });

  const rulerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const renderTicks = useCallback(() => {
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
              marginHorizontal: (TICK_GAP - TICK_WIDTH) / 2,
            },
          ]}
        />
      );
    }
    return ticks;
  }, []);

  return (
    <View style={styles.rulerContainer}>
      {/* Fixed track */}
      <View style={styles.sliderTrack} />

      {/* Fixed center handle */}
      <View style={styles.handleContainer}>
        <View style={styles.handle} />
      </View>

      {/* Movable ruler */}
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.ruler, rulerStyle]}>
          {renderTicks()}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const WeightStep = () => {
  const [weight, setWeight] = useState(22.2);
  const { updateStageData } = usePetStore();
  const [weightType, setWeightType] = useState("kg");

  const handleWeightChange = useCallback((newWeight) => {
    setWeight(newWeight);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <Image
              source={require("@/assets/images/dogPlaceholder.png")}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
      <View style={styles.textContainer}>
        <ThemedText
          color={Color.grey[800]}
          fontSize={14}
          family="NotoSans"
          style={styles.label}
        >
          What's your pet's weight?
        </ThemedText>
        <ThemedText
          color={Color.grey[700]}
          //
          type="Bold"
          family="NotoSans"
          fontSize={12}
          lineHeight={20}
          style={styles.subtitle}
        >
          Automatic selection based on your pet's breed. Adjust according to
          reality.
        </ThemedText>
      </View>

      <View style={styles.weightDisplayContainer}>
        <ThemedText
          color={Color.blue[500]}
          type="Bold"
          fontSize={40}
          style={styles.weightValue}
        >
          {weight.toFixed(1)}
        </ThemedText>
      </View>
      <WeightRulerSlider
        onWeightChange={handleWeightChange}
        initialWeight={weight}
      />

      <View style={styles.unitSelector}>
        {WEIGHT_TYPES.map((type, index) => {
          const isSelected = type == weightType;
          return (
            <RNTouchable
              key={`${type}-${index}`}
              style={{ flex: 1 }}
              onPress={() => {
                setWeightType(type);
                console.log(type, "here is the selected type");
                updateStageData("weight", { value: weight, type }); //TODO(Shola): Update this to have the actual weight value from the list
              }}
            >
              <View
                style={[
                  styles.unitButton,
                  {
                    borderColor: isSelected ? Color.blue[500] : Color.grey[200],
                  },
                ]}
              >
                <RNRadioBtn isActive={isSelected} />

                <ThemedText
                  color={isSelected ? Color.blue[500] : Color.grey[200]}
                >
                  {type}
                </ThemedText>
              </View>
            </RNTouchable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  circleContainer: {
    marginTop: 20,
  },
  outerCircle: {
    width: 166,
    height: 166,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: Color.grey[150],
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 133,
    height: 133,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: Color.grey[150],
    padding: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 200,
  },
  textContainer: {
    width: "100%",
    marginTop: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    paddingHorizontal: 24,
  },
  weightDisplayContainer: {
    height: 48,
    justifyContent: "center",
    marginBottom: 20,
  },
  weightValue: {
    textAlign: "center",
  },
  rulerContainer: {
    height: RULER_HEIGHT,
    width: SCREEN_WIDTH,
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  sliderTrack: {
    position: "absolute",
    width: "100%",
    height: 2,
    backgroundColor: Color.grey[200],
    top: "50%",
    marginTop: -1,
  },
  handleContainer: {
    position: "absolute",
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    zIndex: 2,
    alignSelf: "center",
  },
  handle: {
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    borderRadius: HANDLE_SIZE / 2,
    backgroundColor: Color.blue[500],
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  ruler: {
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
    paddingHorizontal: SCREEN_WIDTH / 2,
  },
  tick: {
    width: TICK_WIDTH,
  },
  unitSelector: {
    flexDirection: "row",
    marginTop: 20,
    gap: 16,
    paddingHorizontal: 54,
  },
  unitButton: {
    padding: 15,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
});

export default WeightStep;
