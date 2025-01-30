import React from "react";
import { useState, useEffect } from "react";
import MediaQuery from "react-responsive";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import { roboto } from "@utils/fonts";
import { sans } from "@utils/fonts";
import Typography from "@component/Typography";
import Icon from "@component/icon/Icon";

const AddressMobileCard = ({ item }) => {
  return (
    <Box
      mt="1rem"
      borderRadius={"0.58331rem"}
      width="100%"
      paddingTop={"1rem"}
      border="1px solid #D8E0E9"
      borderBottom={"none"}
    >
      <Typography
        className={sans.className}
        color="#2B3445"
        px="1rem"
        fontSize={"0.933rem"}
        fontWeight={400}
      >
        {`${item.street}, ${item.city}, ${item.country}`}
      </Typography>

      <FlexBox px="1rem" mt="0.5rem">
        <Typography
          color="#A1A1A1"
          className={sans.className}
          fontSize={"0.9333rem"}
          fontWeight={600}
        >
          Office
        </Typography>
        <Typography
          color="#A1A1A1"
          ml="0.75rem"
          className={sans.className}
          fontSize={"0.9333rem"}
          fontWeight={600}
        >
          Ph: {item.phone}
        </Typography>
      </FlexBox>

      <FlexBox>
        <Box
          mt="0.5rem"
          padding="0.25rem"
          borderRadius={" 0rem 0rem 0rem 0.58331rem"}
          border="1px solid #D8E0E9"
          borderLeft={"none"}
          width="50%"
        >
          <FlexBox justifyContent="center" alignItems={"center"}>
            <Icon color="light">edit-2</Icon>
            <Typography
              ml="0.2rem"
              className={sans.className}
              fontSize={"0.81rem"}
              fontWeight={400}
            >
              Edit
            </Typography>
          </FlexBox>
        </Box>
        <Box
          mt="0.5rem"
          padding="0.25rem"
          borderRadius={" 0rem 0rem 0.58331rem 0rem"}
          border="1px solid #D8E0E9"
          borderLeft="none"
          borderRight="none"
          width="50%"
        >
          <FlexBox justifyContent="center" alignItems={"center"}>
            <Icon color="light">delete-2</Icon>
            <Typography
              ml="0.2rem"
              className={sans.className}
              fontSize={"0.81rem"}
              fontWeight={400}
            >
              Delete
            </Typography>
          </FlexBox>
        </Box>
      </FlexBox>
    </Box>
  );
};

export default AddressMobileCard;
