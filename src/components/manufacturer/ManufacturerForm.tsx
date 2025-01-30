"use client";
import * as yup from "yup";

import React from "react";
import Box from "@component/Box";
import styled from "styled-components";
import FlexBox from "@component/FlexBox";
import { FC, useCallback, useState, useEffect } from "react";
import Typography from "@component/Typography";
import { overpass, roboto } from "@utils/fonts";
import TextField from "@component/text-field";
import DropDownButton from "@component/profile/DropDownButton";
import Image from "@component/Image";
import MediaQuery from "react-responsive";
import { useFormik } from "formik";
import Button from "@component/buttons/Button";
import leads from "@utils/__api__/leads";
import { theme } from "@utils/theme";
import { layoutConstant } from "@utils/constants";
import { useAppContext } from "@context/AppContext";
import { CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const options = [
  { value: "B2B", label: "B2B" },
  { value: "B2C", label: "B2C" },
  { value: "FMCG", label: "FMCG" },
  { value: "Retail", label: "Retail" },
  { value: "Manufacturing", label: "Manufacturing" },
  { value: "Services", label: "Services" },
  { value: "Others", label: "Others" },
];

const ButtonWrapper = styled.div`
  padding: 10px 10px;
  left: 0;
  right: 0;
  position: fixed;
  bottom: ${layoutConstant.mobileNavHeight}; // Adjust this value as needed
  width: 100%;
  background: #fff;
  z-index: 1000;
`;
const ResponsiveFlexBox = styled(FlexBox)`
  @media only screen and (max-width: 1200px) {
    display: block;
  }

  .flexbox1 {
    @media only screen and (max-width: 1200px) {
      width: 100%;
    }
  }

  .flexbox2 {
    @media only screen and (max-width: 1200px) {
      margin-botton: 1rem;
      width: 100%;
    }
  }
`;

const ResponsiveFlexBox2 = styled(FlexBox)`
  @media only screen and (max-width: 1200px) {
    width: 100%;
    padding: 0rem;
    background: none;
  }
  .outer-class {
    @media only screen and (max-width: 1200px) {
      margin-left: 0rem;
    }
  }

  .title {
    @media only screen and (max-width: 1200px) {
      font-size: 1.5rem;
    }
  }
  .subtitle {
    @media only screen and (max-width: 1200px) {
      font-size: 1rem;
    }
  }
  .flexbox1 {
    @media only screen and (max-width: 1200px) {
      display: block;
      width: 100%;
    }
  }

  .flexbox2 {
    @media only screen and (max-width: 1200px) {
      padding: 0px;
      margin: 0px;
      width: 100%;
    }
  }
  .image {
    @media only screen and (max-width: 1200px) {
      display: none;
    }
  }
`;

// have to implement form data  on submit
const ManufacturerForm: FC = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    // Adjust this value as needed
    if (window.innerWidth <= 900) {
      // Adjust this value as needed
      document.body.style.paddingBottom = "7rem"; // Assuming the height of CheckoutWrapper is 60px
    } // Assuming the height of CheckoutWrapper is 60px
  }, []);

  const handleChange1 = (selectedOption: any, setFieldValue) => {
    setFieldValue("businessType", selectedOption?.value);
    setSelectedOption(selectedOption);
  };

  const handleFormSubmit = async (values: any) => {
    dispatch({
      type: "UPDATE_BUTTON_STATE",
      payload: {
        name: "SUBMIT_MANUFACTURER_FORM",
        state: true,
      },
    });
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      alternativeEmail: values.alternativeEmail,
      phone: values.phone,
      alternativePhone: values.alternativePhone,
      pan: values.pan,
      designation: values.designation,
      businessName: values.businessName,
      businessType: values.businessType,
    };
    console.log(payload);
    await leads
      .saveManufacturerForm(payload)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: "UPDATE_BUTTON_STATE",
            payload: {
              name: "SUBMIT_MANUFACTURER_FORM",
              state: false,
            },
          });
          toast.success(res.message, { theme: "light" });
        }
      })
      .catch((e) => {
        dispatch({
          type: "UPDATE_BUTTON_STATE",
          payload: {
            name: "SUBMIT_MANUFACTURER_FORM",
            state: false,
          },
        });
        console.log(e);
      });
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    dirty,
    isValid,
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues,
    validationSchema: formSchema,
  });

  return (
    <ResponsiveFlexBox2
      borderRadius="1rem"
      backgroundColor="white"
      width="70%"
      justifyContent={"flex-start"}
      padding="2rem"
    >
      <Box>
        <Image
          className="image"
          src="/assets/images/manufacturer/side_nav.png"
        ></Image>
      </Box>

      <Box className="outer-class" marginLeft="3rem" width="100%">
        <FlexBox justifyContent={"center"}>
          <Box>
            <Typography
              className={`title ${roboto.className}`}
              color="#515151"
              fontSize={"1.875rem"}
              fontWeight={600}
            >
              Manufacturer Form
            </Typography>
          </Box>
        </FlexBox>

        <Box paddingTop={"2rem"}>
          <Typography
            color="#3C3A3A"
            className={`subtitle ${roboto.className}`}
            fontSize={"1.25rem"}
            fontWeight={500}
          >
            Personal Information
          </Typography>
          <FlexBox className="flexbox1" mt="2rem">
            {" "}
            <FlexBox className="flexbox1" width="50%">
              <TextField
                color="#8D8A8A"
                borderRadius="0.625rem"
                onBlur={handleBlur}
                onChange={handleChange}
                errorText={touched.firstName && errors.firstName}
                borderColor="#8D8A8A"
                fullwidth
                mb="0.75rem"
                name="firstName"
                type="text"
                label="First Name"
              />
            </FlexBox>
            <FlexBox
              width="50%"
              className="flexbox2"
              paddingLeft="2rem"
              ml={12}
            >
              <TextField
                borderRadius="0.625rem"
                color="#8D8A8A"
                borderColor="#8D8A8A"
                onBlur={handleBlur}
                onChange={handleChange}
                errorText={touched.lastName && errors.lastName}
                fullwidth
                mb="0.75rem"
                name="lastName"
                label="Last Name"
              />
            </FlexBox>
          </FlexBox>

          <FlexBox className="flexbox1" mt="0.2rem">
            {" "}
            <FlexBox className="flexbox1" width="50%">
              <TextField
                color="#8D8A8A"
                borderRadius="0.625rem"
                borderColor="#CACACA"
                onBlur={handleBlur}
                onChange={handleChange}
                errorText={touched.email && errors.email}
                fullwidth
                mb="0.75rem"
                name="email"
                type="text"
                label="E-mail"
              />
            </FlexBox>
            <FlexBox
              width="50%"
              className="flexbox2"
              paddingLeft="2rem"
              ml={12}
            >
              <TextField
                borderRadius="0.625rem"
                color="#8D8A8A"
                borderColor="#CACACA"
                fullwidth
                mb="0.75rem"
                onBlur={handleBlur}
                onChange={handleChange}
                errorText={touched.alternativeEmail && errors.alternativeEmail}
                name="alternativeEmail"
                type="text"
                label="Alternate E-mail"
              />
            </FlexBox>
          </FlexBox>

          <FlexBox className="flexbox1" mt="0.2rem">
            <FlexBox className="flexbox1" width="50%">
              <TextField
                color="#8D8A8A"
                borderRadius="0.625rem"
                borderColor="#CACACA"
                onBlur={handleBlur}
                onChange={handleChange}
                errorText={touched.phone && errors.phone}
                fullwidth
                mb="0.75rem"
                name="phone"
                type="text"
                label="Phone Number"
              />
            </FlexBox>
            <FlexBox
              width="50%"
              className="flexbox2"
              paddingLeft="2rem"
              ml={12}
            >
              <TextField
                borderRadius="0.625rem"
                color="#8D8A8A"
                borderColor="#CACACA"
                fullwidth
                onBlur={handleBlur}
                onChange={handleChange}
                errorText={touched.alternativePhone && errors.alternativePhone}
                mb="0.75rem"
                name="alternativePhone"
                type="text"
                label="Alternate Phone Number"
              />
            </FlexBox>
          </FlexBox>

          <FlexBox className="flexbox1" mt="0.2rem">
            <FlexBox className="flexbox1" width="50%">
              <TextField
                color="#8D8A8A"
                borderRadius="0.625rem"
                borderColor="#CACACA"
                onBlur={handleBlur}
                onChange={handleChange}
                errorText={touched.pan && errors.pan}
                fullwidth
                mb="0.75rem"
                name="pan"
                type="text"
                label="PAN Number"
              />
            </FlexBox>
            <FlexBox
              width="50%"
              className="flexbox2"
              paddingLeft="2rem"
              ml={12}
            >
              <TextField
                borderRadius="0.625rem"
                color="#8D8A8A"
                borderColor="#CACACA"
                fullwidth
                mb="0.75rem"
                onBlur={handleBlur}
                onChange={handleChange}
                errorText={touched.designation && errors.designation}
                name="designation"
                type="text"
                label="Designation"
              />
            </FlexBox>
          </FlexBox>
        </Box>

        <Box paddingTop={"2rem"}>
          <Typography
            color="#3C3A3A"
            className={roboto.className}
            fontSize={"1.25rem"}
            fontWeight={500}
          >
            Business Information
          </Typography>
        </Box>

        <FlexBox className="flexbox1" mt="0.5rem">
          {" "}
          <FlexBox className="flexbox1" width="50%">
            <TextField
              color="#8D8A8A"
              borderRadius="0.625rem"
              borderColor="#8D8A8A"
              fullwidth
              mb="0.75rem"
              onBlur={handleBlur}
              onChange={handleChange}
              errorText={touched.businessName && errors.businessName}
              name="businessName"
              type="text"
              label="Business Name"
            />
          </FlexBox>
          <DropDownButton
            onChange={(e) => handleChange1(e, setFieldValue)}
            value={selectedOption}
            label="Business Type"
            options={options}
          />
        </FlexBox>
        <MediaQuery minWidth={768}>
          <FlexBox mt="1rem" width="100%" justifyContent={"flex-start"}>
            <Button
              variant="contained"
              onClick={() => handleFormSubmit(values)}
              color="primary"
              width="35%"
              type="submit"
              disabled={!(dirty && isValid)}
            >
              {state.buttonState?.name == "SUBMIT_MANUFACTURER_FORM" &&
              state.buttonState?.state ? (
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                >
                  <CircularProgress color="inherit" size={15} />
                  &nbsp;
                  <Typography className={overpass.className}>
                    Submitting...
                  </Typography>
                </Box>
              ) : (
                <>Submit </>
              )}
            </Button>
          </FlexBox>
        </MediaQuery>
      </Box>

      <MediaQuery maxWidth={768}>
        <ButtonWrapper>
          <Button
            variant="contained"
            onClick={() => handleFormSubmit(values)}
            color="primary"
            type="submit"
            fullwidth
            disabled={!(dirty && isValid)}
          >
            {state.buttonState?.name == "SUBMIT_MANUFACTURER_FORM" &&
            state.buttonState?.state ? (
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
                <CircularProgress color="inherit" size={15} />
                &nbsp;
                <Typography className={overpass.className}>
                  Submitting...
                </Typography>
              </Box>
            ) : (
              <>Submit</>
            )}
          </Button>
        </ButtonWrapper>
      </MediaQuery>
    </ResponsiveFlexBox2>
  );
};

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  pan: "",
  alternativePhone: "",
  alternativeEmail: "",
  businessName: "",
  businessType: "B2C",
};

const formSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("This field is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "invalid phone")
    .required("This field is required"),
  alternativePhone: yup.string().matches(/^[0-9]{10}$/, "invalid phone"),
  firstName: yup.string().required("This field is required"),
  lastName: yup.string().required("This field is required"),
  pan: yup.string().required("This field is required"),
});

export default ManufacturerForm;
