"use client";
import React from "react";
import { useEffect, useRef } from "react";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import Image from "@component/Image";
import { roboto } from "@utils/fonts";
import TextField from "@component/text-field";
import styled from "styled-components";
import Button from "@component/buttons/Button";
import MediaQuery from "react-responsive";
import { layoutConstant } from "@utils/constants";
import { useSession } from "next-auth/react";
import "react-dropdown/style.css";
import { useState } from "react";
import api from "@utils/__api__/users";
import NeediProfileEditFrom from "./NeediProfileEditFrom";
import NbProfileDetails from "./NbProfileDetails";
import api2 from "@utils/__api__/market-1";
import { useAppContext } from "@context/AppContext";

const ResponsiveFlexBox = styled(FlexBox)`
  @media only screen and (max-width: 768px) {
    display: block;
  }

  .flexbox1 {
    @media only screen and (max-width: 768px) {
      width: 100%;
    }
  }

  .flexbox2 {
    @media only screen and (max-width: 768px) {
      margin-botton: 1rem;
      width: 100%;
    }
  }
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
export const PersonalInformation = async () => {
  const formRef = useRef<any>();

  const { data: session } = useSession();

  const [isEditEnable, setEditEnable] = useState(false);

  const [customerProfile, setCustomerProfile] = useState({});

  const { state, dispatch } = useAppContext();

  const showInputBox = () => {
    console.log(isEditEnable);
    setEditEnable(!isEditEnable);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await api2.getCustomerProfile(session);
      dispatch({ type: "CUSTOMER_PROFILE_DATA", payload: response });
      setCustomerProfile(response);
    };

    fetchData().catch((e) => {
      console.error("An error occurred while fetching the data: ", e);
    });
  }, [isEditEnable]);

  return (
    <>
      {!isEditEnable && (
        <FlexBox>
          <FlexBox paddingLeft="2rem" ml={12}>
            <Typography
              className={roboto.className}
              fontWeight="500"
              fontSize={"1.25rem"}
            >
              Personal Information
            </Typography>
          </FlexBox>

          <FlexBox ml="2rem" alignItems={"center"}>
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
          </FlexBox>
        </FlexBox>
      )}
      {isEditEnable ? (
        <NeediProfileEditFrom
          sessionData={session}
          profileData={customerProfile}
          showInputBox={showInputBox}
        />
      ) : (
        <NbProfileDetails sessionData={session} profileData={customerProfile} />
      )}

      <MediaQuery maxWidth={768}></MediaQuery>
    </>
  );
};
