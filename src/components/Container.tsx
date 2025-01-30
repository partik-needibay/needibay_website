"use client";
import {
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
} from "styled-system";
import styled from "styled-components";
import { layoutConstant } from "utils/constants";

const Container = styled.div<
  LayoutProps & ColorProps & PositionProps & SpaceProps & FlexboxProps
>`
  margin-left: auto;
  margin-right: auto;
  max-width: ${layoutConstant.containerWidth};

  @media only screen and (max-width: 1440px) {
    max-width: 1175px;
  }

  @media only screen and (min-width: 1441px) {
    max-width: 1399px;
  }

  @media only screen and (max-width: 1199px) {
    margin-left: 0.7rem;
    margin-right: 0.7rem;
  }


  ${color}
  ${position}
  ${flexbox}
  ${layout}
  ${space}
`;

export default Container;
