import { TextInputProps } from "react-native";

export type RNInputProps = {
  placeholderText?: string;
  control: any;
  name: string;
  rules?: any;
  editable?: boolean;
  textInputProps?: TextInputProps;
};
