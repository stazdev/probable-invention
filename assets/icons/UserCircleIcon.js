import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const UserCircleIcon = (props) => (
  <Svg
    width={65}
    height={64}
    viewBox="0 0 65 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect
      x={1.25}
      y={0.75}
      width={62.5}
      height={62.5}
      rx={31.25}
      stroke="#D1E6FF"
      strokeWidth={1.5}
    />
    <Path
      d="M23.5 45.5V42.5C23.5 40.9087 24.1321 39.3826 25.2574 38.2574C26.3826 37.1321 27.9087 36.5 29.5 36.5H35.5C37.0913 36.5 38.6174 37.1321 39.7426 38.2574C40.8679 39.3826 41.5 40.9087 41.5 42.5V45.5M38.5 24.5C38.5 27.8137 35.8137 30.5 32.5 30.5C29.1863 30.5 26.5 27.8137 26.5 24.5C26.5 21.1863 29.1863 18.5 32.5 18.5C35.8137 18.5 38.5 21.1863 38.5 24.5Z"
      stroke="#1B85F3"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default UserCircleIcon;
