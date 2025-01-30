"use client";
import * as yup from "yup";
import Link from "next/link";
import Box from "@component/Box";
import { useFormik } from "formik";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import { useRouter } from "next/navigation";
import TextField from "@component/text-field";
import { FC, useCallback, useState } from "react";
import { Button, IconButton } from "@component/buttons";
import Typography, {
  H1,
  H2,
  H3,
  H5,
  H6,
  SemiSpan,
  Small,
  Span,
} from "@component/Typography";
import { NbStyledSessionCard } from "./EmailVerificationFormStyle";
import leads from "@utils/__api__/leads";
import { useAppContext } from "@context/AppContext";
import { CircularProgress } from "@mui/material";
import useSessionStorage from "@hook/useSessionStorage";
import { toast } from "react-toastify";

const EmailVerification = ({ onCloseModal, selectedDate, date }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [isotpFormOpen, setOtpFormOpen] = useState(false);
  const [isverifed, setverified] = useState(false);
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const [otpVerification, setOtpVerification] = useSessionStorage(
    "otpVerification",
    { email: "", session: "" }
  );

  const handleFormSubmit = async (values: any) => {
    console.log(values);
  };
  const handelCloseModal = () => {
    onCloseModal();
  };
  const handleSaveMeeting = async (values: any) => {
    if (values.email) {
    }
    dispatch({
      type: "UPDATE_BUTTON_LOADER",
      payload: true,
    });
    const payload = {
      email: values.email,
      date: selectedDate.format("YYYY-MM-DD"),
      time: selectedDate.format("hh-mm-ss"),
    };

    await leads
      .saveScheduleMeetingForm(payload)
      .then((res) => {
        debugger;
        if (res.success) {
          setOtpVerification({
            email: values.email,
            session: res.data.session,
          });
          setOtpFormOpen(!isotpFormOpen);
        }
      })
      .catch((e) => {
        console.log(e);
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

  const handleVerifyOTP = async (values) => {
    dispatch({
      type: "UPDATE_BUTTON_STATE",
      payload: { name: "EMAIL_OTP_VERIFY", state: true },
    });
    const otpVerification: any = sessionStorage.getItem("otpVerification");

    const payload = {
      email: JSON.parse(otpVerification).email,
      session: JSON.parse(otpVerification).session,
      phone: values?.phone,
      otp: values?.otp,
      visitorId: otpVerification?.visitorId,
    };
    console.log(payload);

    await leads
      .verifyEmailOTPAndSavePhone(payload)
      .then((res) => {
        if (res.data.success) {
          setverified(true)
          toast.success(res.data.message, { theme: "light" });
        }else{
          toast.error(res.data.message, { theme: "light" });

        }
        
        dispatch({
          type: "UPDATE_BUTTON_STATE",
          payload: { name: "EMAIL_OTP_VERIFY", state: false },
        });
      })
      .catch((e) => {
        toast.error(e.message, { theme: "light" });
        dispatch({
          type: "UPDATE_BUTTON_STATE",
          payload: { name: "EMAIL_OTP_VERIFY", state: false },
        });
      })
      .finally(() => {
        dispatch({
          type: "UPDATE_BUTTON_STATE",
          payload: { name: "EMAIL_OTP_VERIFY", state: false },
        });
      });
  };

  const saveMeetingForm = useFormik({
    onSubmit: handleSaveMeeting,
    initialValues,
    validationSchema: formSchema,
  });

  const verifyOtpForm = useFormik({
    onSubmit: handleVerifyOTP,
    initialValues: verfyOtpInitialValues,
    validationSchema: verifyOtpformSchema,
  });

  return (
    <>
      {isotpFormOpen ? (
        <NbStyledSessionCard
          mx="auto"
          my="2rem"
          boxShadow="large"
          borderRadius={8}
          position={"relative"}
        >
          <Box position={"absolute"} top={"11px"} right={"13px"}>
            <Icon
              size="1.25rem"
              onClick={handelCloseModal}
              style={{ cursor: "pointer" }}
            >
              close
            </Icon>
          </Box>
          {isverifed ? (
            <Box
              height={"213px"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <H1 style={{ color: "green" }}>Thank you .</H1>
              <H1 style={{ color: "green" }}>Verification is successful</H1>
            </Box>
          ) : (
            <>
              <form className="content" onSubmit={verifyOtpForm.handleSubmit}>
                <H2 textAlign="center" mb="0.5rem">
                  Verify your email id
                </H2>

                <TextField
                  fullwidth
                  mb="0.75rem"
                  name="otp"
                  onBlur={verifyOtpForm.handleBlur}
                  onChange={verifyOtpForm.handleChange}
                  value={verifyOtpForm.values.otp || ""}
                  placeholder="1234"
                  label="Enter your otp"
                  errorText={
                    verifyOtpForm.touched.otp && verifyOtpForm.errors.otp
                  }
                />
                <TextField
                  fullwidth
                  mb="0.75rem"
                  name="phone"
                  onBlur={verifyOtpForm.handleBlur}
                  onChange={verifyOtpForm.handleChange}
                  value={verifyOtpForm.values.phone || ""}
                  placeholder="7423145632"
                  label="Enter your number"
                  errorText={
                    verifyOtpForm.touched.phone && verifyOtpForm.errors.phone
                  }
                />

                <Button
                  mb="1.65rem"
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullwidth
                  disabled={!(verifyOtpForm.dirty && verifyOtpForm.isValid)}
                >
                  {state.buttonState?.name == "EMAIL_OTP_VERIFY" &&
                  state.buttonState?.state == true ? (
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      alignItems={"center"}
                    >
                      <CircularProgress color="inherit" size={20} />
                      &nbsp;
                      <>Verifying...</>
                    </Box>
                  ) : (
                    <>Submit</>
                  )}
                </Button>
              </form>
              <FlexBox justifyContent="center" bg="#F3F5F9" py="19px">
                <SemiSpan>Didn't receive the OPT</SemiSpan>
                <Link href="/">
                  <H6
                    ml="0.5rem"
                    borderBottom="1px solid"
                    borderColor="gray.900"
                  >
                    Resend it.
                  </H6>
                </Link>
              </FlexBox>
            </>
          )}
        </NbStyledSessionCard>
      ) : (
        <NbStyledSessionCard
          mx="auto"
          my="2rem"
          boxShadow="large"
          borderRadius={8}
          position={"relative"}
        >
          <Box position={"absolute"} top={"11px"} right={"13px"}>
            <Icon
              size="1.25rem"
              onClick={handelCloseModal}
              style={{ cursor: "pointer" }}
            >
              close
            </Icon>
          </Box>
          <form className="content" onSubmit={saveMeetingForm.handleSubmit}>
            <H2 textAlign="center" mb="0.5rem">
              Meeting schedule
            </H2>

            <H5
              fontWeight="600"
              fontSize="12px"
              color="gray.800"
              textAlign="center"
              mb="2.25rem"
            >
              {/* {selectedDate} */}
              {date}
            </H5>

            <TextField
              fullwidth
              mb="0.75rem"
              name="email"
              type="email"
              onBlur={saveMeetingForm.handleBlur}
              onChange={saveMeetingForm.handleChange}
              value={saveMeetingForm.values.email || ""}
              placeholder="exmple@mail.com"
              label="Email"
              errorText={
                saveMeetingForm.touched.email && saveMeetingForm.errors.email
              }
            />
            <Button
              mb="1.65rem"
              variant="contained"
              color="primary"
              type="submit"
              fullwidth
              disabled={state.buttonLoader}
            >
              {state.buttonLoader ? (
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                >
                  <CircularProgress color="inherit" size={20} />
                  &nbsp;
                  <Typography px={2}>Submitting...</Typography>
                </Box>
              ) : (
                <>Submit</>
              )}
            </Button>
          </form>
        </NbStyledSessionCard>
      )}
    </>
  );
};

const initialValues = { email: "" };
const phoneRegex = /^\(?([0-9]{3})\)?([0-9]{3})?([0-9]{4})$/;

const formSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("${path} is required"),
});

const verfyOtpInitialValues = { phone: "", otp: "" };
const verifyOtpformSchema = yup.object().shape({
  phone: yup.string().matches(phoneRegex, "Check your phone number"),
  otp: yup.string().required("${path} is required"),
});

export default EmailVerification;
