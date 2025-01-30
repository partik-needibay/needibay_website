import React from "react";
import FlexBox from "@component/FlexBox";
import Box from "@component/Box";
import Typography from "@component/Typography";
import { overpass } from "../../utils/fonts";
import { quicksand } from "../../utils/fonts";
import { Button } from "@component/buttons";
import Image from "@component/Image";
const ResponsiveBoxBanner = () => {
  return (
    <>
      <FlexBox
        marginLeft={"3rem"}
        borderRadius='0.41688rem'
        width='95%'
        height='10rem'
        alignItems='center'
        backgroundColor={"#F3D3FF"}>
        <Box
          px='1rem'
          py='1rem'>
          <Typography
            fontSize={"1.5rem"}
            color='black'
            className={overpass.className}
            fontWeight={700}>
            Weekly Offers
          </Typography>
          <Typography
            fontSize={"0.7rem"}
            color='black'
            className={overpass.className}
            fontWeight={500}>
            25% Off
          </Typography>

          <Button
            mt='0.5rem'
            color='primary'
            size='xxsmall'
            variant='contained'>
            <Typography
              fontSize={"0.7rem"}
              className={quicksand.className}>
              Shop Now
            </Typography>
          </Button>
        </Box>

        <Box>
          <Image
            width='10rem'
            src='/assets/images/flash_cards/cardboard_box.png'
            alt='box'
          />
        </Box>
      </FlexBox>
    </>
  );
};

export default ResponsiveBoxBanner;
