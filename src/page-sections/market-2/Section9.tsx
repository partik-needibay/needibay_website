"use client";
import { FC } from "react";
import Box from "@component/Box";
import Image from "@component/Image";
import FlexBox from "@component/FlexBox";
import { H2 } from "@component/Typography";
import Container from "@component/Container";
import { Carousel } from "@component/carousel";
import useVisibleSlide from "./hooks/useVisibleSlide";
import Brand from "@models/Brand.model";
import styled from "styled-components";
// ==========================================================
type Props = { brands: Brand[] };
// ==========================================================


const StyledBox = styled(Box)`
  
  @media only screen and (max-width: 900px) {
    padding: 0;
    margin: 0;
  }
`;

const StyledContainer = styled(Container)`
  @media only screen and (max-width: 900px) {
    padding: 0;
    margin: 0;
  }
`;

const Section9: FC<Props> = ({ brands }) => {
  const { visibleSlides } = useVisibleSlide({
    initialSlide: 6,
    md: 4,
    sm: 4,
    xs: 4,
  });

  return (
    <Container my="2rem">

      <StyledBox padding="1rem" bg="white">
        <Carousel
          step={2}
          autoPlay={true}
          infinite={true}
          showArrow={false}
          totalSlides={brands.length}
          visibleSlides={visibleSlides}
        >
          {brands.map((item) => (
            <FlexBox
              key={item.id}
              height="100%"
              margin="auto"
              maxWidth={110}
              alignItems="center"
              justifyContent="center"
            >
              <Image
                src={item.image}
                alt="brand"
                width="100%"
              />
            </FlexBox>
          ))}
        </Carousel>
      </StyledBox>
    </Container>
  );
};

export default Section9;
