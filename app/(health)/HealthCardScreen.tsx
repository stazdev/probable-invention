import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { PetHeaderCard, ScreenWrapper } from "@/components";
import { ThemedText } from "@/components/ThemedText";

const HealthCardScreen = () => {
  //TODO(Shola): I am to add the actual data for the active pet here
  const data = {
    name: "Maxi",
    avatarUri: "https://picsum.photos/200/300/?random",
  };
  return (
    <ScreenWrapper
      screenTitle=""
      screenSubtitle="Pet Profile"
      leftAlign
      RightComponent={<PetHeaderCard data={data} />}
    >
      <ThemedText>Health Card Screen</ThemedText>
    </ScreenWrapper>
  );
};

export default HealthCardScreen;
