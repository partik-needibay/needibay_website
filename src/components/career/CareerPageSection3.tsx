"use client";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import { Grid } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const CareerPageSection3 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Box marginTop={"4rem"}>
        <Grid
          container
          justifyContent={"center"}
          margin={"auto"}
          alignItems={"center"}
          maxWidth={"1950px"}
          height={"100%"}
        >
          <Grid item xs={12} md={8}>
            <Box>
              {/* Working at NeediBay */}
              <FlexBox
                justifyContent={"center"}
                style={{ columnGap: "10px" }}
                marginBottom={"2rem"}
              >
                <Typography
                  color="#767676"
                  fontSize={`${isMobile ? "1.9rem" : "2.6rem"}`}
                  fontWeight={600}
                  textAlign={"center"}
                >
                  Working at
                </Typography>
                <Typography
                  color="#490868"
                  fontSize={`${isMobile ? "1.9rem" : "2.6rem"}`}
                  fontWeight={600}
                  textAlign={"center"}
                >
                  NeediBay
                </Typography>
              </FlexBox>
              <Typography
                color="#616161"
                fontSize={" 1rem"}
                fontWeight={600}
                textAlign={"center"}
                // mb={"0.5rem"}
              >
                NeediBay® is India's first B2B quick Commerce Platform and we're
                set to disrupt the SMB segment with our solutions. We at
                NeediBay® don't have one founder but everyone is handpicked and
                put in challenging situations where we get everyone with Founder
                mindset.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CareerPageSection3;
