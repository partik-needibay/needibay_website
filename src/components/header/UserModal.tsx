"use client";
import React, { useEffect, useState } from "react";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import styled from "styled-components";
import Typography from "@component/Typography";
import { inter, quicksand, sans } from "@utils/fonts";
import Container from "@component/Container";
import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@component/buttons";
import NavLink from "@component/nav-link";
import BulkQuantityModal from "@component/products/BulkQuantityModal";
import BulkQuantityForm from "@component/products/BulkQuantityForm";
import { useAppContext } from "@context/AppContext";

const UserModal = () => {
  const { data: session } = useSession();
  const { state, dispatch } = useAppContext();

  const openBulkQuantity = (e) => {
    e.stopPropagation();
    dispatch({
      type: "ISBULKQUANTITYFORMOPEN",
      payload: true,
    });
  };

  useEffect(() => {
    console.log(session);
  }, []);
  return (
    <>
      {/*       {isBulkQuantityFormOpen ? (
        <BulkQuantityModal open={isBulkQuantityFormOpen}>
          <BulkQuantityForm
            onCloseModal={handleBlukReqFormClose}
            minOrderQty={1}
          />
        </BulkQuantityModal>
      ) : null} */}
      <Box
        borderRadius={"0.625rem"}
        padding="1.5rem"
        style={{
          zIndex: 100,
          minWidth: "215px",
          maxWidth: "300px",
          borderRadius: "6px",
          paddingTop: "0.5rem",
          position: "absolute",
          paddingBottom: "0.5rem",
          top: "calc(100% + 0.5rem)",
          right: "0",
          boxShadow: " 0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
        }}
        backgroundColor={"white"}
      >
        {session?.user && (
          <>
            <FlexBox alignItems={"flex-start"}>
              <Box mr="1rem">
                <FlexBox
                  justifyContent="center"
                  alignItems="center"
                  height={"2rem"}
                  width="2rem"
                  borderRadius={"50%"}
                  backgroundColor={"primary.main"}
                >
                  <Typography
                    fontSize={"1.125rem"}
                    fontWeight={600}
                    color="white"
                    className={inter.className}
                  >
                    {state.customerProfileData?.fullName
                      ? state.customerProfileData?.fullName
                      : session?.user?.name?.userData?.customerData?.fullName
                          .charAt(0)
                          .toUpperCase()}
                  </Typography>
                </FlexBox>
              </Box>

              <Box>
                <Box>
                  <Typography
                    color="#4D4D4D"
                    className={inter.className}
                    fontSize={"0.93rem"}
                    fontWeight={600}
                  >
                    {state.customerProfileData?.fullName
                      ? state.customerProfileData?.fullName
                      : session?.user?.name?.userData?.customerData?.fullName}
                  </Typography>
                  <Link href="/profile">
                    <Typography
                      color="#6399FF"
                      cursor="pointer"
                      className={inter.className}
                      fontSize={"0.7rem"}
                      fontWeight={500}
                    >
                      View your profile
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </FlexBox>

            <Box mt="1rem">
              <FlexBox flexDirection={"column"} mt="0.5rem" alignItems={"left"}>
                <Link href="/orders">
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"center"}
                  >
                    <Box mr="1rem">
                      <FlexBox
                        justifyContent="center"
                        alignItems="center"
                        height={"2rem"}
                        width="2rem"
                        borderRadius={"50%"}
                        backgroundColor={"primary.main"}
                      >
                        <Icon size="small" color="light">
                          {"user_orders"}
                        </Icon>
                      </FlexBox>
                    </Box>

                    <Box>
                      <Box>
                        <Typography
                          color="#2D2D2D"
                          className={quicksand.className}
                          fontSize={"0.9rem"}
                          fontWeight={700}
                          style={{ cursor: "pointer" }}
                        >
                          {"Orders"}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Link>
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  onClick={openBulkQuantity}
                >
                  <Box mr="1rem">
                    <FlexBox
                      justifyContent="center"
                      alignItems="center"
                      height={"2rem"}
                      width="2rem"
                      borderRadius={"50%"}
                      backgroundColor={"primary.main"}
                    >
                      <Icon size="small" color="light">
                        {"user_bulk"}
                      </Icon>
                    </FlexBox>
                  </Box>

                  <Box>
                    <Box>
                      <Typography
                        color="#2D2D2D"
                        className={quicksand.className}
                        fontSize={"0.9rem"}
                        fontWeight={700}
                        style={{ cursor: "pointer" }}
                      >
                        {"Bulk Quantity"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Link href="/wishlist">
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"center"}
                  >
                    <Box mr="1rem">
                      <FlexBox
                        justifyContent="center"
                        alignItems="center"
                        height={"2rem"}
                        width="2rem"
                        borderRadius={"50%"}
                        backgroundColor={"primary.main"}
                      >
                        <Icon size="small" color="light">
                          {"user_heart"}
                        </Icon>
                      </FlexBox>
                    </Box>

                    <Box>
                      <Box>
                        <Typography
                          color="#2D2D2D"
                          className={quicksand.className}
                          fontSize={"0.9rem"}
                          fontWeight={700}
                          style={{ cursor: "pointer" }}
                        >
                          {"Wishlist"}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Link>
                <Link href="/support-tickets">
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"center"}
                  >
                    <Box mr="1rem">
                      <FlexBox
                        justifyContent="center"
                        alignItems="center"
                        height={"2rem"}
                        width="2rem"
                        borderRadius={"50%"}
                        backgroundColor={"primary.main"}
                      >
                        <Icon size="small" color="light">
                          {"user_ticket"}
                        </Icon>
                      </FlexBox>
                    </Box>

                    <Box>
                      <Box>
                        <Typography
                          color="#2D2D2D"
                          className={quicksand.className}
                          fontSize={"0.9rem"}
                          fontWeight={700}
                          style={{ cursor: "pointer" }}
                        >
                          {"Raise a ticket"}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Link>
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                >
                  <Box mr="1rem">
                    <FlexBox
                      justifyContent="center"
                      alignItems="center"
                      height={"2rem"}
                      width="2rem"
                      borderRadius={"50%"}
                      backgroundColor={"primary.main"}
                    >
                      <Icon size="small" color="light">
                        {"user_logout"}
                      </Icon>
                    </FlexBox>
                  </Box>

                  <Box>
                    <Box>
                      <Typography
                        color="#2D2D2D"
                        className={quicksand.className}
                        fontSize={"0.9rem"}
                        fontWeight={700}
                        onClick={() => signOut()}
                        style={{ cursor: "pointer" }}
                      >
                        {"Logout"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </FlexBox>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default UserModal;
