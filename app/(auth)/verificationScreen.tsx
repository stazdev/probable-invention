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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Color } from "@/constants/Colors";
import { ScanCircleIcon } from "@/assets/icons";
import { router } from "expo-router";
import { OtpInput } from "react-native-otp-entry";
import { ThemedText } from "../../components/ThemedText";
import { ThemedButton } from "../../components";

const { width, height } = Dimensions.get("window");

const VerificationScreen = () => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const [resendAvailable, setResendAvailable] = useState(false);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: height * 0.5,
      duration: 800,
      useNativeDriver: false,
    }).start();

    // Enable resend option after 60 seconds
    const timer = setTimeout(() => setResendAvailable(true), 60000);
    return () => clearTimeout(timer);
  }, [slideAnim]);

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
                    <ScanCircleIcon />
                  </View>
                </View>
                <View style={{ marginTop: 50 }}>
                  <ThemedText  style={styles.title}>
                    Validation Code
                  </ThemedText>
                  <ThemedText style={styles.description}>
                    Check your email inbox and enter the validation code here
                  </ThemedText>
                  <View>
                    <OtpInput
                      numberOfDigits={5}
                      focusColor={Color.blue[500]}
                      autoFocus={false}
                      hideStick={true}
                      placeholder="_____"
                      blurOnFilled={true}
                      disabled={false}
                      type="numeric"
                      secureTextEntry={false}
                      focusStickBlinkingDuration={500}
                      onTextChange={(text) => console.log(text)}
                      theme={{
                        containerStyle: styles.pinContainer,
                        pinCodeContainerStyle: styles.pinCodeContainer,
                        pinCodeTextStyle: styles.pinCodeText,
                        focusedPinCodeContainerStyle:
                          styles.activePinCodeContainer,
                        // placeholderTextStyle: styles.placeholderText,
                        // filledPinCodeContainerStyle:
                        //   styles.filledPinCodeContainer,
                      }}
                    />
                  </View>

                  <ThemedButton
                    title={"Confirm"}
                    variant="primary"
                    onPress={() => router.replace("/dashboard")}
                  />

                  {/* Resend Option */}
                  <View style={styles.resendContainer}>
                    <ThemedText style={styles.resendText}>
                      Did not receive a code?
                    </ThemedText>
                    <ThemedText
                      style={styles.resendLink}
                      onPress={() => console.log("Resend Code")}
                    >
                      Resend
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
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  resendText: {
    color: Color.grey[500],
    marginRight: 4,
    fontSize: 14,
    fontWeight: "500",
  },
  resendLink: {
    color: Color.blue[500],
    fontWeight: "500",
  },
  resendTimer: {
    color: Color.grey[400],
  },
  pinContainer: {
    marginBottom: 48,
  },
  pinCodeContainer: {
    backgroundColor: "#fff",
    width: 54,
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Color.grey[400],
  },
  activePinCodeContainer: {
    borderColor: Color.blue[100],
    borderWidth: 2,
  },
  pinCodeText: {
    fontSize: 20,
    color: Color.grey[800],
  },
});

export default VerificationScreen;
