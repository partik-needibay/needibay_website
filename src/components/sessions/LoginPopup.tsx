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
import { H3, H5, H6, SemiSpan, Small, Span } from "@component/Typography";
import { StyledSessionCardPopupStyles } from "./PopupStyles"
import Login from "./Login";

const LoginPopup: FC = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleFormSubmit = async (values: any) => {
    router.push("/profile");
    console.log(values);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: handleFormSubmit,
      initialValues,
      validationSchema: formSchema,
    });

  return (
    <StyledSessionCardPopupStyles mx="auto" my="2rem" py={"3rem"} boxShadow="large" borderRadius={8}>
        <H3 textAlign="center" mb="0.5rem">
            Welcome To Needibay
          </H3>

          <H5
            fontWeight="600"
            fontSize="12px"
            color="gray.800"
            textAlign="center"
          >
            Log in with email & password
          </H5>
      {/* <form className="content" onSubmit={handleSubmit}>
        

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
        />

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
        />

        <Button
          mb="1.65rem"
          variant="contained"
          color="primary"
          type="submit"
          fullwidth
        >
          Login
        </Button>

        <FlexBox justifyContent="center" mb="1.25rem">
          <SemiSpan>Don&apos;t have account?</SemiSpan>
          <Link href="/signup">
            <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
              Sign Up
            </H6>
          </Link>
        </FlexBox>
      </form> */}

      <Login width={"100%"} fontSize={"1rem"}/>

      
    </StyledSessionCardPopupStyles>
  );
};

const initialValues = { email: "", password: "" };

const formSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("${path} is required"),
  password: yup.string().required("${path} is required"),
});

export default LoginPopup;
