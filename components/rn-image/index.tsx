import { View, Image } from "react-native";
import React from "react";
import type { RNImageProps } from "./types";

const RNImage = ({ uri, circle, height, width, bR, ui }: RNImageProps) => {
  return (
    <View style={{ height, width }}>
      <Image
        source={{ uri }}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: circle ? height / 2 : bR,
          borderWidth: 0,
          ...ui,
        }}
      />
    </View>
  );
};

export default RNImage;
