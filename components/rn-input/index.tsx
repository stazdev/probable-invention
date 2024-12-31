import React from "react";
import { Controller } from "react-hook-form";
import { TextInput, View } from "react-native";
import { Color } from "@/constants/Colors";
import type { RNInputProps } from "./types";
import { rnInputStyles } from "./styles";

const RNInput = ({
  placeholderText = "",
  name,
  control,
  rules = {},
  editable = true,
  textInputProps,
}: RNInputProps) => {
  const { inputStyles } = rnInputStyles;
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error }, //NOTE(Shola): Track the error state later to show the error message
      }) => (
        <>
          <TextInput
            {...textInputProps}
            style={inputStyles}
            onChangeText={onChange}
            editable={editable}
            autoFocus
            onBlur={onBlur}
            value={value}
            placeholder={placeholderText}
            placeholderTextColor={Color.grey[400]}
          />
        </>
      )}
    />
  );
};

export default RNInput;
