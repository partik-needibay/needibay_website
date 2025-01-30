"use client";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import { Grid } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Button } from "@component/buttons";
const CareerPageSection7 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box marginTop={`${isMobile ? "4rem" : "10rem"}`}>
      <Grid
        container
        justifyContent={"center"}
        margin={"auto"}
        alignItems={"center"}
        maxWidth={"1950px"}
        height={"100%"}
      >
        <Grid item xs={11} md={10}>
          <Box
            backgroundColor={"#DB90FF"}
            borderRadius="2.0625rem"
            paddingY={"1.6rem"}
            paddingX={"0.3rem"}
          >
            <Grid
              container
              alignItems={"center"}
              justifyContent={`${isMobile ? "center" : "space-between"}`}
              paddingInline={"3rem"}
            >
              <Grid item xs={12} md={8}>
                <Typography
                  fontSize={"2.5rem"}
                  fontWeight={600}
                  color={"#35004F"}
                  textAlign={`${isMobile ? "center" : "start"}`}
                >
                  Make An Impact!
                </Typography>
                <Typography
                  fontSize={`${isMobile ? "0.92rem" : "1.4rem"}`}
                  textAlign={`${isMobile ? "center" : "start"}`}
                  color={"#fff"}
                  fontWeight={500}
                >
                  We are looking for motivated innovators, passionate about
                </Typography>
                <Typography
                  fontSize={`${isMobile ? "0.92rem" : "1.5rem"}`}
                  textAlign={`${isMobile ? "center" : "start"}`}
                  color={"#fff"}
                  fontWeight={500}
                >
                  transforming B2B commerce. Are you one of them?
                </Typography>
              </Grid>
              <Grid item xs={6} md={2}>
                <Button
                  variant="contained"
                  backgroundColor={"#fff"}
                  marginTop={`${isMobile ? "1rem" : "0px"}`}
                  fullwidth
                  style={{
                    fontWeight: "700",
                    color: "#35004F",
                    fontSize: "1rem",
                  }}
                >
                  Join Us
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CareerPageSection7;
