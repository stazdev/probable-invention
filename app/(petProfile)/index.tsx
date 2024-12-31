import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import BreedStep from "./BreedStep";
import NameStep from "./NameStep";
import { LeftIcon } from "@/assets/icons";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Color } from "@/constants/Colors";
import { router } from "expo-router";
import PetTypeStep from "./PetTypeStep";
import SizeStep from "./SizeStep";
import WeightStep from "./WeightStep";
import DateStep from "./DateStep";
import SitterStep from "./SitterStep";
import { HeaderStepperBar, ThemedButton } from "../../components";
import { ThemedText } from "../../components/ThemedText";
import usePetStore from "@/store/usePetStore";

interface PetData {
  breed: string;
  name: string;
}

const Index: React.FC = () => {
  const inset = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState<"dog" | "other" | null>(
    null
  );
  const { currentStageData } = usePetStore();
  const isLastStep = currentStep == 7;

  const [showDateCalendar, setShowDateCalendar] = useState(false);

  const handleContinue = () => {
    console.log(currentStageData, "Here is the data");

    if (currentStep === 1) {
      if (selectedType === "dog") {
        setCurrentStep(2);
      } else if (selectedType === "other") {
        setCurrentStep(3);
      }
    } else if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 7) {
      console.log(
        JSON.stringify(currentStageData, null, 2),
        "Here is the data"
      );
      // router.push("/(drawer)/dashboard");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PetTypeStep
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        );
      case 2:
        return <BreedStep />;
      case 3:
        return <NameStep />;
      case 4:
        return <SizeStep />;
      case 5:
        return <WeightStep />;
      case 6:
        return <DateStep showCalendar={showDateCalendar} />;
      case 7:
        return <SitterStep />;
      default:
        return null;
    }
  };
  const PET_DESC_STEPS = [
    "type",
    "breed",
    "name",
    "size",
    "weight",
    "weight",
    "careTakers",
  ];

  const goBackAction = () => {
    if (currentStep > 1) {
      setCurrentStep((step) => step - 1);
    } else {
      router.back();
    }
  };

  const STEPS_TEXT = [
    "Pet Type",
    "Breed",
    "Name",
    "Size",
    "Weight",
    "Important Dates",
    "Pet Sitter",
  ];

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={[styles.container, { paddingTop: inset.top }]}>
        <HeaderStepperBar
          headerText="Add Pet Profile"
          subHeaderText={STEPS_TEXT[currentStep - 1]}
          currentStep={currentStep}
          totalStep={7}
          onBackPress={goBackAction}
        />

        <ScrollView contentContainerStyle={styles.contentContainer}>
          {renderStep()}
        </ScrollView>

        <View style={currentStep <= 2 ? styles.buttonContainer : {}}>
          <ThemedButton
            customButtonStyle={{ marginHorizontal: 24 }}
            title={"Continue"}
            onPress={handleContinue}
            disabled={
              isLastStep
                ? currentStageData[PET_DESC_STEPS[currentStep - 1]].length == 0
                : !currentStageData[PET_DESC_STEPS[currentStep - 1]]
            }
          />

          {currentStep <= 2 && (
            <TouchableOpacity>
              <ThemedText
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  color: Color.grey[500],
                }}
                fontSize={14}
                type="Semibold"
              >
                Skip for now
              </ThemedText>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.updates.lightBackground,
  },
  headerContainer: {
    paddingBottom: 24,
    backgroundColor: Color.updates.lightBackground,
    shadowColor: Color.grey[200],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  headerTitle: {
    alignItems: "center",
  },
  stepIndicator: {
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: Color.grey[800],
  },
  stepText: {
    fontSize: 14,
    fontWeight: "400",
    color: Color.grey[600],
  },
  progressContainer: {
    marginTop: 18,
    paddingHorizontal: 24,
  },
  progressBar: {
    height: 3,
    backgroundColor: Color.grey[100],
    borderRadius: 2,
  },
  progressIndicator: {
    height: 3,
    backgroundColor: Color.yellow[500],
    borderRadius: 2,
  },
  progressText: {
    fontSize: 16,
    fontWeight: "400",
  },
  contentContainer: {
    flexGrow: 1,
    // padding: 20,
  },
  buttonContainer: {
    paddingVertical: 24,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    shadowColor: Color.grey[400],
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
});

export default Index;
