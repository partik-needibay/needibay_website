"use client";

// ** COMPONENT IMPORTS
import { FC, Fragment, useState } from "react";
import * as yup from "yup";
import styled from "styled-components";
import FlexBox from "@component/FlexBox";
import { Button, IconButton } from "@component/buttons";
import Typography, { H1, H3, Paragraph, Span } from "@component/Typography";
import Box from "@component/Box";
import Image from "@component/Image";
import TextField from "@component/text-field";
import Icon from "@component/icon/Icon";
import UserLoginDialog from "../../components/header/LoginDialog";
import { useFormik } from "formik";

//Date picker import

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { CircularProgress, Popover } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MediaQuery from "react-responsive";

// ** FONTS

import { oxygen, quicksand, readexPro } from "@utils/fonts";
import LeftArrow from "@component/arrows/LeftArrow";
import { DateTimePicker } from "@mui/x-date-pickers";
import EmailVerification from "./EmailVerification";
import Modal from "@component/Modal";
import VerficationModal from "@component/VerficationModal";
import { useAppContext } from "@context/AppContext";
//responsivity
import leads from "@utils/__api__/leads";
import Spinner from "@component/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledDatePicker = styled(DateTimePicker)`
  width: 100%;
  input {
    display: none;
  }
  img {
    display: none;
  }
`;

const StyledFlexBox = styled(FlexBox)`
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.1);
`;
const ResponsiveFlexbox = styled(FlexBox)`
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-bottom: 8rem;

    .first_text {
      font-size: 1rem;
    }
    .second_text {
      font-size: 2rem;
    }
    .third_text {
      font-size: 1rem;
    }

    .inner_content {
      padding-top: 2rem;
      padding-left: 3rem;
    }

    .fourth_text {
      font-weight: 400;
      margin-top: -1rem;
      font-size: 0.5rem;
    }

    .text_content {
      margin-left: 1rem;
      text-align: left;
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
    }
    .phone {
      margin-left: -4rem;

      img {
        margin-left: 3rem;
        height: 7rem;
        width: 7rem;
      }
    }
  }

  .inner {
    @media screen and (max-width: 768px) {
      display: block;
      height: 17rem;
      margin-top: -4rem !important;
      padding-bottom: 2rem !important;
      padding: 0rem !important;
      background-image: url("/assets/images/banners/mobile_banner.png") !important;
      width: 100%;
    }
  }

  .box {
    @media screen and (max-width: 768px) {
      display: flex;
      width: 90%;
      position: absolute;
      margin-top: 7rem;
      top: 0px;
      justify-content: center;
      padding-top: 2rem;
      padding-bottom: 1rem;

      .buttons {
        margin-top: -1rem;
      }
      .box_outside_title {
        margin: 0;
        margin-top: -1rem;
        padding: 0rem;
        text-align: center;
      }
      img {
        display: none;
      }

      .schedule {
        width: 9rem;
        padding-left: 0rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
        padding-right: 0rem;
        margin-right: 0.5rem;
        margin-left: 0.5rem;
        .text {
          font-size: 0.75rem;
        }
      }

      .title {
        @media screen and (max-width: 768px) {
          font-size: 1.5rem;
        }
      }
      .sub_title {
        @media screen and (max-width: 768px) {
          font-size: 1rem;
        }
      }

      .image_box {
        @media screen and (max-width: 768px) {
          display: none;
        }
      }
    }
  }
`;
// styled button
const StyledButton = styled(Button)`
  padding-left: 2rem;
  border-radius: 0rem;
  border-top-right-radius: 1.125rem;
  border-bottom-right-radius: 1.125rem;
  &:focus {
    box-shadow: none;
  }

  @media screen and (max-width: 768px) {
    padding: 0rem;
    padding-left: 0.5rem;
    padding-right: 1rem;
    height: 2.5rem;
    .text {
      font-size: 0.7rem;
    }
  }
`;

const StyledTextField = styled(TextField)`
  height: 58px;
  width: 100%;
  border-radius: 0px;
  border-top-left-radius: 0.93rem;
  border-bottom-left-radius: 0.93rem;

  @media screen and (max-width: 768px) {
    padding: 0rem;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    padding-bottom: 0.2rem;
    textalign: center;
    height: 2.5rem;
    .text {
      font-size: 1rem;
    }

    &::placeholder {
      font-size: 0.7rem;
      left: 10px;
      color: #dcdcdc;
      font-family: ${readexPro.style.fontFamily};
    }
  }
`;

const Section7 = () => {
  const [open, setDateOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [isOpen, setOpen] = useState(false);
  const [isRequestOpen, setRequestOpen] = useState(false);
  const [isVerificationFormOpen, setVerificationFormOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { state, dispatch } = useAppContext();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setDateOpen(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDateOpen(false);
    //
  };
  const handelClose = (vlaue) => {
    if (selectedDate !== null) {
      setVerificationFormOpen(!isVerificationFormOpen);
    }
    setDateOpen(false);
  };

  const toggleRequestOpen = () => {
    setRequestOpen(!isRequestOpen);
  };

  const toggleOpen = () => {
    setOpen(!isOpen);
  };
  const handleVerificationFormClose = () => {
    setVerificationFormOpen(false); // Update the state to close the modal
  };

  const handleRequestCall = async (values: any) => {
    console.log(values.phone);
    dispatch({
      type: "UPDATE_BUTTON_LOADER",
      payload: true,
    });
    const payload = {
      phone: values.phone,
    };

    await leads
      .saveRequestCallForm(payload)
      .then((res) => {
        
        if (res.success) {
          toast.success(res.message, { theme: "light" });
        }
      })
      .catch((e) => {
        toast.success(e.message, { theme: "light" });
        dispatch({
          type: "UPDATE_BUTTON_LOADER",
          payload: false,
        });
      })
      .finally(() => {
        dispatch({
          type: "UPDATE_BUTTON_LOADER",
          payload: false,
        });
      });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: handleRequestCall,
      initialValues,
      validationSchema: formSchema,
    });

  return (
    <ResponsiveFlexbox
      className="outer"
      marginBottom="20rem"
      justifyContent={"center"}
      position={"relative"}
      id="blukBuy"
    >
      {" "}
      <Box width="100%">
        <FlexBox
          mt="4rem"
          alignItems="center"
          height="40rem"
          className="inner"
          flexDirection="column"
          style={{
            color: "white",
            textAlign: "center",
            padding: "6rem 2rem",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: " url('/assets/images/banners/main_banner.png')",
          }}
        >
          <FlexBox className="inner_content">
            {" "}
            <Box className="phone">
              <Image
                className="phone"
                src="/assets/images/illustrations/main_phone_guy.png"
              />
            </Box>
            <FlexBox
              className="text_content"
              flexDirection={"column"}
              alignItems="flex-start"
            >
              <H3
                fontWeight={700}
                className={`first_text ${oxygen.className}`}
                fontSize={"3.75rem"}
                lineHeight={1}
              >
                The Highest
              </H3>
              <H1
                fontSize={"5rem"}
                lineHeight={1}
                className={`second_text ${oxygen.className}`}
                mb={1}
                fontWeight={700}
              >
                Rated Platform
              </H1>
              <Paragraph
                fontWeight={700}
                className={`third_text ${oxygen.className}`}
                fontSize={"3.75rem"}
                mb={4}
              >
                For your business needs
              </Paragraph>
              <Typography
                className={`fourth_text ${oxygen.className}}`}
                fontSize={"1.25rem"}
                fontWeight={400}
              >
                The one stop destination for your daily needs.
              </Typography>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </Box>
      <StyledFlexBox
        className="box"
        position="absolute"
        top={"33rem"}
        padding="2rem"
        alignItems={"center"}
        justifyContent={"space-around"}
        borderRadius={"0.75rem"}
        backgroundColor={"#FFECD0"}
      >
        <Box className="box_outside_title" padding="3rem">
          {" "}
          <Typography
            className={` title ${readexPro.className}`}
            fontSize={"3.75rem"}
            fontWeight={500}
            color="call.banner"
          >
            Wanna buy in Bulk?
          </Typography>
          <Typography
            className={` sub_title ${readexPro.className}`}
            color="call.banner"
            fontSize={"1.875rem"}
            fontWeight={500}
          >
            No worries ... !! We got you{" "}
          </Typography>
          <FlexBox className="buttons" paddingTop={"2rem"}>
            {!isOpen && !isRequestOpen ? (
              <>
                <Button
                  borderRadius={"1.125rem"}
                  variant="contained"
                  marginRight={"2rem"}
                  className="schedule"
                  onClick={toggleOpen}
                  size="large"
                  color="call"
                >
                  <Typography className={`text ${readexPro.className}`}>
                    {" "}
                    Schedule Virtual Call
                  </Typography>
                </Button>
                <Button
                  borderRadius={"1.125rem"}
                  variant="contained"
                  className="schedule"
                  onClick={toggleRequestOpen}
                  size="large"
                  color="call"
                >
                  <Typography className={`text ${readexPro.className}`}>
                    Request a call
                  </Typography>
                </Button>
              </>
            ) : (
              isOpen &&
              !isRequestOpen && (
                <Box>
                  <FlexBox
                    justifyContent="flex-start"
                    alignItems={"center"}
                    width="100%"
                  >
                    <MediaQuery query="(min-width: 1024px)">
                      <Button
                        style={{ padding: "0", marginRight: "0.3rem" }}
                        onClick={toggleOpen}
                      >
                        <LeftArrow />
                      </Button>
                    </MediaQuery>

                    <Box position="relative">
                      <StyledTextField
                        borderRadius={"0rem"}
                        fullwidth
                        value={
                          selectedDate ? selectedDate?.format("MM/DD/YYYY") : ""
                        }
                        className={quicksand.className}
                        placeholder={"Drop your number"}
                        endAdornment={
                          <Icon
                            onClick={() => setDateOpen(true)}
                            style={{ marginRight: "0.5rem" }}
                            variant="small"
                            defaultcolor="currentColor"
                          >
                            calender
                          </Icon>
                        }
                      />
                    </Box>

                    <StyledButton
                      variant="contained"
                      px={"2rem"}
                      size="large"
                      color="call"
                    >
                      <Span
                        fontSize={"1rem"}
                        style={{ whiteSpace: "nowrap" }}
                        className={` text ${readexPro.className}`}
                      >
                        {" "}
                        Schedule Virtual call
                      </Span>
                    </StyledButton>
                  </FlexBox>{" "}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StyledDatePicker
                      slotProps={{
                        toolbar: {
                          hidden: selectedDate == null ? true : false,
                        },
                      }}
                      open={open}
                      sx={{
                        visibility: "hidden",
                        height: 0,
                        width: 0,
                        m: 0,
                        p: 0,
                      }}
                      // onClose={() => }
                      onClose={() => handelClose(selectedDate)}
                      onAccept={handleDateChange}
                      value={selectedDate}
                      onChange={(newValue) => setSelectedDate(newValue)}
                      disablePast={true}
                    />
                  </LocalizationProvider>
                  <MediaQuery query="(max-width: 768px)">
                    <FlexBox
                      marginTop="0.5rem"
                      justifyContent={"center"}
                      width="100%"
                    >
                      <Button
                        borderRadius={"1.125rem"}
                        variant="contained"
                        onClick={toggleOpen}
                        size="xxsmall"
                        color="call"
                      >
                        <Typography
                          fontSize="0.8rem"
                          className={` ${readexPro.className}`}
                        >
                          {" "}
                          Back
                        </Typography>
                      </Button>
                    </FlexBox>
                  </MediaQuery>
                </Box>
              )
            )}

            {isRequestOpen && !isOpen && (
              <form onSubmit={handleSubmit}>
                <Box>
                  <FlexBox
                    justifyContent="flex-start"
                    alignItems={"center"}
                    width="100%"
                  >
                    <MediaQuery query="(min-width: 1024px)">
                      <Button
                        style={{ padding: "0", marginRight: "0.3rem" }}
                        onClick={toggleRequestOpen}
                      >
                        <LeftArrow />
                      </Button>
                    </MediaQuery>

                    <StyledTextField
                      borderRadius={"0rem"}
                      fullwidth
                      className={quicksand.className}
                      placeholder={"Drop your phone"}
                      name="phone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phone || ""}
                      errorText={touched.phone && errors.phone}
                    />
                    <StyledButton
                      variant="contained"
                      px={"2rem"}
                      size="large"
                      color="call"
                      type="submit"
                      disabled={state.buttonLoader}
                    >
                      {state.buttonLoader ? (
                        <Span
                          fontSize={"1rem"}
                          style={{ whiteSpace: "nowrap" }}
                          className={` text ${readexPro.className}`}
                        >
                          <Box
                            display={"flex"}
                            flexDirection={"row"}
                            alignItems={"center"}
                          >
                            <CircularProgress color="inherit" size={20} />
                            &nbsp;
                            <Typography px={2}>Submitting...</Typography>
                          </Box>
                        </Span>
                      ) : (
                        <Span
                          fontSize={"1rem"}
                          style={{ whiteSpace: "nowrap" }}
                          className={` text ${readexPro.className}`}
                        >
                          Request a call
                        </Span>
                      )}
                    </StyledButton>
                  </FlexBox>{" "}
                  <MediaQuery query="(max-width: 768px)">
                    <FlexBox
                      marginTop="0.5rem"
                      justifyContent={"center"}
                      width="100%"
                    >
                      <Button
                        borderRadius={"1.125rem"}
                        variant="contained"
                        onClick={toggleRequestOpen}
                        size="xxsmall"
                        color="call"
                      >
                        <Typography
                          fontSize="0.8rem"
                          className={` ${readexPro.className}`}
                        >
                          {" "}
                          Back
                        </Typography>
                      </Button>
                    </FlexBox>
                  </MediaQuery>
                </Box>
              </form>
            )}
          </FlexBox>
        </Box>

        <Box className="image_box" padding={"2rem"}>
          <Image src="/assets/images/banners/box_banner.png" />
        </Box>
      </StyledFlexBox>
      {isVerificationFormOpen ? (
        <VerficationModal
          open={isVerificationFormOpen}
          /*  onClose={() => {
            setVerificationFormOpen(!isVerificationFormOpen);
          }} */
        >
          <div>
            <EmailVerification
              onCloseModal={handleVerificationFormClose}
              selectedDate={selectedDate}
              date={selectedDate.$d.toLocaleString()}
              // $D,$H,
            />
          </div>
        </VerficationModal>
      ) : null}
    </ResponsiveFlexbox>
  );
};

const initialValues = { phone: "" };
const phoneRegex = /^\(?([0-9]{3})\)?([0-9]{3})?([0-9]{4})$/;

const formSchema = yup.object().shape({
  phone: yup.string().matches(phoneRegex, "Check your phone number"),
});

export default Section7;
