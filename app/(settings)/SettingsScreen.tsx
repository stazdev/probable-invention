import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { ClickableInfoCard, ScreenWrapper } from "@/components";
import { SETTING_ACTIONS } from "@/mock";
import { ClickableInfoCardProps } from "@/components/clickable-info-card/types";
import { ThemedText } from "@/components/ThemedText";
import { Color } from "@/constants/Colors";

const SettingsScreen = () => {
  const [state, setState] = useState(false);

  const RenderCard = ({ list }: { list: ClickableInfoCardProps[] }) => {
    return (
      <View style={{rowGap: 16}}>
        {list.map((data) => {
          const { subTitle, title, Icon } = data;
          return (
            <ClickableInfoCard
              title={title}
              subTitle={subTitle}
              Icon={Icon}
              onPress={() => console.log("yes")}
            />
          );
        })}
      </View>
    );
  };

  return (
    <ScreenWrapper screenTitle="Settings">
      <ScrollView>
        <View style={{rowGap: 24, paddingHorizontal: 24}}>
        {SETTING_ACTIONS.map(({ title, LIST }) => {
          return (
            <View style={{rowGap: 16}}>
              <ThemedText type="Medium" color={Color.grey[800]}>{title}</ThemedText>
              <RenderCard list={LIST} />
            </View>
          );
        })}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
