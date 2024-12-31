import { View } from "react-native";
import React from "react";
import RNImage from "../rn-image";
import { ThemedText } from "../ThemedText";
import { Color } from "@/constants/Colors";
import { petHeaderCardStyles } from "./styles";
const { petHeaderWrap } = petHeaderCardStyles;

const PetHeaderCard = ({
  data,
}: {
  data: { name: string; avatarUri: string };
}) => {
  const { name, avatarUri } = data;

  return (
    <View style={petHeaderWrap}>
      <RNImage uri={avatarUri} circle width={20} height={20} />
      <ThemedText family="NotoSans" type="Medium" color={Color.grey[800]}>
        {name}
      </ThemedText>
    </View>
  );
};

export default PetHeaderCard;
