import styled from "styled-components";
import { layoutConstant } from "utils/constants";
import { getTheme } from "@utils/utils";
import Container from "@component/Container";

const StyledHeader = styled.header`
  position: relative;
  box-shadow: 0px 4px 9.1px 0px rgba(0, 0, 0, 0.15) !important;
  z-index: 10;
  height: ${layoutConstant.headerHeight};
  background: ${getTheme("colors.body.paper")};

  .logo {
    img {
      display: block;
    }
  }
  .icon-holder {
    span {
      font-size: 12px;
      line-height: 1;
      margin-bottom: 4px;
    }
    h4 {
      margin: 0px;
      font-size: 14px;
      line-height: 1;
      font-weight: 600;
    }
    div {
      margin-left: 6px;
    }
  }

  .user {
    cursor: pointer;
  }

  @media only screen and (max-width: 900px) {
    width: 100%;
    height: ${layoutConstant.mobileHeaderHeight};
    box-shadow: 0px 4px 9.1px 0px rgba(0, 0, 0, 0.15) !important;
    margin-bottom: "10rem";
    .navigation{
      width: 100%;
      
    }
    .logo {
      height: 1.5rem;
    }
    .locate {
      display: none !important;
    }
    .category-holder {
      display: none !important;
    }
    .header-right {
      display: none !important;
    }
  }
`;

export default StyledHeader;
