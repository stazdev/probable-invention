import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  ImageBackground,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Color } from "@/constants/Colors";
import { UserCircleIcon } from "@/assets/icons";
import { router } from "expo-router";
import { ThemedText } from "../../components/ThemedText";
import { ThemedButton, ThemedInput } from "../../components";

const { width, height } = Dimensions.get("window");

const SignupScreen = () => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: height * 0.4,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [slideAnim]);

  const toggleCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <Animated.View
                style={[styles.contentContainer, { marginTop: slideAnim }]}
              >
                <View style={styles.iconContainerWrapper}>
                  <View style={styles.iconContainer}>
                    <UserCircleIcon />
                  </View>
                </View>
                <View style={{ marginTop: 50 }}>
                  <ThemedText type="heading2" style={styles.title}>
                    Create account
                  </ThemedText>
                  <ThemedText type="default" style={styles.description}>
                    Welcome! Please enter your information below and get
                    started.
                  </ThemedText>
                  <View>
                    <ThemedInput placeholder={"Your Email"} />
                    <ThemedInput placeholder={"Password"} secureTextEntry />
                  </View>
                  <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                      onPress={toggleCheckbox}
                      style={styles.checkboxWrapper}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          isChecked && styles.checkedCheckbox,
                        ]}
                      />
                    </TouchableOpacity>
                    <ThemedText style={styles.TandC}>
                      Accept Terms and Conditions
                    </ThemedText>
                  </View>
                  <ThemedButton
                    title={"Create account"}
                    variant="primary"
                    onPress={() => router.push("/verificationScreen")}
                    disabled={!isChecked}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <ThemedText
                      color={Color.blue[500]}
                      fontSize={14}
                    >
                      Already have an account? Log in here!
                    </ThemedText>
                  </View>
                </View>
              </Animated.View>
            </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
    top: -30,
    width: width,
    height: height,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Color.grey[0],
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
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 24,
  },
  checkboxWrapper: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Color.grey[400],
    backgroundColor: "#fff",
  },
  checkedCheckbox: {
    backgroundColor: Color.blue[500],
  },
  TandC: {
    color: Color.grey[600],
    fontSize: 14,
  },
});

export default SignupScreen;
