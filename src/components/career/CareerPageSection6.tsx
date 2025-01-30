"use client";
import Box from "@component/Box";
import { Grid } from "@mui/material";
import Image from "@component/Image";
import React from "react";
import { H1, H2, H3, H4 } from "@component/Typography";
import FlexBox from "@component/FlexBox";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const CareerPageSection6 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const FirstCircle = styled(Box)({
    backgroundImage: `url('/assets/images/career/bg-circle.png') `,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    height: "25rem",
    zIndex: "4",
    width: "25rem",
    textAlign: "center",
    position: "absolute",
    top: "0px",
    left: `${isLargeScreen ? "-64px" : "-200px"}`,
    //   backgroundColor={"#35004F"}
    color: "#ffff",
    //   paddingX={"0.8rem"}
  });
  const MobileCircleBox = styled(Box)({
    backgroundImage: `url('/assets/images/career/bg-circle.png') `,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    height: "25rem",
    zIndex: "4",
    width: "25rem",

    textAlign: "center",

    //   backgroundColor={"#35004F"}
    color: "#ffff",
  });
  const SecondCircle = styled(Box)({
    backgroundImage: `url('/assets/images/career/bg-circle.png') `,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    height: "25rem",
    zIndex: "4",
    width: "25rem",
    textAlign: "center",
    position: "absolute",
    // top: "-166px",
    top: `${isLargeScreen ? "-60px" : "-166px"}`,
    right: `${isLargeScreen ? "-85px" : "-130px"}`,
    //   backgroundColor={"#35004F"}
    color: "#ffff",
    //   paddingX={"0.8rem"}
  });
  const Thirdcircle = styled(Box)({
    backgroundImage: `url('/assets/images/career/bg-circle.png') `,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    height: "25rem",
    zIndex: "4",
    width: "25rem",
    textAlign: "center",
    position: "absolute",
    bottom: `${isLargeScreen ? "65px" : "-83px"}`,
    left: `${isLargeScreen ? "-209px" : "-220px"}`,
    //   backgroundColor={"#35004F"}
    color: "#ffff",
    //   paddingX={"0.8rem"}
  });
  const FourthCircle = styled(Box)({
    backgroundImage: `url('/assets/images/career/bg-circle.png') `,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    height: "25rem",
    zIndex: "4",
    width: "25rem",
    textAlign: "center",
    position: "absolute",
    bottom: `${isLargeScreen ? "140px" : "55px"}`,
    right: "-137px",
    //   backgroundColor={"#35004F"}
    color: "#ffff",
    //   paddingX={"0.8rem"}
  });
  return (
    <Box>
      {isMobile ? (
        <Grid container className="for_mobile">
          <Grid item xs={12} className="mobile_grid_item">
            <Grid container justifyContent={"center"}>
              {/* <MobileCircleBox className="mobile_box">
                <FlexBox
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  height={"100%"}
                >
                  <H3>Integrity</H3>
                  <H4 fontSize={"0.78rem"}>
                    We are self-aware, accountable, responsible, and truthful
                    and our actions are eternally consistent.
                  </H4>
                </FlexBox>
              </MobileCircleBox> */}
              <MobileCircleBox>
                <FlexBox
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  height={"100%"}
                >
                  <H1 fontSize={"3rem"} mb={"1.2rem"}>
                  Integrity
                  </H1>
                  <H4 fontSize={"1rem"} paddingX={"3rem"}>
                  We are self-aware, accountable, responsible, and truthful and our actions are eternally consistent.
                  </H4>
                </FlexBox>
              </MobileCircleBox>
            </Grid>
          </Grid>
          <Grid item xs={12} className="mobile_grid_item">
            <Grid container justifyContent={"center"}>
              <MobileCircleBox className="mobile_box">
                <FlexBox
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  height={"100%"}
                >
                  <H1 fontSize={"2rem"} px={"1.9rem"} mb={"1rem"}>
                  Integrity
                  </H1>
                  <H4 fontSize={"1rem"} paddingX={"3rem"}>
                  We are self-aware, accountable, responsible, and truthful and our actions are eternally consistent.
                  </H4>
                </FlexBox>
              </MobileCircleBox>
            </Grid>
          </Grid>
          <Grid item xs={12} className="mobile_grid_item">
            <Grid container justifyContent={"center"}>
              <MobileCircleBox className="mobile_box">
                <FlexBox
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  height={"100%"}
                >
                  <H1 fontSize={"2rem"} px={"1.9rem"} mb={"1rem"}>
                  Integrity
                  </H1>
                  <H4 fontSize={"1rem"} paddingX={"3rem"}>
                  We are self-aware, accountable, responsible, and truthful and our actions are eternally consistent.
                  </H4>
                </FlexBox>
              </MobileCircleBox>
            </Grid>
          </Grid>
          <Grid item xs={12} className="mobile_grid_item">
            <Grid container justifyContent={"center"}>
              <MobileCircleBox className="mobile_box">
                <FlexBox
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  height={"100%"}
                >
                  <H2 fontSize={"2rem"} px={"2.7rem"} mb={"1rem"}>
                  Integrity
                  </H2>
                  <H4 fontSize={"1rem"} paddingX={"3rem"}>
                  We are self-aware, accountable, responsible, and truthful and our actions are eternally consistent.
                  </H4>
                </FlexBox>
              </MobileCircleBox>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          justifyContent={`${isMobile ? "space-evenly" : "center"}`}
          margin={"auto"}
          alignItems={`${isMobile ? "start" : "center"}`}
          maxWidth={"1950px"}
          height={"100%"}
          className="pervious_grid_con"
        >
          <Grid item xs={12} md={12}>
            <Grid container justifyContent={"center"}>
              <Grid item xs={12} md={6}>
                <Box
                  position={"relative"}
                  zIndex={4}
                  width={"100%"}
                  // border={"2px solid"}
                >
                  <Image
                    width="100%"
                    src="/assets/images/career/rign-vactor.png"
                  />
                  {/* First round box start */}
                  <FirstCircle>
                    <FlexBox
                      justifyContent={"center"}
                      alignItems={"center"}
                      flexDirection={"column"}
                      height={"100%"}
                    >
                      <H1 fontSize={"2.2rem"} mb={"1.2rem"}>
                      Integrity
                      </H1>
                      <H4 fontSize={"1.2rem"} paddingX={"3rem"}>
                      We are self-aware, accountable, responsible, and truthful and our actions are eternally consistent.
                      </H4>
                    </FlexBox>
                  </FirstCircle>
                  {/* First round box end */}
                  {/* second round box start */}
                  <SecondCircle>
                    <FlexBox
                      justifyContent={"center"}
                      alignItems={"center"}
                      flexDirection={"column"}
                      height={"100%"}
                    >
                      <H1 fontSize={"2rem"} px={"1.9rem"} mb={"1rem"}>
                      Integrity
                      </H1>
                      <H4 fontSize={"1.2rem"} paddingX={"3rem"}>
                      We are self-aware, accountable, responsible, and truthful and our actions are eternally consistent.
                      </H4>
                    </FlexBox>
                  </SecondCircle>
                  {/* second round box end */}
                  {/* third round box start */}
                  <Thirdcircle>
                    <FlexBox
                      justifyContent={"center"}
                      alignItems={"center"}
                      flexDirection={"column"}
                      height={"100%"}
                    >
                      <H1 fontSize={"2rem"} px={"1.9rem"} mb={"1rem"}>
                      Integrity
                      </H1>
                      <H4 fontSize={"1.2rem"} paddingX={"3rem"}>
                      We are self-aware, accountable, responsible, and truthful and our actions are eternally consistent.
                      </H4>
                    </FlexBox>
                  </Thirdcircle>
                  {/* third round box end */}
                  {/* Fourth round box start */}
                  <FourthCircle>
                    <FlexBox
                      justifyContent={"center"}
                      alignItems={"center"}
                      flexDirection={"column"}
                      height={"100%"}
                    >
                      <H2 fontSize={"2rem"} px={"2.7rem"} mb={"1rem"}>
                      Integrity
                      </H2>
                      <H4 fontSize={"1.2rem"} paddingX={"3rem"}>
                      We are self-aware, accountable, responsible, and truthful and our actions are eternally consistent.
                      </H4>
                    </FlexBox>
                  </FourthCircle>
                  {/* Fourth round box end */}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default CareerPageSection6;
{
  /* */
}
