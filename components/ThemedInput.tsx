import { Color } from "@/constants/Colors";
import React, { useState } from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";

interface ThemedInputProps extends TextInputProps {
  placeholder: string;
  icon?: React.ReactNode; // Optional icon
  iconLeft?: React.ReactNode; // Optional icon
}

const ThemedInput: React.FC<ThemedInputProps> = ({
  placeholder,
  icon,
  iconLeft,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.focusedContainer]}>
      {iconLeft && <View style={styles.iconContainer}>{iconLeft}</View>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={Color.grey[600]}
        {...props}
      />
      {icon && <View style={styles.iconContainer}>{icon}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Color.grey[200],
    borderRadius: 14,
    paddingHorizontal: 16,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  focusedContainer: {
    borderColor: Color.blue[500],
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Color.grey[800],
    lineHeight: 18,
    height: 54
  },
  iconContainer: {
    marginLeft: 10,
  },
});

export default ThemedInput;



