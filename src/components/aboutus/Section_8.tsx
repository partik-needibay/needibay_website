"use client";
import Box from "@component/Box";
import Typography, { H4 } from "@component/Typography";
import { Grid } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Icon from "@component/icon/Icon";
const Section_8 = ({ marginTop, mobileMarginTop }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box marginBottom={`calc(${isMobile ? "6rem" : "1rem"} + 2px)`}>
      <Grid
        container
        // marginTop={`${marginTop}rem`}
        // margin={"top right bottom left"}
        margin={`${
          isMobile
            ? `${mobileMarginTop}rem auto 0px auto`
            : `${marginTop}rem auto 0px auto`
        }`}
        maxWidth={"2000px"}
      >
        <Grid
          item
          xs={12}
          sm={10}
          md={11} //1024 viewport
          lg={11}
          style={{
            margin: "auto",
            // marginTop: "1rem",
            paddingInline: "10px",
            paddingBlock: "15px",
          }}
          //   border="2px solid red"
        >
          <Grid container rowGap={"2rem"}>
            <Grid item xs={6} md={3}>
              <Box
                borderRight="3px solid #E1D0FF"
                display={"flex"}
                flexDirection={"column"}
                alignItems={"start"}
                pl={"1rem"}
              >
                <Icon>about-us-wallet</Icon>
                <Typography
                  fontSize={"1rem"}
                  fontWeight={700}
                  color={"#000"}
                  marginTop={"1rem"}
                >
                  Great Value
                </Typography>
                <Typography
                  fontSize={"0.89rem"}
                  fontWeight={700}
                  color={"#000"}
                  width={"88%"}
                >
                  Most popular brands with widest range of selection at best
                  prices.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box
                borderRight={`${isMobile ? "none" : "3px solid #E1D0FF"}`}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"start"}
                pl={"1rem"}
              >
                <Icon>about-us-truck</Icon>
                <Typography
                  fontSize={"1rem"}
                  fontWeight={700}
                  color={"#000"}
                  marginTop={"1rem"}
                >
                  Nationwide Delivery
                </Typography>
                <Typography
                  fontSize={"0.89rem"}
                  fontWeight={700}
                  color={"#000"}
                  width={"88%"}
                >
                  Over 20,000 pincodes serviceable across India
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box
                borderRight="3px solid #E1D0FF"
                display={"flex"}
                flexDirection={"column"}
                alignItems={"start"}
                pl={"1rem"}
              >
                <Icon>about-us-payment</Icon>
                <Typography
                  fontSize={"1rem"}
                  fontWeight={700}
                  color={"#000"}
                  marginTop={"1rem"}
                >
                  Secure Payment
                </Typography>
                <Typography
                  fontSize={"0.89rem"}
                  fontWeight={700}
                  color={"#000"}
                  width={"88%"}
                >
                  Partnered with India's most popular and secure payment
                  solutions.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"start"}
                pl={"1rem"}
              >
                <Icon>about-us-lock</Icon>
                <Typography
                  fontSize={"1rem"}
                  fontWeight={700}
                  color={"#000"}
                  marginTop={"1rem"}
                >
                  Buyer Protection
                </Typography>
                <Typography
                  fontSize={"0.89rem"}
                  fontWeight={700}
                  color={"#000"}
                  width={"99%"}
                >
                  Committed to buyer interests to provide a smooth shopping
                  experience.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Section_8;
