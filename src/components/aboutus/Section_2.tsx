"use client";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import { H3 } from "@component/Typography";
import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const Section_2 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const Section2Wrapper = styled(FlexBox)({
    position: "relative",
    // border: "2px solid",
    height: `${isMobile ? "100vh" : "100vh"}`,
    paddingInline: `${isMobile ? "1rem" : "0px"}`,
    "&:before": {
      content: "''",
      position: "absolute",
      left: "0px",
      top: "15%",
      backgroundColor: "#E5AEFF",
      filter: "blur(244.8000030517578px)",
      width: "48%",
      height: "100%",
      borderRadius: "50%",
      zIndex: "1",
    },
    "&:after": {
      content: "''",
      position: "absolute",
      right: "0px",
      backgroundColor: "#FFEE95",

      filter: "blur(249.60000610351562px)",
      width: "48%",
      height: "100%",
      borderRadius: "50%",
      zIndex: "1",
    },
  });
  return (
    <Grid
      container
      maxWidth={"1440px"}
      margin={`${isMobile ? "0rem auto 0px auto" : "0rem auto 0px auto"}`}
    >
      <Grid item xs={12} md={12}>
        <Section2Wrapper
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box position={"relative"} zIndex={3}>
            <H3
              fontSize={`${isMobile ? "3.5rem" : "12.5rem"}`}
              color={"#520092"}
              textAlign={"center"}
            >
              NeediBay
            </H3>
            <H3
              color={"#CE8FFF"}
              fontSize={`${isMobile ? "1.6rem" : "3.5rem"}`}
              textAlign={"center"}
            >
              YOUR BUSINESS PARTNER
            </H3>
            <H3
              color={"#9D9D9D"}
              fontSize={`${isMobile ? "1.6rem" : "2.0rem"}`}
              textAlign={"center"}
            >
              India's Biggest B2B Platform for your business
            </H3>
          </Box>
        </Section2Wrapper>
      </Grid>
    </Grid>
  );
};

export default Section_2;
