"use client";
import Box from "@component/Box";
import Typography, { H4 } from "@component/Typography";
import { Grid } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const Section_5 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box maxWidth={"1440px"} margin={"7rem auto 0px auto"}>
      <Grid container>
        <Grid item xs={12} md={12}>
          <H4
            textAlign={"center"}
            fontSize={"2.5rem"}
            color={"#35004F"}
            fontWeight="700"
          >
            Why Us?
          </H4>
        </Grid>
      </Grid>
      <Grid container marginTop={"4rem"}>
        <Grid
          item
          xs={12}
          sm={10}
          md={11} //1024 viewport
          lg={10}
          style={{
            margin: "auto",
            // marginTop: "1rem",
            paddingInline: "10px",
            paddingBlock: "15px",
          }}
          //   border="2px solid red"
        >
          <Grid container rowGap={"2rem"}>
            <Grid xs={6} md={3}>
              <Box
                borderRight="3px solid #E1D0FF"
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <Typography
                  fontSize={"2rem"}
                  fontWeight={700}
                  color={"#3A0B8F"}
                >
                  7000+
                </Typography>
                <Typography
                  fontSize={"1rem"}
                  fontWeight={700}
                  color={"#3A0B8F"}
                >
                  Satisfied Customers
                </Typography>
              </Box>
            </Grid>
            <Grid xs={6} md={3}>
              <Box
                borderRight={`${isMobile ? "none" : "3px solid #E1D0FF"}`}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <Typography
                  fontSize={"2rem"}
                  fontWeight={700}
                  color={"#3A0B8F"}
                >
                  100+
                </Typography>
                <Typography
                  fontSize={"1rem"}
                  fontWeight={700}
                  color={"#3A0B8F"}
                >
                  Manufacturers
                </Typography>
              </Box>
            </Grid>
            <Grid xs={6} md={3}>
              <Box
                borderRight="3px solid #E1D0FF"
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <Typography
                  fontSize={"2rem"}
                  fontWeight={700}
                  color={"#3A0B8F"}
                >
                  10000+
                </Typography>
                <Typography
                  fontSize={"1rem"}
                  fontWeight={700}
                  color={"#3A0B8F"}
                >
                  Successful Deliveries
                </Typography>
              </Box>
            </Grid>
            <Grid xs={6} md={3}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <Typography
                  fontSize={"2rem"}
                  fontWeight={700}
                  color={"#3A0B8F"}
                >
                  35+
                </Typography>
                <Typography
                  fontSize={"1rem"}
                  fontWeight={700}
                  color={"#3A0B8F"}
                >
                  {" "}
                  Associated Partners
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Section_5;
