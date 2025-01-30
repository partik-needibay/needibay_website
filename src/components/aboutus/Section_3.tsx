"use client";
import Box from "@component/Box";
import Container from "@component/Container";
import FlexBox from "@component/FlexBox";
import Image from "@component/Image";
import { H4 } from "@component/Typography";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Icon from "@component/icon/Icon";
import { ReactSVG } from "react-svg";
const Section_3 = () => {
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 426px)");
  const ManillustratorBox = styled(Box)({
    background: `url('/assets/images/icons/manvectorbgSvg.svg') center/contain no-repeat`,
    position: "relative",
    width: "100%",
  });

  {
    ("7rem auto 0px auto");
  }
  return (
    <Box
      maxWidth={"1440px"}
      margin={`${isMobile ? "0rem auto 0px auto" : "7rem auto 0px auto"}`}
    >
      <Grid container>
        <Grid item xs={12} md={12}>
          <H4
            textAlign={"center"}
            fontSize={"3.5rem"}
            color={"#35004F"}
            fontWeight="700"
          >
            We work for you
          </H4>
        </Grid>
      </Grid>
      <Grid container marginTop={"6rem"}>
        {/* one empty box */}
        <Grid item xs={12} md={1}></Grid>
        {/*  image and text  start here */}
        <Grid item xs={12} md={11}>
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            rowGap={"60px"}
            columnGap={"41px"}
          >
            {/* left side image start from here */}
            <Grid item xs={12} sm={6} md={4}>
              <ManillustratorBox>
                <Image
                  width="100%"
                  src="/assets/images/aboutus/manVector.png"
                />
              </ManillustratorBox>
            </Grid>
            {/* right side text start from here */}
            <Grid item xs={12} sm={10} md={7}>
              <Typography
                width={"100%"}
                height={"100%"}
                display={"flex"}
                alignItems={"center"}
                fontSize={"1.5rem"}
                fontWeight={400}
                padding={2}
                textAlign={"start"}
              >
                
              We are an Asia-based E-commerce company intensively inclined towards B2B procurement of industrial supplies in particular MRO, Safety, Electricals, Lighting, Cleaning & Housekeeping, Office Stationary & Supplies, Power Tools and many more industry essentials.
              We take pride in delivering world-class services and, our clients are well aware of the fact that we do not just deliver products; we deliver a satisfying experience, which has enabled us to forge strong relationship with our customers. It’s a cultural belief that is demonstrated every day, through exceptional customer service, product selection and, paramount industry knowledge.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Section_3;
//
