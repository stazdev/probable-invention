import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";

const ActivityScreen = () => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text>Activity Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActivityScreen;
