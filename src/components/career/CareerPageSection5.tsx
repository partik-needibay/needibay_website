"use client";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import { Grid } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "@component/Image";
import styled from "styled-components";
import { ReactSVG } from "react-svg";
const CareerPageSection5 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const BgIllustratorWrapper = styled(Box)({
    //  background: `url('/assets/images/career/bg-illustrator-svg.svg') center/cover no-repeat`,

    position: "relative",
    width: "100%",
    height: "100%",
    marginTop: "5rem",
    marginBottom: `${isMobile ? "10rem" : "12rem"}`,

    // border: "2px solid red",
  });
  const SkweBox = styled(Box)({
    color: "#fff",
    position: "absolute",
    top: "0px",
    zIndex: "1",
    padding: "10rem",
    width: "100%",
    "&:before": {
      content: "''",
      position: "absolute",
      left: "0px",
      bottom: "0px",
      right: "0px",
      height: "125%",
      //   top: "15%",
      backgroundColor: "#E5AEFF",
      transform: "skewY(14deg)",
      transformOrigin: "30%",

      zIndex: "1",
    },
  });
  //   bg-illustrator
  return (
    <>
      <BgIllustratorWrapper>
        <SkweBox></SkweBox>

        <Grid
          container
          margin={"auto"}
          maxWidth={"1950px"}
          zIndex={"2"}
          position={"relative"}
          //   border={"2px solid yellow"}
        >
          <Grid item xs={12} md={11}>
            <Grid container>
              {/* left side box */}
              <Grid item xs={12} md={6}>
                <FlexBox
                  flexDirection={"column"}
                  margin={"auto"}
                  //   border="2px solid yellow"
                  width={`${isMobile ? "100%" : "70%"}`}
                  alignItems={`${isMobile ? "center" : "start"}`}
                >
                  {/* Fasten your seat belts title start here */}
                  <FlexBox style={{ columnGap: "10px" }} marginBottom={"2rem"}>
                    <Typography
                      color="#767676"
                      fontSize={`${isMobile ? "1.3rem" : "2.2rem"}`}
                      fontWeight={600}
                      textAlign={"center"}
                    >
                      Fasten your
                    </Typography>
                    <Typography
                      color="#490868"
                      fontSize={`${isMobile ? "1.3rem" : "2.2rem"}`}
                      fontWeight={600}
                      textAlign={"center"}
                    >
                      seat belts
                    </Typography>
                  </FlexBox>
                  {/* Fasten your seat belts title end here */}
                  <Typography
                    color="#616161"
                    fontSize={"1rem"}
                    fontWeight={600}
                    mb={"0.5rem"}
                    textAlign={"center"}
                  >
                    To experience the thrill of NeediBay
                  </Typography>
                  <Typography
                    color="#616161"
                    fontSize={" 1rem"}
                    fontWeight={600}
                    mb={"0.4rem"}
                    textAlign={"center"}
                  >
                    We at NeediBay provide our team the best work
                  </Typography>
                  <Typography
                    color="#616161"
                    fontSize={" 1rem"}
                    fontWeight={600}
                    textAlign={"center"}
                  >
                    culture and ambience helping them to work at
                  </Typography>
                  <Typography
                    color="#616161"
                    fontSize={" 1rem"}
                    fontWeight={600}
                    textAlign={"center"}
                  >
                    their maximum potential
                  </Typography>
                </FlexBox>
              </Grid>
              {isMobile ? null : (
                <Grid item xs={12} md={6}>
                  <FlexBox
                    justifyContent={"end"}
                    alignItems={"end"}
                    height={"100%"}
                  >
                    <Box width={"10%"}>
                      <Image
                        width="11%"
                        src="/assets/images/career/Verticals-ring.png"
                      />
                    </Box>
                    <Box width={"10%"}>
                      <Image
                        width="10%"
                        src="/assets/images/career/Verticals-ring.png"
                      />
                    </Box>
                  </FlexBox>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </BgIllustratorWrapper>
    </>
  );
};

export default CareerPageSection5;
