import { themeGet } from "@styled-system/theme-get";
import styled from "styled-components";
import { color, ColorProps, space, SpaceProps } from "styled-system";

const MenuItem = styled.div<ColorProps & SpaceProps>`
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 0.5rem 1rem;
  word-break: break-all;
  color: ${themeGet("colors.text.secondary")};

  &:hover {
    z-index: 1;
    border-radius: 0.43rem;
    transform: scale(1.02);
    background-color: ${themeGet("colors.gray.100")};
  }
  ${color}
  ${space}
`;

export default MenuItem;
