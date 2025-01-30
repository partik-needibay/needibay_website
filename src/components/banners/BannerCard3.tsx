import FlexBox from "@component/FlexBox";
import Box from "@component/Box";
import Typography from "@component/Typography";
import Image from "@component/Image";
import styled from "styled-components";
import React from "react";
import { overpass, quicksand } from "@utils/fonts";
import Button from "@component/buttons/Button";

const StyledImage = styled(Box)`
  position: relative;
  top: 0;

  /* &:hover {
    transform: scale(1.3);
    clip-path: inset(0 0 2% 0);
    transform-origin: left top;
    top: -3rem;
    zindex: 2;
  } */
`;

const StyledFlexBox = styled(FlexBox)`
  &:hover {
    box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.2);
    .flash_hover {
      transform: scale(1.3);
      clip-path: inset(0 0 2% 0);
      transform-origin: left top;
      top: -3rem;
      zindex: 2;
    }
  }
`;

const BannerCard3 = () => {
  return (
    <StyledFlexBox
      height='13rem'
      style={{ overflow: "clip", overflowClipMargin: "10rem" }}
      padding='2rem'
      borderRadius={"0.5rem"}
      justifyContent={"space-around"}
      backgroundColor={"#C7E1FF"}>
      <Box>
        <Typography
          className={overpass.className}
          fontSize='1.5625rem'
          color='black'
          fontWeight='600'
          mb='0.5rem'
          mt='0.5rem'>
          Daily Offers
        </Typography>
        <Typography
          className={overpass.className}
          fontSize={"1rem"}
          color='black'
          textAlign='center'
          fontWeight={"400"}>
          40% off on plastic bottles
        </Typography>

        <Box mt='2rem'>
          <Button
            size='small'
            borderRadius={"0.7rem"}
            py='1rem'
            variant='contained'
            color='primary'>
            <Typography
              className={quicksand.className}
              fontSize={"1.125rem"}>
              {" "}
              Shop Now
            </Typography>
          </Button>
        </Box>
      </Box>

      <StyledImage
        className='flash_hover'
        style={{ height: "11rem", overflow: "hidden" }}>
        <Box>
          <Image
            src='/assets/images/flash_cards/bottle_2.png'
            height={"20rem"}
            width={"6rem"}
          />
        </Box>
      </StyledImage>
    </StyledFlexBox>
  );
};

export default BannerCard3;
