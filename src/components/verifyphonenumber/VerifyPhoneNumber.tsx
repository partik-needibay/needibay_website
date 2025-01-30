"use client";
import * as yup from "yup";
import Link from "next/link";
import { useEffect } from "react";
import Box from "@component/Box";
import { useFormik } from "formik";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import { useRouter } from "next/navigation";
import TextField from "@component/text-field";
import { FC, useCallback, useState } from "react";
import { Button, IconButton } from "@component/buttons";
import api2 from "@utils/__api__/market-1";
import { useAppContext } from "@context/AppContext";
import { isMobile } from "react-device-detect";
import Typography, {
  H3,
  H5,
  H6,
  SemiSpan,
  Small,
  Span,
} from "@component/Typography";
import { outfit, quicksand, sans } from "@utils/fonts";
import styled from "styled-components";
import { signIn } from "next-auth/react";
import { CircularProgress } from "@mui/material";

const StyledTopography = styled(Typography)`
  text-decoration: underline;
`;

const StyledTypography = styled(Typography)`
  @media only screen and (max-width: 600px) {
    text-align: center;

    font-size: 2rem;
  }
`;

const StyledBox2 = styled(Box)`
  @media only screen and (max-width: 600px) {
    width: 90%;
  }
`;

const StyledBox = styled(Box)`
  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;
const StyledForm = styled.form`
  margin-top: 2rem;

  @media only screen and (max-width: 600px) {
    margin-top: 1rem;
  }
`;
const VerifyPhoneNumber: FC = () => {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const initialValues = { otp: "" };
  const phoneRegex = /^\(?([0-9]{3})\)?([0-9]{3})?([0-9]{4})$/;
  const formSchema = yup.object().shape({
    otp: yup.number().required("${path} is required"),
  });

  const handleFormSubmit = async (values: any) => {
    dispatch({
      type: "UPDATE_BUTTON_STATE",
      payload: { name: "VERIFY_OTP", state: true },
    });
    const otpVerification: any = sessionStorage.getItem("otpVerification");
    values.session = JSON.parse(otpVerification).session;
    values.phone = JSON.parse(otpVerification).phone;
    //const response = await api2.verifyOtp(values);
    const result = await signIn("otp-login", {
      phone: values.phone,
      session: values.session,
      otp: values.otp,
      redirect: true,
      callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL,
    });
  };
  const gotoForgetPasswordpage = async (values: any) => {
    router.push("/forget-password");
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: (values) => handleFormSubmit(values),
      initialValues,
      validationSchema: formSchema,
    });
  const ALPHA_NUMERIC_DASH_REGEX = /^\(?([0-9]{3})\)?([0-9]{3})?([0-9]{4})$/;
  return (
    <StyledBox width={"25%"}>
      <StyledTypography
        fontWeight={700}
        fontSize={isMobile ? "4rem" : "2rem"}
        color="#FFF"
        className={outfit.className}
      >
        Verify your number
      </StyledTypography>

      <StyledBox2>
        <StyledForm className="content" onSubmit={handleSubmit}>
          <>
            <TextField
              mb="1rem"
              position="static"
              fullwidth
              className={quicksand.className}
              name="otp"
              label="OTP"
              autoComplete="on"
              color="white"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Eg: 3979"
              value={values.otp}
            />

            <Button
              mt="2rem"
              fullwidth
              variant={isMobile ? "outlined" : "contained"}
              color={isMobile ? "login_button" : "primary"}
              type="submit"
              size="small"
              disabled={
                state.buttonState?.name == "VERIFY_OTP" &&
                state.buttonState?.state
              }
            >
              {state.buttonState?.name == "VERIFY_OTP" &&
              state.buttonState?.state ? (
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                >
                  <CircularProgress color="inherit" size={15} />
                  &nbsp;
                  <Typography
                    className={quicksand.className}
                    fontSize={"1.25rem"}
                    fontWeight={700}
                  >
                    Verifying ...
                  </Typography>
                </Box>
              ) : (
                <Typography
                  className={quicksand.className}
                  fontSize={"1.25rem"}
                  fontWeight={700}
                >
                  Verify
                </Typography>
              )}
            </Button>

            <FlexBox
              marginTop={"1rem"}
              // justifyContent={isMobile ? "flex-start" : "center"}
              justifyContent={"start"}
            >
              <Link href="/signup">
                <StyledTopography
                  color={"#B8B8B8"}
                  ml="0.4rem"
                  fontWeight={600}
                  className={sans.className}
                  fontSize={"0.75rem"}
                >
                  Go to Sign Up page
                </StyledTopography>
              </Link>
            </FlexBox>
          </>
        </StyledForm>
      </StyledBox2>
    </StyledBox>
  );
};

export default VerifyPhoneNumber;
