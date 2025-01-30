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
import { signIn } from "next-auth/react";
import api2 from "@utils/__api__/market-1";
import { isMobile } from "react-device-detect";
import Typography, {
  H3,
  H5,
  H6,
  SemiSpan,
  Small,
  Span,
} from "@component/Typography";
import { StyledSessionCard } from "./styles";
import { outfit, quicksand, sans } from "@utils/fonts";
import styled from "styled-components";
import { useAppContext } from "@context/AppContext";
import useSessionStorage from "@hook/useSessionStorage";
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
  @media only screen and (max-width: 600px) {
    margin-top: 1rem;
  }
`;

type Props = {
  width?: any;
  fontSize?: any;
};

const Login: FC<Props> = ({ width, fontSize }) => {
  const [stateMobile, setState] = useState(false);
  const { state, dispatch } = useAppContext();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loginOTP, setLoginOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);
  const [otpVerification, setOtpVerification] = useSessionStorage(
    "otpVerification",
    { phone: "", session: "" }
  );

  const handleSendOtp = async (e) => {
    e.preventDefault();
  };

  const handleCredentialFormSubmit = async (values: any) => {
    dispatch({
      type: "UPDATE_BUTTON_STATE",
      payload: { name: "LOGIN_CREDENTIAL", state: true },
    });
    const result = await signIn("login", {
      email: values.email,
      password: values.password,
      redirect: true,
      callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL,
    });
  };
  const handleOtpFormSubmit = async (values: any) => {
    dispatch({
      type: "UPDATE_BUTTON_STATE",
      payload: { name: "LOGIN_VIA_OTP", state: true },
    });
    const response = await api2.generateOtp(values).then((res) => {
      dispatch({
        type: "PHONE_TEMP_CACHE",
        payload: { phone: values.phone, session: res?.data.session },
      });
      console.log(res?.data.session);
      setOtpVerification({
        phone: values.phone,
        session: res?.data.session,
      });
      router.push("/verify-phone-Number");
    }).catch((e) => {
      dispatch({
        type: "UPDATE_BUTTON_STATE",
        payload: { name: "LOGIN_VIA_OTP", state: false },
      });
    }).finally(() => {
      dispatch({
        type: "UPDATE_BUTTON_STATE",
        payload: { name: "LOGIN_VIA_OTP", state: false },
      });
    });
    
  };
  const gotoForgetPasswordpage = async (values: any) => {
    router.push("/forget-password");
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: loginOTP ? handleOtpFormSubmit : handleCredentialFormSubmit,
      initialValues: loginOTP ? otpLoginInitialValues : initialValues,
      validationSchema: loginOTP ? otpFormSchema : formSchema,
    });

  const ALPHA_NUMERIC_DASH_REGEX = /^\(?([0-9]{3})\)?([0-9]{3})?([0-9]{4})$/;
  return (
    <StyledBox width={width ? width : "25%"}>
      <StyledTypography
        fontWeight={700}
        fontSize={fontSize ? "" : isMobile ? "4rem" : "5rem"}
        color="#FFF"
        className={outfit.className}
      >
        Login
      </StyledTypography>

      <StyledBox2>
        {loginOTP ? (
          <StyledForm className="content" onSubmit={handleSubmit}>
            <TextField
              fullwidth
              mb="0.75rem"
              name="phone"
              // type="number"
              onBlur={handleBlur}
              onChange={handleChange}
              color="#FFF"
              className={quicksand.className}
              value={values.phone || ""}
              placeholder="Enter valid 10 digit number"
              label="Phone Number"
              errorText={touched.phone && errors.phone}
            />

            {otpSent ? (
              <TextField
                mb="1rem"
                position="static"
                fullwidth
                className={quicksand.className}
                name="OTP"
                label="OTP"
                autoComplete="on"
                color="white"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Eg: 3979"
                value={values.OTP}
              />
            ) : null}

            <Button
              mt="2rem"
              fullwidth
              variant={isMobile ? "outlined" : "contained"}
              color={isMobile ? "login_button" : "primary"}
              type="submit"
              size="small"
              disabled={
                state.buttonState?.name == "LOGIN_VIA_OTP" &&
                state.buttonState?.state
              }
            >
              {state.buttonState?.name == "LOGIN_VIA_OTP" &&
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
                    Sending OTP ...
                  </Typography>
                </Box>
              ) : (
                <Typography
                  className={quicksand.className}
                  fontSize={"1.25rem"}
                  fontWeight={700}
                >
                  Send OTP
                </Typography>
              )}
            </Button>

            <FlexBox
              marginTop={"1rem"}
              justifyContent={isMobile ? "flex-start" : "center"}
            >
              <Typography
                color={"#B8B8B8"}
                fontWeight={600}
                className={sans.className}
                fontSize={"0.75rem"}
              >
                New to NeediBay?
              </Typography>
              <Link href="/signup">
                <StyledTopography
                  color={"#B8B8B8"}
                  ml="0.4rem"
                  fontWeight={600}
                  className={sans.className}
                  fontSize={"0.75rem"}
                >
                  Sign Up
                </StyledTopography>
              </Link>
            </FlexBox>
          </StyledForm>
        ) : (
          <StyledForm className="content" onSubmit={handleSubmit}>
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
              errorText={touched.email && errors.email}
            />

            <TextField
              mb="1rem"
              position="static"
              fullwidth
              className={quicksand.className}
              name="password"
              label="Password"
              autoComplete="on"
              color="white"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Eg: 1#2112lik"
              value={values.password || ""}
              errorText={touched.password && errors.password}
              type={passwordVisibility ? "text" : "password"}
              endAdornment={
                <IconButton
                  p="0.25rem"
                  mr="0.25rem"
                  type="button"
                  onClick={togglePasswordVisibility}
                  color={passwordVisibility ? "gray.700" : "gray.600"}
                >
                  <Icon variant="small" defaultcolor="currentColor">
                    {passwordVisibility ? "eye-alt" : "eye"}
                  </Icon>
                </IconButton>
              }
            />

            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                color={"#ACACAC"}
                fontWeight={400}
                className={sans.className}
                fontSize={"0.75rem"}
                onClick={gotoForgetPasswordpage}
                style={{ cursor: "pointer" }}
              >
                Forgot Password?
              </Typography>
              <Typography
                color={"#ACACAC"}
                fontWeight={400}
                className={sans.className}
                fontSize={"0.75rem"}
                style={{ cursor: "pointer" }}
                onClick={() => setLoginOTP(true)}
              >
                Login with OTP
              </Typography>
            </Box>

            <Button
              mt="2rem"
              fullwidth
              variant={isMobile ? "outlined" : "contained"}
              color={isMobile ? "login_button" : "primary"}
              type="submit"
              size="small"
              disabled={
                state.buttonState?.name == "LOGIN_CREDENTIAL" &&
                state.buttonState?.state
              }
            >
              {state.buttonState?.name == "LOGIN_CREDENTIAL" &&
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
                    Login ...
                  </Typography>
                </Box>
              ) : (
                <Typography
                  className={quicksand.className}
                  fontSize={"1.25rem"}
                  fontWeight={700}
                >
                  Login
                </Typography>
              )}
            </Button>

            <FlexBox
              marginTop={"1rem"}
              justifyContent={isMobile ? "flex-start" : "center"}
            >
              <Typography
                color={"#B8B8B8"}
                fontWeight={600}
                className={sans.className}
                fontSize={"0.75rem"}
              >
                New to NeediBay?
              </Typography>
              <Link href="/signup">
                <StyledTopography
                  color={"#B8B8B8"}
                  ml="0.4rem"
                  fontWeight={600}
                  className={sans.className}
                  fontSize={"0.75rem"}
                >
                  Sign Up
                </StyledTopography>
              </Link>
            </FlexBox>
          </StyledForm>
        )}
      </StyledBox2>
    </StyledBox>
  );
};

// todo - add seperate form validation object for login with otp and handle submit seperatly, it should not combined with login validation

const initialValues = { email: "", password: "" };

const otpLoginInitialValues = { phone: "" };

const phoneRegex = /^[0-9]{10}$/;

const formSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("${path} is required"),
  password: yup.string().required("${path} is required"),
});

const otpFormSchema = yup.object().shape({
  phone: yup
    .string()
    .matches(phoneRegex, "Check your phone number")
    .required("${path} is required"),
});

export default Login;
