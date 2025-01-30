"use client";
import React, { useState } from "react";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import Image from "@component/Image";
import { roboto } from "@utils/fonts";
import TextField from "@component/text-field";
import styled from "styled-components";
import { Button, IconButton } from "@component/buttons";
import Icon from "@component/icon/Icon";
import Box from "@component/Box";
import DropDownButton from "./DropDownButton";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, FC } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import api2 from "@utils/__api__/market-1";
import { useSession } from "next-auth/react";
import TransitionAlerts from "@component/alert/Alert";
import Toast from "@component/toast";
import { error } from "console";
import useSessionStorage from "@hook/useSessionStorage";
import { useAppContext } from "@context/AppContext";
import VerifyPhoneNumber from "@component/verifyphonenumber/VerifyPhoneNumber";

type Props = any;

const ResponsiveFlexBox = styled(FlexBox)`
  @media only screen and (max-width: 768px) {
    display: block;
  }

  .flexbox1 {
    @media only screen and (max-width: 768px) {
      width: 100%;
    }
  }

  .flexbox2 {
    @media only screen and (max-width: 768px) {
      margin-botton: 1rem;
      width: 100%;
    }
  }
`;

const CorrectBtn = styled(IconButton)({
  border: "1px solid #C2ABED",
  color: "#672DD1",
  padding: "0.5rem",
  ":hover": {
    backgroundColor: "#00e600",
    color: "whitesmoke",
  },
});
const CancelBtn = styled(IconButton)({
  border: "1px solid #C2ABED",
  color: "#672DD1",
  padding: "0.5rem",
  ":hover": {
    backgroundColor: "#ff3838",
    color: "whitesmoke",
  },
});

export const ContactInfoEdit: FC<Props> = ({ sessionData, profileData }) => {
  const { data: session } = useSession();
  const [selectedEmail, setSelecetdEmail] = useState([]);
  const [selectedPhone, setSelecetdPhone] = useState([]);
  const [emailOptions, setEmailOptions] = useState([]);
  const [phoneOptions, setPhoneOptions] = useState([]);
  const [isAddNewEamil, setIsAddNewEmail] = useState(false);
  const [isAddNewPhone, setIsAddNewPhone] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [closeAdditionalInoutbox, setcloseAdditionalInoutbox] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const [isActiveVerifyOtpInput, setIsActiveVerifyOtpInput] = useState(false);
  const [apiErrorText, setApiErrorText]: any = useState({});
  const { state, dispatch } = useAppContext();
  const [otpVerification, setOtpVerification] = useSessionStorage(
    "otpVerification",
    { phone: "", session: "" }
  );

  useEffect(() => {
    let phoneOptions: any = [];
    let emailOptions: any = [];

    if (profileData && profileData?.emailBooks?.length > 0) {
      profileData?.emailBooks?.map((item, index) => {
        let emailOptionsObject: any = {};

        emailOptionsObject.value = item.id;

        emailOptionsObject.label = item.isDefault
          ? `${item.email} (Primary)`
          : `${item.email}`;

        emailOptions.push(emailOptionsObject);
      });

      setEmailOptions(emailOptions);
    }

    if (profileData && profileData?.phoneBooks?.length > 0) {
      profileData?.phoneBooks?.map((item, index) => {
        let phoneOptionsObject: any = {};

        phoneOptionsObject.value = item.id;

        phoneOptionsObject.label = item.isDefault
          ? `${item.phone} (Primary)`
          : `${item.phone}`;

        phoneOptions.push(phoneOptionsObject);
      });

      setPhoneOptions(phoneOptions);
    }
  }, [profileData]);

  /* 
  Form Validation Schema
  */

  const phoneRegex = /^[0-9]{10}$/;

  const PHONE_VALIDATION_SCHEMA = yup.object().shape({
    phone: yup
      .string()
      .matches(phoneRegex, "Please enter valid 10 digit number")
      .required("required"),
  });

  const OTP_VALIDATION_SCHEMA = yup.object().shape({
    otp: yup.string().required("required"),
  });

  const EMAIL_VALIDATION_SCHEMA = yup.object().shape({
    email: yup.string().email().required("required"),
  });

  const EMAIL_FORM_INITIAL_VALUE = {
    email: "",
  };

  const PHONE_FORM_INITIAL_VALUE = {
    phone: "",
    otpFor: "ADD_NEW_CUSTOMER_CONTACT",
  };

  const OTP_FORM_INITIAL_VALUE = {
    otp: "",
  };

  const handleNewEmailFormSubmit = async (values, { setErrors, resetForm }) => {
    dispatch({
      type: "UPDATE_PAGE_LOADER",
      payload: true,
    });
    const response = await api2
      .saveCustomerEmail(session, values)
      .then((res) => {
        if (res.status == 200) {
          setIsNotify(true);
          setIsAddNewEmail(false);
        }
      })
      .catch((e) => {
        setApiErrorText((err) => ({ ...err, email: e.response.data.message }));
      })
      .finally(() => {
        dispatch({
          type: "UPDATE_PAGE_LOADER",
          payload: false,
        });
      });
  };

  const handleNewPhoneFormSubmit = async (values) => {
    dispatch({
      type: "UPDATE_PAGE_LOADER",
      payload: true,
    });
    const response = await api2
      .generateOtpNewContact(session, values)
      .then((res) => {
        if (res.status == 200) {
          dispatch({
            type: "PHONE_TEMP_CACHE",
            payload: { phone: values.phone, session: res.data.datasession },
          });
          setOtpVerification({
            phone: values.phone,
            session: res.data.data.session,
          });
          setIsAddNewPhone(false);
          setIsNotify(true);
          setIsActiveVerifyOtpInput(true);
        }
      })
      .catch((e) => console.log(e.getMessage()))
      .finally(() => {
        dispatch({
          type: "UPDATE_PAGE_LOADER",
          payload: false,
        });
      });
  };

  const handleOtpSubmit = async (values: any) => {
    dispatch({
      type: "UPDATE_PAGE_LOADER",
      payload: true,
    });

    const otpVerification: any = sessionStorage.getItem("otpVerification");
    values.session = JSON.parse(otpVerification).session;
    values.phone = JSON.parse(otpVerification).phone;
    const response = await api2
      .verifyOtp(session, values)
      .then((res) => {
        if (res.status == 200) {
          dispatch({
            type: "UPDATE_PAGE_LOADER",
            payload: false,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: "UPDATE_PAGE_LOADER",
          payload: false,
        });
      })
      .finally(() => {
        dispatch({
          type: "UPDATE_PAGE_LOADER",
          payload: false,
        });
      });
  };

  const handlePhoneChange = (values) => {
    console.log(values);
  };

  const handleEmailChange = (values) => {
    console.log(values);
  };

  return (
    <>
      <Box pt={4} px={4}>
        {isNotify && <Toast />}
      </Box>
      <ResponsiveFlexBox
        mt={`${isMobile ? "0rem" : "2rem"}`}
        mr={`${isMobile ? "0rem" : "2rem"}`}
        // border="2px solid red"
        position={"relative"}
      >
        <DropDownButton
          label="Email"
          options={emailOptions}
          value={selectedEmail}
          onChange={handleEmailChange}
        />
        <Typography
          color="#0E5BCD"
          className={roboto.className}
          fontSize="1rem"
          ml={`${isMobile ? "0rem" : "2rem"}`}
          fontWeight={300}
          mt={`${isMobile ? "0rem" : "2rem"}`}
          onClick={() => setIsAddNewEmail(true)}
          style={{
            position: `${isMobile ? "absolute" : "relative"}`,
            right: `${isMobile ? "0px" : "0px"}`,
            cursor: "pointer",
          }}
        >
          + Add More
        </Typography>
      </ResponsiveFlexBox>
      {isAddNewEamil && (
        <Formik
          onSubmit={handleNewEmailFormSubmit}
          initialValues={EMAIL_FORM_INITIAL_VALUE}
          validationSchema={EMAIL_VALIDATION_SCHEMA}
          validateOnChange
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setErrors,
          }) => (
            <form onSubmit={handleSubmit}>
              <ResponsiveFlexBox mt="2rem" mr={`${isMobile ? "0rem" : "2rem"}`}>
                <FlexBox
                  className="flexbox1"
                  width={"56%"}
                  paddingLeft={`${isMobile ? "0rem" : "2rem"}`}
                  ml={`${isMobile ? 0 : "12px"}`}
                >
                  <TextField
                    color="#8D8A8A"
                    borderRadius="0.625rem"
                    borderColor="#8D8A8A"
                    fullwidth
                    name="email"
                    type="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    errorText={
                      errors.email ? errors.email : apiErrorText?.email
                    }
                  />
                  <Button padding={"0px"} marginLeft={"1rem"} className="btn1">
                    <CorrectBtn variant="outlined" className="btn2">
                      <Icon variant="customxsmall">correct</Icon>
                    </CorrectBtn>
                  </Button>
                  <Button padding={"0px"} marginLeft={"1rem"}>
                    <CancelBtn
                      variant="outlined"
                      onClick={() => setIsAddNewEmail(false)}
                    >
                      <Icon variant="customxsmall">cross</Icon>
                    </CancelBtn>
                  </Button>
                </FlexBox>
              </ResponsiveFlexBox>
            </form>
          )}
        </Formik>
      )}

      {/* */}

      {/* -----------Email form----------- */}
      <Box mb={`${isMobile ? "5rem" : "0rem"}`}>
        <ResponsiveFlexBox
          mt="0.8rem"
          mr={`${isMobile ? "0rem" : "2rem"}`}
          paddingBottom={"1rem"}
          position={"relative"}
          mb={`${isMobile ? "0.8rem" : "0rem"}`}
        >
          <DropDownButton
            label="Phone"
            options={phoneOptions}
            onChange={handlePhoneChange}
            value={selectedPhone}
          />
          <Typography
            color="#0E5BCD"
            className={roboto.className}
            fontSize="1rem"
            ml={`${isMobile ? "0rem" : "2rem"}`}
            fontWeight={300}
            mt={`${isMobile ? "0rem" : "2rem"}`}
            onClick={() => setIsAddNewPhone(true)}
            style={{
              position: `${isMobile ? "absolute" : "relative"}`,
              right: `${isMobile ? "0px" : "0px"}`,
              cursor: "pointer",
            }}
          >
            + Add More
          </Typography>
        </ResponsiveFlexBox>
        {isAddNewPhone && (
          <>
            <Formik
              onSubmit={handleNewPhoneFormSubmit}
              initialValues={PHONE_FORM_INITIAL_VALUE}
              validationSchema={PHONE_VALIDATION_SCHEMA}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <ResponsiveFlexBox
                    mt="0.8rem"
                    mr={`${isMobile ? "0rem" : "2rem"}`}
                  >
                    <FlexBox
                      className="flexbox1"
                      width={"56%"}
                      paddingLeft={`${isMobile ? "0rem" : "2rem"}`}
                      ml={`${isMobile ? 0 : "12px"}`}
                    >
                      <TextField
                        color="#8D8A8A"
                        borderRadius="0.625rem"
                        borderColor="#8D8A8A"
                        fullwidth
                        mb="0.75rem"
                        name="phone"
                        type="phone"
                        value={values.phone}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        errorText={touched.phone && errors.phone}
                      />
                      <Button
                        padding={"0px"}
                        marginLeft={"1rem"}
                        className="btn1"
                      >
                        <CorrectBtn variant="outlined" className="btn2">
                          <Icon variant="customxsmall">correct</Icon>
                        </CorrectBtn>
                      </Button>
                      <Button padding={"0px"} marginLeft={"1rem"}>
                        <CancelBtn
                          variant="outlined"
                          onClick={() => setIsAddNewPhone(false)}
                        >
                          <Icon variant="customxsmall">cross</Icon>
                        </CancelBtn>
                      </Button>
                    </FlexBox>
                  </ResponsiveFlexBox>
                </form>
              )}
            </Formik>
          </>
        )}

        {!isAddNewPhone && isActiveVerifyOtpInput && (
          <Formik
            onSubmit={handleOtpSubmit}
            initialValues={OTP_FORM_INITIAL_VALUE}
            validationSchema={OTP_VALIDATION_SCHEMA}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <ResponsiveFlexBox
                  mt="0.8rem"
                  mr={`${isMobile ? "0rem" : "2rem"}`}
                >
                  <FlexBox
                    className="flexbox1"
                    width={"56%"}
                    paddingLeft={`${isMobile ? "0rem" : "2rem"}`}
                    ml={`${isMobile ? 0 : "12px"}`}
                  >
                    <TextField
                      color="#8D8A8A"
                      borderRadius="0.625rem"
                      borderColor="#8D8A8A"
                      fullwidth
                      mb="0.75rem"
                      name="otp"
                      type="otp"
                      value={values.otp}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      errorText={touched.otp && errors.otp}
                    />
                    <Button
                      padding={"0px"}
                      marginLeft={"1rem"}
                      className="btn1"
                    >
                      <CorrectBtn variant="outlined" className="btn2">
                        <Icon variant="customxsmall">correct</Icon>
                      </CorrectBtn>
                    </Button>
                    <Button padding={"0px"} marginLeft={"1rem"}>
                      <CancelBtn
                        variant="outlined"
                        onClick={() => setIsAddNewPhone(false)}
                      >
                        <Icon variant="customxsmall">resolve</Icon>
                      </CancelBtn>
                    </Button>
                  </FlexBox>
                </ResponsiveFlexBox>
              </form>
            )}
          </Formik>
        )}
      </Box>
    </>
  );
};
