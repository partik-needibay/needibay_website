"use client";
import Box from "@component/Box";
import Container from "@component/Container";
import FlexBox from "@component/FlexBox";
import Image from "@component/Image";
import { H1, H4, H5 } from "@component/Typography";
import { Grid, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Icon from "@component/icon/Icon";
import { ReactSVG } from "react-svg";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const Section_6 = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isXlDesktop = useMediaQuery(theme.breakpoints.up("xl"));
  const ManillustratorBox = styled(Box)({
    // width: "18.5rem",

    position: "relative",
    // border: "2px solid",
    "&:before": {
      content: "''",
      position: "absolute",
      top: "-58px",
      right: "39px",
      backgroundImage: "url('/assets/images/aboutus/uparrow.png')",
      backgroundRepeat: "no-repeat",
      width: "63%",
      height: "42%",
      zIndex: 1,
    },
    "&:after": {
      content: "''",
      position: "absolute",
      bottom: `${isXlDesktop ? "-25%" : "-83px"}`,
      left: "30px",
      backgroundImage: "url('/assets/images/aboutus/downarrow.png')",
      backgroundRepeat: "no-repeat",
      width: "28%",
      height: "34%",
      zIndex: 1,
    },
  });

  return (
    <Box marginTop={"5rem"}>
      <Grid container>
        <Grid item xs={12} md={12}>
          <H4
            textAlign={"center"}
            fontSize={"2rem"}
            color={"#35004F"}
            fontWeight="700"
          >
            Featured on
          </H4>
        </Grid>
      </Grid>

      {/* ------------------- First Words from our CEO --------------------- */}
      <Grid
        container
        margin={"4rem auto 0px auto"}
        maxWidth={"1990px"}
        // border={"2px solid red"}
        justifyContent={"center"}
      >
      <Box>
            <Grid
              container
              spacing={6}
              rowGap={"50px"}
              justifyContent={"center"}
            >
                <Grid item xs={9} sm={4} md={4} lg={3}>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    position={"relative"}
                    maxHeight={"306px"}
                  >
                    <Image
                      width={`${isMobile ? "100%" : "300%"}`}
                      borderRadius={"1rem"}
                      src="/assets/images/aboutus/featured-on.png"
                    />
                  </Box>
                </Grid>
            </Grid>
            {/* end */}
          </Box>
      </Grid>
    </Box>
  );
};

export default Section_6;
