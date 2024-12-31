import * as React from "react";
import Svg, { Path } from "react-native-svg";
const DoubleCaretIcon = (props) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M5.83398 5.83325L10.0007 9.99992L5.83398 14.1666M10.834 5.83325L15.0007 9.99992L10.834 14.1666"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default DoubleCaretIcon;
