import React from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import RNTouchable from "../rn-touchable";
import { Color } from "@/constants/Colors";
import { rnToggleSwitchStyles } from "./styles";
const { toggleBgWrap, toggleControlWrap } = rnToggleSwitchStyles;

interface HMToggleSwitchProps {
  value: boolean;
  onValueChange: () => void;
}

const HMToggleSwitch = ({ value, onValueChange }: HMToggleSwitchProps) => {
  const isActive = useSharedValue(value ? 1 : 0);

  React.useEffect(() => {
    isActive.value = value ? 1 : 0;
  }, [value]);

  const handlePress = () => {
    onValueChange?.();
  };

  const rStyle = useToggleAnimation(isActive);
  const animatedStyle = useBackgroundAnimation(isActive);

  return (
    <RNTouchable onPress={handlePress}>
      <Animated.View style={[toggleBgWrap, animatedStyle]}>
        <Animated.View style={[toggleControlWrap, rStyle]} />
      </Animated.View>
    </RNTouchable>
  );
};

export default HMToggleSwitch;

// Animation and styles at the bottom
const useToggleAnimation = (isActive: Animated.SharedValue<number>) => {
  const INACTIVE_POSITION = 3.75;
  const ACTIVE_POSITION = 42 - 16.5 - INACTIVE_POSITION;

  return useAnimatedStyle(() => {
    return {
      left: withTiming(
        isActive.value === 0 ? INACTIVE_POSITION : ACTIVE_POSITION,
        { duration: 150 }
      ),
    };
  }, [isActive.value]);
};

const useBackgroundAnimation = (isActive: Animated.SharedValue<number>) => {
  return useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      isActive.value,
      [0, 1],
      [Color.grey[200], Color.blue[500]]
    );

    return {
      backgroundColor,
    };
  });
};
