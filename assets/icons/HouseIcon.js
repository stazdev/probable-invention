import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const HouseIcon = (props) => (
  <Svg
    width={42}
    height={42}
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={42} height={42} rx={12} fill="#D1E6FF" fillOpacity={0.5} />
    <Path
      d="M18.5 28.5V23.5C18.5 23.058 18.6756 22.634 18.9882 22.3215C19.3007 22.0089 19.7246 21.8333 20.1667 21.8333H21.8333C22.2754 21.8333 22.6993 22.0089 23.0118 22.3215C23.3244 22.634 23.5 23.058 23.5 23.5V28.5M15.1667 21H13.5L21 13.5L28.5 21H26.8333V26.8333C26.8333 27.2754 26.6577 27.6993 26.3452 28.0118C26.0326 28.3244 25.6087 28.5 25.1667 28.5H16.8333C16.3913 28.5 15.9674 28.3244 15.6548 28.0118C15.3423 27.6993 15.1667 27.2754 15.1667 26.8333V21Z"
      stroke="#1B85F3"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default HouseIcon;
