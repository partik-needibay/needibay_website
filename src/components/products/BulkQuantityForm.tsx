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
import cityList from "@data/cityList";
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
// import { NbStyledSessionCard } from "./EmailVerificationFormStyle";
import {
  NbBulkStyledSessionCard,
  NbStyledSessionCard,
} from "../../page-sections/fashion-2/EmailVerificationFormStyle";
import DropDownButton from "../../components/profile/DropDownButton";
import BulkQuantityDropDown from "./BulkQuantityDropDown";
import TextArea from "@component/textarea";
import styled from "styled-components";
import { currency, getTheme } from "@utils/utils";
import CustomTextField from "@component/text-field/CustomTextField";
// --------------------------------------------------
import api from "@utils/__api__/products";
import Select from "@component/Select";
import { useAppContext } from "@context/AppContext";
import { useSession } from "next-auth/react";
import leads from "@utils/__api__/leads";
import { CircularProgress } from "@mui/material";
import { overpass } from "@utils/fonts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const citys = [
  { value: "Bangalore", label: "Bangalore" },
  { value: "Kolkata", label: "Kolkata" },
  { value: "Mumbai", label: "Mumbai" },
];
const StyledBox = styled(Box)`
  @media only screen and (max-width: 600px) {
    border-radius: 50%;
    padding: 0.1rem;
    background-color: ${getTheme("primary.main")};
  }
`;

const StyledIcon = styled(Icon)`
  @media only screen and (max-width: 600px) {
    color: white;
  }
`;
const StyledTypography = styled(Typography)`
  width: 28%;

  height: 33px;
  @media screen and (max-width: 500px) {
    width: 34%;
  }
`;

const BulkQuantityForm = ({ onCloseModal, minOrderQty }) => {
  const [selectedCity, setSelecetdCity] = useState(citys[0]);
  const [qty, setQty] = useState(minOrderQty);
  const { state, dispatch } = useAppContext();
  const { data: session } = useSession();

  const handleCityChange = (selectedCity: any) => {
    setSelecetdCity(selectedCity);
  };
  const handleFormSubmit = async (values: any) => {
    dispatch({
      type: "UPDATE_BUTTON_STATE",
      payload: {
        name: "SUBMIT_BULK_QTY_FORM",
        state: true,
      },
    });
    
    
    const payload = {
      ...values,
      quantity: qty,
      city: values.city?.label,
    };
    if(session?.user?.name?.userData?.id){
      payload.customerId = session?.user?.name?.userData?.id
    }
    console.log(payload);
    await leads
      .saveBulkEnquiryForm(payload)
      .then((res) => {
        console.log(res);
        if (res.success) {
          onCloseModal();
          dispatch({
            type: "UPDATE_BUTTON_STATE",
            payload: {
              name: "",
              state: false,
            },
          });
          toast.success(res.message, { theme: "light" });
          console.log(res);
        }
      })
      .catch((e) => {
        dispatch({
          type: "UPDATE_BUTTON_STATE",
          payload: {
            name: "",
            state: false,
          },
        });
        toast.error(e.message, { theme: "light" });
        console.log(e);
      })
      .finally(() => {
        dispatch({
          type: "UPDATE_BUTTON_STATE",
          payload: {
            name: "SUBMIT_BULK_QTY_FORM",
            state: false,
          },
        });
      });
  };
  const handleChangeQty = async (values: any) => {
    console.log(values);

    if (!values.target.value.trim()) {
      setQty(0);
    } else {
      console.log(typeof Number(values.target.value));

      setQty(Number(values.target.value));
    }
  };
  const handleCartAmountChange = (values) => {
    console.log("values", values);
    const newValue = values || 0;
    if (newValue < 0) {
      setQty(0);
    } else {
      setQty(newValue);
    }
  };
  const handelCloseModal = () => {
    onCloseModal();
  };

  const initialValues = {
    email: session?.user?.name?.userData?.email
      ? session?.user?.name?.userData?.email
      : "",
    fullName: state.customerProfileData?.fullName
      ? state.customerProfileData?.fullName
      : session?.user?.name?.userData?.customerData?.fullName
      ? state.customerProfileData?.fullName
        ? state.customerProfileData?.fullName
        : session?.user?.name?.userData?.customerData?.fullName
      : "",
    phone: session?.user?.name?.userData?.phone
      ? session?.user?.name?.userData?.phone
      : "",
    targetPrice: "",
    city: "",
    message: "",
    quantity: qty,
    productName: ""
  };
  const phoneRegex = /^\(?([0-9]{3})\)?([0-9]{3})?([0-9]{4})$/;

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email address.")
      .required("Email is required."),
  
    fullName: yup
      .string()
      .required("Full name is required."),
  
    targetPrice: yup
      .number()
      .typeError("Target price must be a valid number.")
      .required("Please provide the plan cost."),
  
    city: yup
      .mixed()
      .required("City is required."),
  
    message: yup
      .string()
      .min(1, "Message must be at least 1 character.")
      .max(500, "Message cannot exceed 500 characters.")
      .required("Message is required."),
  
    quantity: yup
      .string(), // No validation rule added for quantity
  
    phone: yup
      .string()
      .matches(phoneRegex, "Please check your phone number format."),
  });
  

  const {
    values,
    errors,
    touched,
    dirty,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues,
    validationSchema: formSchema,
  });
  return (
    <>
      <NbBulkStyledSessionCard
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
        <form className="content" onSubmit={handleSubmit}>
          <H2 textAlign="center" mb="0.5rem">
            Bulk Quantity request
          </H2>

          <TextField
            fullwidth
            mb="0.75rem"
            name="fullName"
            type="text"
            onBlur={handleBlur}
            onChange={handleChange}
            value={
              values.fullName || state.customerProfileData?.fullName
                ? state.customerProfileData?.fullName
                : session?.user?.name?.userData?.customerData?.fullName || ""
            }
            placeholder="Enter you name"
            label="Full Name"
            errorText={touched.fullName && errors.fullName}
          />
          <TextField
            fullwidth
            mb="0.75rem"
            name="phone"
            type="text"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.phone || session?.user?.name?.userData?.phone || ""}
            placeholder="7428291849"
            label="Mobile Number"
            errorText={touched.phone && errors.phone}
          />
          <TextField
            fullwidth
            mb="0.75rem"
            name="email"
            type="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email || session?.user?.name?.userData?.email || ""}
            placeholder="example@mail.com"
            label="Email Id"
            errorText={touched.email && errors.email}
          />

          {/* <BulkQuantityDropDown
            label="City Name"
            options={citys}
            onChange={handleCityChange}
            value={selectedCity}
          /> */}
          <Select
            label="City Name"
            options={cityList}
            value={values.city || "US"}
            errorText={touched.city && errors.city}
            onChange={(city) => {
              setFieldValue("city", city);
            }}
            // 8759DB
            mb="0.75rem"
            styles={{
              // ...styles,
              control: (base, state) => ({
                ...base,

                "&:hover": {
                  borderColor: state.isFocused ? "#8759DB" : "#DAE1E7",
                }, // border style on hover
                border: "1px solid lightgray", // default border color
                boxShadow: "none", // no box-shadow
              }),

              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? "#DAE1E3" : "white",
              }),
            }}
          />

          <Box mb="0.75rem">
            <Typography color="#000" mb={"0.4rem"}>
              Quantity Required
            </Typography>
            <FlexBox
              alignItems="center"
              //   justifyContent={"center"}
              style={{ columnGap: "4px" }}
            >
              <StyledBox
                size="none"
                padding="5px"
                color="white"
                backgroundColor="primary.main"
                borderRadius={"0.24rem"}
                borderColor="#3B3B3B"
                // onClick={handleCartAmountChange(qty - 1)}
                onClick={() => handleCartAmountChange(qty - 1)}
                cursor="pointer"
              >
                <StyledIcon variant="small">minus</StyledIcon>
              </StyledBox>

              <StyledTypography

              // onChange={(event) => {
              //   handleChange(event);
              //   handleChangeQty(event);
              // }}
              >
                <CustomTextField
                  //   mb="0.75rem"
                  name="quantity"
                  type="text"
                  onChange={(event) => {
                    // handleChange(event);
                    handleChangeQty(event);
                  }}
                  onBlur={handleBlur}
                  value={qty || minOrderQty || ""}
                  //   label="Quantity Required "
                  errorText={touched.quantity && errors.quantity}
                  fullwidth
                  style={{
                    height: "33px !important",
                  }}
                />
              </StyledTypography>

              <StyledBox
                size="none"
                padding="5px"
                backgroundColor="primary.main"
                color="white"
                borderColor="#3B3B3B"
                borderRadius={"0.24rem"}
                onClick={() => handleCartAmountChange(qty + 1)}
                cursor="pointer"
              >
                <Icon variant="small">plus</Icon>
              </StyledBox>
            </FlexBox>
          </Box>

          <TextField
            fullwidth
            mb="0.75rem"
            name="targetPrice"
            // type="number"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.targetPrice || ""}
            label="Target Price your looking at"
            errorText={touched.targetPrice && errors.targetPrice}
          />
          <TextArea
            fullwidth
            mb="0.75rem"
            name="message"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.message || ""}
            placeholder="exmple@mail.com"
            label="Brief us about the requirement"
            errorText={touched.message && errors.message}
            cols={10}
            rows={10}
          />

          <Button
            mb="1.65rem"
            variant="contained"
            color="primary"
            type="submit"
            fullwidth
            disabled={!(dirty && isValid)}
          >
            {state.buttonState?.name == "SUBMIT_BULK_QTY_FORM" &&
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
        </form>
      </NbBulkStyledSessionCard>
    </>
  );
};

export default BulkQuantityForm;
