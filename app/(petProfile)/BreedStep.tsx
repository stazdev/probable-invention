import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Color } from "@/constants/Colors";
import usePetStore from "@/store/usePetStore";

interface Dog {
  id: number;
  name: string;
  image: any;
}

const dogs: Dog[] = [
  { id: 1, name: "Akita", image: require("@/assets/images/akita.png") },
  { id: 2, name: "Beagle", image: require("@/assets/images/beagle.png") },
  { id: 3, name: "Bichon Frise", image: require("@/assets/images/bichon.png") },
  {
    id: 4,
    name: "Border Collie",
    image: require("@/assets/images/border.png"),
  },
  { id: 5, name: "Boxer", image: require("@/assets/images/beagle.png") },
  { id: 6, name: "Chow Chow", image: require("@/assets/images/akita.png") },
];

const BreedStep = () => {
  const [selectedDog, setSelectedDog] = useState<number | null>(null);
  const { updateStageData } = usePetStore();

  return (
    <View style={styles.cardContainer}>
      {dogs.map((dog) => {
        const isDogSelected = selectedDog == dog.id;

        return (
          <TouchableOpacity
            key={dog.id}
            style={[styles.card, isDogSelected && styles.cardActive]}
            onPress={() => {
              updateStageData("breed", dog.name);
              setSelectedDog(dog.id);
            }}
          >
            <Text style={[styles.cardText, isDogSelected && styles.textActive]}>
              {dog.name}
            </Text>
            <Image source={dog.image} style={styles.imagePlaceholder} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: Color.grey[300],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: Color.grey[200],
    justifyContent: "center",
    paddingTop: 10,
  },
  cardActive: {
    borderColor: Color.blue[500],
    borderWidth: 2,
  },
  textActive: {
    color: Color.blue[500],
  },
  imagePlaceholder: {
    resizeMode: "contain",
  },
  cardText: {
    fontSize: 14,
    fontWeight: "600",
    color: Color.grey[800],
    marginBottom: 10,
  },
});

export default BreedStep;
