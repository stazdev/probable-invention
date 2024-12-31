import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const ScanCircleIcon = (props) => (
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
      d="M20.5 24.5V23C20.5 22.2044 20.8161 21.4413 21.3787 20.8787C21.9413 20.3161 22.7044 20 23.5 20H26.5M20.5 39.5V41C20.5 41.7956 20.8161 42.5587 21.3787 43.1213C21.9413 43.6839 22.7044 44 23.5 44H26.5M38.5 20H41.5C42.2956 20 43.0587 20.3161 43.6213 20.8787C44.1839 21.4413 44.5 22.2044 44.5 23V24.5M38.5 44H41.5C42.2956 44 43.0587 43.6839 43.6213 43.1213C44.1839 42.5587 44.5 41.7956 44.5 41V39.5M29.5 30.5V33.5M43 30.5V33.5M22 30.5H23.5V33.5H22V30.5ZM35.5 30.5H37V33.5H35.5V30.5Z"
      stroke="#1B85F3"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ScanCircleIcon;
