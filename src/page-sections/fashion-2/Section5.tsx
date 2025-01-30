"use client";
import { FC, useState, useEffect } from "react";
import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import { BannerCard1, BannerCard2, BannerCard3 } from "@component/banners";
import Box from "@component/Box";
import MediaQuery from "react-responsive";
import ResponsiveBanner from "@component/banners/ResponsiveBanner";
import { Carousel } from "@component/carousel";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ResponsiveBoxBanner from "@component/banners/ResponsiveBoxBanner";
import ResponsiveBanner3 from "@component/banners/ResponsiveBanner3";
import Link from "next/link";

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  arrows: true,
  slidesToShow: 1.1,
  autoplay: true,
  autoplaySpeed: 2000,

  slidesToScroll: 1,
};
const Section5: FC = () => {
  return (
    <>
      {" "}
      <MediaQuery query="(max-width: 768px)">
        <Box marginTop="-2.5rem">
          {" "}
          <Slider {...settings}>
            <ResponsiveBanner />
            <ResponsiveBoxBanner />
            <ResponsiveBanner3 />
          </Slider>
        </Box>
      </MediaQuery>
      <MediaQuery query="(min-width: 769px)">
        <Container mt="3rem" mb="4rem">
          <Grid container spacing={5}>
            <Grid item md={4} sm={12} xs={12}>
              <Link href={`/catalog/products/?offer=flash_sale`}>
                <BannerCard1 />
              </Link>
            </Grid>

            <Grid item md={4} sm={12} xs={12}>
              <Link href={`/catalog/products/?offer=weekly_sale`}>
                <BannerCard2 />
              </Link>
            </Grid>

            <Grid item md={4} sm={12} xs={12}>
              <Link href="/catalog/products/?offer=daily_sale">
                <BannerCard3 />
              </Link>
            </Grid>
          </Grid>
        </Container>
      </MediaQuery>
    </>
  );
};

export default Section5;
