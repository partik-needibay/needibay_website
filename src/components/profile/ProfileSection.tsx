"use client";
import React from "react";
import { useState, useEffect } from "react";
import MediaQuery from "react-responsive";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
// import EditProfileButton from "@component/profile/EditProfileButton";
import { PersonalInformation } from "./PersonalInformation";
import { ContactInformation } from "./ContactInformation";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Image from "@component/Image";
import Typography from "@component/Typography";
import Link from "next/link";
import { roboto, sans } from "@utils/fonts";
import Icon from "@component/icon/Icon";
import styled from "styled-components";
import Button from "@component/buttons/Button";
import { layoutConstant } from "@utils/constants";
import { signOut } from "next-auth/react";

const ButtonWrapper = styled.div`
  padding: 10px 10px;
  left: 0;
  right: 0;
  position: fixed;
  bottom: ${layoutConstant.mobileNavHeight};
  width: 100%;
  background: #fff;
  z-index: 1000;
`;
const options = [
  { value: "B2B", label: "B2B" },
  { value: "B2C", label: "B2C" },
  { value: "FMCG", label: "FMCG" },
  { value: "Retail", label: "Retail" },
  { value: "Manufacturing", label: "Manufacturing" },
  { value: "Services", label: "Services" },
  { value: "Others", label: "Others" },
];

const ProfileSection = () => {
  useEffect(() => {
    // Adjust this value as needed
    if (window.innerWidth <= 900) {
      // Adjust this value as needed
      document.body.style.paddingBottom = "5rem"; // Assuming the height of CheckoutWrapper is 60px
    } // Assuming the height of CheckoutWrapper is 60px
  }, []);

  return (
    <>
      <MediaQuery minWidth={769}>
        <DashboardPageHeader
          title="Profile"
          order={false}
          // button={<EditProfileButton />}
        />
        <PersonalInformation />
        <ContactInformation />
      </MediaQuery>

      <MediaQuery maxWidth={768}>
        <Box
          backgroundColor={"white"}
          padding="1rem"
          borderRadius={"0.58331rem"}
        >
          <Box>
            {" "}
            <FlexBox
              mt="2rem"
              mb="1rem"
              width="100%"
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems="center"
            >
              <Box mr="1rem">
                <Image
                  width="4.5rem"
                  src="/assets/images/profile/profile.svg"
                  alt="profile"
                />
              </Box>

              <Box>
                <Typography
                  color="primary.main"
                  className={sans.className}
                  fontSize="1rem"
                  fontWeight={600}
                >
                  Hi,
                </Typography>
                <Typography
                  color="#0F3460"
                  className={sans.className}
                  fontSize="1.3rem"
                  fontWeight={600}
                >
                  Gaurav Mishra
                </Typography>
              </Box>
            </FlexBox>
          </Box>

          <FlexBox justifyContent={"space-between"} width="100%">
            <FlexBox
              width="45%"
              padding="0.5rem"
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"0.625rem"}
              backgroundColor="#EFE5FF"
            >
              <Typography
                fontSize={"1.3rem"}
                fontWeight={600}
                className={roboto.className}
                color="primary.main"
              >
                05
              </Typography>
              <Typography
                fontSize={"0.9375rem"}
                fontWeight={400}
                className={roboto.className}
                color="#696969"
              >
                All Orders
              </Typography>
            </FlexBox>
            <FlexBox
              width="45%"
              flexDirection={"column"}
              padding="0.5rem"
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"0.625rem"}
              backgroundColor="#EFE5FF"
            >
              <Typography
                fontSize={"1.3rem"}
                fontWeight={600}
                className={roboto.className}
                color="primary.main"
              >
                05
              </Typography>
              <Typography
                fontSize={"0.9375rem"}
                fontWeight={400}
                className={roboto.className}
                color="#696969"
              >
                Orders Delivered
              </Typography>
            </FlexBox>
          </FlexBox>

          <FlexBox mt="1rem" justifyContent={"space-between"} width="100%">
            <FlexBox
              width="45%"
              padding="0.5rem"
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"0.625rem"}
              backgroundColor="#EFE5FF"
            >
              <Typography
                fontSize={"1.3rem"}
                fontWeight={600}
                className={roboto.className}
                color="primary.main"
              >
                05
              </Typography>
              <Typography
                fontSize={"0.9375rem"}
                fontWeight={400}
                className={roboto.className}
                color="#696969"
              >
                Orders Shipped
              </Typography>
            </FlexBox>
            <FlexBox
              width="45%"
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"0.625rem"}
              padding="0.5rem"
              backgroundColor="#EFE5FF"
            >
              <Typography
                fontSize={"1.3rem"}
                fontWeight={600}
                className={roboto.className}
                color="primary.main"
              >
                05
              </Typography>
              <Typography
                fontSize={"0.9375rem"}
                fontWeight={400}
                className={roboto.className}
                color="#696969"
              >
                Wishlist
              </Typography>
            </FlexBox>
          </FlexBox>

          {/* account details */}

          <Box mt="2rem">
            <Typography
              fontSize={"1.125rem"}
              fontWeight={600}
              className={sans.className}
            >
              Account
            </Typography>

            <Link href="/profile/info" passHref>
              <FlexBox mt="1rem" alignItems={"center"}>
                <Icon color="dark">user</Icon>
                <Typography
                  ml="0.7rem"
                  fontSize={"1rem"}
                  color="#4D5565"
                  fontWeight={400}
                >
                  Profile Info
                </Typography>
              </FlexBox>
            </Link>

            <Link href="/address" passHref>
              <FlexBox mt="0.75rem" alignItems={"center"}>
                <Icon variant="small" color="dark">
                  pin
                </Icon>
                <Typography
                  ml="1rem"
                  fontSize={"1rem"}
                  color="#4D5565"
                  fontWeight={400}
                >
                  Addresses
                </Typography>

                <FlexBox justifyContent={"flex-end"} width={"100%"}>
                  2
                </FlexBox>
              </FlexBox>
            </Link>
            <Link href="/bulk-enquiries" passHref>
              <FlexBox mt="0.75rem" alignItems={"center"}>
                <Icon variant="small" color="dark">
                  box
                </Icon>
                <Typography
                  ml="1rem"
                  fontSize={"1rem"}
                  color="#4D5565"
                  fontWeight={400}
                >
                  Bulk Query
                </Typography>
              </FlexBox>
            </Link>

            {/* <Link href="/support-tickets" passHref>
              <FlexBox mt="0.75rem" alignItems={"center"}>
                <Icon variant="small" color="dark">
                  support
                </Icon>
                <Typography
                  ml="1rem"
                  fontSize={"1rem"}
                  color="#4D5565"
                  fontWeight={400}
                >
                  Support
                </Typography>
                <FlexBox justifyContent={"flex-end"} width={"100%"}>
                  1
                </FlexBox>
              </FlexBox>
            </Link> */}

            <FlexBox mt="0.75rem" alignItems={"center"}>
              <Icon variant="small" color="dark">
                infographics
              </Icon>
              <Typography
                ml="1rem"
                fontSize={"1rem"}
                color="#4D5565"
                fontWeight={400}
              >
                Need Help
              </Typography>
            </FlexBox>
          </Box>
          <ButtonWrapper>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="medium"
              fullwidth
              onClick={() => signOut()}
            >
              <Typography fontSize={"1rem"}>Log Out</Typography>
            </Button>
          </ButtonWrapper>
        </Box>
      </MediaQuery>
    </>
  );
};

export default ProfileSection;
