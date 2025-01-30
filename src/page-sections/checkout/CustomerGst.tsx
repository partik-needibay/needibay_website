import { FC, useEffect, useState } from "react";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@context/AppContext";
import { roboto } from "@utils/fonts";
import { Card1 } from "@component/Card1";
import Box from "@component/Box";
import { Button } from "@component/buttons";
import Select from "@component/Select";
import { Formik, useFormik, useFormikContext } from "formik";
import api2 from "@utils/__api__/market-1";
import * as yup from "yup";
import TextField from "@component/text-field";
import { verify } from "crypto";
import Icon from "@component/icon/Icon";
import { getDateSectionConfigFromFormatToken } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
import { overpass } from "@utils/fonts";
import styled from "styled-components";
import { toast } from "react-toastify";

const StyledTextField = styled(TextField)`
  text-transform: uppercase;
  ::placeholder {
    text-transform: capitalize;
  }
`;

interface GstInfo {
  value;
  label;
}

type Props = { gstInfo: GstInfo[]; getFilledValue?: any };

const MobileGstFormSubmit = () => {
  const { submitForm } = useFormikContext();
  useEffect(() => {
    return () => {
      submitForm();
    };
  }, []);
  return <></>;
};

const CustomerGst: FC<Props> = ({ gstInfo, getFilledValue }) => {
  const { state, dispatch } = useAppContext();
  const { data: session } = useSession();
  const [newGst, setNewGst] = useState("");
  const [customerGst, setCustomerGst] = useState([]);
  const [isAddingNewGst, setIsAddingNewGst] = useState(false);
  const [gstError, setGstError] = useState("");
  // hide continue button for mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const initialValues = {
    gstin: "",
    gstinStep: "",
  };

  useEffect(() => {
    getCustomerGst();
  }, [state.cart]);

  const getCustomerGst = async () => {
    let gstArr: any = [];
    const customerGstInfo: any = await api2.getCustomerGst(session);
    if (customerGstInfo) {
      gstArr = customerGstInfo;
    }
    gstArr.unshift({ value: "ADD_NEW", label: "ADD NEW GST Info" });
    gstArr.push({ value: "NO_GST", label: "Continue without GST" });
    setCustomerGst(gstArr);
  };

  const CustomerGstSchema = yup.object().shape({
    gstin: yup.mixed().required("required"),
  });

  const handleFormSubmit = async (values: any) => {
    dispatch({
      type: "UPDATE_ORDER_DETAILS_GSTINFO",
      payload: values.gstin.value,
    });
  };

  const verifyGst = async (values) => {
    setGstError("");
    dispatch({
      type: "UPDATE_BUTTON_STATE",
      payload: { name: "VERIFY_GST_BUTTON", state: true },
    });
    const payload = {
      newGst: newGst,
      isDefault: false,
    };
    const response = await api2
      .saveCustomerGst(session, payload)
      .then((res) => {
        console.log(res);
        if (res.success) {
          toast.success("New Gst Verified and Added.", { theme: "light" });
          setIsAddingNewGst(false);
          values.businessName = JSON.parse(res.data.data).data.lgnm;
          values.gstIn = JSON.parse(res.data.data).data.gstIn;
          getCustomerGst();
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
          type: "UPDATE_BUTTON_STATE",
          payload: { name: "", state: false },
        });
      });
  };

  // const verifyGst = async (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     newGst,
  //   };
  //   const response = await api2.saveCustomerGst(session, payload);
  //   if (response) {
  //     setIsAddingNewGst(false);
  //   }
  // };

  const handleGstChange = async (e) => {
    setNewGst(e.target.value);
  };

  const selectGstHandler = async (data, setFieldValue) => {
    if (data.value == "ADD_NEW") {
      setIsAddingNewGst(true);
    } else {
      setFieldValue("gstin", data);
    }
  };

  return (
    <Card1 borderRadius={`${isMobile ? "0px" : "1rem 1rem 0 0"}`}>
      <Formik
        initialValues={initialValues}
        validationSchema={CustomerGstSchema}
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
            {isMobile && <MobileGstFormSubmit />}
            <FlexBox justifyContent={"center"} alignItems="center" mb="1rem">
              {isAddingNewGst && (
                <Icon
                  variant="small"
                  color="primary"
                  onClick={() => setIsAddingNewGst(false)}
                  style={{ cursor: "pointer" }}
                >
                  arrow-left
                </Icon>
              )}
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
                  GST Information
                </Typography>
              </FlexBox>
            </FlexBox>
            {isAddingNewGst ? (
              <>
                <Box mb="1rem">
                  <Typography
                    color="#636363"
                    mb="0.9rem"
                    className={roboto.className}
                    fontSize={"0.9rem"}
                    fontWeight={400}
                  >
                    GST Number Required to Receive GST Billing
                  </Typography>
                  <StyledTextField
                    placeholder="Valid GST Number"
                    fullwidth
                    value={newGst || ""}
                    name="gstin"
                    onBlur={handleBlur}
                    onChange={(e) => handleGstChange(e)}
                    errorText={touched.contactPerson && errors.contactPerson}
                  />
                </Box>
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
                    onClick={() => setIsAddingNewGst(false)}
                    size={"xxsmall"}
                    disabled={
                      state.buttonState?.name == "VERIFY_GST_BUTTON" &&
                      state.buttonState?.state
                    }
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="outlined"
                    color="primary"
                    size={"xxsmall"}
                    onClick={(e) => verifyGst(e)}
                    disabled={
                      state.buttonState?.name == "VERIFY_GST_BUTTON" &&
                      state.buttonState?.state
                    }
                  >
                    {state.buttonState?.name == "VERIFY_GST_BUTTON" &&
                    state.buttonState?.state ? (
                      <Box
                        display={"flex"}
                        flexDirection={"row"}
                        alignItems={"center"}
                      >
                        <CircularProgress color="inherit" size={15} />
                        &nbsp;
                        <Typography className={overpass.className}>
                          Verifying...
                        </Typography>
                      </Box>
                    ) : (
                      <>Verify GST</>
                    )}
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box mb="1rem">
                  <Typography
                    color="#636363"
                    mb="0.9rem"
                    className={roboto.className}
                    fontSize={"0.9rem"}
                    fontWeight={400}
                  >
                    GST Number Required to Receive GST Billing
                  </Typography>
                  <Select
                    mb="1rem"
                    options={customerGst}
                    value={values.gstin}
                    placeholder={"Search, Select OR Add GST Info"}
                    onBlur={handleBlur}
                    errorText={touched.gstin && errors.gstin}
                    //onChange={(gstInfo) => {gstInfo?.value == "ADD_NEW" ? setFieldValue("gstinStep", gstInfo) :  setFieldValue("gstin", gstInfo)}}
                    onChange={(gstInfo) => {
                      selectGstHandler(gstInfo, setFieldValue);
                    }}
                  ></Select>
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
              </>
            )}
          </form>
        )}
      </Formik>
    </Card1>
  );
};

export default CustomerGst;
