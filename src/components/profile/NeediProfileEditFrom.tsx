"use client";
import { FC, ReactNode, useImperativeHandle, useRef } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import Box from "@component/Box";
import Hidden from "@component/hidden";
import Avatar from "@component/avatar";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button, IconButton } from "@component/buttons";
import Grid from "@component/grid/Grid";
import TextField from "@component/text-field";
import User from "@models/user.model";
import { format } from "date-fns";
import DropDownButton from "./DropDownButton";
import { useState, forwardRef } from "react";
import styled from "styled-components";
import EditDropDown from "./EditDropDown";
import InputAdornment from "@mui/material/InputAdornment";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import api2 from "@utils/__api__/market-1";
import businessTypeList from "@data/businessTypeList";
/* import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle"; */
import TransitionAlerts from "@component/alert/Alert";
import Toast from "@component/toast";
import { useAppContext } from "@context/AppContext";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@component/Typography";
import { roboto } from "@utils/fonts";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { layoutConstant } from "@utils/constants";

const AboveWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: ${layoutConstant.mobileNavHeight}; // Adjust this value as needed
  width: 100%;
  // background: #f5f5f5; // Change this as needed
  z-index: 1000; // Make sure this is less than the z-index of Wrapper
  // Add other styles as needed
`;

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
  padding: "0.3rem",
  ":hover": {
    backgroundColor: "#00e600",
    color: "whitesmoke",
  },
});
const CancelBtn = styled(IconButton)({
  border: "1px solid #C2ABED",
  color: "#672DD1",
  padding: "0.3rem",
  ":hover": {
    backgroundColor: "#ff3838",
    color: "whitesmoke",
  },
});

type Props = any;

const MobileCheck = ({ isMobile, children }) => {
  if (isMobile) {
    return <AboveWrapper>{children}</AboveWrapper>;
  }
  return children;
};

const NeediProfileEditFrom: FC<Props> = forwardRef(
  ({ sessionData, profileData, showInputBox }) => {
    // const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 426px)");
    const theme = useTheme();
    const { state, dispatch } = useAppContext();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [selectedOption, setSelectedOption] = useState(profileData?.businessType);
    const [isVerify, setIsverified] = useState(false);
    const [defaultGst, setDefaultGst] = useState<any>([]);
    const [isAddingNewGst, setIsAddingNewGst] = useState(false);
    const [gstError, setGstError] = useState("");
    /* 
    useEffect(() => {
      console.log(profileData);
      if (profileData && profileData?.gst?.length > 0) {
        setDefaultGst(
          profileData?.gst.filter((item) => item.isDefault == true)
        );
      }
    }, [profileData]); */

    const INITIAL_VALUES = {
      fullName: profileData?.fullName,
      Designation: profileData?.position,
      gstIn:
        profileData?.gst &&
        profileData?.gst?.filter((item) => item.isDefault == true)[0]?.value,
      businessName:
        profileData?.gst?.length > 0 &&
        profileData?.gst[0]?.value &&
        JSON.parse(profileData?.gst[0].data).data.tradeNam,
        businessType: selectedOption,
    };

    const verifyGst = async (values) => {
      setGstError("");
      dispatch({
        type: "UPDATE_PAGE_LOADER",
        payload: true,
      });
      const payload = {
        newGst: values.gstIn,
        isDefault: true,
      };
      const response = await api2
        .saveCustomerGst(sessionData, payload)
        .then((res) => {
          console.log(res);
          if (res.success) {
            toast.success("New Gst Verified and Added.", { theme: "light" });
            setIsAddingNewGst(false);
            console.log(JSON.parse(res.data.data).data.lgnm);
            values.businessName = JSON.parse(res.data.data).data.lgnm;
            values.gstIn = JSON.parse(res.data.data).data.gstIn;
          } else {
            toast.error(res.message, { theme: "light" });
          }
        })
        .catch((e) => {
          toast.error(e.response.data.message, { theme: "light" });
          setGstError(e.response.data.message);
        })
        .finally(() => {
          dispatch({
            type: "UPDATE_PAGE_LOADER",
            payload: false,
          });
        });
    };

    const onCancelAddingNewGst = (values) => {
      /* values.gstIn = profileData?.gst?.filter(
      (item) => item.isDefault == true
    )[0].value; */
      setIsAddingNewGst(false);
      setGstError("");
    };

    const VALIDATION_SCHEMA = yup.object().shape({
      fullName: yup.string().required("required"),
      Designation: yup.string().required("required"),
      //gstIn: yup.string().required("required"),
      //businessName: yup.string().required("required"),
      businessType: yup.string().required("required"),
    });

    const handleFormSubmit = async (values) => {
      const payload = {
        fullName: values.fullName,
        businessType: values.businessType.value,
        designation: values.Designation,
      };
      dispatch({
        type: "UPDATE_BUTTON_STATE",
        payload: {
          name: "UPDATE_CUSTOMER_INFO",
          state: true,
        },
      });
      if (values.fullName && values.businessType && values.Designation) {
        const response = await api2
          .updateCustomerProfile(sessionData, payload)
          .then((res) => {
            dispatch({
              type: "UPDATE_BUTTON_STATE",
              payload: {
                name: "UPDATE_CUSTOMER_INFO",
                state: false,
              },
            });
            if (res.success) {
              toast.success("Profile Data Updated!", { theme: "light" });
              showInputBox();
            }
          })
          .catch((e) => {
            dispatch({
              type: "UPDATE_BUTTON_STATE",
              payload: {
                name: "UPDATE_CUSTOMER_INFO",
                state: false,
              },
            });
            toast.error("Profile data not able to update at the moment", {
              theme: "light",
            });
          })
          .finally(() => {
            dispatch({
              type: "UPDATE_BUTTON_STATE",
              payload: {
                name: "UPDATE_CUSTOMER_INFO",
                state: false,
              },
            });
          });
      }
    };

    const handleSelectChange = (selectedEmail: any) => {
      setSelectedOption(selectedEmail);
    };
    return (
      <>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={INITIAL_VALUES}
          validationSchema={VALIDATION_SCHEMA}
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
              <FlexBox>
                <FlexBox paddingLeft="2rem" ml={12}>
                  {!isMobile && (
                    <Typography
                      className={roboto.className}
                      fontWeight="500"
                      fontSize={"1.25rem"}
                    >
                      Personal Information
                    </Typography>
                  )}
                </FlexBox>
                <MobileCheck isMobile={isMobile}>
                  <FlexBox
                    py="1rem"
                    justifyContent={"space-around"}
                    width={"100%"}
                    zIndex={99}
                    alignItems={"center"}
                    backgroundColor={"white"}
                  >
                    <FlexBox flexDirection={isMobile ? "row-reverse" : "row"}>
                      <Button
                        variant="outlined"
                        mr={isMobile ? "0rem" : "1rem"}
                        color="primary"
                        height={"35px"}
                        padding={"10px 28px"}
                        onClick={() => handleFormSubmit(values)}
                        disabled={
                          state.buttonState?.name == "UPDATE_CUSTOMER_INFO" &&
                          state.buttonState?.state
                        }
                      >
                        {state.buttonState?.name == "UPDATE_CUSTOMER_INFO" &&
                        state.buttonState?.state ? (
                          <Box
                            display={"flex"}
                            flexDirection={"row"}
                            alignItems={"center"}
                          >
                            <CircularProgress color="inherit" size={15} />
                            &nbsp;
                            <>Saving ...</>
                          </Box>
                        ) : (
                          <>Save</>
                        )}
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        height={"35px"}
                        mr={isMobile ? "1rem" : "0rem"}
                        padding={"10px 28px"}
                        onClick={(e) => {
                          e.preventDefault();
                          showInputBox();
                        }}
                      >
                        Cancel
                      </Button>
                    </FlexBox>
                  </FlexBox>
                </MobileCheck>
              </FlexBox>
              <Box pt={4} px={4}>
                <TransitionAlerts />
                {/* <Toast/> */}
              </Box>

              <Box
                mb="30px"
                paddingLeft={`${isMobile ? "0rem" : "2rem"}`}
                mr={`${isMobile ? "0rem" : "2rem"}`}
                mt={`${isMobile ? "1rem" : "2rem"}`}
              >
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={state.pageLoader}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
                <Grid container horizontal_spacing={6} vertical_spacing={4}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullwidth
                      name="fullName"
                      label="Full name mob same"
                      color="#8D8A8A"
                      onBlur={handleBlur}
                      localh
                      onChange={handleChange}
                      value={values.fullName}
                      errorText={touched.fullName && errors.fullName}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullwidth
                      name="Designation"
                      label="Designation"
                      color="#8D8A8A"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.Designation}
                      errorText={touched.Designation && errors.Designation}
                    />
                  </Grid>

                  <Grid item md={12} xs={12}>
                    <ResponsiveFlexBox mt={`${isMobile ? "0px" : "2rem"}`}>
                      <EditDropDown
                        onChange={(value) => {
                          setSelectedOption(value);
                          values.businessType = value; // Updates businessType here
                        }}
                        value={selectedOption}
                        label="Business Type"
                        options={businessTypeList}
                      />
                      <FlexBox
                        width="50%"
                        className="flexbox2"
                        ml={`${isMobile ? 0 : "0.5rem"}`}
                        mt={`${isMobile ? "1rem" : "0rem"}`}
                      >
                        <TextField
                          fullwidth
                          name="gstIn"
                          label="GST Number"
                          color="#8D8A8A"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.gstIn}
                          disabled={!isAddingNewGst}
                          errorText={
                            gstError ? gstError : touched.gstIn && errors.gstIn
                          }
                          endAdornment={
                            <span>
                              {isAddingNewGst ? (
                                <InputAdornment
                                  position="end"
                                  sx={{
                                    ".MuiTypography-root": {
                                      color: "#08B94F",
                                      marginRight: "1rem",
                                      fontWeight: 600,
                                      cursor: "pointer",
                                    },
                                  }}
                                  onClick={() => setIsverified(!isVerify)}
                                >
                                  <Button
                                    padding={"0px"}
                                    marginLeft={"7px"}
                                    className="btn1"
                                  >
                                    <CorrectBtn
                                      variant="outlined"
                                      className="btn2"
                                      onClick={() => verifyGst(values)}
                                    >
                                      <Icon variant="customxsmall">
                                        correct
                                      </Icon>
                                    </CorrectBtn>
                                  </Button>
                                  <Button padding={"0px"} marginLeft={"7px"}>
                                    <CancelBtn
                                      variant="outlined"
                                      onClick={() =>
                                        onCancelAddingNewGst(values)
                                      }
                                    >
                                      <Icon variant="customxsmall">cross</Icon>
                                    </CancelBtn>
                                  </Button>
                                </InputAdornment>
                              ) : (
                                <InputAdornment
                                  position="end"
                                  sx={{
                                    ".MuiTypography-root": {
                                      color: "#2564DE",
                                      marginRight: "1rem",
                                      fontWeight: 600,
                                      cursor: "pointer",
                                    },
                                  }}
                                  style={{ cursor: "pointer" }}
                                  onClick={() => setIsAddingNewGst(true)}
                                >
                                  Add New
                                </InputAdornment>
                              )}
                            </span>
                          }
                        />
                      </FlexBox>
                    </ResponsiveFlexBox>
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullwidth
                      disabled
                      label="Business Name"
                      name="businessName"
                      color="#8D8A8A"
                      onBlur={handleBlur}
                      value={values.businessName}
                      onChange={handleChange}
                      errorText={touched.businessName && errors.businessName}
                      mt={`${isMobile ? 0 : "2rem"}`}
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* <Button type="submit" variant="contained" color="primary" ml={31}>
              Save Changes
            </Button> */}
            </form>
          )}
        </Formik>
      </>
    );
  }
);

export default NeediProfileEditFrom;
