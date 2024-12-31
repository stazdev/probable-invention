import { FlatList, View } from "react-native";
import React from "react";
import {
  EachNutritionRecipe,
  PetHeaderCard,
  ScreenWrapper,
  ThemedButton,
} from "@/components";
import { NUTRITION_RECIPES } from "@/mock";
import { nutritionScreenStyles } from "./styles";
const { listWrapStyles, contentStyles } = nutritionScreenStyles;
const NutritionScreen = () => {
  //TODO(Shola): I am to add the actual data for the active pet here
  const data = {
    name: "Maxi",
    avatarUri: "https://picsum.photos/200/300/?random",
  };

  return (
    <ScreenWrapper
      screenTitle="Pet Profile"
      screenSubtitle="Recipes"
      leftAlign
      RightComponent={<PetHeaderCard data={data} />}
    >
      <FlatList
        data={NUTRITION_RECIPES}
        numColumns={2}
        contentContainerStyle={contentStyles}
        columnWrapperStyle={listWrapStyles}
        renderItem={({ item }) => <EachNutritionRecipe data={item} />}
        keyExtractor={(item, index) => `${item.recipeDesc}-${index}`}
      />

      <View style={{ paddingHorizontal: 24 }}>
        <ThemedButton title="Add Recipe" />
      </View>
    </ScreenWrapper>
  );
};

export default NutritionScreen;
