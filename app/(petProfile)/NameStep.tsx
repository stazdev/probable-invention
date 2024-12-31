import { RNInput, ThemedInput } from "@/components";
import { ThemedText } from "@/components/ThemedText";
import { Color } from "@/constants/Colors";
import usePetStore from "@/store/usePetStore";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View, Image } from "react-native";

const NameStep = () => {
  const { updateStageData } = usePetStore();
  const { control, watch } = useForm({
    defaultValues: {
      petName: "",
    },
  });

  const { petName } = watch();

  useEffect(() => {
    updateStageData("name", petName);
  }, [petName]);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: 280,
          height: 280,
          borderRadius: 200,
          borderWidth: 1,
          borderColor: Color.grey[150],
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 226,
            height: 226,
            borderRadius: 200,
            borderWidth: 1,
            borderColor: Color.grey[150],
            padding: 18,
          }}
        >
          <Image
            source={require("@/assets/images/dogPlaceholder.png")}
            style={{ width: "100%", height: "100%", borderRadius: 200 }}
            resizeMode="cover"
          />
        </View>
      </View>
      <View style={{ width: "100%", marginTop: 24 }}>
        <ThemedText color={Color.grey[800]} fontSize={14} style={styles.label}>
          What's your pet's name?
        </ThemedText>

        <RNInput
          control={control}
          name="petName"
          placeholderText="Your pet's name"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    marginHorizontal: 24,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default NameStep;
