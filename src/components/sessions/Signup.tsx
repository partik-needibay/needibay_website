"use client";
import Box from "../Box";
import * as yup from "yup";
import Link from "next/link";
import { useEffect } from "react";
import Icon from "../icon/Icon";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import CheckBox from "../CheckBox";
import { useFormik, useFormikContext } from "formik";
import { FC, useState } from "react";
import TextField from "../text-field";
import { Button, IconButton } from "../buttons";
import Typography, { H3, H5, H6, SemiSpan, Small, Span } from "../Typography";
import { StyledSessionCard } from "./styles";
import Image from "@component/Image";
import DropDownButton from "@component/sessions/DropDownButton";
import { useAppContext } from "@context/AppContext";
import { outfit, quicksand, sans } from "@utils/fonts";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import api2 from "@utils/__api__/market-1";
import useSessionStorage from "@hook/useSessionStorage";
import { CircularProgress } from "@mui/material";
import TransitionAlerts from "@component/alert/Alert";

const options = [
  { value: "B2B", label: "B2B" },
  { value: "B2C", label: "B2C" },
  { value: "FMCG", label: "FMCG" },
  { value: "Retail", label: "Retail" },
  { value: "Manufacturing", label: "Manufacturing" },
  { value: "Services", label: "Services" },
  { value: "Others", label: "Others" },
];

const StyledTopography = styled(Typography)`
  text-decoration: underline;
`;

const StyledForm = styled.form`
  margin-top: 2rem;
  @media only screen and (max-width: 600px) {
    margin-top: 1rem;
  }
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
    margin-bottom: 2rem;
  }
`;

const StyledBox = styled(Box)`
  @media only screen and (max-width: 600px) {
    display: flex;
    margin-top: -4rem;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const Signup: FC = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const { state, dispatch } = useAppContext();
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const router = useRouter();
  const handleChange1 = (selectedOption: any) => {
    setSelectedOption(selectedOption);
  };
  const [otpVerification, setOtpVerification] = useSessionStorage(
    "otpVerification",
    { phone: "", session: "" }
  );
  const [error, setError] = useState<any>({isError : false, message: ""});

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is defined (i.e., if we're on the client side)
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 768); // adjust the value as needed
    }
  }, []);
  const togglePasswordVisibility = () => {
    setPasswordVisibility((visible) => !visible);
  };

  const handleFormSubmit = async (values: any) => {
    console.log(values);
  };

  const gotoPhoneNumberVerifyPage = async (values: any) => {
    dispatch({
      type: "UPDATE_BUTTON_STATE",
      payload: { name: "SIGNUP", state: true },
    });
    values.businessType = selectedOption?.value;
    const response = await api2
      .customerSignup(values)
      .then((res) => {
        dispatch({
          type: "PHONE_TEMP_CACHE",
          payload: { phone: values.phone, session: res.data.session },
        });
        setOtpVerification({ phone: values.phone, session: res?.data.session });
        router.push("/verify-phone-Number");
      })
      .catch((e) => {
        console.log(e);
        dispatch({
          type: "UPDATE_BUTTON_STATE",
          payload: { name: "SIGNUP", state: false },
        });
        setError({isError: true, message: e.response?.data?.message});
        setTimeout(() => setError({isError: false, message: ""}), 3000);
      })
      .finally(() => {
        dispatch({
          type: "UPDATE_BUTTON_STATE",
          payload: { name: "SIGNUP", state: false },
        });
      });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: (values) => gotoPhoneNumberVerifyPage(values),
      validationSchema: formSchema,
    });

  return (
    <StyledBox width="25%">
      <StyledTypography
        fontWeight={700}
        fontSize={"4rem"}
        color="#FFF"
        className={outfit.className}
      >
        Signup
      </StyledTypography>
      <StyledBox2>
        

        <StyledForm className="content" onSubmit={handleSubmit}>
        {error.isError && (
          <TransitionAlerts type={"error"} isActive={true} message={error.message} />
        )}
          <TextField
            fullwidth
            mb="0.75rem"
            name="fullName"
            onBlur={handleBlur}
            onChange={handleChange}
            color="#FFF"
            className={quicksand.className}
            value={values.fullName || ""}
            placeholder="Arojeet Saha"
            label="Name"
            errorText={touched.fullName && errors.fullName}
          />
          <TextField
            fullwidth
            mb="0.75rem"
            name="email"
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
            fullwidth
            mb="0.75rem"
            name="phone"
            onBlur={handleBlur}
            onChange={handleChange}
            color="#FFF"
            className={quicksand.className}
            value={values.phone || ""}
            placeholder="+91 XXXXX XXXXXX"
            label="Phone Number"
            errorText={touched.phone && errors.phone}
          />

          <TextField
            mb="1rem"
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

          <Box>
            <Typography color="#FFF" mb={"6px"}>
              Business Type
            </Typography>
            <FlexBox width={"100%"}>
              <DropDownButton
                onChange={handleChange1}
                value={selectedOption}
                label=""
                options={options}
              />
            </FlexBox>
          </Box>

          <Box>
            <Typography
              color={"#ACACAC"}
              mt="0.2rem"
              fontWeight={400}
              className={sans.className}
              fontSize={"0.75rem"}
            >
              Need Help?
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
              state.buttonState?.name == "SIGNUP" && state.buttonState?.state
            }
          >
            {state.buttonState?.name == "SIGNUP" && state.buttonState?.state ? (
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
                <CircularProgress color="inherit" size={15} />
                &nbsp;
                <Typography
                  className={quicksand.className}
                  fontSize={"1.25rem"}
                  fontWeight={700}
                >
                  Signing Up ...
                </Typography>
              </Box>
            ) : (
              <Typography
                className={quicksand.className}
                fontSize={"1.25rem"}
                fontWeight={700}
              >
                Sign Up
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
              Already have an account?
            </Typography>
            <Link href="/login">
              <StyledTopography
                color={"#B8B8B8"}
                ml="0.4rem"
                fontWeight={600}
                className={sans.className}
                fontSize={"0.75rem"}
              >
                Login
              </StyledTopography>
            </Link>
          </FlexBox>
        </StyledForm>
      </StyledBox2>
    </StyledBox>
  );
};

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  phone: "",
  /*   businessType: "",
   */
};
const phoneRegex = /^\(?([0-9]{3})\)?([0-9]{3})?([0-9]{4})$/;

const formSchema = yup.object().shape({
  fullName: yup.string().required("${path} is required"),
  email: yup.string().email("invalid email").required("${path} is required"),
  password: yup.string().required("${path} is required"),
  phone: yup
    .string()
    .matches(phoneRegex, "Check your phone number")
    .required("${path} is required"),
  /*   businessType: yup.string().required("${path} is required"),
   */
});

export default Signup;
