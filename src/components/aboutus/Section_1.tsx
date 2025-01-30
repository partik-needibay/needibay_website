"use client";
import Box from "@component/Box";
import { H1, H2, H3, H4 } from "@component/Typography";
import React from "react";
import styled from "styled-components";
import TextField from "@component/text-field";
import FlexBox from "@component/FlexBox";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Our_mission from "./Our_mission";

const Section_1 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 500px)");
  const isTab = useMediaQuery("(min-width: 426px) and (max-width: 769px)");
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));

  const isSmallDesktop = useMediaQuery(
    "(min-width: 770px) and (max-width: 1200px)"
  );
  const AboutPageWapper = styled(Box)({
    backgroundImage: "url(/assets/images/aboutus/aboutusBanner.png)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    height: "60vh",
    filter: "brightness(40%)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    
    [`@media(max-width: 426px)`]: {
      backgroundPosition: "center center",
      backgroundSize: "cover",
      height: "50vh",
    },
  });
  const StyledFlexBox = styled(FlexBox)`
    box-shadow: 0px 0px 15.8px 0px rgba(0, 0, 0, 0.25);
  `;

  return (
    <>
      <AboutPageWapper className="bgPic">
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          // height={"70%"}
          // position={"relative"}
          // border={"2px solid red"}
        >
          <H1
            fontSize={`${
              isMobile ? "2.6rem" : isLargeScreen ? "5.9rem" : "4rem"
            }`}
            color={"rgba(255, 255, 255, 1)"}
          >
            About Us
          </H1>
          <H3
            fontSize={`${
              isMobile ? "1.1em" : isLargeScreen ? "1.9rem" : "1.125rem"
            }`}
            color={"#FFF"}
            width={`${isMobile ? "90%" : isTab ? "50%" : "56%"}`}
            textAlign={"center"}
          >
            The biggest B2B platform for yor daily business needs and a helper
            to grow your business
          </H3>
        </Box>
        {/* <StyledFlexBox
        className="box"
        position="absolute"
        bottom={`${
          isMobile
            ? "-260px"
            : isTab
            ? "-280px"
            : isSmallDesktop
            ? "-207px"
            : isLargeScreen
            ? "-318px"
            : "-190px"
        }`}
        // padding={`${isMobile ? "1rem" : "2rem"}`}
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
            ? "70%"
            : "70%"
        }`}
        maxWidth={"1990px"}
        zIndex={5}
      >
        <H1
          paddingTop={`${isLargeScreen ? "2rem" : "1rem"}`}
          paddingBottom={`${isLargeScreen ? "2rem" : "1rem"}`}
          fontSize={`${isMobile ? null : isLargeScreen ? "3em" : "1.5625rem"}`}
        >
          Our Mission
        </H1>
        <H4
          fontSize={`${
            isMobile ? "0.93em" : isLargeScreen ? "1.6rem" : "0.99em"
          }`}
          fontWeight={"600"}
          lineHeight={`${
            isMobile ? "1.2rem" : isLargeScreen ? "2.8rem" : "1.7em"
          }`}
          paddingLeft={`${isMobile ? "1rem" : "2rem"}`}
          paddingRight={`${isMobile ? "1rem" : "2rem"}`}
          paddingBottom={`${isMobile ? "1rem" : "2rem"}`}
        >
          At NeediBay® our mission is to revolutionize B2B commerce by providing
          an agile and efficient platform for bulk buying, tailored to the
          unique needs of small, medium, and large enterprises. We are committed
          to empowering businesses with a quick commerce solution that
          streamlines their business buying processes, fosters collaboration,
          and enhances overall operational efficiency.
          <br />
          Our goal is to facilitate seamless transactions, enabling businesses
          to source and fulfill their requirements with unparalleled speed and
          precision. By leveraging cutting-edge technology and a
          customer-centric approach, we aspire to be the catalyst for growth and
          success in the dynamic landscape of B2B bulk buying.
        </H4>
      </StyledFlexBox> */}
      </AboutPageWapper>
      <Box position={"relative"} top={"-62px"}>
        <Our_mission />
      </Box>
    </>
  );
};

export default Section_1;
