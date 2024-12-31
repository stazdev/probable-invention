import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";

import { Color } from "@/constants/Colors";
import RNRadioBtn from "./rn-radio-btn";
import RNTouchable from "./rn-touchable";
import usePetStore from "@/store/usePetStore";

export interface NameRowCardProps {
  avatarUri: string;
  title: string;
  subtitle: string;
}
const NameRowCard = ({ data }: { data: NameRowCardProps }) => {
  const { title, subtitle } = data;
  const { updateStageData, currentStageData } = usePetStore();
  const allCareTakers = currentStageData["careTakers"];
  let isCareTakerSelected = allCareTakers.includes(data);

  let addOption = () => {
    if (isCareTakerSelected) {
      let newTitle = allCareTakers.filter((select: unknown) => select != data);
      updateStageData("careTakers", [...newTitle]);
    } else {
      updateStageData("careTakers", [...currentStageData.careTakers, data]);
    }
  };

  return (
    <RNTouchable onPress={addOption}>
      <View style={styles.rowCard}>
        <View
          style={{
            width: 54,
            height: 54,
            backgroundColor: "lightgrey",
            borderRadius: 54 / 2,
          }}
        />

        <View style={styles.rowCardContent}>
          <ThemedText type="Semibold" style={styles.rowCardtitle}>
            {title}
          </ThemedText>
          <ThemedText fontSize={14} style={styles.rowCardsubtitle}>
            {subtitle}
          </ThemedText>
        </View>

        <RNRadioBtn isActive={isCareTakerSelected} />
      </View>
    </RNTouchable>
  );
};

export default NameRowCard;
const styles = StyleSheet.create({
  rowCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: Color.grey[200],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    columnGap: 10,
  },
  icon: {
    marginRight: 10,
  },
  rowCardContent: {
    flex: 1,
  },
  rowCardtitle: {
    fontSize: 14,
    color: Color.grey[800],
    fontWeight: "600",
  },
  rowCardsubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: Color.grey[600],
  },
  rowCardDetail: {
    marginLeft: 16,
    borderLeftWidth: 1,
    borderLeftColor: Color.grey[150],
    paddingLeft: 16,
  },
  rowCardDetailText: {
    fontSize: 16,
    fontWeight: "600",
    color: Color.grey[800],
  },
});
