"use client";
import Box from "@component/Box";
import { Button } from "@component/buttons";
import { Card1 } from "@component/Card1";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import Image from "@component/Image";
import Select from "@component/Select";
import TextField from "@component/text-field";
import Typography from "@component/Typography";
import { useAppContext } from "@context/AppContext";
import cityList from "@data/cityList";
import stateList from "@data/stateList";
import zipcodeList from "@data/zipcodeList";
import { CircularProgress } from "@mui/material";
import api2 from "@utils/__api__/market-1";
import { overpass, roboto } from "@utils/fonts";
import Loading from "app/loading";
import axios from "axios";
import { Formik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { components } from "react-select";
import * as yup from "yup";

type Props = { handleSetBillingAddress: any };

const BillingAddress: FC<Props> = ({ handleSetBillingAddress }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const [isSearching, setSearching] = useState(false);
  const [currentCity, setCurrentCity] = useState<any>("");
  const [currentPostalCode, setCurrentPostalCode] = useState<any>("");
  const [error, setError] = useState<any>("");

  const [personalInfo, setPersonalInfo] = useState({
    fullName: state.customerProfileData?.fullName
      ? state.customerProfileData?.fullName
      : session?.user?.name?.userData?.customerData?.fullName,
    email: session?.user?.name?.userData?.email,
    phone: session?.user?.name?.userData?.phone,
  });

  const initialValues = {
    addressLineOne: "",
    addressLineTwo: "",
    landmark: "",
    city: "",
    state: "",
    zipcode: "",
    phone: personalInfo.phone,
    contactPerson: personalInfo.fullName,
    isDefault: false,
  };

  const getCurrentLocation = async (e, setFieldValue) => {
    e.preventDefault();
    dispatch({
      type: "UPDATE_PAGE_LOADER",
      payload: true,
    });
    setSearching(true);
    let apiStr = `https://maps.googleapis.com/maps/api/geocode/json?`;
    navigator?.geolocation.getCurrentPosition(async (position) => {
      apiStr += `latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyBFA-ryKStAdbM_je5gvPUqMiuG7EKuIAI`;
      axios
        .get(apiStr)
        .then((res: any) => {
          if (res.status == 200) {
            console.log("current location");
            console.log(res?.data?.results[0]);
            console.log(res?.data?.results[0].address_components);
            res?.data?.results[0].address_components.map((value, index) => {
              if (
                value?.types?.includes("sublocality") ||
                value?.types?.includes("sublocality_level_2") ||
                value?.types?.includes("premise")
              ) {
                initialValues.addressLineOne += value?.long_name + " ";
                setFieldValue("addressLineOne", initialValues.addressLineOne);
              }

              if (value?.types?.includes("administrative_area_level_1")) {
                setFieldValue(
                  "state",
                  stateList.filter((item) => item.label == value?.long_name)[0]
                );
              }

              if (value?.types.includes("sublocality_level_1")) {
                initialValues.addressLineTwo += value?.long_name + " ";
                setFieldValue("addressLineTwo", initialValues.addressLineTwo);
              }
              if (value?.types[0] == "locality") {
                setCurrentCity(value?.short_name);
                setFieldValue(
                  "city",
                  cityList.filter((item) => item.label == value?.short_name)[0]
                );
                console.log(initialValues);
              }
              if (value?.types[0] == "postal_code") {
                setError("");
                setCurrentPostalCode(value?.short_name);
                setFieldValue(
                  "zipcode",
                  zipcodeList.filter(
                    (item) => item.label == value?.short_name
                  )[0]
                );
              }
            });
            console.log("current location");
          }
          dispatch({
            type: "UPDATE_PAGE_LOADER",
            payload: false,
          });
        })
        .catch((e) => {
          dispatch({
            type: "UPDATE_PAGE_LOADER",
            payload: false,
          });
          console.log(e.getMessage());
        })
        .finally(() => {
          setSearching(false);
          dispatch({
            type: "UPDATE_PAGE_LOADER",
            payload: false,
          });
        });
    });
  };

  const setCityFieldValue = (cityList, setFieldValue) => {
    setFieldValue("city", cityList);
  };

  const setStateFieldValue = (stateList, setFieldValue) => {
    setFieldValue("state", stateList);
  };

  const NoOptionsMessage = (props) => {
    return (
      <components.NoOptionsMessage {...props}>
        <span className="custom-css-class">Unservicable</span>
      </components.NoOptionsMessage>
    );
  };

  const BillingAddressSchema = yup.object().shape({
    addressLineOne: yup.string().required("required"),
    addressLineTwo: yup.string().required("required"),
    landmark: yup.string().required("required"),
    // city: yup.number().required("required"),
    // state: yup.number().required("required"),
    // zipcode: yup.number().required("required"),
    phone: yup.string().required("required"),
    contactPerson: yup.string().required("required"),
  });

  const handleFormSubmit = async (values: any) => {
    dispatch({
      type: "UPDATE_BUTTON_STATE",
      payload: {
        name: "ADD_BILLING_ADDRESS",
        state: true,
      },
    });
    values.isDefault = false;
    values.zipcode = values.zipcode.value;
    values.state = values.state.value;
    values.city = values.city.value;

    const response = await api2
      .saveBillingAddress(session, values)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: "UPDATE_BUTTON_STATE",
            payload: {
              name: "",
              state: false,
            },
          });
          debugger;
          handleSetBillingAddress(true);
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
      })
      .finally(() => {
        dispatch({
          type: "UPDATE_BUTTON_STATE",
          payload: {
            name: "",
            state: false,
          },
        });
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={BillingAddressSchema}
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
        <form
          onSubmit={(e) => {
            e.preventDefault(), handleSubmit();
          }}
        >
          <Card1 borderRadius={"1rem 1rem 0 0"}>
            {isSearching && <Loading />}
            <FlexBox justifyContent={"center"} alignItems="center" mb="1rem">
              <Icon
                variant="small"
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  handleSetBillingAddress(true);
                }}
                style={{ cursor: "pointer" }}
              >
                arrow-left
              </Icon>
              <FlexBox
                width={"100%"}
                justifyContent={"center"}
                alignItems="center"
                display={"flex"}
              >
                <Typography
                  fontWeight="500"
                  fontSize="1rem"
                  className={roboto.className}
                  textAlign={"center"}
                >
                  Billing Address
                </Typography>
              </FlexBox>
            </FlexBox>

            <Box mb="1rem">
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography
                  color="#636363"
                  className={roboto.className}
                  fontSize={"0.9rem"}
                  fontWeight={600}
                >
                  Flat, House no., Building, Company
                </Typography>
                <Button
                  color="primary"
                  padding={"0rem"}
                  size="small"
                  onClick={(e) => getCurrentLocation(e, setFieldValue)}
                >
                  <Image src="/assets/images/illustrations/locate.png" />
                  Locate
                </Button>
              </Box>

              <TextField
                placeholder="Address Line 1"
                name="addressLineOne"
                /* label="First Name" */
                fullwidth
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.addressLineOne || ""}
                errorText={touched.addressLineOne && errors.addressLineOne}
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
                Area, Street, Sector
              </Typography>
              <TextField
                placeholder="Address Line 2"
                name="addressLineTwo"
                /* label="First Name" */
                fullwidth
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.addressLineTwo || ""}
                errorText={touched.addressLineTwo && errors.addressLineTwo}
              />
            </Box>
            <FlexBox width={"100%"} justifyContent={"space-between"}>
              <Box width="50%" mb="1rem">
                <Typography
                  color="#636363"
                  mb="0.9rem"
                  className={roboto.className}
                  fontSize={"0.9rem"}
                  fontWeight={600}
                >
                  Landmark
                </Typography>
                <TextField
                  placeholder="E.g. Near Fortis"
                  name="landmark"
                  /* label="First Name" */
                  fullwidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.landmark || ""}
                  errorText={touched.landmark && errors.landmark}
                />
              </Box>

              <Box ml="2rem" width="50%" mb="1rem">
                <Typography
                  color="#636363"
                  mb="0.9rem"
                  className={roboto.className}
                  fontSize={"0.9rem"}
                  fontWeight={600}
                >
                  Zipcode
                </Typography>
                <Select
                  mb="1rem"
                  options={zipcodeList}
                  components={{ NoOptionsMessage }}
                  value={values.zipcode}
                  placeholder={`E.g. 569938`}
                  /* errorText={touched.zipcode && errors.zipcode} */
                  onChange={(zipcodeList) =>
                    setFieldValue("zipcode", zipcodeList)
                  }
                />
              </Box>
            </FlexBox>

            <FlexBox width={"100%"} justifyContent={"space-between"}>
              <Box width="50%" mb="1rem">
                <Typography
                  color="#636363"
                  mb="0.9rem"
                  className={roboto.className}
                  fontSize={"0.9rem"}
                  fontWeight={600}
                >
                  Contact Person
                </Typography>
                <TextField
                  placeholder="Receiver Full Name"
                  fullwidth
                  value={values.contactPerson || personalInfo.fullName || ""}
                  name="contactPerson"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  errorText={touched.contactPerson && errors.contactPerson}
                />
              </Box>

              <Box ml="2rem" width="50%" mb="1rem">
                <Typography
                  color="#636363"
                  mb="0.9rem"
                  className={roboto.className}
                  fontSize={"0.9rem"}
                  fontWeight={600}
                >
                  Phone
                </Typography>
                <TextField
                  name="phone"
                  placeholder="Receiver Phone"
                  fullwidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone !== undefined ? values.phone : personalInfo.phone || ""}
                />
              </Box>
            </FlexBox>

            <FlexBox width={"100%"} justifyContent={"space-between"}>
              <Box mb="1rem" width="50%">
                <Typography
                  color="#636363"
                  mb="0.9rem"
                  className={roboto.className}
                  fontSize={"0.9rem"}
                  fontWeight={600}
                >
                  City
                </Typography>
                <Select
                  mb="1rem"
                  options={cityList}
                  value={values.city}
                  /*  errorText={touched.city && errors.city} */
                  onChange={(cityList) =>
                    setCityFieldValue(cityList, setFieldValue)
                  }
                />
              </Box>

              <Box ml="2rem" width="50%" mb="1rem">
                <Typography
                  color="#636363"
                  mb="0.9rem"
                  className={roboto.className}
                  fontSize={"0.9rem"}
                  fontWeight={600}
                >
                  State
                </Typography>
                <Select
                  mb="1rem"
                  options={stateList}
                  value={values.state}
                  /* errorText={touched.state && errors.state} */
                  onChange={(stateList) =>
                    setStateFieldValue(stateList, setFieldValue)
                  }
                />
              </Box>
            </FlexBox>

            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"baseline"}
              style={{ columnGap: "20px" }}
              py={2}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  handleSetBillingAddress(true);
                }}
                size={"xxsmall"}
                disabled={
                  state.buttonState?.name == "ADD_BILLING_ADDRESS" &&
                  state.buttonState?.state
                }
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size={"xxsmall"}
                onClick={handleSubmit}
                disabled={
                  state.buttonState?.name == "ADD_BILLING_ADDRESS" &&
                  state.buttonState?.state
                }
              >
                {state.buttonState?.name == "ADD_BILLING_ADDRESS" &&
                state.buttonState?.state ? (
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"center"}
                  >
                    <CircularProgress color="inherit" size={15} />
                    &nbsp;
                    <Typography className={overpass.className}>
                      Adding...
                    </Typography>
                  </Box>
                ) : (
                  <>Add Address</>
                )}
              </Button>
            </Box>
          </Card1>
        </form>
      )}
    </Formik>
  );
};

export default BillingAddress;
