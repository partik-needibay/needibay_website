
import React from "react";
import Image from "@component/Image";
import FlexBox from "@component/FlexBox";
import Box from "@component/Box";
import Typography from "@component/Typography";
import { roboto, quicksand, sans } from "@utils/fonts";
import styled from "styled-components";
import Button from "@component/buttons/Button";
const StyledFlex = styled(FlexBox)`
  background: var(
    --banners,
    linear-gradient(100deg, #70b0ff -0.84%, #29405e 118.55%)
  );
`;

const ResponsiveCard = () => {
  return (
    <FlexBox
      justifyContent={"center"}
      width='100%'>
      <StyledFlex
        justifyContent='space-between'
        marginBottom='2rem'
        alignItems='center'
        width='90%'
        padding='2rem'
        borderRadius='1.125rem'>
        <Box>
          <Image
            width='7rem'
            src='/assets/images/banners/cardboard_boxes.png'
          />
        </Box>
        <Box>
          <FlexBox alignItems={"center"}>
            <Typography
              color='white'
              className={sans.className}
              fontSize={"1.1rem"}
              mr='0.5rem'
              fontWeight={700}>
              NEW SIZE
            </Typography>
            <Typography
              color='white'
              className={sans.className}
              fontSize={"1.1rem"}
              fontWeight={400}>
              Boxes
            </Typography>
          </FlexBox>
          <Box textAlign={"center"}>
            <Typography
              color='white'
              className={sans.className}
              fontSize={"0.7rem"}
              mr='0.5rem'
              fontWeight={400}>
              For your every need
            </Typography>{" "}
          </Box>
          <Box textAlign={"center"}>
            <Typography
              color='white'
              className={sans.className}
              fontSize={"1.5rem"}
              mr='0.5rem'
              fontWeight={800}>
              $12.00
            </Typography>{" "}
          </Box>

          <FlexBox mt='0.2rem' justifyContent={'center'}>

            {/* @ts-ignore */}
            <Button borderRadius={'2rem'} size='xxsmall' variant='contained' color='light'>
              <Typography fontSize={'0.7rem'} color='#2B3445'>Shop Now</Typography>
            </Button>
          </FlexBox>
        </Box>
      </StyledFlex>
    </FlexBox>
  );
};

export default ResponsiveCard;
