import { getTheme } from "@utils/utils";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  overflow: hidden;
  .header-container {
    box-shadow: ${getTheme("shadows.regular")};
  }
`;

export default StyledAppLayout;
