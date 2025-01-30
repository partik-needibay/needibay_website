"use client";
import Box from "@component/Box";
import { H1, H2, H3, H4 } from "@component/Typography";
import React from "react";
import styled from "styled-components";
import TextField from "@component/text-field";
import FlexBox from "@component/FlexBox";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Grid } from "@mui/material";

const Our_Vision = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 426px)");
  const isTab = useMediaQuery("(min-width: 426px) and (max-width: 769px)");
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const isSmallDesktop = useMediaQuery(
    "(min-width: 770px) and (max-width: 1200px)"
  );
  const StyledFlexBox = styled(FlexBox)`
    box-shadow: 0px 0px 15.8px 0px rgba(0, 0, 0, 0.25);
  `;

  return (
    <Grid container justifyContent={"center"} position={"relative"} zIndex={7}>
      <Grid item xs={12} md={12} lg={12} xl={12}>
        <Grid container justifyContent={"center"}>
          {/* <Grid item xs={12} md={12} lg={10} xl={12}> */}
          <StyledFlexBox
            className="box"
            // padding={`${isMobile ? "1rem" : "1.9rem"}`}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"1.375rem"}
            backgroundColor={"#FFF"}
            flexDirection={"column"}
            // width={`100%`}
            // maxWidth={"1990px"}
            zIndex={5}
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
            // zIndex={5}
            margin={"auto"}
          >
            <H1
              paddingTop={`${isLargeScreen ? "2rem" : "1rem"}`}
              paddingBottom={`${isLargeScreen ? "2rem" : "1rem"}`}
              fontSize={`${isLargeScreen ? "3em" : "1.5625rem"}`}
            >
              Our Vision
            </H1>
            <H4
              fontWeight={"500"}
              fontSize={`${
                isMobile ? "1.2rem" : isLargeScreen ? "1.6rem" : "1.2rem"
              }`}
              paddingLeft={`${isMobile ? "1rem" : "2rem"}`}
              paddingRight={`${isMobile ? "1rem" : "2rem"}`}
              paddingBottom={`${isMobile ? "1rem" : "2rem"}`}
            >
              We're India's First Quick Commerce platform, revolutionizing B2B
              bulk buying for businesses of all sizes. Catering to the diverse
              needs of small, medium, and large enterprises, our platform
              ensures swift and seamless buying experience for smooth business
              operations at all scale. Experience unparalleled efficiency as you
              streamline your business requirements, from sourcing to delivery.
              With an intuitive interface, personalized dashboards, and robust
              backend support, we empower businesses to make informed decisions
              in real-time. Our platform is designed to enhance collaboration,
              optimize costs, and accelerate growth. Join us in redefining the
              future of B2B transactions – where speed meets precision,
              transforming the way indian businesses buys...
              <br />
              Simplify B2B bulk purchase and transition the existing complex
              buying cycle to a much shorter and effortless process by providing
              Buying as a service so that the clients can focus more on their
              core business operations.
            </H4>
          </StyledFlexBox>
          {/* </Grid> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Our_Vision;
