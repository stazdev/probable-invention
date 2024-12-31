import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const PenCircleIcon = (props) => (
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
      d="M25 24.5H23.5C22.7044 24.5 21.9413 24.8161 21.3787 25.3787C20.8161 25.9413 20.5 26.7044 20.5 27.5V41C20.5 41.7957 20.8161 42.5587 21.3787 43.1214C21.9413 43.684 22.7044 44 23.5 44H37C37.7956 44 38.5587 43.684 39.1213 43.1214C39.6839 42.5587 40 41.7957 40 41V39.5M38.5 21.5L43 26M45.0775 23.8775C45.6683 23.2868 46.0002 22.4855 46.0002 21.65C46.0002 20.8146 45.6683 20.0133 45.0775 19.4225C44.4867 18.8318 43.6855 18.4999 42.85 18.4999C42.0145 18.4999 41.2133 18.8318 40.6225 19.4225L28 32V36.5H32.5L45.0775 23.8775Z"
      stroke="#1B85F3"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default PenCircleIcon;
