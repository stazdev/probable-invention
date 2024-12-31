import { View, FlatList, Image } from "react-native";
import React from "react";
import { Color } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";
import { USER_PETS } from "@/mock";

import type { PetDetailsProps } from "../each-pet-card/types";
import { drawerUserPostStyles } from "./styles";

const PetAvatarName = ({
  isActive = true,
  data,
}: {
  isActive?: boolean;
  data: PetDetailsProps;
}) => {
  const { name } = data;
  const { petAvatarWrap, avatarStyle, petNameText } = drawerUserPostStyles({
    isActive,
  });
  return (
    <View style={petAvatarWrap}>
      <Image
        source={{ uri: "https://picsum.photos/200/300/?random" }}
        style={avatarStyle}
      />
      <ThemedText type={isActive ? "Semibold" : "Regular"} style={petNameText}>
        {name}
      </ThemedText>
    </View>
  );
};

const DrawerUserPets = () => {
  const isActive = false;
  const { listWrapper, addNewBtn } = drawerUserPostStyles({ isActive });
  return (
    <View style={listWrapper}>
      <FlatList
        data={USER_PETS}
        contentContainerStyle={{ columnGap: 16 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => <PetAvatarName data={item} />}
      />
      <View style={{ rowGap: 8 }}>
        <View style={addNewBtn}></View>
        <ThemedText color={Color.grey[400]}>Add New</ThemedText>
      </View>
    </View>
  );
};

export default DrawerUserPets;
