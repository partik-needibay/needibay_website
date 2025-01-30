"use client";
import React from "react";
import { useState, useEffect } from "react";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import TextField from "@component/text-field";
import Button from "@component/buttons/Button";
import DropDownButton from "./DropDownButton";
import styled from "styled-components";
import { layoutConstant } from "@utils/constants";
import { roboto } from "@utils/fonts";
import Box from "@component/Box";
import Fab from "@mui/material/Fab";
import NeediProfileEditFrom from "./NeediProfileEditFrom";
import NbProfileDetails from "./NbProfileDetails";
import Icon from "@component/icon/Icon";
import { ContactInformation } from "./ContactInformation";
import api2 from "@utils/__api__/market-1";
import { ContactInfoEdit } from "./ContactInfoEdit";
import NbProfileContactDetails from "./NbProfileContactDetails";
import { useSession } from "next-auth/react";
import { useAppContext } from "@context/AppContext";
import { useMediaQuery } from "@mui/material";

// import AddIcon from '@mui/icons-material/Add';
// const ButtonWrapper = styled.div`
//   padding: 10px 10px;
//   left: 0;
//   right: 0;
//   position: fixed;
//   bottom: ${layoutConstant.mobileNavHeight};
//   width: 100%;
//   background: #fff;
//   z-index: 1000;
// `;
const AboveWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: ${layoutConstant.mobileNavHeight}; // Adjust this value as needed
  width: 100%;
  // background: #f5f5f5; // Change this as needed
  z-index: 1000; // Make sure this is less than the z-index of Wrapper
  // Add other styles as needed
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
const ProfileInfo = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isEditEnable, setEditEnable] = useState(false);
  const isMobile = useMediaQuery("(max-width:767px)");

  const { data: session } = useSession();
  const [customerProfile, setCustomerProfile] = useState({});

  const { state, dispatch } = useAppContext();

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
  };

  useEffect(() => {
    // Adjust this value as needed
    if (window.innerWidth <= 900) {
      // Adjust this value as needed
      document.body.style.paddingBottom = "3rem"; // Assuming the height of CheckoutWrapper is 60px
    } // Assuming the height of CheckoutWrapper is 60px
  }, []);

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

  const showEditForm = () => {
    setEditEnable(!isEditEnable);
  };

  return (
    <>
      {/* For mobile */}
      {/* {isEditEnable ? (
        <NeediProfileEditFrom />
      ) : ( */}
      <Box>
        <FlexBox
          flexDirection="column"
          // alignItems="center"
          paddingX="0.8rem"
          justifyContent="center"
        >
          <Typography
            className={roboto.className}
            fontWeight="500"
            fontSize={"2rem"}
            mb={"1rem"}
            textAlign={"center"}
          >
            Profile
          </Typography>
          <FlexBox>
            <Typography
              className={roboto.className}
              fontWeight="500"
              fontSize={"1.7rem"}
              textAlign={"start"}
            >
              Personal Information
            </Typography>
          </FlexBox>
          {/* --------- add here */}
          {isEditEnable ? (
            <NeediProfileEditFrom
              sessionData={session}
              profileData={customerProfile}
              showInputBox={showEditForm}
            />
          ) : (
            <NbProfileDetails
              sessionData={session}
              profileData={customerProfile}
            />
          )}

          <ContactInformation />
          {/* <FlexBox>
            <Typography
              className={roboto.className}
              fontWeight="500"
              fontSize={"1.7rem"}
              textAlign={"start"}
            >
              Contact Information
            </Typography>
          </FlexBox>
          {isEditEnable ? <ContactInfoEdit /> : <NbProfileContactDetails />}
          */}
        </FlexBox>
      </Box>

      {/* {isEditEnable ? (
        <AboveWrapper>
          <FlexBox
            py="1rem"
            justifyContent={"space-around"}
            width={"100%"}
            zIndex={99}
            alignItems={"center"}
            backgroundColor={"white"}
          >
            <FlexBox width="100%">
              <FlexBox width="100%" justifyContent={"center"}>
                <Box marginRight={"1rem"}>
                  <Button variant="contained" color="cart" size="small">
                    <Typography
                      // marginLeft="0.5rem"
                      fontSize={"0.9rem"}
                      fontWeight={600}
                      onClick={showEditForm}
                      textAlign={"center"}
                    >
                      Cancel
                    </Typography>
                  </Button>
                </Box>

                <Box>
                  <Button
                    fullwidth
                    variant="contained"
                    // borderRadius={"0.625rem"}
                    color="primary"
                    size="small"
                  >
                    <Typography
                      // marginLeft="0.5rem"
                      fontSize={"1rem"}
                      fontWeight={400}
                    >
                      Save
                    </Typography>
                  </Button>
                </Box>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </AboveWrapper> */}

      <Fab
        size="medium"
        // color="secondary"
        aria-label="add"
        style={{
          position: "fixed",
          bottom: `${layoutConstant.mobileNavHeight}`,
          right: "24px",
          marginBottom: "2rem",
          color: "#fff",
          backgroundColor: "#672DD1",
        }}
        onClick={showEditForm}
      >
        <Icon variant="medium">pencil</Icon>
      </Fab>
    </>
  );
};

export default ProfileInfo;
