import React from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import RNTouchable from "../rn-touchable";
import { ThemedText } from "../ThemedText";
import { Color } from "@/constants/Colors";
import { SCREEN_WIDTH } from "@/resources/config";
import type { RNSegmentedControlProps } from "./types";
import { rnSegmentedTabStyles } from "./styles";

const RNSegmentedTab = <T extends string>({
  options,
  selectedOption,
  onOptionPress,
}: RNSegmentedControlProps<T>) => {
  const styles = rnSegmentedTabStyles({});
  const internalPadding = 8;
  const segmentedWidth = SCREEN_WIDTH - 24 * 2;
  const itemWidth = (segmentedWidth - internalPadding) / options.length;

  const rStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(
        itemWidth * options.indexOf(selectedOption) + internalPadding / 2
      ),
    };
  }, [selectedOption, options, itemWidth]);

  return (
    <View
      style={styles.tabWrap}
    >
      <View
        style={[
          styles.segmentedTabWrap,
          {
            width: segmentedWidth,
            paddingLeft: internalPadding / 2,
          },
        ]}
      >
        <Animated.View
          style={[
            {
              width: itemWidth,
            },
            styles.movingTab,
            rStyle,
          ]}
        />
        {options.map((option, index) => {
          const isActiveOption = option == selectedOption;
          return (
            <RNTouchable
              onPress={() => {
                onOptionPress?.(option);
              }}
              key={`${index}-${option}`}
              style={{
                width: itemWidth,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ThemedText
                type="Medium"
                color={isActiveOption ? Color.updates.white : Color.grey[600]}
              >
                {option}
              </ThemedText>
            </RNTouchable>
          );
        })}
      </View>
    </View>
  );
};

export default RNSegmentedTab;
