import { FlatList, View } from "react-native";
import React, { useState } from "react";
import { PetProfileCard, RNSegmentedTab, ScreenWrapper } from "@/components";
import { USER_PETS } from "@/mock";
import { ThemedText } from "@/components/ThemedText";
import { Color } from "@/constants/Colors";

const ShareProfileScreen = () => {
  const [selectedOption, setSelectedOption] = useState<
    "Generate" | "Scan Code"
  >("Generate");

  const FooterComponent = () => {
    return (
      <ThemedText
        style={{ textAlign: "center", color: Color.grey[500] }}
        fontSize={13}
      >
        Generate a QR code and invite link for each pet and easily syncronise
        data with other users
      </ThemedText>
    );
  };
  return (
    <ScreenWrapper screenTitle="Share Profiles">
      <RNSegmentedTab
        options={["Generate", "Scan Code"]}
        selectedOption={selectedOption}
        onOptionPress={setSelectedOption}
      />

      <FlatList
        data={USER_PETS}
        contentContainerStyle={{ rowGap: 16, paddingHorizontal: 24 }}
        renderItem={({ item }) => <PetProfileCard data={item} />}
        keyExtractor={(item, index) => `${item.breed}-${index}`}
        ListFooterComponent={FooterComponent}
      />
    </ScreenWrapper>
  );
};

export default ShareProfileScreen;
