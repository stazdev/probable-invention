import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Color } from "@/constants/Colors";
import usePetStore from "@/store/usePetStore";

interface PetTypeStepProps {
  selectedType: "dog" | "other" | null;
  setSelectedType: (type: "dog" | "other" | null) => void;
}

const PetTypeStep: React.FC<PetTypeStepProps> = ({
  selectedType,
  setSelectedType,
}) => {
  const { updateStageData } = usePetStore()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Pet Type</Text>
      <View style={styles.cardContainer}>


        <TouchableOpacity
          style={[styles.card, selectedType === "dog" && styles.cardActive]}
          onPress={() => {
            updateStageData("type", "dog")
            setSelectedType("dog")
          }}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require("@/assets/images/dogPlaceholder.png")}
              style={styles.imagePlaceholder}
            />
          </View>
          <Text style={styles.cardText}>Dog</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, selectedType === "other" && styles.cardActive]}
          onPress={() => setSelectedType("other")}
        >
          <View style={styles.imageContainer}>
            <AntDesign
              name="plus"
              size={24}
              color={
                selectedType === "other" ? Color.blue[500] : Color.grey[500]
              }
            />
          </View>
          <Text style={styles.cardText}>Others</Text>
        </TouchableOpacity>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.updates.lightBackground,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    shadowColor: Color.grey[300],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 150,
    height: 150,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: Color.grey[200],
  },
  cardActive: {
    borderColor: "#007AFF",
    borderWidth: 1,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F5F5F5",
  },
  cardText: {
    fontSize: 16,
    fontWeight: "700",
    color: Color.grey[500],
  },
});

export default PetTypeStep;
