import { ReactSVG } from "react-svg";
import styled from "styled-components";
import systemCss from "@styled-system/css";
import { color, compose, space, variant } from "styled-system";
import { IconProps } from "./Icon";

const StyledIcon = styled(ReactSVG)<IconProps>(
  ({ color, size, transform, defaultcolor }) =>
    systemCss({
      svg: {
        transform,
        width: "100%",
        height: "100%",

        path: { fill: color ? `${color}.main` : defaultcolor },
        polyline: { color: color ? `${color}.main` : defaultcolor },
        polygon: { color: color ? `${color}.main` : defaultcolor },
      },

      div: { display: "flex", width: size, height: size },
    }),
  ({ size }) =>
    variant({
      prop: "variant",
      variants: {
        xlarge: { div: { width: size || "4rem", height: size || "4rem" } },
        large: { div: { width: size || "2rem", height: size || "2rem" } },
        medium: { div: { width: size || "1.5rem", height: size || "1.5rem" } },
        small: { div: { width: size || "1.25rem", height: size || "1.25rem" } },
        xsmall: { div: { width: size || "1rem", height: size || "1rem" } },
        customxsmall: {
          div: { width: size || "0.9rem", height: size || "0.9rem" },
        },
        xxsmall: { div: { width: size || "0.5rem", height: size || "0.5rem" } },
      },
    }),
  compose(color, space)
);

export default StyledIcon;
