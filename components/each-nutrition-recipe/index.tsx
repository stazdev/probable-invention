import { View } from "react-native";
import React from "react";
import { ThemedText } from "../ThemedText";
import { RecipeRippleIcon } from "@/assets/svg";
import RNImage from "../rn-image";
import { eachRecipesStyles } from "./styles";
import type { EachNutritionRecipeProps } from "./types";

const {
  shadowWrap,
  eachRecipeWrap,
  rippleIconBg,
  recipeDescText,
  recipeImgWrap,
} = eachRecipesStyles;

const EachNutritionRecipe = ({ data }: { data: EachNutritionRecipeProps }) => {
  const { recipeDesc, recipeImgUri } = data;
  return (
    <View style={shadowWrap}>
      <View style={eachRecipeWrap}>
        <View style={rippleIconBg}>
          <RecipeRippleIcon />
        </View>

        <View style={recipeImgWrap}>
          <RNImage uri={recipeImgUri} width={94} height={94} circle />
        </View>

        <ThemedText type="Semibold" style={recipeDescText}>
          {recipeDesc}
        </ThemedText>
      </View>
    </View>
  );
};

export default EachNutritionRecipe;
