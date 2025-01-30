"use client";

// ** COMPONENT IMPORTS
import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import Box from "@component/Box";
import Image from "@component/Image";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Typography, { H1 } from "@component/Typography";
import { Button } from "@component/buttons";
import { Carousel } from "components/carousel";
import { Paragraph } from "@component/Typography";
import { isMobile } from "react-device-detect";
import { Header } from "@component/header";

import MediaQuery from "react-responsive";
//** AD BANNER SLIDER
import Section9 from "@sections/market-2/Section9";

//** CONSTANTS */
import { deviceSize } from "@utils/constants";
import MainCarouselItem from "@models/market-1.model";
import { overpass, quicksand, roboto } from "@utils/fonts";
import Sticky from "@component/sticky";
import Service from "@models/service.model";

const HoverButton = styled(Button)`
  &:hover {
    background-color: #8948ff;
    color: #fff;
  }
`;

const StyledCarousel = styled(Carousel)`
  .dot {
    background-color: #000;
  }
`;

// styled component
const StyledBox = styled(FlexBox)({
  alignItems: "center",
  justifyContent: "center",
  ".title": {
    fontSize: 50,
    marginTop: 0,
    lineHeight: 1.2,
    marginBottom: "1.35rem",
  },

  "& img": { width: "100%" },

  [`@media(max-width: ${deviceSize.sm}px)`]: {
    marginLeft: 0,
    paddingLeft: 0,

    ".title": {
      marginBottom: "0.5rem",
      fontSize: "1.5rem",
      letterSpacing: "0.065rem",
    },

    ".outer-box": {
      width: "100%",
    },
    ".button-link": {
      marginTop: "1rem",
    },

    ".grid-item": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
    },

    ".carousel-image": {
      textAlign: "center",
      height: "50%",
      width: "50%",
    },
  },

  [`@media(max-width: ${deviceSize.xs}px)`]: {
    ".title": { textAlign: "center" },
  },
});

// ======================================================
type Props = { data: MainCarouselItem[]; brands: any; serviceList?: any };
// ======================================================

const Section1: FC<Props> = ({ data, brands }) => {
  return (
    <>
      <Sticky fixedOn={0}>
        <Header />
      </Sticky>
      <Box
        className="outer-box"
        style={{
          paddingBottom: isMobile ? "0" : "0.1rem",
          marginBottom: isMobile ? "2rem" : " 5rem",
        }}
        bg="white"
        py={"7rem"}
        justifyContent={"center"}
      >
        <MediaQuery query="(max-width: 768px)">
          <Carousel
            spacing="200px"
            totalSlides={2}
            infinite={true}
            showDots={false}
            autoPlay={true}
            visibleSlides={1}
            showArrow={false}
          >
            {data.map((item, ind) => (
              <StyledBox key={ind}>
                <Grid
                  container
                  spacing={3}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item md={5} xs={12}>
                    <FlexBox justifyContent={"center"}>
                      <Image
                        className="carousel-image"
                        alt="apple-watch-1"
                        src={item.imgUrl}
                      />
                    </FlexBox>
                  </Grid>
                  <Grid item className="grid-item" md={5} xs={12}>
                    <H1
                      letterSpacing="0.065rem"
                      lineHeight="1.55rem"
                      className={`title ${roboto.className}`}
                    >
                      {item?.title.slice(0, 20)}
                    </H1>
                    <H1
                      letterSpacing="0.065rem"
                      lineHeight="1.55rem"
                      className={`title ${roboto.className}`}
                    >
                      {item?.title.slice(21)}
                    </H1>

                    <Paragraph
                      color="gray.500"
                      fontSize={"0.7rem"}
                      className={quicksand.className}
                    >
                      {item.description}
                    </Paragraph>

                    <a className="button-link" href={item.buttonLik}>
                      <Button
                        size="xxsmall"
                        color="primary"
                        variant="contained"
                        className="button"
                      >
                        <Typography className={overpass.className}>
                          {" "}
                          {item.buttonText}
                        </Typography>
                      </Button>
                    </a>
                  </Grid>
                </Grid>
              </StyledBox>
            ))}
          </Carousel>
        </MediaQuery>
        <MediaQuery query="(min-width: 769px)">
          <StyledCarousel
            spacing="0px"
            dotColor="#484848"
            totalSlides={2}
            infinite={true}
            showDots={true}
            autoPlay={true}
            visibleSlides={1}
            showArrow={false}
          >
            {data.map((item, ind) => (
              <StyledBox key={ind}>
                <Grid
                  container
                  spacing={3}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item className="grid-item" md={5} xs={12}>
                    <H1
                      className={`${roboto.className}`}
                      lineHeight={"4.5rem"}
                      fontWeight={700}
                      letterSpacing={"0.18906rem"}
                      fontSize="3.7rem"
                    >
                      {item.title}
                    </H1>
                    <Paragraph
                      color="gray.500"
                      fontSize={"1.2rem"}
                      fontWeight={400}
                      lineHeight={"2rem"}
                      className={quicksand.className}
                      mb={2.7}
                    >
                      {item.description}
                    </Paragraph>

                    <a className="button-link" href={item.buttonLik}>
                      <HoverButton
                        mt={4}
                        size="medium"
                        py="1.75rem"
                        px={"2.5rem"}
                        borderRadius={"0.625rem"}
                        color="primary"
                        variant="contained"
                        className="button"
                      >
                        <Typography
                          className={overpass.className}
                          fontSize={"1.43rem"}
                        >
                          {item.buttonText}
                        </Typography>
                      </HoverButton>
                    </a>
                  </Grid>

                  <Grid item md={5} xs={12}>
                    <FlexBox justifyContent={"center"}>
                      <Image
                        className="carousel-image"
                        alt="apple-watch-1"
                        src={item.imgUrl}
                      />
                    </FlexBox>
                  </Grid>
                </Grid>
              </StyledBox>
            ))}
          </StyledCarousel>
        </MediaQuery>

        {/* AD BANNER SLIDER */}
        <Section9 brands={brands as any} />
      </Box>
    </>
  );
};

export default Section1;
