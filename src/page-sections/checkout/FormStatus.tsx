"use client";
import { Fragment, useState } from "react";
import Box from "@component/Box";
import Card from "@component/Card";
import Avatar from "@component/avatar";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import useWindowSize from "@hook/useWindowSize";

type Status = "info" | "shipping" | "summary";

const FormStatus = ({ status, setStatus, statusIndex, setStatusIndex }) => {
  const width: any = useWindowSize();
  const formStatus: Status = "info";

  const stepIconList = ["user-3", "locate-3", "card-3"];

  const breakpoint = 350;


  const formStatusList = ["info", "shipping", "summary"];

  return (
    <>
      <FlexBox
        my='2rem'
        flexWrap='wrap'
        alignItems='center'
        justifyContent='space-between'
        flexDirection={width < breakpoint ? "column" : "row"}>
        {stepIconList.map((item, ind) => (
          <Fragment key={item}>
            <Box position='relative'>
              <Avatar
                size={64}
                bg={ind <= statusIndex ? "gray.200" : "white"}
                border={ind <= statusIndex ? "2px solid" : "2px solid #9C9C9C"}
                color={ind <= statusIndex ? "gray.white" : "gray.300"}>
                <Icon
                  size='32px'
                  onClick={() => {
                    setStatus(formStatusList[ind]);
                    setStatusIndex(ind);
                  }}
                  defaultcolor='currentColor'>
                  {item}
                </Icon>
              </Avatar>
            </Box>

            {ind < stepIconList.length - 1 && (
              <Box
                height={width < breakpoint ? 50 : 4}
                minWidth={width < breakpoint ? 4 : 50}
                flex={width < breakpoint ? "unset" : "1 1 0"}
                bg={ind < statusIndex ? "gray.200" : "gray.300"}
              />
            )}
          </Fragment>
        ))}
      </FlexBox>
    </>
  );
};

export default FormStatus;
