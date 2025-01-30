"use client";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import { Grid } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "@component/Image";
import Icon from "@component/icon/Icon";
import { ReactSVG } from "react-svg";
const CareerPageSection4 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box marginTop={"4rem"} position={"relative"} zIndex={2}>
      <Grid
        container
        justifyContent={"center"}
        margin={"auto"}
        alignItems={"center"}
        maxWidth={"1950px"}
        height={"100%"}
      >
        <Grid item xs={12} md={9}>
          <Grid container justifyContent={"center"}>
            <Grid item xs={10} md={4}>
              <FlexBox
                flexDirection={"column"}
                alignItems={"center"}
                backgroundColor={"white"}
                color={"black"}
                textAlign={"center"}
                paddingY={"3.5rem"}
              >
                <ReactSVG
                  src={`/assets/images/icons/building.svg`}
                  beforeInjection={(svg) => {
                    svg.setAttribute("style", "width: 50px;height:50px");
                  }}
                />
                <Typography fontSize={"1.5rem"} fontWeight={"700"}>
                  Culture
                </Typography>
                <Typography fontSize={"0.8rem"} fontWeight={"600"}>
                  Work in super-charged, aglie & performance-
                </Typography>
                <Typography fontSize={"0.8rem"} fontWeight={"600"}>
                  divine culture
                </Typography>
              </FlexBox>
            </Grid>
            <Grid item xs={10} md={4}>
              <FlexBox
                flexDirection={"column"}
                alignItems={"center"}
                backgroundColor={"#F1F1F1"}
                color={"black"}
                textAlign={"center"}
                paddingY={"3.5rem"}
              >
                <ReactSVG
                  src={`/assets/images/icons/building.svg`}
                  beforeInjection={(svg) => {
                    svg.setAttribute("style", "width: 50px;height:50px");
                  }}
                />
                <Typography fontSize={"1.5rem"} fontWeight={"700"}>
                  Performance
                </Typography>
                <Typography fontSize={"0.8rem"} fontWeight={"600"}>
                  Work in super-charged, aglie & performance-
                </Typography>
                <Typography fontSize={"0.8rem"} fontWeight={"600"}>
                  divine culture
                </Typography>
              </FlexBox>
            </Grid>
            <Grid item xs={10} md={4}>
              <FlexBox
                flexDirection={"column"}
                alignItems={"center"}
                backgroundColor={"white"}
                color={"black"}
                textAlign={"center"}
                paddingY={"3.5rem"}
              >
                <ReactSVG
                  src={`/assets/images/icons/building.svg`}
                  beforeInjection={(svg) => {
                    svg.setAttribute("style", "width: 50px;height:50px");
                  }}
                />
                <Typography fontSize={"1.5rem"} fontWeight={"700"}>
                  Learn & Grow
                </Typography>
                <Typography fontSize={"0.8rem"} fontWeight={"600"}>
                  Work in super-charged, aglie & performance-
                </Typography>
                <Typography fontSize={"0.8rem"} fontWeight={"600"}>
                  divine culture
                </Typography>
              </FlexBox>
            </Grid>
          </Grid>
          <Grid container justifyContent={"center"}>
            <Grid item xs={10} md={4}>
              <FlexBox
                flexDirection={"column"}
                alignItems={"center"}
                backgroundColor={"#F1F1F1"}
                color={"black"}
                textAlign={"center"}
                paddingY={"3.5rem"}
              >
                <ReactSVG
                  src={`/assets/images/icons/building.svg`}
                  beforeInjection={(svg) => {
                    svg.setAttribute("style", "width: 50px;height:50px");
                  }}
                />
                <Typography fontSize={"1.5rem"} fontWeight={"700"}>
                  Technology
                </Typography>
                <Typography fontSize={"0.8rem"} fontWeight={"600"}>
                  Work in super-charged, aglie & performance-
                </Typography>
                <Typography fontSize={"0.8rem"} fontWeight={"600"}>
                  divine culture
                </Typography>
              </FlexBox>
            </Grid>
            <Grid item xs={10} md={4}>
              <FlexBox
                flexDirection={"column"}
                alignItems={"center"}
                backgroundColor={"white"}
                color={"black"}
                textAlign={"center"}
                paddingY={"3.5rem"}
              >
                <ReactSVG
                  src={`/assets/images/icons/building.svg`}
                  beforeInjection={(svg) => {
                    svg.setAttribute("style", "width: 50px;height:50px");
                  }}
                />
                <Typography fontSize={"1.5rem"} fontWeight={"700"}>
                  Innovators
                </Typography>
                <Typography fontSize={"0.8rem"} fontWeight={"600"}>
                  Work in super-charged, aglie & performance-
                </Typography>
                <Typography fontSize={"0.8rem"} fontWeight={"600"}>
                  divine culture
                </Typography>
              </FlexBox>
            </Grid>
            <Grid item xs={10} md={4}>
              <FlexBox
                flexDirection={"column"}
                alignItems={"center"}
                backgroundColor={"#F1F1F1"}
                color={"black"}
                textAlign={"center"}
                paddingY={"3.5rem"}
              >
                <ReactSVG
                  src={`/assets/images/icons/building.svg`}
                  beforeInjection={(svg) => {
                    svg.setAttribute("style", "width: 50px;height:50px");
                  }}
                />
                <Typography fontSize={"1.5rem"} fontWeight={"700"}>
                  Leaders
                </Typography>
                <Typography fontSize={"0.8rem"} fontWeight={"600"}>
                  Work in super-charged, aglie & performance-
                </Typography>
                <Typography fontSize={"0.8rem"} fontWeight={"600"}>
                  divine culture
                </Typography>
              </FlexBox>
            </Grid>
          </Grid>
          <Box>
            {/*  <Image width="100%" src="/assets/images/career/Speciality.png" /> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CareerPageSection4;
//Speciality
