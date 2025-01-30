"use client";
import FlexBox from "@component/FlexBox";
import { Grid, Box, Typography } from "@mui/material";
import { justifyContent } from "styled-system";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import Image from "@component/Image";
import Link from "next/link";
import { Button } from "@component/buttons";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { theme } from "@utils/theme";

const AnimatedOrderTruck = styled(Image)`
  -webkit-animation: slide-out-right 0.5s cubic-bezier(0.6, -0.28, 0.735, 0.045)
    1s both;
  animation: slide-out-right 0.5s cubic-bezier(0.6, -0.28, 0.735, 0.045) 1s both;
  @-webkit-keyframes slide-out-right {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translateX(1000px);
      transform: translateX(1000px);
      opacity: 0;
    }
  }
  @keyframes slide-out-right {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translateX(1000px);
      transform: translateX(1000px);
      opacity: 0;
    }
  }
`;

const AnimatedFlexBox = styled(FlexBox)`
    -webkit-animation: fade-in-bottom 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)
      both;
    animation: fade-in-bottom 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;

  @-webkit-keyframes fade-in-bottom {
    0% {
      -webkit-transform: translateY(50px);
      transform: translateY(50px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes fade-in-bottom {
    0% {
      -webkit-transform: translateY(50px);
      transform: translateY(50px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
  }
`;


const OrderSuccess = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [orderSuccessComp, setOrderSuccessComp] = useState(false);

  return (
    <FlexBox
      minHeight="100vh"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      overflow={"hidden"}
      backgroundColor={orderSuccessComp ? theme.colors.primary.main2 : "White"}
    >
      <AnimatedOrderTruck
        src="/assets/images/orders/order-placed.gif"
        maxWidth="320px"
        width="100%"
        mb="2rem"
        onAnimationEndCapture={() => setOrderSuccessComp(true)}
      />

      {orderSuccessComp === true && (
        <AnimatedFlexBox
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <FlexBox
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            pb={3}
          >
            <Typography
              fontFamily={"inherit"}
              fontWeight={"bolder"}
              color={"white"}
              variant="h1"
            >
              Wohoo!
            </Typography>
            <Typography color={"white"} variant="h3">
              Order Placed{" "}
            </Typography>
          </FlexBox>
          <FlexBox>
            <Link href={"/orders"}>
              <Button variant="outlined" color="white" m="0.5rem">
                View Order
              </Button>
            </Link>

            <Link href="/">
              <Button
                variant="contained"
                color={theme.colors.primary.main2}
                backgroundColor={"white"}
                m="0.5rem"
              >
                Go to Home
              </Button>
            </Link>
          </FlexBox>
        </AnimatedFlexBox>
      )}
    </FlexBox>
  );
};

export default OrderSuccess;
