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
import api from "@utils/__api__/customer";
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
import { useAppContext } from "@context/AppContext";

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
const Changepassword = ({forgotPasswordToken}) => {
  const [stateMobile, setState] = useState(false);
  const { state, dispatch } = useAppContext();

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmpasswordVisibility, setconfirmPasswordVisibility] =
    useState(false);

  const router = useRouter();
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);
  const toggleConfirmPasswordVisibility = useCallback(() => {
    setconfirmPasswordVisibility((visible) => !visible);
  }, []);

  const initialValues = { confirmPassword: "", password: "", token: forgotPasswordToken };
  const formSchema = yup.object().shape({
    /* password: yup.string().required("${path} is required"),
    confirmPassword: yup.string().required("${path} is required"),
    token: yup.string().required("${path} is required"), */
  });


  const handleFormSubmit = async (values: any) => {
    
    dispatch({
      type: "UPDATE_BUTTON_STATE",
      payload: { name: "CHANGE_PASSWORD", state: true },
    });

    await api
      .postRequestUpdatePassword(values)
      .then((res) => {
        dispatch({
          type: "UPDATE_BUTTON_STATE",
          payload: { name: "CHANGE_PASSWORD", state: false },
        });
        if (res.success) {
          dispatch({
            type: "UPDATE_BUTTON_STATE",
            payload: { name: "CHANGE_PASSWORD", state: false },
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: "UPDATE_BUTTON_STATE",
          payload: { name: "CHANGE_PASSWORD", state: false },
        });
        console.log(e);
      });
  };


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
        fontSize={isMobile ? "4rem" : "2.2rem"}
        color="#FFF"
        className={outfit.className}
      >
        Change password
      </StyledTypography>

      <StyledBox2>
        {" "}
        <StyledForm className="content" onSubmit={handleSubmit}>
          <>
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
            <TextField
              mb="1rem"
              position="static"
              fullwidth
              className={quicksand.className}
              name="confirmPassword"
              label="Confirm Password"
              autoComplete="on"
              color="white"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Eg: 1#2112lik"
              value={values.confirmPassword || ""}
              errorText={touched.confirmPassword && errors.confirmPassword}
              type={confirmpasswordVisibility ? "text" : "password"}
              endAdornment={
                <IconButton
                  p="0.25rem"
                  mr="0.25rem"
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  color={confirmpasswordVisibility ? "gray.700" : "gray.600"}
                >
                  <Icon variant="small" defaultcolor="currentColor">
                    {confirmpasswordVisibility ? "eye-alt" : "eye"}
                  </Icon>
                </IconButton>
              }
            />

            <Button
              mt="2rem"
              fullwidth
              variant={isMobile ? "outlined" : "contained"}
              color={isMobile ? "login_button" : "primary"}
              type="submit"
              size="small"
            >
              <Typography
                className={quicksand.className}
                fontSize={"1.25rem"}
                fontWeight={700}
              >
                Change Password
              </Typography>
            </Button>
          </>
        </StyledForm>
      </StyledBox2>
    </StyledBox>
  );
};

export default Changepassword;

{
  /* 
        <TextField
          fullwidth
          mb="0.75rem"
          name="email"
          type="email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email || ""}
          placeholder="exmple@mail.com"
          label="Email or Phone Number"
          errorText={touched.email && errors.email}
        /> */
}
{
  /* 
        <TextField
          mb="1rem"
          fullwidth
          name="password"
          label="Password"
          autoComplete="on"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="*********"
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
        /> */
}
