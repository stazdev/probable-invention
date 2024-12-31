import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  ImageBackground,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Color } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components";
import { TestIcon } from "@/assets/svg";
import { router } from "expo-router";



const { width, height } = Dimensions.get("window");

const OnboardingScreen = () => {
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: height * 0.5,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [slideAnim]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />

      {/* Background Gradient */}
      <LinearGradient
        colors={[
          "rgba(250, 250, 250, 0.9)",
          "rgba(250, 250, 250, 0.8)",
          "rgba(217, 217, 217, 0.7)",
          "rgba(217, 217, 217, 0.6)",
        ]}
        style={styles.gradient}
        locations={[0, 0.4, 0.7, 1]}
      />

      {/* Content Section with Dog Image */}
      <ImageBackground
        source={require("@/assets/images/dog.png")}
        style={styles.imageBackground}
        imageStyle={styles.dogImage}
      >
        <Animated.View
          style={[styles.contentContainer, { marginTop: slideAnim }]}
        >
          <View style={styles.iconContainerWrapper}>
            <View style={styles.iconContainer}>
              <TestIcon />
            </View>
          </View>
          <View style={{ marginTop: 50 }}>
            {/* Indicator */}
            <View style={styles.indicatorContainer}>
              <View style={[styles.indicator, styles.activeIndicator]} />
              <View style={styles.indicator} />
              <View style={styles.indicator} />
            </View>
            <ThemedText style={styles.title}>
              Personalized Pet Profiles
            </ThemedText>
            <ThemedText  style={styles.description}>
              Create personalized profiles for each of your beloved pets on
              PawBuddy. Share their name, breed, and age while connecting with a
              vibrant community.
            </ThemedText> 
             <ThemedButton
              title={"Get Started"}
              variant="primary"
              onPress={() => router.push("/(auth)")}
            />
            <ThemedButton title={"Sign up later"} variant="link" />
          </View>
        </Animated.View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  imageBackground: {
    flex: 1,
  },
  dogImage: {
    position: "absolute",
    top: 0,
    width: width,
    height: height,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainerWrapper: {
    position: "absolute",
    top: -height * 0.05,
    alignSelf: "center",
  },
  iconContainer: {
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 100,
    marginBottom: 16,
  },
  icon: {
    width: 80,
    height: 80,
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
    color: Color.grey[800],
  },
  description: {
    color: Color.grey[600],
    textAlign: "center",
    marginBottom: 35,
  },

  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  indicator: {
    width: 59,
    height: 3,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeIndicator: {
    height: 6,
    backgroundColor: Color.yellow[500],
  },
});

export default OnboardingScreen;
