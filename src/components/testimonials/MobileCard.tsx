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

const MobileTesti = ({ ...props }) => {
  const numStars = props.subtitle;
  return (
    <StyledFlexBox
      overflow='visible'
      marginTop={'5rem'}
      marginBottom='8rem' 
      justifyContent={"center"}
      position={"relative"}
      padding='0.5rem'
      height='11.79319rem'
      borderRadius={"1.3125rem"}
      width={"18.44625rem"}
      backgroundColor={"white"}>
      <Box
        position='absolute'
        zIndex={1}
        style={{ top: "-25%" }}>
        <Image
          src={props.avatarimg}
          width={"4.7785rem"}
          height={"4.66869rem"}
        />
      </Box>

      <Box marginTop={"17%"}>
        <FlexBox
        justifyContent={"center"}
          alignItems={"center"}>
          <H2
            fontSize={"1rem"}
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
              width='8.97px'
              height='8.9px'
              ml='0.2rem'
            />
          ))}
        </FlexBox>

        <FlexBox
          justifyContent={"center"}
          alignItems={"center"}>
          <Paragraph
            textAlign={"center"}
            padding={"0 0.2rem 0 0.3rem"}
            wordWrap={"break-word"}
            mt={"0.2rem"}
            color={"#000"}
            fontWeight={"600"}
            className={quicksand.className}
            fontSize='0.6rem'>
            {props.description}
          </Paragraph>
        </FlexBox>
      </Box>
    </StyledFlexBox>
  );
};

export default MobileTesti;
