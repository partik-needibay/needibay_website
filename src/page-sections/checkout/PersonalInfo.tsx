"use client";
import Box from "@component/Box";
import { Button } from "@component/buttons";
import { Card1 } from "@component/Card1";
import FlexBox from "@component/FlexBox";
import TextField from "@component/text-field";
import Typography from "@component/Typography";
import { useAppContext } from "@context/AppContext";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { roboto } from "@utils/fonts";
import { Formik, useFormikContext } from "formik";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import * as yup from "yup";

const MobileProfileFormSubmit = () => {
  const { submitForm } = useFormikContext();
  useEffect(() => {
    return () => {
      submitForm();
    };
  }, []);
  return <></>;
};

const PersonalInfo: FC = () => {
  const { data: session } = useSession();
  const { state, dispatch } = useAppContext();
  // hide continue button for mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [personalInfo, setPersonalInfo] = useState({
    fullName: state.customerProfileData?.fullName
      ? state.customerProfileData?.fullName
      : session?.user?.name?.userData?.customerData?.fullName,
    email: session?.user?.name?.userData?.email,
    phone: session?.user?.name?.userData?.phone,
  });

  const initialValues = {
    fullName: personalInfo.fullName,
    email: personalInfo.email,
    phone: personalInfo.phone,
  };

  const PersonalInfoSchema = yup.object().shape({
    fullName: yup.string().required("required"),
    email: yup.string().email("Please enter valid Email"),
    phone: yup.string().required("required"),
  });

  const handleFormSubmit = async (values: any) => {
    await dispatch({
      type: "UPDATE_ORDER_CUSTOMER_INFO",
      payload: values,
    });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PersonalInfoSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Card1 borderRadius={"1rem 1rem 0 0"}>
            {isMobile &&
              <MobileProfileFormSubmit />
            } 
            <FlexBox justifyContent={"center"} alignItems="center" mb="1rem">
              <Typography
                fontWeight="500"
                fontSize="1rem"
                className={roboto.className}
                mr="10px"
              >
                Personal Information
              </Typography>
            </FlexBox>

            <Box mb="1rem">
              <Typography
                color="#636363"
                mb="0.9rem"
                className={roboto.className}
                fontSize={"0.9rem"}
                fontWeight={600}
              >
                Full Name
              </Typography>
              <TextField
                placeholder="Full Name"
                name="fullName"
                fullwidth
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullName || ""}
                errorText={touched.fullName && errors.fullName}
              />
            </Box>
            <Box mb="1rem">
              <Typography
                color="#636363"
                mb="0.9rem"
                className={roboto.className}
                fontSize={"0.9rem"}
                fontWeight={600}
              >
                Mobile Number
              </Typography>
              <TextField
                placeholder="Phone"
                name="phone"
                fullwidth
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone || ""}
                errorText={touched.phone && errors.phone}
              />
            </Box>
            <Box mb="1rem">
              <Typography
                color="#636363"
                mb="0.9rem"
                className={roboto.className}
                fontSize={"0.9rem"}
                fontWeight={600}
              >
                E-mail
              </Typography>
              <TextField
                placeholder="Email"
                name="email"
                fullwidth
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email || ""}
                errorText={touched.email && errors.email}
              />
            </Box>
            {!isMobile ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  mt="1rem"
                  fullwidth
                  type="submit"
                >
                  Continue
                </Button>
              </>
            ) : null}
          </Card1>
        </form>
      )}
    </Formik>
  );
};

export default PersonalInfo;
