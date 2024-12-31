import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Color } from "@/constants/Colors";
export interface RowCardProps {
  icon: React.ReactNode;
  label: string;
  date: string;
  detail?: string;
}
const RowCard: React.FC<RowCardProps> = ({ icon, label, date, detail }) => {
  return (
    <View style={styles.rowCard}>
      <View style={styles.icon}>{icon}</View>
      <View style={styles.rowCardContent}>
        <ThemedText style={styles.rowCardLabel}>{label}</ThemedText>
        <ThemedText style={styles.rowCardDate}>{date}</ThemedText>
      </View>
      {detail && (
        <View style={styles.rowCardDetail}>
          <ThemedText style={styles.rowCardDetailText}>{detail}</ThemedText>
        </View>
      )}
    </View>
  );
};
export default RowCard;
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
  },
  icon: {
    marginRight: 10,
  },
  rowCardContent: {
    flex: 1,
  },
  rowCardLabel: {
    fontSize: 14,
    fontWeight: "400",
    color: Color.grey[600],
  },
  rowCardDate: {
    fontSize: 14,
    color: Color.grey[800],
    fontWeight: "600",
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
