import FlexBox from "@component/FlexBox";
import Box from "@component/Box";
import styled from "styled-components";
import Image from "@component/Image";
import React from "react";
import { H2, SemiSpan } from "@component/Typography";
import { quicksand } from "@utils/fonts";
import { Paragraph } from '../Typography';
const StyledFlexBox = styled(FlexBox)`
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`;

const TestiCard = ({ ...props }) => {
  const numStars = props.subtitle;
  return (
    <StyledFlexBox
      justifyContent={"center"}
      position={"relative"}
      height='19rem'
      borderRadius={"1.3125rem"}
      width={"22rem"}
      backgroundColor={"white"}>
      <Box
        position='absolute'
        zIndex={1}
        style={{ top: "-25%" }}>
        <Image
          src={props.avatarimg}
          width={"10rem"}
          height={"10rem"}
        />
      </Box>

      <Box marginTop={"25%"}>
        <FlexBox
          justifyContent={"center"}
          alignItems={"center"}>
          <H2
            fontSize={"1.5rem"}
            fontWeight={"600"}
            color='#689DFF'
            className={quicksand.className}>
            {props.title}
          </H2>
        </FlexBox>

        <FlexBox
          justifyContent={"center"}
          alignItems={"center"}>
          {Array.from({ length: numStars }).map((_, i) => (
            <Image
              key={i}
              src='/assets/images/testimonials/star.png'
              width='12.97px'
              height='13.9px'
              ml='0.2rem'
            />
          ))}
        </FlexBox>

        <FlexBox
          justifyContent={"center"}
          alignItems={"center"}>
          <Paragraph
            textAlign={"center"}
            padding={"0 1.5rem 0 2rem"}
            wordWrap={"break-word"}
            mt={"1rem"}
            color={"#000"}
            fontWeight={"600"}
            className={quicksand.className}
            fontSize='1rem'>
            {props.description}
          </Paragraph>
        </FlexBox>
      </Box>
    </StyledFlexBox>
  );
};

export default TestiCard;
