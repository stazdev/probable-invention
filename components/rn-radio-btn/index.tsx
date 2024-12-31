import { View, Text } from "react-native";
import React from "react";
import { rnRadioBtnStyles } from "./styles";

const RNRadioBtn = ({ isActive }: { isActive: boolean }) => {
  const { outerCircle, innerCircle } = rnRadioBtnStyles({ isActive });
  return (
    <View style={outerCircle}>
      <View style={innerCircle} />
    </View>
  );
};

export default RNRadioBtn;
