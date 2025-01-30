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
import api from "@utils/__api__/customer";
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
const ForgotPassword = () => {
  const [stateMobile, setState] = useState(false);
  const { state, dispatch } = useAppContext();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loginOTP, setLoginOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleFormSubmit = async (values: any) => {
    dispatch({
      type: "UPDATE_BUTTON_STATE",
      payload: { name: "FORGOT_PASSWORD", state: true },
    });
    await api
      .postRequestChangePassword(values)
      .then((res) => {
        dispatch({
          type: "UPDATE_BUTTON_STATE",
          payload: { name: "FORGOT_PASSWORD", state: false },
        });
        if (res.success) {
          dispatch({
            type: "UPDATE_BUTTON_STATE",
            payload: { name: "FORGOT_PASSWORD", state: false },
          });
          
        }
      })
      .catch((e) => {
        dispatch({
          type: "UPDATE_BUTTON_STATE",
          payload: { name: "FORGOT_PASSWORD", state: false },
        });
        console.log(e);
      });
  };
  const initialValues = { email: "" };
  const phoneRegex = /^\(?([0-9]{3})\)?([0-9]{3})?([0-9]{4})$/;
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("invalid email")
      .required("Email is required"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: handleFormSubmit,
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
        Verify your Email
      </StyledTypography>

      <StyledBox2>
        {" "}
        <StyledForm className="content" onSubmit={handleSubmit}>
          <>
            <TextField
              fullwidth
              mb="0.75rem"
              name="email"
              type="email"
              onBlur={handleBlur}
              onChange={handleChange}
              color="#FFF"
              className={quicksand.className}
              value={values.email || ""}
              placeholder="example@gmail.com"
              label="E-mail"
              errorText={
                touched.email && errors.email
              }
            />

            <Button
              mt="2rem"
              fullwidth
              variant={isMobile ? "outlined" : "contained"}
              color={isMobile ? "login_button" : "primary"}
              type="submit"
              size="small"
              disabled={
                state.buttonState?.name == "FORGOT_PASSWORD" &&
                state.buttonState?.state
              }
            >
              {state.buttonState?.name == "FORGOT_PASSWORD" &&
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
                    Sending email ...
                  </Typography>
                </Box>
              ) : (
                <Typography
                  className={quicksand.className}
                  fontSize={"1.25rem"}
                  fontWeight={700}
                >
                  Send email
                </Typography>
              )}
            </Button>
            <FlexBox
              marginTop={"1rem"}
              // justifyContent={isMobile ? "flex-start" : "center"}
              justifyContent={"flex-start"}
            >
              <Link href="/login">
                <StyledTopography
                  color={"#B8B8B8"}
                  ml="0.4rem"
                  fontWeight={600}
                  className={sans.className}
                  fontSize={"0.75rem"}
                >
                  Go back to login page
                </StyledTopography>
              </Link>
            </FlexBox>
          </>
        </StyledForm>
      </StyledBox2>
    </StyledBox>
  );
};

export default ForgotPassword;
