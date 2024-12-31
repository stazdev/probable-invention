import { View, Text } from "react-native";
import React from "react";
import { Color } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";
import { petProfileCardStyles } from "./styles";
import { FemaleGenderIcon, MaleGenderIcon } from "@/assets/svg";
import RNImage from "../rn-image";
import { PetDetailsProps } from "../each-pet-card/types";

const PetProfileCard = ({ data }: { data: PetDetailsProps }) => {
  const { avatarUri, breed, name, petType, gender } = data;
  const isFemale = gender == "female";
  const {
    petProfileWrap,
    avatarProfileWrap,
    petTypeInfo,
    seperateBar,
    genderBadgeBg,
  } = petProfileCardStyles({
    isFemale,
  });
  return (
    <View style={petProfileWrap}>
      <View style={avatarProfileWrap}>
        <RNImage uri={avatarUri} width={54} height={54} circle />

        <View>
          <ThemedText type="Semibold" color={Color.grey[800]}>
            {name}
          </ThemedText>
          <View style={petTypeInfo}>
            <ThemedText fontSize={14} family="NotoSans">
              {petType}
            </ThemedText>
            <View style={seperateBar} />
            <ThemedText fontSize={14} family="NotoSans">
              {breed}
            </ThemedText>
          </View>
        </View>
      </View>

      <View style={genderBadgeBg}>
        {isFemale ? <FemaleGenderIcon /> : <MaleGenderIcon />}
      </View>
    </View>
  );
};

export default PetProfileCard;
