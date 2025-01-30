"use client";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import { Grid } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const SupportLine = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmDesktop = useMediaQuery(
    "(min-width: 769px) and (max-width: 1025px)"
  );
  return (
    <>
      <Grid
        container
        justifyContent={"end"}
        marginTop={"2rem"}
        maxWidth="2000px"
        // border={"2px solid red"}
      >
        <Grid item xs={12} md={7}>
          <FlexBox justifyContent={"center"}>
            <Box
              textAlign={`${isMobile ? "center" : "start"}`}
              paddingX={`${isMobile ? "0.49rem" : "0px"}`}
            >
              <Typography
                fontSize={`${
                  isMobile ? "1.6rem" : isSmDesktop ? "1.3rem" : "1.6rem"
                }`}
                // fontFamily="__Quicksand_8de393"
                color={"#35004F"}
                fontWeight={700}
              >
                We are here to help you in every situation with our
              </Typography>
              <Typography
                fontSize={`${
                  isMobile ? "1.6rem" : isSmDesktop ? "1.3rem" : "1.6rem"
                }`}
                color={"#35004F"}
                fontWeight={700}
              >
                24X7 support
              </Typography>
            </Box>
          </FlexBox>
        </Grid>
      </Grid>
    </>
  );
};

export default SupportLine;
