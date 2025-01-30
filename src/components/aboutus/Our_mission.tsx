"use client";
import React from "react";
import Box from "@component/Box";
import { H1, H2, H3, H4 } from "@component/Typography";
import styled from "styled-components";
import TextField from "@component/text-field";
import FlexBox from "@component/FlexBox";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const Our_mission = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 500px)");
  const isTab = useMediaQuery("(min-width: 426px) and (max-width: 769px)");
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const isSmallDesktop = useMediaQuery(
    "(min-width: 770px) and (max-width: 1200px)"
  );
  const StyledFlexBox = styled(FlexBox)`
    box-shadow: 0px 0px 15.8px 0px rgba(0, 0, 0, 0.25);
  `;
  return (
    <StyledFlexBox
      className="box"
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"1.375rem"}
      backgroundColor={"#FFF"}
      flexDirection={"column"}
      width={`${
        isMobile
          ? "93%"
          : isTab
          ? "90%"
          : isSmallDesktop
          ? "90%"
          : isLargeScreen
          ? "73%"
          : "70%"
      }`}
      maxWidth={"1440px"}
      zIndex={3}
      margin={"auto"}
    >
      <H2
        paddingTop={`${isLargeScreen ? "1rem" : "1rem"}`}
        paddingBottom={`${isLargeScreen ? "2rem" : "1rem"}`}
        // fontSize={`${isMobile ? null : isLargeScreen ? "3em" : "1.5625rem"}`}
        fontSize={`${isLargeScreen ? "3em" : "1.5625rem"}`}
        color={"#35004F"}
      >
        Our Mission
      </H2>
      <H4
        // fontSize={`${
        //   isMobile ? "0.93em" : isLargeScreen ? "1.6rem" : "0.99em"
        // }`}
        fontWeight={"500"}
        fontSize={`${
          isMobile ? "1.2rem" : isLargeScreen ? "1.3rem" : "1.2rem"
        }`}
        // lineHeight={`${
        //   isMobile ? "1.56863rem" : isLargeScreen ? "2.56863rem" : "1.56863rem"
        // }`}
        paddingLeft={`${isMobile ? "1rem" : "2rem"}`}
        paddingRight={`${isMobile ? "1rem" : "2rem"}`}
        paddingBottom={`${isMobile ? "1rem" : "1rem"}`}
      >
        
        We are an Asia-based E-commerce company intensively inclined towards B2B procurement of industrial supplies in particular MRO, Safety, Electricals, Lighting, Cleaning & Housekeeping, Office Stationary & Supplies, Power Tools and many more industry essentials.
        <br />
        We take pride in delivering world-class services and, our clients are well aware of the fact that we do not just deliver products; we deliver a satisfying experience, which has enabled us to forge strong relationship with our customers. It’s a cultural belief that is demonstrated every day, through exceptional customer service, product selection and, paramount industry knowledge.
      </H4>
    </StyledFlexBox>
  );
};

export default Our_mission;
