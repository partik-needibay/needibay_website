"use client";
import { Fragment } from "react";
import Box from "@component/Box";
import Card from "@component/Card";
import Avatar from "@component/avatar";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import useWindowSize from "@hook/useWindowSize";
import Image from "@component/Image";
import MediaQuery from "react-responsive";

type Status = "packaging" | "shipping" | "delivering" | "complete";

const OrderStatus = () => {
  const width: any = useWindowSize();
  const orderStatus: Status = "delivering";
  const stepIconList = ["package-box", "truck-1", "delivery"];
  const orderStatusList = ["packaging", "shipping", "delivering", "complete"];
  const breakpoint = 1023;
  const statusIndex = orderStatusList.indexOf(orderStatus);

  return (
    <>
      <MediaQuery minWidth={1024}>
        <Box mb="30px" borderRadius={8}>
          <FlexBox
            my="2rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
            flexDirection={width < breakpoint ? "column" : "row"}
          >
            {stepIconList.map((item, ind) => (
              <Fragment key={item}>
                <Box position="relative">
                  {ind == statusIndex ? (
                    <Image
                      width="15rem"
                      height="15rem"
                      src={`/assets/images/orders/${item}.gif`}
                      alt="icon"
                    />
                  ) : (
                    <Avatar
                      size={64}
                      bg={ind <= statusIndex ? "primary.step" : "gray.300"}
                      color={ind <= statusIndex ? "gray.white" : "gray.white"}
                    >
                      <Icon size="32px" defaultcolor="currentColor">
                        {item}
                      </Icon>
                    </Avatar>
                  )}

                  {ind < statusIndex && (
                    <Box position="absolute" right="0" top="0">
                      <Avatar size={22} bg="gray.200" color="success.main">
                        <Icon size="12px" defaultcolor="currentColor">
                          done
                        </Icon>
                      </Avatar>
                    </Box>
                  )}
                </Box>

                {ind < stepIconList.length - 1 && (
                  <Box
                    height={width < breakpoint ? 50 : 4}
                    minWidth={width < breakpoint ? 4 : 50}
                    flex={width < breakpoint ? "unset" : "1 1 0"}
                    bg={ind < statusIndex ? "primary.step" : "gray.300"}
                  />
                )}
              </Fragment>
            ))}
          </FlexBox>
        </Box>
      </MediaQuery>

      <MediaQuery maxWidth={1023}>
        <Box mb="30px" borderRadius={8}>
          <FlexBox
            my="2rem"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
            flexDirection={"column"}
          >
            {stepIconList.map((item, ind) => (
              <Fragment key={item}>
                <Box position="relative">
                  {ind == statusIndex ? (
                    <Image
                      style={{ marginTop: "-2rem" }}
                      width="12rem"
                      src={`/assets/images/orders/${item}.gif`}
                      alt="icon"
                    />
                  ) : (
                    <Avatar
                      size={45}
                      bg={ind <= statusIndex ? "primary.step" : "gray.300"}
                      color={ind <= statusIndex ? "gray.white" : "gray.white"}
                    >
                      <Icon size="20px" defaultcolor="currentColor">
                        {item}
                      </Icon>
                    </Avatar>
                  )}
                </Box>

                {ind < stepIconList.length - 1 && (
                  <Box
                    marginTop="-1rem"
                    height={width < breakpoint ? 50 : 4}
                    minWidth={width < breakpoint ? 4 : 50}
                    flex={width < breakpoint ? "unset" : "1 1 0"}
                    bg={ind < statusIndex ? "primary.step" : "gray.300"}
                  />
                )}
              </Fragment>
            ))}
          </FlexBox>
        </Box>
      </MediaQuery>
    </>
  );
};

export default OrderStatus;
