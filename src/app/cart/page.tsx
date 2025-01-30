"use client";
import Link from "next/link";
import { Fragment, useState, useEffect } from "react";
import Box from "@component/Box";
import Select from "@component/Select";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import { useRouter } from "next/navigation";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import TextArea from "@component/textarea";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Typography from "@component/Typography";
import ProductCard77 from "@component/product-cards/ProductCard7(7)";
import { useAppContext } from "@context/AppContext";
import countryList from "@data/countryList";
import zipcodeList from "@data/zipcodeList";
import stateList from "@data/stateList";
import cityList from "@data/cityList";
import { currency } from "@utils/utils";
import OfferCard from "@component/product-cards/OfferCard-1";
import CartCard from "@component/product-cards/CartCard";
import Image from "@component/Image";
import { arimo, inter, overpass, quicksand, roboto } from "@utils/fonts";
import { SearchInput } from "@component/search-box";
import Card from "@component/Card";
import styled from "styled-components";
import Address from "@models/address.model";
import CheckBox from "@component/CheckBox";
import Radio from "@component/radio";
import { theme } from "@utils/theme";
import { isMobile } from "react-device-detect";
import MobileNavigationBar from "@component/mobile-navigation";
import MediaQuery from "react-responsive";
import { layoutConstant } from "@utils/constants";
import { useSession } from "next-auth/react";
import api2 from "@utils/__api__/market-1";
import BillingAddress from "@sections/checkout/BillingAddress";
import ShippingAddress from "@sections/checkout/ShippingAddress";
import SavedShippingAddress from "@sections/checkout/SavedShippingAddress";
import SavedBillingAddress from "@sections/checkout/SavedBillingAddress";
import { Accordion, AccordionHeader } from "@component/accordion";
import { MobileCategoryImageBox } from "@component/mobile-category-nav";
import CustomerGst from "@sections/checkout/CustomerGst";
import PersonalInfo from "@sections/checkout/PersonalInfo";
import ApplyCoupon from "@sections/checkout/ApplyCoupon";
import { CircularProgress } from "@mui/material";

const iterations = [1, 2, 3, 4, 5];

const CheckoutWrapper = styled.div`
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
const StyledBox = styled(Box)`
  @media only screen and (max-width: 678px) {
    display: none;
  }
`;

const StyledCart = styled(FlexBox)`
  @media only screen and (max-width: 678px) {
    display: none;
  }
`;

const DashDivider = styled(Box)`
  height: 2px;
  width: 100%;
  border: 1px dashed #ababab;
`;
const Card2 = styled(Card)`
  position: relative;
  padding: 1rem 1.75rem;
  @media only screen and (max-width: 678px) {
    padding: 1rem;
  }
`;

const StyledGrid = styled(Grid)`
  @media only screen and (max-width: 678px) {
    display: none;
  }
`;

const StyledButton = styled(Button)`
  border-radius: 0.625rem;
  background: #fff;
  box-shadow: 0px 0px 12px 0px rgba(103, 45, 209, 0.7);

  @media only screen and (max-width: 678px) {
    display: none;
  }
`;

const Cart = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const [totalPrice, setTotalPrice] = useState(0);
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState(true);
  const [billingAddress, setBillingAddress] = useState(true);
  const [customerAddress, setCustomerAddress] = useState({
    shippingAddress: [],
    billingAddress: [],
  });
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(0);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(0);
  const [customerGst, setCustomerGst] = useState([]);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [isSameAsBillingAddressChecked, setIsSameAsBillingAddressChecked] =
    useState(false);

  const [dir, setDir] = useState({
    cityList: [],
    stateList: [],
    zipcodeList: [],
  });

  const [personalInfo, setPersonalInfo] = useState({
    fullName: state.customerProfileData?.fullName
      ? state.customerProfileData?.fullName
      : session?.user?.name?.userData?.customerData?.fullName,
    email: session?.user?.name?.userData?.email,
    phone: session?.user?.name?.userData?.phone,
  });

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

  useEffect(() => {
    getAddress();
  }, [shippingAddress, billingAddress]);

  const getAddress = async () => {
    const shippingAddresses = await api2.getShippingAddress(session);

    setCustomerAddress((prevState) => {
      return { ...prevState, shippingAddress: shippingAddresses };
    });

    const billingAddresses = await api2.getBillingAddress(session);

    setCustomerAddress((prevState) => {
      return { ...prevState, billingAddress: billingAddresses };
    });

    /*  const cityList = await api2.getCityList(session);

    setDir((prevState) => {

      return { ...prevState, cityList: cityList };
    });

    const stateList = await api2.getStateList(session);

    setDir((prevState) => {

      return { ...prevState, stateList: stateList };
    }); 

    const zipcodeList  = await api2.getZipcodeList(session);

    setDir((prevState) => {
      return { ...prevState, zipcodeList: zipcodeList };
    });  */
  };

  const handleSelectShippingAddress = async (id: number) => {
    await dispatch({
      type: "UPDATE_SHIPPING_ADDRESS",
      payload: id,
    });
    setSelectedShippingAddress(id);
  };

  const handleSelectBillingAddress = async (id: number) => {
    await dispatch({
      type: "UPDATE_BILLING_ADDRESS",
      payload: id,
    });
    setSelectedBillingAddress(id);
  };

  const handleSameAsAddress = async () => {};

  const getTotalPrice = () => {
    return (
      state.cart?.reduce(
        (accumulator, item) => accumulator + item.price * item.qty,
        0
      ) || 0
    );
  };

  const handleClik = () => {
    router.push("/checkout");
  };
  const handleContinue = () => {
    setStep(step + 1);
  };

  const handleNewShippingAddress = (trigger) => {
    setShippingAddress(trigger);
  };

  const handleNewBillingAddress = (trigger) => {
    setBillingAddress(trigger);
  };

  const handleFieldChange = (e) => {
    setPersonalInfo((personalInfo) => {
      return {
        ...personalInfo,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSameAsBillingAddress = () => {
    setIsSameAsBillingAddressChecked(!isSameAsBillingAddressChecked);
    handleSelectShippingAddress(selectedBillingAddress);
  };

  const handlePersonalInfoSubmit = (e) => {};

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

  const redirect = () => {
    router.push("/catalog/products");
  };

  useEffect(() => {
    // Adjust this value as needed
    if (window.innerWidth <= 900) {
      // Adjust this value as needed
      document.body.style.paddingBottom = "7rem"; // Assuming the height of CheckoutWrapper is 60px
    } // Assuming the height of CheckoutWrapper is 60px
  }, []);

  useEffect(() => {
    const price = getTotalPrice();
    setTotalPrice(price);
  }, [state.cart]);
  console.log("state", state);
  console.log("state.checkoutStep", state.checkoutStep);

  useEffect(() => {
    if (isTermsAccepted) {
      setErrors({});
    }
  }, [isTermsAccepted]);

  return (
    <Box mb="5rem">
      {isMobile && (
        <Box mt="2rem">
          <OfferCard />
        </Box>
      )}
      <StyledCart
        mt="2rem"
        mb="2rem"
        justifyContent="center"
        alignItems="center"
      >
        <Link href="/">
          <Typography
            cursor="pointer"
            fontSize="0.75rem"
            fontWeight={400}
            color="#686666"
            className={inter.className}
          >
            Home &gt;
          </Typography>
        </Link>
        <Link href="/cart">
          <Typography
            marginLeft={"0.2rem"}
            fontSize="0.75rem"
            fontWeight={400}
            color="#686666"
            className={inter.className}
          >
            My Cart
          </Typography>
        </Link>
      </StyledCart>

      <Grid container spacing={6}>
        <Grid item lg={8} md={8} xs={12}>
          <CartCard />
          {state.cart?.map((item) => (
            <ProductCard77
              mb="1.5rem"
              id={item.id}
              productId={item.productId}
              key={item.id}
              qty={item.qty}
              slug={item.productSlug as string}
              name={item.productName}
              price={item.price}
              imgUrl={item.imgUrl}
              isSampleQty={item.isSampleQty}
              minOrderQty={item.minOrderQty}
              cartSize={state.cart?.length}
              cartId={state.cartInfo ? state.cartInfo.id : null}
            />
          ))}

          {/* {!isMobile && <OfferCard />} */}

          <FlexBox justifyContent={"center"}>
            <StyledButton
              variant="outlined"
              color="primary"
              size="small"
              mt="1rem"
              mb="1rem"
              onClick={() => redirect()}
            >
              <Typography>Continue Shopping</Typography>
            </StyledButton>
          </FlexBox>
        </Grid>

        <StyledGrid item lg={4} md={4} xs={12}>
          {/* Coupon Card */}

          <ApplyCoupon />

          <Card2
            mt="1rem"
            mb="1rem"
            cursor={"pointer"}
            borderRadius={"1rem 1rem 1rem 1rem"}
          >
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
            <FlexBox mt="1rem" mb="0.5rem" justifyContent="center">
              <DashDivider />
            </FlexBox>
            <FlexBox mt="1rem" mb="0.5rem" justifyContent={"space-between"}>
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
          </Card2>

          {state.checkoutStep === 1 ? (
            <PersonalInfo />
          ) : (
            <Card2
              mt="1rem"
              mb="1rem"
              cursor={"pointer"}
              onClick={() =>
                dispatch({ type: "UPDATE_CHECKOUT_FORM_STEP", payload: 1 })
              }
              borderRadius={"1rem 1rem 0 0"}
            >
              <FlexBox justifyContent={"center"} alignItems="center">
                <Typography
                  fontWeight="500"
                  fontSize="1rem"
                  className={roboto.className}
                >
                  Personal Information
                </Typography>
              </FlexBox>
            </Card2>
          )}

          {state.checkoutStep === 2 ? (
            <CustomerGst gstInfo={customerGst} />
          ) : (
            <Card2
              mt="1rem"
              mb="1rem"
              cursor={"pointer"}
              onClick={() =>
                dispatch({ type: "UPDATE_CHECKOUT_FORM_STEP", payload: 2 })
              }
              borderRadius={"1rem 1rem 0 0"}
            >
              <FlexBox justifyContent={"center"} alignItems="center">
                <Typography
                  fontWeight="500"
                  fontSize="1rem"
                  className={roboto.className}
                >
                  GST Information
                </Typography>
              </FlexBox>
            </Card2>
          )}

          {state.checkoutStep == 3 ? (
            <>
              {billingAddress ? (
                <Box
                  backgroundColor="white"
                  padding="1rem 1rem 1.5rem 1rem"
                  borderRadius={"1rem 1rem 0 0"}
                >
                  <FlexBox
                    justifyContent={"space-between"}
                    alignItems="center"
                    my={"1rem"}
                  >
                    <Typography
                      fontWeight="500"
                      fontSize="1rem"
                      className={roboto.className}
                    >
                      Billing Address
                    </Typography>
                    <FlexBox justifyContent={"center"}>
                      <StyledButton
                        variant="outlined"
                        color="primary"
                        onClick={() => handleNewBillingAddress(false)}
                        size="small"
                      >
                        Add New
                      </StyledButton>
                    </FlexBox>
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

                  {!isMobile ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        mt="1rem"
                        fullwidth
                        disabled={!selectedBillingAddress}
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_CHECKOUT_FORM_STEP",
                            payload: 4,
                          })
                        }
                      >
                        Continue
                      </Button>
                    </>
                  ) : null}
                </Box>
              ) : (
                <BillingAddress
                  handleSetBillingAddress={(trigger) =>
                    handleNewBillingAddress(trigger)
                  }
                />
              )}
            </>
          ) : (
            <Card2
              mt="1rem"
              cursor={"pointer"}
              onClick={() =>
                dispatch({ type: "UPDATE_CHECKOUT_FORM_STEP", payload: 3 })
              }
              mb="1rem"
            >
              <FlexBox justifyContent={"center"} alignItems="center">
                <Typography
                  fontWeight="500"
                  fontSize="1rem"
                  className={roboto.className}
                >
                  Billing Address
                </Typography>
              </FlexBox>
            </Card2>
          )}

          {state.checkoutStep == 4 ? (
            <>
              {shippingAddress ? (
                <Box
                  backgroundColor="white"
                  padding="1rem 1rem 1.5rem 1rem"
                  borderRadius={"1rem 1rem 0 0"}
                >
                  <FlexBox justifyContent={"space-between"} alignItems="center">
                    <Typography
                      fontWeight="500"
                      fontSize="1rem"
                      className={roboto.className}
                    >
                      Shipping Address
                    </Typography>
                    <FlexBox justifyContent={"center"}>
                      <StyledButton
                        variant="outlined"
                        color="primary"
                        onClick={() => handleNewShippingAddress(false)}
                        size="small"
                      >
                        Add New
                      </StyledButton>
                    </FlexBox>
                  </FlexBox>
                  {customerAddress.billingAddress.length > 0 && (
                    <Box>
                      <CheckBox
                        onChange={() => handleSameAsBillingAddress()}
                        checked={isSameAsBillingAddressChecked}
                        my="1rem"
                        color="primary"
                        label={
                          <Typography
                            fontWeight={400}
                            fontSize={"0.9rem"}
                            className={roboto.className}
                          >
                            Same As Billing Address
                          </Typography>
                        }
                      />
                    </Box>
                  )}

                  {isSameAsBillingAddressChecked ? (
                    <>
                      {customerAddress.billingAddress.map((item: any) => (
                        <>
                          {selectedBillingAddress == item.id && (
                            <Box cursor="pointer">
                              <SavedBillingAddress
                                addressInfo={item}
                                selectedBillingAddress={selectedBillingAddress}
                              />
                            </Box>
                          )}
                        </>
                      ))}
                    </>
                  ) : (
                    <>
                      {customerAddress.shippingAddress &&
                      customerAddress.shippingAddress.length > 0 ? (
                        customerAddress.shippingAddress.map((item: any) => (
                          <Box
                            cursor="pointer"
                            onClick={() => handleSelectShippingAddress(item.id)}
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
                    </>
                  )}

                  {!isMobile ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        mt="1rem"
                        fullwidth
                        disabled={!selectedShippingAddress}
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_CHECKOUT_FORM_STEP",
                            payload: 5,
                          })
                        }
                      >
                        Continue
                      </Button>
                    </>
                  ) : null}
                </Box>
              ) : (
                <>
                  <ShippingAddress
                    handleSetShippingAddress={(trigger) =>
                      handleNewShippingAddress(trigger)
                    }
                  />
                </>
              )}
            </>
          ) : (
            <Card2
              mt="1rem"
              cursor={"pointer"}
              onClick={() =>
                dispatch({ type: "UPDATE_CHECKOUT_FORM_STEP", payload: 4 })
              }
              mb="1rem"
            >
              <FlexBox justifyContent={"center"} alignItems="center">
                <Typography
                  fontWeight="500"
                  fontSize="1rem"
                  className={roboto.className}
                >
                  Shipping Address
                </Typography>
              </FlexBox>
            </Card2>
          )}

          {state.checkoutStep == 5 ? (
            <Card1 borderRadius={"1rem 1rem 0 0"}>
              <FlexBox justifyContent={"center"} alignItems="center" mb="1rem">
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

              <FlexBox mt="1rem" mb="0.5rem" justifyContent={"space-between"}>
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
                  Orders can’t be cancelled once packed for delivery. In case of
                  unexpected delays, a refund will be provided, if applicable.
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
            </Card1>
          ) : (
            <Card2
              mt="1rem"
              mb="1rem"
              cursor={"pointer"}
              onClick={() =>
                dispatch({ type: "UPDATE_CHECKOUT_FORM_STEP", payload: 5 })
              }
              borderRadius={"0rem 0rem 1rem 1rem"}
            >
              <FlexBox justifyContent={"center"} alignItems="center">
                <Typography
                  fontWeight="500"
                  fontSize="1rem"
                  className={roboto.className}
                >
                  Summary
                </Typography>
              </FlexBox>
            </Card2>
          )}
        </StyledGrid>
        <StyledBox mt="5rem">
          <Image
            src="/assets/images/banners/last_banner.png"
            alt="offer"
            width="100%"
            height="100%"
          />
        </StyledBox>
      </Grid>

      <MediaQuery maxWidth={1279}>
        <CheckoutWrapper>
          <Button
            color="primary"
            onClick={handleClik}
            width="100%"
            variant="contained"
          >
            <Typography fontSize={"1.25rem"} className={roboto.className}>
              Checkout: ₹{totalPrice.toFixed(2)}
            </Typography>
          </Button>
        </CheckoutWrapper>
      </MediaQuery>
    </Box>
  );
};

export default Cart;
