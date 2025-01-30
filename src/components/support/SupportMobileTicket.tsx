import React from "react";
import { useState, useEffect } from "react";
import MediaQuery from "react-responsive";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import { roboto } from "@utils/fonts";
import { sans } from "@utils/fonts";
import Typography from "@component/Typography";
import Icon from "@component/icon/Icon";
import { format } from "date-fns";
import { Chip } from "@component/Chip";
import Link from "next/link";

const SupportMobileTicket = ({ ticket }) => {
  const getColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "secondary";
      case "Medium":
        return "tertiary";
      case "Open":
        return "success";
      case "Cancelled":
        return "error";
      default:
        return "";
    }
  };
  return (
    <Box
      mt='1rem
          
          '
      borderRadius={"0.58331rem"}
      width='100%'
      paddingTop={"1rem"}
      border='1px solid #D8E0E9'
      borderBottom={"none"}>
      <FlexBox
        mt='0.75rem'
        px='1rem'>
        <Typography
          fontSize={"0.91288rem"}
          color='#4B566B'
          fontWeight={400}
          className={sans.className}>
          Subject:
        </Typography>

        <Typography
          fontSize={"0.91288rem"}
          ml='3rem'
          color='#2B3445'
          fontWeight={400}
          className={sans.className}>
          {ticket.id.substring(0, 8)}
        </Typography>
      </FlexBox>
      <FlexBox
        mt='0.35rem'
        px='1rem'>
        <Typography
          fontSize={"0.91288rem"}
          color='#4B566B'
          fontWeight={400}
          className={sans.className}>
          Date:
        </Typography>

        <Typography
          fontSize={"0.81288rem"}
          ml='4rem'
          color='#2B3445'
          fontWeight={400}
          className={sans.className}>
          Oct 12, 2020
        </Typography>
      </FlexBox>

      <FlexBox
        mt='0.35rem'
        px='1rem'>
        <Typography
          fontSize={"0.91288rem"}
          color='#4B566B'
          fontWeight={400}
          className={sans.className}>
          Type:
        </Typography>

        <Typography
          fontSize={"0.81288rem"}
          ml='4rem'
          color='#2B3445'
          fontWeight={400}
          className={sans.className}>
          Website Problem
        </Typography>
      </FlexBox>

      <FlexBox
        mt='0.35rem'
        px='1rem'>
        <Typography
          fontSize={"0.91288rem"}
          color='#4B566B'
          fontWeight={400}
          className={sans.className}>
          Priority:
        </Typography>

        <Box ml='3rem'>
          <Chip
            p='0.25rem 0.7rem'
            bg={`${getColor('Medium')}.light`}>
            <Typography
              fontSize={"0.65rem"}
              fontWeight={500}
              color={`${getColor('Medium')}.main`}>
              Medium
            </Typography>
          </Chip>
        </Box>
      </FlexBox>

      <FlexBox
        mt='0.35rem'
        px='1rem'>
        <Typography
          fontSize={"0.91288rem"}
          color='#4B566B'
          fontWeight={400}
          className={sans.className}>
          Status:
        </Typography>

        <Box ml='3.5rem'>
          <Chip
            p='0.25rem 0.7rem'
            bg={`${getColor(ticket.status)}.light`}>
            <Typography
              fontSize={"0.65rem"}
              fontWeight={500}
              color={`${getColor(ticket.status)}.main`}>
              {ticket.status}
            </Typography>
          </Chip>
        </Box>
      </FlexBox>




      <FlexBox>
        <Box
          mt='0.5rem'
          padding='0.25rem'
          borderRadius={" 0rem 0rem 0rem 0.58331rem"}
          border='1px solid #D8E0E9'
          borderLeft={"none"}
          width='50%'>
          <Link
            href={`/orders/${ticket.id}`}
            passHref>
            <FlexBox
              justifyContent='center'
              alignItems={"center"}>
              <Icon color='dark'>resolve</Icon>
              <Typography
                ml='0.35rem'
                className={sans.className}
                fontSize={"0.81rem"}
                fontWeight={400}>
                Resolve Issue
              </Typography>
            </FlexBox>
          </Link>
        </Box>
        <Box
          mt='0.5rem'
          padding='0.25rem'
          borderRadius={" 0rem 0rem 0.58331rem 0rem"}
          border='1px solid #D8E0E9'
          borderLeft='none'
          borderRight='none'
          width='50%'>
          <FlexBox
            justifyContent='center'
            alignItems={"center"}>
            <Icon color='light'>right-arrow-2</Icon>
            <Typography
              ml='0.35rem'
              className={sans.className}
              fontSize={"0.81rem"}
              color='primary.main'
              fontWeight={400}>
              Open
            </Typography>
          </FlexBox>
        </Box>
      </FlexBox>
    </Box>
  );
};

export default SupportMobileTicket;
