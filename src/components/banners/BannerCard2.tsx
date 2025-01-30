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
left: 1.5rem;
/* &:hover {
  left: 1.2rem;
  transform: scale(1.5);
  trasnform-origin: left center;
} */
`;

const StyledFlexBox = styled(FlexBox)`
&:hover {
  box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.2);
  img{
    left: 1.2rem;
    transform: scale(1.5);
    trasnform-origin: left center;
  }
}
`;


const BannerCard2 = () => {
  return (
    <StyledFlexBox
      height='13rem'
      padding='2rem'
      borderRadius={"0.5rem"}
      justifyContent={"space-around"}
      alignItems={"center"}
      backgroundColor={"#F3D3FF"}>
      <Box>
        <Typography
          className={overpass.className}
          fontSize='1.5625rem'
          color='black'
          fontWeight='600'  
          mt='0.5rem'>
          Weekly Offers
        </Typography>
        <Typography
          className={overpass.className}
          fontSize={"1.25rem"}
          color='black'
          fontWeight={"400"}>
          25% off
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

      <StyledImage>
        <Box>
          <Image
            width='10rem'
            src='/assets/images/flash_cards/cardboard_box.png'
          />
        </Box>
      </StyledImage>
    </StyledFlexBox>
  );
};

export default BannerCard2;
