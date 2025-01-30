"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import Image from "@component/Image";
import { roboto } from "@utils/fonts";
import TextField from "@component/text-field";
import styled from "styled-components";
import { Button, IconButton } from "@component/buttons";
import Icon from "@component/icon/Icon";
import Box from "@component/Box";
import DropDownButton from "./DropDownButton";
import { useMediaQuery } from "@mui/material";
import { ContactInfoEdit } from "./ContactInfoEdit";
import NbProfileContactDetails from "./NbProfileContactDetails";
import { useSession } from "next-auth/react";
import api2 from "@utils/__api__/market-1";


export const ContactInformation = () => {
  
  const { data: session } = useSession();

  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 426px)");
  const [isEditEnable, setEditEnable] = useState(false);
  const [customerProfile, setCustomerProfile] = useState({});


  const showInputBox = () => {
    setEditEnable(!isEditEnable);
  };

  useEffect(() => {

      const fetchData = async () => {

      const response = await api2.getCustomerProfile(session);

      setCustomerProfile(response)

  }

    fetchData().catch((e) => {

      console.error('An error occurred while fetching the data: ', e)

    })
  }, [])

  return (
    <>
      <FlexBox paddingTop={`${isMobile ? "0rem" : "2rem"}`}>
        <FlexBox
          paddingLeft={`${isMobile ? "0rem" : "2rem"}`}
          ml={`${isMobile ? "0px" : "12px"}`}
        >
          <Typography
            className={roboto.className}
            fontWeight="500"
            fontSize={"1.25rem"}
          >
            Contact Information
          </Typography>
        </FlexBox>

        <FlexBox ml="2rem" alignItems={"center"}>
          <Typography>
            {isEditEnable ? (
              <FlexBox>
                <Button
                  variant="outlined"
                  mr={"1rem"}
                  onClick={showInputBox}
                  color="primary"
                  height={"35px"}
                  padding={"10px 28px"}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={showInputBox}
                  color="primary"
                  height={"35px"}
                  padding={"10px 28px"}
                >
                  Cancel
                </Button>
              </FlexBox>
            ) : (
              <Typography
                color="blue.600"
                onClick={showInputBox}
                style={{ cursor: "pointer" }}
              >
                Edit
                <Image
                  ml="0.2rem"
                  width={"0.75rem"}
                  height="0.8rem"
                  src="/assets/images/profile/pen.png"
                  alt="edit"
                />
              </Typography>
            )}
          </Typography>
        </FlexBox>
      </FlexBox>
      {isEditEnable ? (
        <ContactInfoEdit sessionData={session} profileData={customerProfile} />
      ) : (
        <NbProfileContactDetails sessionData={session} profileData={customerProfile} />
      )}
    </>
  );
};
