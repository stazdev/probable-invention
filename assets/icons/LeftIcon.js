import * as React from "react";
import Svg, { Path } from "react-native-svg";
const LeftIcon = (props) => (
  <Svg
    width={20}
    height={21}
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M4.16602 10.5H15.8327M4.16602 10.5L9.16602 15.5M4.16602 10.5L9.16602 5.5"
      stroke="#808B9A"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default LeftIcon;
