"use client"
import React, { useEffect } from "react";
import Box from "@component/Box";
import styled from "styled-components";
import Image from "@component/Image";
import Changepassword from "@component/change-password/Changepassword";
import { useParams } from "next/navigation";
const StyledBox1 = styled(Box)`
  @media only screen and (max-width: 600px) {
    display: flex;
    justify-content: center;
    padding-left: 0rem;
  }
`;

const StyledBox2 = styled(Box)`
  @media only screen and (max-width: 600px) {
    display: flex;
    justifycontent: center;
    padding-left: 0rem;
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
    url("/assets/images/login/login-bg.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  @media only screen and (max-width: 600px) {
    background-image: linear-gradient(
        87deg,
        rgba(0, 0, 0, 0.76) 100%,
        rgba(0, 0, 0, 0) 80.88%
      ),
      url("/assets/images/login/login-bg.jpeg");
  }
`;
const ChangePassword = () => {
  const param = useParams();
  const forgotPasswordToken = param?.id;
  return (
    <BackGroundFlexBox
      minHeight="100vh"
      alignItems="flex-start"
      flexDirection="row"
      justifyContent="flex-start"
    >
      <StyledBox1 paddingLeft="10rem" paddingTop={"2rem"}>
        <StyledImage
          width="20rem"
          src="/assets/images/logos/needibay_login.png"
        />
      </StyledBox1>

      <StyledBox2 mt="8rem" paddingLeft="10rem">
        <Changepassword forgotPasswordToken={param?.id} />
      </StyledBox2>

      {/* <Box><Login />  </Box> */}
    </BackGroundFlexBox>
  );
};

export default ChangePassword;
