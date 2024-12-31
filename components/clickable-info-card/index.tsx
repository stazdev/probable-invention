import { View } from "react-native";
import React from "react";
import { Color } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";
import { BlueRightArrowIcon } from "@/assets/svg";
import RNTouchable from "../rn-touchable";
import { clickableInfoCardStyles } from "./styles";
import type { ClickableInfoCardProps } from "./types";

const { clickableCardWrap, clicableInfoWrap } = clickableInfoCardStyles;

const ClickableInfoCard = ({
  Icon,
  title,
  subTitle,
  CustomRightComponent,
  onPress = () => null,
}: ClickableInfoCardProps) => {
  return (
    <View style={clickableCardWrap}>
      <View style={clicableInfoWrap}>
        <Icon />
        <View>
          <ThemedText type="Semibold" color={Color.grey[800]}>
            {title}
          </ThemedText>
          {subTitle && (
            <ThemedText color={Color.grey[700]} fontSize={14}>
              {subTitle}
            </ThemedText>
          )}
        </View>
      </View>

      {CustomRightComponent ? (
        CustomRightComponent
      ) : (
        <RNTouchable onPress={onPress}>
          <BlueRightArrowIcon />
        </RNTouchable>
      )}
    </View>
  );
};

export default ClickableInfoCard;
