"use client";
import Box from "@component/Box";
import Container from "@component/Container";
import FlexBox from "@component/FlexBox";
import Image from "@component/Image";
import { H4 } from "@component/Typography";
import { Grid, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Icon from "@component/icon/Icon";
import { ReactSVG } from "react-svg";
const Section_4 = () => {
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
            Our Partners
          </H4>
        </Grid>
      </Grid>
      <Grid container marginTop={"7rem"}>
        <Grid
          item
          xs={11}
          sm={10}
          md={11} //1024 viewport
          lg={10}
          style={{
            margin: "auto",
            // marginTop: "1rem",
          }}
        >
          <Box>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4} md={3} lg={3}>
                <Box
                  border={"2.552px solid #FFF"}
                  borderRadius={"0.957rem"}
                  style={{
                    boxShadow: " 0px 0px 19.5px 0px rgba(174, 23, 168, 0.20",
                    paddingInline: "2rem",
                    paddingBlock: "1.4rem",
                  }}
                >
                  <Image
                    width="100%"
                    src="/assets/images/aboutus/patnerpng.png"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={3}>
                <Box
                  border={"2.552px solid #FFF"}
                  borderRadius={"0.957rem"}
                  style={{
                    boxShadow: " 0px 0px 19.5px 0px rgba(174, 23, 168, 0.20",
                    paddingInline: "2rem",
                    paddingBlock: "1.4rem",
                  }}
                >
                  <Image
                    width="100%"
                    src="/assets/images/aboutus/patnerpng.png"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={3}>
                <Box
                  border={"2.552px solid #FFF"}
                  borderRadius={"0.957rem"}
                  style={{
                    boxShadow: " 0px 0px 19.5px 0px rgba(174, 23, 168, 0.20",
                    paddingInline: "2rem",
                    paddingBlock: "1.4rem",
                  }}
                >
                  <Image
                    width="100%"
                    src="/assets/images/aboutus/patnerpng.png"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={3}>
                <Box
                  border={"2.552px solid #FFF"}
                  borderRadius={"0.957rem"}
                  style={{
                    boxShadow: " 0px 0px 19.5px 0px rgba(174, 23, 168, 0.20",
                    paddingInline: "2rem",
                    paddingBlock: "1.4rem",
                  }}
                >
                  <Image
                    width="100%"
                    src="/assets/images/aboutus/patnerpng.png"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={3}>
                <Box
                  border={"2.552px solid #FFF"}
                  borderRadius={"0.957rem"}
                  style={{
                    boxShadow: " 0px 0px 19.5px 0px rgba(174, 23, 168, 0.20",
                    paddingInline: "2rem",
                    paddingBlock: "1.4rem",
                  }}
                >
                  <Image
                    width="100%"
                    src="/assets/images/aboutus/patnerpng.png"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={3}>
                <Box
                  border={"2.552px solid #FFF"}
                  borderRadius={"0.957rem"}
                  style={{
                    boxShadow: " 0px 0px 19.5px 0px rgba(174, 23, 168, 0.20",
                    paddingInline: "2rem",
                    paddingBlock: "1.4rem",
                  }}
                >
                  <Image
                    width="100%"
                    src="/assets/images/aboutus/patnerpng.png"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={3}>
                <Box
                  border={"2.552px solid #FFF"}
                  borderRadius={"0.957rem"}
                  style={{
                    boxShadow: " 0px 0px 19.5px 0px rgba(174, 23, 168, 0.20",
                    paddingInline: "2rem",
                    paddingBlock: "1.4rem",
                  }}
                >
                  <Image
                    width="100%"
                    src="/assets/images/aboutus/patnerpng.png"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={3}>
                <Box
                  border={"2.552px solid #FFF"}
                  borderRadius={"0.957rem"}
                  style={{
                    boxShadow: " 0px 0px 19.5px 0px rgba(174, 23, 168, 0.20",
                    paddingInline: "2rem",
                    paddingBlock: "1.4rem",
                  }}
                >
                  <Image
                    width="100%"
                    src="/assets/images/aboutus/patnerpng.png"
                  />
                </Box>
              </Grid>
            </Grid>
            {/* end */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Section_4;
