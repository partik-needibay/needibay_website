"use client";
import styled from "styled-components";
import {
  color,
  ColorProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";

const Divider = styled.div<SpaceProps & LayoutProps & ColorProps>`
  height: 1px;
  background-color: #E6E6E6;
  ${color}
  ${space}
  ${layout}
`;

export default Divider;
