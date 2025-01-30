"use client";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Image from "@component/Image";
import Typography from "@component/Typography";
import { Button } from "@component/buttons";
import Icon from "@component/icon/Icon";
import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const CareerBanner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const CareerBannerWrapper = styled(Box)({
    backgroundImage: "url(/assets/images/career/career-banner-bg-svg.svg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    height: `${isMobile ? "none" : "100vh"}`,
    paddingTop: `${isMobile ? "2rem" : "none"}`,
    // marginBottom: "20rem",
    position: "relative",
  });
  return (
    <CareerBannerWrapper>
      <Grid
        container
        justifyContent={"center"}
        margin={"auto"}
        alignItems={"center"}
        maxWidth={"1950px"}
        height={"100%"}
      >
        <Grid item xs={12} md={10}>
          <Grid
            container
            alignItems={"center"}
            justifyContent={"center"}
            spacing={3}
            //
          >
            {/* Left part */}
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <FlexBox
                flexDirection={"column"}
                alignItems={"center"}
                style={{ rowGap: "29px" }}
              >
                <Typography
                  fontSize={`${isMobile ? "2.5rem" : "3rem"}`}
                  color={"#490868"}
                  fontWeight={"700"}
                >
                  Join our team!
                </Typography>
                <Typography
                  fontSize={`${isMobile ? "1.1rem" : "1.1rem"}`}
                  color={"#785689"}
                  fontWeight={"600"}
                  paddingX={`${isMobile ? "1rem" : "0rem"}`}
                  textAlign={"center"}
                >
                  Join our dynamic team at NeediBay® a leading B2B Quick
                  Commerce platform revolutionizing how small and medium
                  businesses tackle bulk buying challenges. As we redefine
                  efficiency and convenience in bulk buying, we're seeking
                  passionate individuals eager to drive innovation and empower
                  businesses. Explore exciting career opportunities with us and
                  make an impact!
                </Typography>
                <Button
                  variant="contained"
                  backgroundColor={"#35004F"}
                  color={"light"}
                  borderRadius={"0.9375rem"}
                  marginBottom={`${isMobile ? "3rem" : "0rem"}`}
                >
                  Explore Opportunities
                </Button>
              </FlexBox>
            </Grid>
            {/* right part */}
            <Grid
              item
              xs={12}
              md={6}
              order={{ xs: 1, md: 2 }}
              //   border={"2px solid red"}
            >
              <Grid container justifyContent={"center"}>
                <Box width={"80%"}>
                  <Image
                    width="100%"
                    src="/assets/images/career/office-desk.png"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {!isMobile ? (
        <Box
          position={"absolute"}
          bottom="-19px"
          left="50%"
          // backgroundColor={"#Fff"}
        >
          <Icon variant="xlarge">arrow-down-circle-thin</Icon>
        </Box>
      ) : null}
    </CareerBannerWrapper>
  );
};

export default CareerBanner;
//
