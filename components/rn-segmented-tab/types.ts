export type RNSegmentedControlProps<T extends string> = {
    options: T[];
    selectedOption: T;
    onOptionPress: (option: T) => void;
  };
  