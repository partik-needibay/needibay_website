"use client";
import React from "react";
import AddressMobileCard from "./AddressMobileCard";
import { useState, useEffect } from "react";
import MediaQuery from "react-responsive";
import AddNewAddress from "@sections/address/AddNewAddress";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import AddressItem from "@sections/address/AddressItem";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import { roboto } from "@utils/fonts";
import { sans } from "@utils/fonts";
import Typography from "@component/Typography";
import Icon from "@component/icon/Icon";
import { layoutConstant } from "@utils/constants";
import styled from "styled-components";
import Button from "@component/buttons/Button";

import Address from "@component/address/Address";
import { useRouter } from "next/navigation";
import Image from "@component/Image";
const ButtonWrapper = styled.div`
  padding: 10px 10px;
  left: 0;
  right: 0;
  position: fixed;
  bottom: ${layoutConstant.mobileNavHeight}; // Adjust this value as needed
  width: 100%;
  background: #fff;
  z-index: 1000;
`;
const AddressSection = ({ addresses }) => {
  const router = useRouter();
  useEffect(() => {
    // Adjust this value as needed
    if (window.innerWidth <= 900) {
      // Adjust this value as needed
      document.body.style.paddingBottom = "5rem"; // Assuming the height of CheckoutWrapper is 60px
    } // Assuming the height of CheckoutWrapper is 60px
  }, []);
  return (
    <>
      <MediaQuery minWidth={768}>
        <Box padding="2rem" backgroundColor={"white"}>
          {addresses ? (
            <>
              <DashboardPageHeader
                title="Addresses"
                iconName="pin_filled"
                address={true}
                addressCount = {addresses.length || 0}
                subheading="addresses"
                button={<AddNewAddress />}
              />

              {addresses?.length > 0 &&
                addresses?.map((item) => <AddressItem item={item} />)}
            </>
          ) : (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              height={500}
            >
              <Image
                src="/assets/images/address-not-found.png"
                width={100}
                height={100}
              />

              <Typography
                color={"#858585"}
                fontWeight={500}
                className={roboto.className}
                fontSize={"1.125rem"}
              >
                No Address Found
              </Typography>
            </Box>
          )}
        </Box>
      </MediaQuery>

      <MediaQuery maxWidth={767}>
        <Box paddingLeft={"0rem"} marginBottom="2rem" backgroundColor={"white"}>
          {addresses ? (
            <>
              <FlexBox
                flexDirection="column"
                alignItems="center"
                padding={"1rem"}
                justifyContent="center"
              >
                <Typography
                  color={"#858585"}
                  fontWeight={500}
                  className={roboto.className}
                  fontSize={"1.125rem"}
                >
                  Address
                </Typography>

                {addresses?.length > 0 &&
                  addresses?.map((item) => <AddressItem item={item} />)}
              </FlexBox>

              <ButtonWrapper>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => router.push("/address/create")}
                  size="medium"
                  fullwidth
                >
                  <Typography fontSize={"1rem"}>Add Address</Typography>
                </Button>
              </ButtonWrapper>
            </>
          ) : (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              height={500}
            >
              <Image
                src="/assets/images/address-not-found.png"
                width={100}
                height={100}
              />

              <Typography
                color={"#858585"}
                className={roboto.className}
                fontSize={"1.125rem"}
              >
                No Address Found
              </Typography>
            </Box>
          )}
        </Box>
      </MediaQuery>
    </>
  );
};

export default AddressSection;
