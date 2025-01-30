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
  left: 3rem;
  /* &:hover {
    transform: scale(1.5);
    trasnform-origin: left center;
    
  } */
`;


const StyledFlexBox = styled(FlexBox)`
  &:hover {
    box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.2);
    img{
      transform: scale(1.5);
      trasnform-origin: left center;
    }
  }
`;


const BannerCard1 = () => {
  return (
    <StyledFlexBox
      height='13rem'
      padding='2rem'
      borderRadius={"0.5rem"}
      
      justifyContent={"space-around"}
      alignItems={"center"}
      backgroundColor={"#FFD0D0"}>
      <Box>
        <Typography
          className={overpass.className}
          fontSize='1.5625rem'
          color='black'
          fontWeight='600'
          mt='0.5rem'>
          Flash Sale
        </Typography>
        <Typography
          className={overpass.className}
          fontSize={"1rem"}
          color='black'
          fontWeight={"400"}>
          Only 24 hours
        </Typography>
        <Typography
          className={overpass.className}
          fontSize={"1rem"}
          color='black'
          fontWeight={"400"}>
          Upto 30% off on everything
        </Typography>

        <Box mt='1rem'>
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

      <StyledImage>
        <Box>
          <Image
            width='10rem'
            src='/assets/images/flash_cards/flash.png'
          />
        </Box>
      </StyledImage>
    </StyledFlexBox>
  );
};

export default BannerCard1;
