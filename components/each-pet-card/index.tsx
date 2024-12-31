import { View, Image } from "react-native";
import React from "react";
import { BlueRippleIcon } from "@/assets/svg";
import { ThemedText } from "../ThemedText";
import { Color } from "@/constants/Colors";
import { eachPetCardStyles } from "./styles";
import { SCREEN_WIDTH } from "@/resources/config";
import { PetDetailsProps } from "./types";

const { petProfileCard, petInfo, petImage } = eachPetCardStyles;

const EachPetCard = ({ data }: { data: PetDetailsProps }) => {
    const {name, breed, petType, avatarUri} = data
  return (
    <View style={{ width: SCREEN_WIDTH, paddingHorizontal: 24 }}>
      <View style={[petProfileCard, { paddingHorizontal: 24 }]}>
        <View style={petInfo}>
          <ThemedText type="Semibold" fontSize={20} color={Color.updates.white}>
            {name}
          </ThemedText>
          <ThemedText fontSize={14} color={Color.grey[150]} style={{textTransform: "capitalize"}}>
            {petType} | {breed}
          </ThemedText>
        </View>
        <View style={{ position: "absolute", top: 0, right: 0 }}>
          <BlueRippleIcon />
        </View>
        <Image source={{ uri: avatarUri }} style={petImage} />
      </View>
    </View>
  );
};

export default EachPetCard;
