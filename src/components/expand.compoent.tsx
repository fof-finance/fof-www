import ExpandIcon from "src/assets/expand.svg";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";
import React from "react";

export default function ExpandMore(props: SvgIconProps) {
  return <SvgIcon viewBox="0 -6 14 24">
      <g id="icon/caret/bottom" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(0.000000, -0.000000)" fill="#9082C3" fillRule="nonzero" id="caret/bottom">
            <g>
                <polygon id="路径" points="0 0 7 9.05882353 14 0"></polygon>
            </g>
        </g>
    </g>
    </SvgIcon>;
}
