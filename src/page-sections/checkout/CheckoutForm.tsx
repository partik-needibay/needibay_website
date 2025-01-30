"use client";
import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { Formik } from "formik";
import Box from "@component/Box";
import Select from "@component/Select";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import CheckBox from "@component/CheckBox";
import { Card7 } from "@component/Card7";
import countryList from "@data/countryList";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Typography from "@component/Typography";
import FlexBox from "@component/FlexBox";
import OrderStatus from "@component/orders/OrderStatus";
import FormStatus from "./FormStatus";
import styled from "styled-components";
import { theme } from "@utils/theme";
import { layoutConstant } from "@utils/constants";
import Card from "@component/Card";

import { overpass, roboto } from "@utils/fonts";
import Divider from "@component/Divider";
// ---------------------- import for api integration---------------------------
import { useAppContext } from "@context/AppContext";
import PersonalInfo from "./PersonalInfo";
import CustomerGst from "@sections/checkout/CustomerGst";
import api2 from "@utils/__api__/market-1";
import { useSession } from "next-auth/react";
import ShippingAddress from "@sections/checkout/ShippingAddress";
import SavedShippingAddress from "@sections/checkout/SavedShippingAddress";
import BillingAddress from "@sections/checkout/BillingAddress";
import SavedBillingAddress from "@sections/checkout/SavedBillingAddress";
// ----------------------------------Last step----------------------------------------
import { currency } from "@utils/utils";
import ApplyCoupon from "./ApplyCoupon";
import { CircularProgress } from "@mui/material";

const DashDivider = styled(Box)`
  height: 2px;
  width: 100%;
  border: 1px dashed #ababab;
`;
const StyledButton = styled(Button)`
  border-radius: 0.625rem;
  background: #fff;
  box-shadow: 0px 0px 12px 0px rgba(103, 45, 209, 0.7);
`;
const Card2 = styled(Card)`
  position: relative;
  padding: 1rem 1.75rem;
  @media only screen and (max-width: 678px) {
    padding: 1rem;
  }
`;
const ButtonWrapper = styled.div`
  padding: 10px 10px;
  left: 0;
  right: 0;
  position: fixed;
  bottom: ${layoutConstant.mobileNavHeight}; // Adjust this value as needed
  width: 100%;
  background: white; // Change this as needed
  z-index: 1000; // Make sure this is less than the z-index of Wrapper
  // Add other styles as needed
`;

const CheckoutForm: FC = () => {
  useEffect(() => {
    // Adjust this value as needed
    document.body.style.paddingBottom = "7rem"; // Assuming the height of CheckoutWrapper is 60px
  }, []);
  const router = useRouter();

  const [address, setAddress] = useState(false);

  //for mobile checkout
  const { state, dispatch } = useAppContext();
  const [customerGst, setCustomerGst] = useState([]);
  const { data: session } = useSession();
  const [shippingAddress, setShippingAddress] = useState(true);
  const [billingAddress, setBillingAddress] = useState(true);
  const [errors, setErrors] = useState<any>({});
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [customerAddress, setCustomerAddress] = useState({
    shippingAddress: [],
    billingAddress: [],
  });
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(0);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(0);
  useEffect(() => {
    getAddress();
    getCustomerGst();
    dispatch({
      type: "UPDATE_CART_ID",
      payload: state.cart[0],
    });
  }, [state.cart]);

  const getCustomerGst = async () => {
    const customerGstInfo: any = await api2.getCustomerGst(session);
    customerGstInfo.unshift({ value: "ADD_NEW", label: "ADD NEW GST Info" });
    customerGstInfo.push({ value: "NO_GST", label: "Continue without GST" });
    setCustomerGst(customerGstInfo);
  };
  // const getFilledValue = (value) => {
  //   // console.log("value from customergst", value);
  //   setisGstFilled(value);
  // };
  const getAddress = async () => {
    const shippingAddresses = await api2.getShippingAddress(session);

    setCustomerAddress((prevState) => {
      return { ...prevState, shippingAddress: shippingAddresses };
    });
    const billingAddresses = await api2.getBillingAddress(session);

    setCustomerAddress((prevState) => {
      return { ...prevState, billingAddress: billingAddresses };
    });
  };
  const handleSelectShippingAddress = async (id: number) => {
    await dispatch({
      type: "UPDATE_SHIPPING_ADDRESS",
      payload: id,
    });
    setSelectedShippingAddress(id);
  };
  const handleNewShippingAddress = (trigger) => {
    setShippingAddress(trigger);
  };
  const handleSelectBillingAddress = async (id: number) => {
    await dispatch({
      type: "UPDATE_BILLING_ADDRESS",
      payload: id,
    });
    setSelectedBillingAddress(id);
  };
  const handleNewBillingAddress = (trigger) => {
    setBillingAddress(trigger);
  };

  const handleOrderPlacement = async () => {
    debugger;
    if (!state.order?.shippingAddress) {
      setErrors((prev) => ({
        ...prev,
        orderShippingAddress: "No Shipping Address Seleted For the order!",
      }));
      return false;
    }
    if (!state.order?.billingAddress) {
      setErrors((prev) => ({
        ...prev,
        orderBillingAddress: "No Billing Address Seleted For the order!",
      }));
    }
    if (!state.order?.cartId) {
      setErrors((prev) => ({
        ...prev,
        orderCartId: "No Cart found for the Usser",
      }));
      return false;
    }

    if (state.order?.customerFullName == "") {
      setErrors((prev) => ({
        ...prev,
        orderCustomerFullName: "No Customer Name Found!",
      }));
      return false;
    }

    if (state.order?.customerEmail == "") {
      setErrors((prev) => ({
        ...prev,
        orderCustomerEmail: "No Customer Email Found!",
      }));
      return false;
    }

    if (state.order?.customerPhone == "") {
      setErrors((prev) => ({
        ...prev,
        orderCustomerPhone: "No Customer Phone Found!",
      }));
      return false;
    }

    if (isTermsAccepted) {
      dispatch({
        type: "UPDATE_BUTTON_STATE",
        payload: { name: "ORDER_PLACEMENT", state: true },
      });

      setErrors({});
      await api2
        .placeOrder(state.order)
        .then((res) => {
          dispatch({
            type: "UPDATE_BUTTON_STATE",
            payload: { name: "ORDER_PLACEMENT", state: false },
          });
          if (res.success) {
            router.push(`/order-success?orderId=${res.data.orderId}`);
          }
        })
        .catch((e) => {
          dispatch({
            type: "UPDATE_BUTTON_STATE",
            payload: { name: "ORDER_PLACEMENT", state: false },
          });
          console.log(e);
        });
    } else {
      setErrors((prev) => ({
        ...prev,
        terms: "Please accept the Terms to proceed",
      }));
    }
  };

  // --------------------------end------------------------------------
  const handleAddress = () => {
    setAddress(true);
  };

  const handlePrev = () => {
    setAddress(false);
  };

  const [status, setStatus] = useState("info");
  const [statusIndex, setStatusIndex] = useState(0);

  const formStatusList = ["info", "shipping", "summary"];

  const handleNextStatus = () => {
    const statusIndex = formStatusList.indexOf(status);
    const nextStatus = formStatusList[statusIndex + 1];
    setStatus(nextStatus);
    setStatusIndex(statusIndex + 1);
  };

  const [sameAsShipping, setSameAsShipping] = useState(false);

  const handleFormSubmit = async (values: any) => {
    console.log(values);
    // router.push("/payment");
  };

  const handleClick = () => {
    router.push("/");
  };

  const handleCheckboxChange =
    (values: typeof initialValues, setFieldValue: any) =>
    ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
      setSameAsShipping(checked);
      setFieldValue("same_as_shipping", checked);
      setFieldValue("billing_name", checked ? values.shipping_name : "");
    };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={checkoutSchema}
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
        isSubmitting,
        isValid,
      }) => (
        <form onSubmit={handleSubmit}>
          <Card1 mb="2rem">
            <FormStatus
              status={status}
              setStatus={setStatus}
              statusIndex={statusIndex}
              setStatusIndex={setStatusIndex}
            />

            {status === "info" && (
              <>
                {
                  <>
                    <PersonalInfo />
                    <CustomerGst
                      gstInfo={customerGst}
                      // getFilledValue={getFilledValue}
                    />
                  </>
                }
                <ButtonWrapper>
                  <Button
                    variant="contained"
                    onClick={handleNextStatus}
                    color="primary"
                    type="submit"
                    fullwidth
                  >
                    Continue
                  </Button>
                </ButtonWrapper>
              </>
            )}

            {status == "shipping" && (
              <>
                {shippingAddress ? (
                  <Box
                    backgroundColor="white"
                    padding="1rem 1rem 1.5rem 1rem"
                    borderRadius={"1rem 1rem 0 0"}
                  >
                    <FlexBox
                      justifyContent={"center"}
                      alignItems="center"
                      mb="1rem"
                    >
                      <Typography
                        fontWeight="500"
                        fontSize="1rem"
                        className={roboto.className}
                        mr="10px"
                      >
                        Shipping Address
                      </Typography>
                    </FlexBox>
                    {customerAddress.shippingAddress &&
                    customerAddress.shippingAddress.length > 0 ? (
                      customerAddress.shippingAddress.map((item: any) => (
                        <Box
                          onClick={() => handleSelectShippingAddress(item.id)}
                          cursor="pointer"
                        >
                          <SavedShippingAddress
                            addressInfo={item}
                            selectedShippingAddress={selectedShippingAddress}
                          />
                        </Box>
                      ))
                    ) : (
                      <FlexBox justifyContent={"center"}>
                        <Typography>No Saved Address Found</Typography>
                      </FlexBox>
                    )}

                    <FlexBox justifyContent={"center"}>
                      <StyledButton
                        variant="outlined"
                        color="primary"
                        onClick={() => handleNewShippingAddress(false)}
                        borderRadius={"0.5rem"}
                        size="small"
                        mt="1rem"
                      >
                        Add New
                      </StyledButton>
                    </FlexBox>
                  </Box>
                ) : (
                  <ShippingAddress
                    handleSetShippingAddress={(trigger) =>
                      handleNewShippingAddress(trigger)
                    }
                  />
                )}
                {billingAddress ? (
                  <Box
                    backgroundColor="white"
                    padding="1rem 1rem 1.5rem 1rem"
                    borderRadius={"1rem 1rem 0 0"}
                  >
                    <FlexBox
                      justifyContent={"center"}
                      alignItems="center"
                      mb="1rem"
                    >
                      <Typography
                        fontWeight="500"
                        fontSize="1rem"
                        className={roboto.className}
                        mr="10px"
                      >
                        Billing Address
                      </Typography>
                    </FlexBox>

                    {customerAddress.billingAddress &&
                    customerAddress.billingAddress.length > 0 ? (
                      customerAddress.billingAddress.map((item: any) => (
                        <Box
                          onClick={() => handleSelectBillingAddress(item.id)}
                          cursor="pointer"
                        >
                          <SavedBillingAddress
                            addressInfo={item}
                            selectedBillingAddress={selectedBillingAddress}
                          />
                        </Box>
                      ))
                    ) : (
                      <FlexBox justifyContent={"center"}>
                        <Typography>No Saved Address Found</Typography>
                      </FlexBox>
                    )}

                    <FlexBox justifyContent={"center"}>
                      <StyledButton
                        variant="outlined"
                        color="primary"
                        onClick={() => handleNewBillingAddress(false)}
                        borderRadius={"0.5rem"}
                        size="small"
                        mt="1rem"
                      >
                        Add New
                      </StyledButton>
                    </FlexBox>
                  </Box>
                ) : (
                  <BillingAddress
                    handleSetBillingAddress={(trigger) =>
                      handleNewBillingAddress(trigger)
                    }
                  />
                )}
                <ButtonWrapper>
                  <Button
                    variant="contained"
                    onClick={handleNextStatus}
                    color="primary"
                    type="submit"
                    fullwidth
                  >
                    Continue
                  </Button>
                </ButtonWrapper>
              </>
            )}

            {status == "summary" && (
              /*  <>
                <FlexBox justifyContent="center" width="100%">
                  <Typography
                    fontSize={"1.125rem"}
                    fontWeight="500"
                    className={roboto.className}
                    color="#858585"
                    mb="1rem"
                  >
                    Summary
                  </Typography>
                </FlexBox>
                <FlexBox
                  width="100%"
                  border="2px solid #683BBA"
                  borderRadius="0.625rem"
                  padding="0.3rem"
                  marginBottom={"1rem"}
                  flexDirection={"column"}
                  justifyContent={"column"}
                  alignItems={"flex-start"}
                >
                  <FlexBox alignItems="center">
                    
                    <Typography
                      fontSize={"1.06rem"}
                      className={roboto.className}
                      fontWeight={700}
                      color="#4B4B4B"
                    >
                      Gaurav
                    </Typography>
                    <Box
                      backgroundColor="#D9D9D9"
                      ml="0.5rem"
                      px="0.15rem"
                      borderRadius={"0.25rem"}
                    >
                      <Typography
                        fontSize={"0.75rem"}
                        className={roboto.className}
                        fontWeight={700}
                        color="#727272"
                      >
                        Office
                      </Typography>
                    </Box>
                  </FlexBox>

                  <Typography
                    fontWeight={500}
                    fontSize="0.93rem"
                    className={roboto.className}
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      width: "100%", // set a specific width

                      textOverflow: "ellipsis",
                    }}
                    color="#939393"
                  >
                    Cocktail co-working space, HSR Layout, Bengaluru, 473111
                  </Typography>

                  <FlexBox>
                    
                    <Typography
                      fontSize={"0.75rem"}
                      fontWeight={500}
                      className={roboto.className}
                      marginRight={"1rem"}
                    >
                      Phone: 8471632546
                    </Typography>
                  </FlexBox>
                </FlexBox>

                <Card7 backgroundColor={"#F2FFEC"} border="#009733" mb="1rem">
                  <FlexBox justifyContent={"center"} alignItems={"center"}>
                    <Typography
                      color="black"
                      fontWeight={500}
                      fontSize="1rem"
                      className={roboto.className}
                    >
                      Coupons
                    </Typography>
                  </FlexBox>
                  <FlexBox mt="0.5rem" justifyContent="space-evenly">
                    <Box width="65%" mr="0.5rem">
                      <TextField
                        className={overpass.className}
                        placeholder="Enter your coupon code"
                        fullwidth
                      />
                    </Box>
                    <Box width="35%">
                      <Button variant="contained" color="primary" fullwidth>
                        Apply
                      </Button>
                    </Box>
                  </FlexBox>

                  <FlexBox justifyContent={"center"} alignItems={"center"}>
                    <Typography
                      color="black"
                      fontWeight={400}
                      fontSize="0.8rem"
                      marginTop={"1rem"}
                      className={roboto.className}
                    >
                      Try these
                    </Typography>
                  </FlexBox>

                  <FlexBox
                    justifyContent={"space-evenly"}
                    alignItems={"center"}
                    mt="0.5rem"
                    mb="0.5rem"
                  >
                    <Box
                      backgroundColor="#FFF"
                      border="1px dashed #009733"
                      mr="1.5rem"
                      borderRadius="0.625rem"
                    >
                      <Typography
                        className={roboto.className}
                        fontWeight={700}
                        fontSize="0.75rem"
                        padding="0.3rem 1rem"
                        color={"#009733"}
                      >
                        NB25
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        fontSize="0.8rem"
                        fontWeight={500}
                        color={"#009733"}
                        className={roboto.className}
                      >
                        Get flat $50 off on purchase above &1000
                      </Typography>
                    </Box>
                  </FlexBox>

                  <Divider color="#E6E6E6"></Divider>

                  <FlexBox
                    justifyContent={"space-evenly"}
                    alignItems={"center"}
                    mt="0.5rem"
                    mb="0.5rem"
                  >
                    <Box
                      backgroundColor="#FFF"
                      mr="1.5rem"
                      border="1px dashed #009733"
                      borderRadius="0.625rem"
                    >
                      <Typography
                        className={roboto.className}
                        fontWeight={700}
                        fontSize="0.75rem"
                        padding="0.3rem 1rem"
                        color={"#009733"}
                      >
                        NB25
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        fontSize="0.8rem"
                        fontWeight={500}
                        color={"#009733"}
                        className={roboto.className}
                      >
                        Get flat $50 off on purchase above &1000
                      </Typography>
                    </Box>
                  </FlexBox>
                </Card7>

                <Box>
                  <FlexBox
                    mt="1rem"
                    mb="0.5rem"
                    justifyContent={"space-between"}
                  >
                    <Typography
                      fontSize={"1rem"}
                      className={roboto.className}
                      fontWeight={700}
                      color="product_detail.grey3"
                    >
                      Total
                    </Typography>
                    <Typography
                      fontSize={"1.08rem"}
                      fontWeight={700}
                      className={roboto.className}
                      color="product_detail.grey3"
                    >
                      $150
                    </Typography>
                  </FlexBox>

                  <FlexBox
                    mt="1rem"
                    mb="0.5rem"
                    justifyContent={"space-between"}
                  >
                    <Typography
                      fontSize={"0.93rem"}
                      className={roboto.className}
                      fontWeight={700}
                      color="product_detail.grey3"
                    >
                      Shipping
                    </Typography>
                    <Typography
                      fontSize={"1.08rem"}
                      fontWeight={400}
                      className={roboto.className}
                      color="product_detail.grey3"
                    >
                      Free
                    </Typography>
                  </FlexBox>

                  <FlexBox
                    mt="1rem"
                    mb="0.5rem"
                    justifyContent={"space-between"}
                  >
                    <Typography
                      fontSize={"0.93rem"}
                      className={roboto.className}
                      fontWeight={700}
                      color="product_detail.grey3"
                    >
                      Offers
                    </Typography>
                    <Typography
                      fontSize={"1.08rem"}
                      fontWeight={400}
                      className={roboto.className}
                      color="product_detail.grey3"
                    >
                      $4
                    </Typography>
                  </FlexBox>

                  <FlexBox mt="1rem" mb="0.5rem" justifyContent="center">
                    <DashDivider />
                  </FlexBox>

                  <FlexBox
                    mt="1rem"
                    mb="0.5rem"
                    justifyContent={"space-between"}
                  >
                    <Typography
                      fontSize={"1rem"}
                      className={roboto.className}
                      fontWeight={700}
                      color="product_detail.grey3"
                    >
                      Grand Total
                    </Typography>
                    <Typography
                      fontSize={"1rem"}
                      fontWeight={400}
                      className={roboto.className}
                      color="product_detail.green"
                    >
                      $146
                    </Typography>
                  </FlexBox>
                  <FlexBox mt="1rem" mb="0.5rem" justifyContent="center">
                    <DashDivider />
                  </FlexBox>

                  <FlexBox
                    backgroundColor="product_detail.cancelation"
                    padding="0.5rem"
                    borderRadius={"0.5rem"}
                    flexDirection={"column"}
                    alignItems={"flex-start"}
                  >
                  <Typography
                  <Typography
                    fontWeight={500}
                    fontSize='0.93rem'
                    <Typography
                    fontWeight={500}
                    fontSize='0.93rem'
                      className={roboto.className}
                      color="#000 "
                      fontWeight={600}
                      fontSize={"0.8125rem"}
                    >
                      Cancellation Policy
                    </Typography>
                    <Typography
                      mt="1rem"
                      className={roboto.className}
                      color="#000 "
                      fontWeight={400}
                      fontSize={"0.6875rem"}
                    >
                      Orders canâ€™t be cancelled once packed for delivery. In
                      case of unexpected delays, a refund will be provided, if
                      applicable.
                    </Typography>

                    <Box>
                      <CheckBox
                        my="0.2rem"
                        color="primary"
                        label={
                          <Typography
                            fontWeight={400}
                            fontSize={"0.6875rem"}
                            className={roboto.className}
                          >
                            By checking this, I agree to the T&C
                          </Typography>
                        }
                      />
                    </Box>
                  </FlexBox>

                  <ButtonWrapper>
                    <Button
                      variant="contained"
                      onClick={handleNextStatus}
                      color="primary"
                      type="submit"
                      fullwidth
                    >
                      Proceed to payment
                    </Button>
                  </ButtonWrapper>
                </Box>
              </> */
              <>
                <ApplyCoupon />
                <Card1 borderRadius={"1rem 1rem 0 0"}>
                  <FlexBox
                    justifyContent={"center"}
                    alignItems="center"
                    mb="1rem"
                  >
                    <Typography
                      fontWeight="500"
                      fontSize="1rem"
                      className={roboto.className}
                      mr="10px"
                    >
                      Summary
                    </Typography>
                  </FlexBox>
                  <FlexBox justifyContent={"space-between"}>
                    <Typography
                      fontSize={"1rem"}
                      className={roboto.className}
                      fontWeight={700}
                      color="product_detail.grey3"
                    >
                      Sub Total
                    </Typography>
                    <Typography
                      fontSize={"1rem"}
                      fontWeight={400}
                      className={roboto.className}
                      color="product_detail.green"
                    >
                      {currency(state.cartInfo?.subtotal)}
                    </Typography>
                  </FlexBox>
                  {state.cartInfo?.isCouponApplied && (
                    <>
                      <FlexBox justifyContent={"space-between"}>
                        <Box>
                          <Typography
                            className={roboto.className}
                            fontSize={"1rem"}
                            fontWeight={400}
                          >
                            Discount
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            className={roboto.className}
                            fontSize={"1rem"}
                            fontWeight={400}
                          >
                            {currency(state.cartInfo.couponDiscountAmount)}
                          </Typography>
                        </Box>
                      </FlexBox>
                      <FlexBox justifyContent={"space-between"}>
                        <Box>
                          <Typography
                            className={roboto.className}
                            fontSize={"1rem"}
                            fontWeight={400}
                          >
                            SubTotal
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            className={roboto.className}
                            fontSize={"1rem"}
                            fontWeight={400}
                          >
                            {currency(state.cartInfo.subtotalWithDiscount)}
                          </Typography>
                        </Box>
                      </FlexBox>
                    </>
                  )}
                  <FlexBox justifyContent={"space-between"}>
                    <Typography
                      fontSize={"1rem"}
                      className={roboto.className}
                      fontWeight={700}
                      color="product_detail.grey3"
                    >
                      GST
                    </Typography>
                    <Typography
                      fontSize={"1rem"}
                      fontWeight={400}
                      className={roboto.className}
                      color="product_detail.green"
                    >
                      {currency(
                        state.cartInfo?.isCouponApplied
                          ? state.cartInfo.discountedTaxAmount
                          : state.cartInfo.taxAmount
                      )}
                    </Typography>
                  </FlexBox>

                  {/* <FlexBox mt="1rem" mb="0.5rem" justifyContent={"space-between"}>
                <Typography
                  fontSize={"0.93rem"}
                  className={roboto.className}
                  fontWeight={700}
                  color="product_detail.grey3"
                >
                  Shipping
                </Typography>
                <Typography
                  fontSize={"1.08rem"}
                  fontWeight={400}
                  className={roboto.className}
                  color="product_detail.grey3"
                >
                  Free
                </Typography>
              </FlexBox> */}
                  {/* 
                todo conditional component for shipping and logistic pricing
              */}
                  {/* <FlexBox mt="1rem" mb="0.5rem" justifyContent={"space-between"}>
                <Typography
                  fontSize={"0.93rem"}
                  className={roboto.className}
                  fontWeight={700}
                  color="product_detail.grey3"
                >
                  Offers
                </Typography>
                <Typography
                  fontSize={"1.08rem"}
                  fontWeight={400}
                  className={roboto.className}
                  color="product_detail.grey3"
                >
                  $4
                </Typography>
              </FlexBox> */}

                  <FlexBox mt="1rem" mb="0.5rem" justifyContent="center">
                    <DashDivider />
                  </FlexBox>
                  <FlexBox
                    mt="1rem"
                    mb="0.5rem"
                    justifyContent={"space-between"}
                  >
                    <Typography
                      fontSize={"1rem"}
                      className={roboto.className}
                      fontWeight={700}
                      color="product_detail.grey3"
                    >
                      Grand Total
                    </Typography>
                    <Typography
                      fontSize={"1rem"}
                      fontWeight={400}
                      className={roboto.className}
                      color="product_detail.green"
                    >
                      {currency(
                        state.cartInfo?.isCouponApplied
                          ? state.cartInfo.discountedGrandTotal
                          : state.cartInfo.grandTotal
                      )}
                    </Typography>
                  </FlexBox>
                  <FlexBox mt="1rem" mb="0.5rem" justifyContent="center">
                    <DashDivider />
                  </FlexBox>

                  <FlexBox
                    backgroundColor="product_detail.cancelation"
                    padding="0.5rem"
                    borderRadius={"0.5rem"}
                    flexDirection={"column"}
                    alignItems={"flex-start"}
                  >
                    <Typography
                      className={roboto.className}
                      color="#000 "
                      fontWeight={600}
                      fontSize={"0.8125rem"}
                    >
                      Cancellation Policy
                    </Typography>
                    <Typography color={theme.colors.error.main}>
                      {errors?.terms}
                    </Typography>

                    <Typography
                      mt="1rem"
                      className={roboto.className}
                      color="#000 "
                      fontWeight={400}
                      fontSize={"0.6875rem"}
                    >
                      Orders canâ€™t be cancelled once packed for delivery. In
                      case of unexpected delays, a refund will be provided, if
                      applicable.
                    </Typography>

                    <Box>
                      <CheckBox
                        onChange={(e) => setIsTermsAccepted(!isTermsAccepted)}
                        my="0.2rem"
                        color="primary"
                        label={
                          <Typography
                            fontWeight={400}
                            fontSize={"0.6875rem"}
                            className={roboto.className}
                          >
                            By checking this, I agree to the T&C
                          </Typography>
                        }
                      />
                    </Box>
                  </FlexBox>
                  <Typography color={theme.colors.error.main}>
                    {errors?.orderShippingAddress}
                  </Typography>
                  <Typography color={theme.colors.error.main}>
                    {errors?.orderBillingAddress}
                  </Typography>

                  <Typography color={theme.colors.error.main}>
                    {errors?.orderBillingAddress}
                  </Typography>

                  <Typography color={theme.colors.error.main}>
                    {errors?.cartId}
                  </Typography>

                  <Typography color={theme.colors.error.main}>
                    {errors?.orderCustomerFullName}
                  </Typography>

                  <Typography color={theme.colors.error.main}>
                    {errors?.orderCustomerEmail}
                  </Typography>

                  <Typography color={theme.colors.error.main}>
                    {errors?.orderCustomerPhone}
                  </Typography>
                  <ButtonWrapper>
                    <Button
                      variant="contained"
                      color="primary"
                      mt="1rem"
                      onClick={handleOrderPlacement}
                      fullwidth
                      disabled={
                        state.buttonState?.name == "ORDER_PLACEMENT" &&
                        state.buttonState?.state
                      }
                    >
                      {state.buttonState?.name == "ORDER_PLACEMENT" &&
                      state.buttonState?.state ? (
                        <Box
                          display={"flex"}
                          flexDirection={"row"}
                          alignItems={"center"}
                        >
                          <CircularProgress color="inherit" size={15} />
                          &nbsp;
                          <>Placing Order ...</>
                        </Box>
                      ) : (
                        <>Place Order</>
                      )}
                    </Button>
                  </ButtonWrapper>
                </Card1>
              </>
            )}
          </Card1>
        </form>
      )}
    </Formik>
  );
};

const initialValues = {
  shipping_name: "",
  shipping_email: "",
  shipping_contact: "",
  shipping_company: "",
  shipping_zip: "",
  shipping_country: "",
  shipping_address1: "",
  shipping_address2: "",

  billing_name: "",
  billing_email: "",
  billing_contact: "",
  billing_company: "",
  billing_zip: "",
  billing_country: "",
  billing_address1: "",
  billing_address2: "",
};

const checkoutSchema = yup.object().shape({
  // shipping_name: yup.string().required("required"),
  // shipping_email: yup.string().email("invalid email").required("required"),
  // shipping_contact: yup.string().required("required"),
  // shipping_zip: yup.string().required("required"),
  // shipping_country: yup.object().required("required"),
  // shipping_address1: yup.string().required("required"),
  // billing_name: yup.string().required("required"),
  // billing_email: yup.string().required("required"),
  // billing_contact: yup.string().required("required"),
  // billing_zip: yup.string().required("required"),
  // billing_country: yup.string().required("required"),
  // billing_address1: yup.string().required("required"),
});

export default CheckoutForm;
