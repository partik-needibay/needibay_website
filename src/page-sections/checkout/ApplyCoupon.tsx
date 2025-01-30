"use client";
import { FC, useState, useEffect } from "react";
import Box from "@component/Box";
import Select from "@component/Select";
import { Card1 } from "@component/Card1";
import { Card7 } from "@component/Card7";
import FlexBox from "@component/FlexBox";
import { Button, IconButton } from "@component/buttons";
import TextField from "@component/text-field";
import Typography from "@component/Typography";
import zipcodeList from "@data/zipcodeList";
import stateList from "@data/stateList";
import cityList from "@data/cityList";
import { arimo, inter, overpass, quicksand, roboto } from "@utils/fonts";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@context/AppContext";
import { Formik } from "formik";
import * as yup from "yup";
import api2 from "@utils/__api__/market-1";
import Icon from "@component/icon/Icon";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Divider from "@component/Divider";
import styled from "styled-components";
import promotion from "@utils/__api__/promotion";
import { CircularProgress } from "@mui/material";
import { currency } from "@utils/utils";

const StyledTextField = styled(TextField)`
  text-transform: uppercase;
  ::placeholder {
    text-transform: capitalize;
  }
`;

const ApplyCoupon: FC = () => {
  const { data: session } = useSession();
  const { state, dispatch } = useAppContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [error, setError] = useState<any>("");
  const [showCouponDetails, setShowCouponDetails] = useState(false); // New state for coupon details visibility
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loadingCoupons, setLoadingCoupons] = useState<boolean>(true);
  useEffect(() => {
    const fetchAvailableCoupons = async () => {
      try {
        const response = await promotion.fetchCoupons();
        const validCoupons = (response?.data || []).filter((coupon) =>
          new Date(coupon.expiresAt) > new Date()
        );
        setCoupons(validCoupons);
      } catch (err) {
        console.error("Failed to fetch coupons:", err);
      } finally {
        setLoadingCoupons(false);
      }
    };

    if (session) fetchAvailableCoupons();
  }, [session]);


  const initialValues = {
    coupon: "",
  };

  const ApplyCouponSchema = yup.object().shape({
    coupon: yup.string().required(""),
  });

  const handleFormSubmit = async (values: any, errors: any) => {
    dispatch({
      type: "UPDATE_BUTTON_STATE",
      payload: {
        name: "APPLY_COUPON",
        state: true,
      },
    });
    const payload = {
      cartId: state.cartInfo?.id,
      couponCode: values.coupon,
    };
    const response = await promotion
      .applyCoupon(session, payload)
      .then((res) => {
        dispatch({
          type: "UPDATE_BUTTON_STATE",
          payload: {
            name: "APPLY_COUPON",
            state: false,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: "UPDATE_BUTTON_STATE",
          payload: {
            name: "APPLY_COUPON",
            state: false,
          },
        });
        setError(e.response?.data?.message);
        setTimeout(() => setError(""), 3000);
      })
      .finally(() => {
        dispatch({
          type: "UPDATE_BUTTON_STATE",
          payload: {
            name: "APPLY_COUPON",
            state: false,
          },
        });
        clearTimeout;
      });
    const cart = await api2.getCartItem(session?.user?.name?.userData?.id);
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: cart ? cart : null,
    });
  };

  const resetErrors = (setErrors) => {
    setTimeout(() => setErrors({}), 3000);
  };

  const removeAppliedCoupon = async () => {
    dispatch({
      type: "UPDATE_BUTTON_STATE",
      payload: {
        name: "REMOVE_COUPON",
        state: true,
      },
    });
    const payload = {
      cartId: state.cartInfo?.id,
      couponCode: state.cartInfo?.couponCode,
    };
    const response = await promotion
      .removeAppliedCoupon(session, payload)
      .then((res) => {
        dispatch({
          type: "UPDATE_BUTTON_STATE",
          payload: {
            name: "REMOVE_COUPON",
            state: false,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: "UPDATE_BUTTON_STATE",
          payload: {
            name: "REMOVE_COUPON",
            state: false,
          },
        });
        setError(e.response?.data?.message);
        setTimeout(() => setError(""), 3000);
      })
      .finally(() => {
        dispatch({
          type: "UPDATE_BUTTON_STATE",
          payload: {
            name: "REMOVE_COUPON",
            state: false,
          },
        });
        clearTimeout;
      });
    const cart = await api2.getCartItem(session?.user?.name?.userData?.id);
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: cart ? cart : null,
    });
  };

  return (
    <>
      {state.cartInfo?.isCouponApplied ? (
        <Card7 backgroundColor={"#F2FFEC"} border="#009733" mb="1rem">
          <FlexBox
            justifyContent={"space-evenly"}
            alignItems={"center"}
            mt="0.5rem"
            mb="0.5rem"
          >
            <Box
              backgroundColor="#FFF"
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
                {state?.cartInfo?.couponCode}
              </Typography>
            </Box>
            <Box>
              <Typography
                fontSize="0.8rem"
                fontWeight={500}
                color={"#009733"}
                className={roboto.className}
              >
                You've saved Rs.{state.cartInfo.couponDiscountAmount} on your order.
              </Typography>
            </Box>
            <IconButton size="xsmall" onClick={() => removeAppliedCoupon()}>
              {state.buttonState?.name == "REMOVE_COUPON" &&
                state?.buttonState.state ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                <Icon variant="xsmall">cross</Icon>
              )}
            </IconButton>
          </FlexBox>
        </Card7>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={ApplyCouponSchema}
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
            setErrors,
          }) => (
            <form onSubmit={handleSubmit}>
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
                    <StyledTextField
                      className={overpass.className}
                      placeholder="Enter your coupon code"
                      fullwidth
                      name="coupon"
                      onChange={handleChange}
                      value={values.coupon || ""}
                      errorText={
                        error ? error : touched.coupon && errors.coupon
                      }
                    />
                  </Box>
                  <Box width="35%">
                    <Button
                      variant="contained"
                      color="primary"
                      fullwidth
                      onClick={handleSubmit}
                      disabled={
                        state.buttonState?.name == "APPLY_COUPON" &&
                        state.buttonState?.state
                      }
                    >
                      {state.buttonState?.name == "APPLY_COUPON" &&
                        state.buttonState?.state ? (
                        <Box
                          display={"flex"}
                          flexDirection={"row"}
                          alignItems={"center"}
                        >
                          <CircularProgress color="inherit" size={15} />
                          &nbsp;
                          <Typography className={overpass.className}>
                            Applying...
                          </Typography>
                        </Box>
                      ) : (
                        <>Apply</>
                      )}
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
                  ></Typography>
                </FlexBox>

                {showCouponDetails && !loadingCoupons && coupons.length > 0 && (
                  <>
                    {coupons.map((coupon) => {
  // Check if minOrderPrice is greater than grandTotal
  const isCouponInactive = coupon.minOrderPrice && coupon.minOrderPrice > state.cartInfo?.grandTotal;

  return (
    <FlexBox
      justifyContent="space-between"
      alignItems="center"
      mt="0.5rem"
      mb="0.5rem"
      key={coupon.id}
    >
      <Box backgroundColor="#FFF" border="1px dashed #009733" borderRadius="0.625rem">
        <Typography
          className={roboto.className}
          fontWeight={700}
          fontSize="0.75rem"
          padding="0.3rem 1rem"
          color={isCouponInactive ? "#B0B0B0" : "#009733"}  // Grey out coupon code if inactive
          style={{ opacity: isCouponInactive ? 0.5 : 1 }} // Reduce opacity if inactive
        >
          {coupon.couponCode}
        </Typography>
      </Box>
      <Box>
        <Typography
          fontSize="0.8rem"
          fontWeight={500}
          color={isCouponInactive ? "#B0B0B0" : "#009733"}  // Grey out discount text if inactive
          className={roboto.className}
          style={{ opacity: isCouponInactive ? 0.5 : 1 }} // Reduce opacity if inactive
        >
          {coupon.couponType === "FLAT"
            ? `Get ₹${coupon.amount} off`
            : `Get ${coupon.percent}% off`}
          {coupon.minOrderPrice && ` on orders above ${currency(coupon.minOrderPrice)}`}
        </Typography>
      </Box>
    </FlexBox>
  );
})}


                    <Divider color="#E6E6E6" />
                  </>
                )}

                {loadingCoupons && (
                  <FlexBox justifyContent="center" alignItems="center" mt="1rem">
                    <CircularProgress color="inherit" />
                  </FlexBox>
                )}
                {!loadingCoupons && coupons.length === 0 && (
                  <Typography color="gray" textAlign="center" mt="1rem">
                    No coupons available at the moment.
                  </Typography>
                )}
                <Button
                  variant="outlined"
                  color="primary"
                  fullwidth
                  onClick={(e) => {
                    e.preventDefault();
                    setShowCouponDetails(!showCouponDetails)}
                  } // Toggle coupon details
                  style={{ marginTop: '1rem' }}
                >
                  {showCouponDetails ? "Hide Coupons" : "View Coupons"} {/* Update text dynamically */}
                </Button>


              </Card7>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};

export default ApplyCoupon;
