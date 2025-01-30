"use client";
import React from "react";
import Box from "@component/Box";
import styled from "styled-components";
import Image from "@component/Image";
import Typography from "@component/Typography";
import FlexBox from "@component/FlexBox";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Button } from "@component/buttons";
const ContactusBanner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmDesktop = useMediaQuery(
    "(min-width: 769px) and (max-width: 1025px)"
  );

  const ContactusBannerIllustrator = styled(FlexBox)({
    backgroundImage: `linear-gradient(271deg, #501D92 4.53%, #9057D8 126.08%);`,
    alignItems: "center",
    justifyContent: "center",
  });
  const Overlay = styled(Box)({
    background: "url('/assets/images/contactus/cutting-edge-box-svg.svg') ",
    backgroundPosition: " center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    width: `${isSmDesktop ? "18.75rem" : "20.75rem"}`,
    height: `${isSmDesktop ? "26.0625rem" : "26.0625rem"}`,
    position: "absolute",
    bottom: "0px",
    top: `${isSmDesktop ? "191px" : "306px"}`,
    left: `${isSmDesktop ? "-8px" : "69px"}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    justifyContent: "center",
  });
  return (
    <>
      <ContactusBannerIllustrator>
        <Grid container justifyContent={"center"} maxWidth="1440px">
          <Grid item xs={12} md={10} position={"relative"}>
            {/* Banner content */}
            <Grid container alignItems={"center"} justifyContent={"center"}>
              {/* Left part content */}
              <Grid item xs={12} md={6}>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={`${isMobile ? "center" : "start"}`}
                >
                  <Typography
                    fontSize={`${
                      isMobile ? "2rem" : isSmDesktop ? "2.3rem" : "3.5rem"
                    }`}
                    color={"white"}
                    fontFamily="__Quicksand_8de393"
                    fontWeight={"600"}
                  >
                    Don’t be a stranger
                  </Typography>
                  <Typography
                    fontSize={`${
                      isMobile ? "1.6rem" : isSmDesktop ? "2rem" : "2rem"
                    }`}
                    color={"white"}
                    fontFamily="__Quicksand_8de393"
                    fontWeight={"600"}
                    textAlign={`${
                      isMobile ? "center" : isSmDesktop ? "start" : "start"
                    }`}
                  >
                    Just say hello
                  </Typography>
                </Box>
              </Grid>
              {/* right part content */}
              <Grid item xs={12} md={6}>
                <Box width={"100%"}>
                  <Image
                    width="100%"
                    src="/assets/images/contactus/Online_support_service.png"
                  />
                </Box>
              </Grid>
            </Grid>
            {/* Overlay box */}
            {!isMobile ? (
              <Overlay>
                <Box width={"40%"}>
                  <Image
                    width="100%"
                    src="/assets/images/contactus/Support_service.png"
                  />
                </Box>
                <Typography
                  fontSize={"1.875rem"}
                  fontWeight={600}
                  color={"#35004F"}
                  textAlign={"center"}
                  marginBottom={"1rem"}
                >
                  Want us to call
                  <Typography
                    fontSize={"1.875rem"}
                    fontWeight={600}
                    color={"#35004F"}
                  >
                    you?
                  </Typography>
                </Typography>
                <a href="tel:+91-9060614360">

                <Button
                  variant="contained"
                  color="light"
                  backgroundColor={"#35004F"}
                  borderRadius={"0.625rem"}
                >
                  Call me
                </Button>
                </a>
              </Overlay>
            ) : null}
          </Grid>
        </Grid>
      </ContactusBannerIllustrator>
    </>
  );
};

export default ContactusBanner;
