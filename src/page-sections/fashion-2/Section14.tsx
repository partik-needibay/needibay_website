"use client";
import { FC, useEffect, useState } from "react";
import Box from "@component/Box";
import MobileNavigationBar from "@component/mobile-navigation";
import { Carousel } from "@component/carousel";
import { ProductCard1 } from "@component/product-cards";
import CategorySectionCreator from "@component/CategorySectionCreator";
import useWindowSize from "@hook/useWindowSize";
import Product from "@models/product.model";
import Container from "@component/Container";
import FlexBox from "@component/FlexBox";
import Image from "@component/Image";
import Grid from "@component/grid/Grid";
import { deviceSize } from "@utils/constants";
import styled from "styled-components";
import ResponsiveOfferBanner from "@component/banners/ResponsiveOfferBanner";
import BannerCard4 from "@component/banners/BannerCard4";
import { isMobile } from "react-device-detect";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ResponsiveCard from "@component/banners/ResponsiveCard";

import MediaQuery from "react-responsive";
import { useRouter } from "next/navigation";
// =============================================================
// =============================================================
var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  arrows: true,
  slidesToShow: 1,
  autoplay: false,
  autoplaySpeed: 2000,
  slidesToScroll: 1,
};

const StyledBox = styled(FlexBox)({
  [`@media(max-width: ${deviceSize.sm}px)`]: {
    margin: "0px",
    ".outer-box": {
      display: "block",
    },

    ".banner_1": {
      marginRight: "1rem",
      justifyContent: "center",
      marginBottom: "2rem",
      cursor: "pointer",
      "& img": {
        width: "100%",
        height: "100%",
      },
    },
  },
});
const Section14 = () => {
  const [stateMobile, setState] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!isMobile && typeof window !== "undefined") {
      setState(stateMobile);
    } else {
      setState(!stateMobile);
    }
  }, []);

  const handleRouting = (path) => {
    router.push(path)
  }

  return (
    <>
      <MediaQuery minWidth={769}>

      <StyledBox
        justifyContent='center'
        alignItems='center'
        mb='3.75rem'
        mt='2rem'>
        <Box
          className='outer-box'
          display={"flex"}>
          <Box className='banner_1' onClick={() => handleRouting("/catalog/products/?offer=flash_sale")} style={{cursor : "pointer"}}>
            <BannerCard4
              img='/assets/images/banners/banner-11.png'
              contentPosition='right'
              img2='/assets/images/banners/blue_paper_bag.png'
            />
          </Box>

          <FlexBox style={{cursor : "pointer"}} onClick={() => handleRouting("/catalog/products")}>
            <BannerCard4
              img='/assets/images/banners/banner-12.png'
              contentPosition='left'
              img2='/assets/images/banners/cardboard_boxes.png'
            />
          </FlexBox>
        </Box>
        </StyledBox>
      </MediaQuery>
      
      <MediaQuery maxWidth={768}>
        <Box>
          <Slider {...settings}>
            <ResponsiveCard />
            <ResponsiveOfferBanner />
          </Slider>
        </Box>
      </MediaQuery>

    </>
  );
};

export default Section14;
