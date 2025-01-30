"use client";
import { FC, useState, useEffect } from "react";
import Link from "next/link";
import Image from "@component/Image";
import styled from "styled-components";
import MobileTesti from "@component/testimonials/MobileCard";
import Box from "@component/Box";
import { Footer1 } from "@component/footer";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import NavLink from "@component/nav-link";
import Container from "@component/Container";
import Typography, { H2, H4, Paragraph, Span } from "@component/Typography";
import { theme } from "@utils/theme";
import Blog from "@models/blog.model";
import { Carousel } from "@component/carousel";
import { CarouselWrapper } from "@component/carousel";
import Product from "@models/product.model";
import { deviceSize } from "@utils/constants";
import CategorySectionCreator from "@component/CategorySectionCreator";
import TestiCard from "@component/testimonials/TestimonialCard";
import { Button } from "@component/buttons";

import MediaQuery from "react-responsive";
import { isMobile } from "react-device-detect";

import { overpass, quicksand, roboto } from "@utils/fonts";
// styled components
const ImageBox = styled(Box)({
  padding: 0,
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  "& img": { transition: "0.3s" },
  ":hover": { "& img": { transform: "scale(1.1)" } },
});

const StyledBox = styled(FlexBox)({
  ".test_1": {
    marginTop: "5rem",
  },
  ".test_3": {
    marginTop: "5rem",
  },
});

const StyledFlex = styled(FlexBox)`
  background: var(
    --banners,
    linear-gradient(100deg, #70b0ff -0.84%, #29405e 118.55%)
  );
`;
// ======================================================================
type Section8Props = { products: Product[] };
// ====================================================================
const Section8: FC<Section8Props> = ({ products }) => {
  return (
    <>
      <MediaQuery minWidth={deviceSize.sm}>
        <Container mt="7rem">
          <CategorySectionCreator
            iconName="path"
            title="TESTIMONIALS"
            seeMoreLink="#"
          >
            <StyledBox
              width={"100%"}
              mt="4rem"
              justifyContent={"space-between"}
            >
              <FlexBox width="90%">
                <FlexBox
                  zIndex={1}
                  width="25rem"
                  height="28rem"
                  flexDirection={"column"}
                  alignItems={"center"}
                  marginRight={"0rem"}
                  style={{
                    color: "white",
                    textAlign: "center",
                    padding: "2rem",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundImage:
                      " url('/assets/images/banners/test_banner.png')",
                  }}
                >
                  <Typography
                    fontSize="1.5rem"
                    fontWeight={500}
                    className={roboto.className}
                  >
                    Most Trusted brand{" "}
                    <Typography fontWeight={500} fontSize={"1.2rem"}>
                      for B2B segment
                    </Typography>{" "}
                  </Typography>

                  <Box>
                    <Image
                      marginTop={"2rem"}
                      src="/assets/images/illustrations/testi_illustration.png"
                      width={"7rem"}
                      height={"7rem"}
                    />
                  </Box>

                  <Box
                    justifyContent={"center"}
                    marginTop={"2rem"}
                    width={"80%"}
                    paddingBottom={"0.5rem"}
                    backgroundColor={"white"}
                    borderRadius={"0.625rem"}
                  >
                    <Typography
                      className={quicksand.className}
                      fontWeight={700}
                      fontSize={"2rem"}
                      color="black"
                    >
                      350
                    </Typography>
                    <Typography
                      fontStyle={roboto.className}
                      fontWeight={700}
                      fontSize={"1rem"}
                      color="black"
                    >
                      Satisfied Customers
                    </Typography>
                  </Box>
                  <Link href={"/catalog/products"} >
                  <Box
                    justifyContent={"center"}
                    marginTop={"2rem"}
                    width={"100%"}
                    padding="0.5rem"
                    backgroundColor={"white"}
                    borderRadius={"0.625rem"}
                  >
                    <Typography
                      fontStyle={roboto.className}
                      fontWeight={700}
                      fontSize={"1rem"}
                      color="black"
                    >
                      Shop Now
                    </Typography>
                  </Box>
                  </Link>
                </FlexBox>
                <Carousel
                  totalSlides={3}
                  visibleSlides={2}
                  autoPlay={true}
                  infinite={true}
                  showArrow={false}
                >
                  <Box marginLeft={"2rem"} className="test_1">
                    <TestiCard
                      title="John Parker"
                      subtitle="5"
                      description="“I love the quality of the hair and it has an excellent lace! Hair took about 4 days to come which is very fast for a company that is international! Thank you so much”"
                      img="/assets/images/testimonials/card_base.png"
                      avatarimg="/assets/images/testimonials/avatar1.png"
                    />
                  </Box>

                  <Box marginLeft={"1rem"} className="test_1">
                    <TestiCard
                      title="John Parker"
                      subtitle="5"
                      description="“I love the quality of the hair and it has an excellent lace! Hair took about 4 days to come which is very fast for a company that is international! Thank you so much”"
                      img="/assets/images/testimonials/card_base.png"
                      avatarimg="/assets/images/testimonials/avatar2.png"
                    />
                  </Box>

                  <Box marginLeft={"1rem"} className="test_3">
                    {" "}
                    <TestiCard
                      title="John Parker"
                      subtitle="5"
                      description="“I love the quality of the hair and it has an excellent lace! Hair took about 4 days to come which is very fast for a company that is international! Thank you so much”"
                      img="/assets/images/testimonials/card_base.png"
                      avatarimg="/assets/images/testimonials/avatar3.png"
                    />
                  </Box>
                </Carousel>
              </FlexBox>
            </StyledBox>

            {/* Add your review button */}
            {/* <FlexBox
          justifyContent={"center"}
          mt='5rem'
          alignContent={"center"}>
          <Button
            className={overpass.className}
            color='primary'
            variant='outlined'
            size='large'>
            Add your review
          </Button>
        </FlexBox> */}
          </CategorySectionCreator>

          <FlexBox mt="5rem" mb="5rem">
            <Image
              src="/assets/images/banners/last_banner.png"
              width="100%"
              height="100%"
            />
          </FlexBox>
        </Container>
      </MediaQuery>

      <MediaQuery maxWidth={deviceSize.sm}>
        <FlexBox justifyContent={"center"} width="100%">
          <StyledFlex
            justifyContent="center"
            width="90%"
            padding="2rem"
            paddingBottom="1rem"
            borderRadius="1.125rem"
          >
            <FlexBox flexDirection={"column"} alignItems="center">
              <Typography
                textAlign={"center"}
                color="white"
                marginTop={"-1.5rem"}
                className={roboto.className}
                fontSize="1.25rem"
                fontWeight={600}
              >
                Most Trusted brand for B2B segment
              </Typography>

              <FlexBox
                flexDirection={"column"}
                alignItems={"center"}
                width={"80%"}
                paddingBottom="0.5rem"
                marginTop={"0.5rem"}
                backgroundColor={"white"}
                borderRadius={"0.625rem"}
              >
                <Typography
                  className={quicksand.className}
                  fontWeight={700}
                  fontSize={"2rem"}
                  color="black"
                >
                  350
                </Typography>
                <Typography
                  className={roboto.className}
                  fontWeight={700}
                  fontSize={"0.75rem"}
                  color="black"
                >
                  Satisfied Customers
                </Typography>
              </FlexBox>
            </FlexBox>
          </StyledFlex>
        </FlexBox>

        <FlexBox width="100%" justifyContent="center">
          <FlexBox width="90%">
            <Carousel
              totalSlides={3}
              visibleSlides={2}
              autoPlay={true}
              showArrow={false}
            >
              {" "}
              <StyledBox className="test_1">
                {" "}
                <MobileTesti
                  marginTop="5rem"
                  title="John Parker"
                  subtitle="5"
                  description="“I love the quality of the hair and it has an excellent lace! Hair took about 4 days to come which is very fast for a company that is international! Thank you so much”"
                  img="/assets/images/testimonials/card_base.png"
                  avatarimg="/assets/images/testimonials/avatar2.png"
                />
              </StyledBox>
              <StyledBox className="test_1">
                {" "}
                <MobileTesti
                  title="John Parker"
                  subtitle="5"
                  description="“I love the quality of the hair and it has an excellent lace! Hair took about 4 days to come which is very fast for a company that is international! Thank you so much”"
                  img="/assets/images/testimonials/card_base.png"
                  avatarimg="/assets/images/testimonials/avatar2.png"
                />
              </StyledBox>
              <StyledBox className="test_1">
                {" "}
                <MobileTesti
                  title="John Parker"
                  subtitle="5"
                  description="“I love the quality of the hair and it has an excellent lace! Hair took about 4 days to come which is very fast for a company that is international! Thank you so much”"
                  img="/assets/images/testimonials/card_base.png"
                  avatarimg="/assets/images/testimonials/avatar2.png"
                />
              </StyledBox>
            </Carousel>
          </FlexBox>
        </FlexBox>
      </MediaQuery>

      <MediaQuery query="(min-width: 768px)">
        <Footer1 />
      </MediaQuery>
    </>
  );
};

export default Section8;
