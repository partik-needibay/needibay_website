"use client";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Signup from "@component/sessions/Signup";
import styled from "styled-components";
import { useState, useEffect } from "react";

import Image from "@component/Image";
import { Sign } from "crypto";

import { isMobile } from "react-device-detect";

const StyledBox1 = styled(FlexBox)`
  @media only screen and (max-width: 600px) {
    justify-content: center;
    padding-left: 0rem;
  }
`;

const StyledBox2 = styled(Box)`
  @media only screen and (max-width: 600px) {
    padding-left: 0rem;
    margin-top: 7rem;
  }
`;


const StyledImage = styled(Image)`
  @media only screen and (max-width: 600px) {
    width: 12rem;
  }
`;

const BackGroundFlexBox = styled(Box)`
  background-image: linear-gradient(
      87deg,
      rgba(0, 0, 0, 0.76) 42.64%,
      rgba(0, 0, 0, 0) 73.88%
    ),
    url("/assets/images/signup/signup-bg.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  @media only screen and (max-width: 600px) {
    background-image: linear-gradient(
        87deg,
        rgba(0, 0, 0, 0.76) 100%,
        rgba(0, 0, 0, 0) 80.88%
      ),
      url("/assets/images/signup/signup-bg.jpeg");
  }
`;

const SignUpPage = () => {
  const [stateMobile, setState] = useState(false);

  useEffect(() => {
    if (!isMobile && typeof window !== "undefined") {
      setState(stateMobile);
    } else {
      setState(!stateMobile);
    }
  }, []);

  return (
    <BackGroundFlexBox
      minHeight='100vh'
      alignItems='flex-start'
      flexDirection='row'
      paddingBottom='3rem'
      justifyContent='flex-start'>
      <StyledBox1
        paddingLeft='10rem'
        paddingTop={"2rem"}>
        <StyledImage
          width='20rem'
          src='/assets/images/logos/needibay_login.png'
        />
      </StyledBox1>

      <StyledBox2
        mt='5rem'
        paddingLeft='10rem'
        >
        <Signup />
      </StyledBox2>
    </BackGroundFlexBox>
  );
};

export default SignUpPage;
