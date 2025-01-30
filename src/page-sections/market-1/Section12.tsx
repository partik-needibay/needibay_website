"use client";
import { FC, useState, useEffect } from "react";

// ** COMPONENT IMPORTS
import Card from "@component/Card";
import Link from "next/link";
import Grid from "@component/grid/Grid";
import Image from "@component/Image";
import FlexBox from "@component/FlexBox";
import Container from "@component/Container";
import CategorySectionCreator from "@component/CategorySectionCreator";
import Typography, { H4 } from "@component/Typography";
import Slider from "react-slick";
// ** CONSTANTS
import Service from "@models/service.model";
import styled from "styled-components";
import { open_sans, overpass } from "@utils/fonts";

import "../../components/slider/styles.css";

// ** MOBILE IMPORT
import { Carousel } from "@component/carousel";
import Box from "@component/Box";
import Icon from "@component/icon/Icon";

import MediaQuery from "react-responsive";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppContext } from "@context/AppContext";

// ==================================================
// ==================================================

//styled component

const CategoryImage = styled(FlexBox)({
  "& img": { transition: "all 0.3s", boxShadow: "none" },
  ":hover": {
    img: { transform: "scale(1.25)" },
  },
});
var settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
  slidesToScroll: 1,
};
const Section12 = ({ serviceList }) => {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    if (serviceList?.length > 0) {
      dispatch({
        type: "CATEGORY_LIST",
        payload: serviceList,
      });
    }
  }, [serviceList]);

  const renderImageCategoryImageSource = (categoryImages) => {
    let categoryImageArray: any = [];
    if (categoryImages?.length > 0) {
      categoryImages?.map((item) => {
        if (item.pageBlockCode == "DESKTOP_CATEGORY_BOX") {
          categoryImageArray.push(item);
        }
      });
    }
    console.log("==================category images array===================");
    console.log(categoryImageArray);
    return categoryImageArray[0]?.value;
  };

  return (
    <Container mt="2rem" mb="2rem">
      <CategorySectionCreator
        iconName="path"
        title="CATEGORIES"
        seeMoreLink="#"
      >
        <MediaQuery query="(max-width: 768px)">
          <Slider className="sliderClass" {...settings}>
            {serviceList?.length > 0 &&
              serviceList.map((item) => (
                <div>
                  <Image
                    width={"3rem"}
                    marginTop={"1rem"}
                    height={"3rem"}
                    alt="category"
                    src={
                      item.mediaPath
                        ? (item.mediaPath as string)
                        : "https://placehold.co/100x100/B48BFF/FFF"
                    }
                  />
                  <H4
                    fontSize="0.75rem"
                    padding="0.6rem"
                    fontWeight="500"
                    style={{ whiteSpace: "nowrap" }}
                    className={overpass.className}
                  >
                    {item.categoryName}
                  </H4>
                </div>
              ))}
          </Slider>
          <Link href="/catalog/products">
            <FlexBox
              mr="1rem"
              mt="1rem"
              justifyContent={"flex-start"}
              cursor="pointer"
              alignItems={"center"}
            >
              <Typography
                className={open_sans.className}
                fontSize={"0.875rem"}
                fontWeight={500}
              >
                All categories
              </Typography>
              <Box marginLeft={"0.3rem"}>
                <Icon color="categories" variant="xxsmall">
                  right-arrow
                </Icon>
              </Box>
            </FlexBox>
          </Link>
        </MediaQuery>
        <MediaQuery query="(min-width: 769px)">
          <FlexBox flexDirection={"column"} alignItems={"space-between"}>
            {serviceList?.length > 0 && (
              <Grid
                container
                spacing={6}
                justifyContent={
                  serviceList?.length <= 6 ? "center" : "flex-start"
                }
              >
                {serviceList.slice(0, 5).map((item, ind) => (
                  <Grid item lg={2} md={4} xs={12} key={item.id}>
                    {item.isStoreVisible && (
                      <Link href={"/catalog/products/?category=" + item.id}>
                        <CategoryImage
                          cursor="pointer"
                          py="2rem"
                          as={Card}
                          hoverEffect={true}
                          borderRadius={8}
                          alignItems="center"
                          flexDirection="column"
                        >
                          <CategoryImage opacity={0.5}>
                            <Image
                              borderRadius={"5px"}
                              width={ind === 0 ? "9rem" : 100}
                              height={100}
                              alt="category"
                              src={renderImageCategoryImageSource(
                                item?.categoryImages
                              )}
                            />
                          </CategoryImage>

                          <H4
                            mt="2rem"
                            fontSize="1.3rem"
                            fontWeight="500"
                            className={overpass.className}
                            textAlign="center"
                          >
                            {item.categoryName}
                          </H4>
                        </CategoryImage>
                      </Link>
                    )}
                  </Grid>
                ))}
                {serviceList?.length > 5 && (
                  <Grid item lg={2} md={4} xs={12}>
                    <CategoryImage
                      py="2rem"
                      as={Card}
                      hoverEffect={true}
                      borderRadius={8}
                      alignItems="center"
                      flexDirection="column"
                    >
                      <CategoryImage opacity={0.5}>
                        <Image
                          borderRadius={"5px"}
                          height={100}
                          alt="category"
                          src={"https://placehold.co/100x100/B48BFF/FFF"}
                        />
                      </CategoryImage>

                      <H4
                        mt="2rem"
                        fontSize="1.3rem"
                        fontWeight="500"
                        className={overpass.className}
                        textAlign="center"
                      >
                        {"View All"}
                      </H4>
                    </CategoryImage>
                  </Grid>
                )}
              </Grid>
            )}
            <Link href="/catalog/products">
              <FlexBox
                mr="1rem"
                mt="0.5rem"
                justifyContent={"flex-end"}
                cursor="pointer"
                alignItems={"center"}
              >
                <Typography
                  className={open_sans.className}
                  fontSize={"0.875rem"}
                  fontWeight={500}
                >
                  All categories
                </Typography>
                <Box marginLeft={"0.3rem"}>
                  <Icon color="categories" size="small">
                    right-arrow
                  </Icon>
                </Box>
              </FlexBox>
            </Link>
          </FlexBox>
        </MediaQuery>
      </CategorySectionCreator>
    </Container>
  );
};

export default Section12;
