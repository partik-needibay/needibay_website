import Avatar from "@component/avatar";
import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import Image from "@component/Image";
import Typography, {
  H3,
  Paragraph,
  Span
} from "@component/Typography";
import { useAppContext } from "@context/AppContext";
import { currency } from "@utils/utils";
import NextImage from "next/legacy/image";
import Link from "next/link";
import { FC, Fragment, useEffect, useState } from "react";
import { StyledMiniCart } from "./styles";

import Box from "@component/Box";
import CheckBox from "@component/CheckBox";
import { CircularProgress } from "@mui/material";
import api2 from "@utils/__api__/market-1";
import { quicksand, roboto } from "@utils/fonts";
import { theme } from "@utils/theme";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const StyledButton = styled(Button)`
  &:focus {
    box-shadow: none;
  }
`;

const DashDivider = styled(Box)`
  height: 1px;
  width: 90%;
  border: 1px dashed #919191;
`;

type MiniCartProps = { toggleSidenav?: () => void };

type updateCartItem = {
  qty: number;
  productId?: number;
  id: number;
  minOrderQty: string | number | null;
  isSampleQty: boolean;
};

const MiniCart: FC<MiniCartProps> = ({ toggleSidenav = () => {} }) => {
  const { state, dispatch } = useAppContext();
  const { data: session } = useSession();
  const router = useRouter();
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleProceedCheckout = async () => {
    if (isTermsAccepted) {
      setErrors({});
      dispatch({
        type: "UPDATE_BUTTON_STATE",
        payload: {
          name: "MINICART_CHECKOUT_BUTTON",
          state: true,
        },
      });
      dispatch({ type: "UPDATE_PAGE_LOADER", payload: true });
      router.push("/cart");
    } else {
      setErrors((prev) => ({
        ...prev,
        terms: "Please accept the Terms to proceed",
      }));
    }
  };

  const handleUpdateItemQty = async (qty, productId, cartId, minOrderQty,
    isSampleQty) => {
    if (session?.user) {
      if (qty === 0) {
        const payload = {
          customerId: session?.user?.name?.userData?.id,
          cartItems: [{ productId: productId }],
        };
        const response = await api2.removeCartItem(payload, state.cartInfo.id);
        const cart = await api2.getCartItem(session?.user?.name?.userData?.id);
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: cart ? cart : null,
        });
        return false;
      }

      let updateCartItems: updateCartItem[] = [];

      const updateCartItem: updateCartItem = { qty, productId, id: cartId, minOrderQty,
        isSampleQty };

      updateCartItems.push(updateCartItem);

      const payload = {
        customerId: session?.user?.name?.userData?.id,
        cartItems: updateCartItems,
      };
      const response = await api2.updateCartItem(payload, state.cartInfo.id);
      const cart = await api2.getCartItem(session?.user?.name?.userData?.id);
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: cart ? cart : null,
      });
    } else {
      dispatch({ type: "LOGIN_POPUP", payload: true });
    }
  };

  const handleRemoveItem = async (productId) => {
    if (session?.user) {
      const payload = {
        customerId: session?.user?.name?.userData?.id,
        cartItems: [{ productId: productId }],
      };
      const response = await api2.removeCartItem(payload, state.cartInfo.id);
      const cart = await api2.getCartItem(session?.user?.name?.userData?.id);
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: cart ? cart : null,
      });
    }
  };

  useEffect(() => {
    if (isTermsAccepted) {
      setErrors({});
    }
  }, [isTermsAccepted]);

  const handleCartAmountChange = (amount: number, product: any) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { ...product, qty: amount },
    });
  };

  const getTotalPrice = () => {
    return (
      state.cart?.reduce(
        (accumulator, item) => accumulator + item.price * item.qty,
        0
      ) || 0
    );
  };

  const StyledBox = styled(Box)`
    box-shadow: 0px 0px 11px -2px rgba(0, 0, 0, 0.25);
  `;

  return (
    <StyledMiniCart>
      <div className="cart-list">
        <FlexBox
          alignItems="center"
          justifyContent={"center"}
          m="20px 20px"
          height="74px"
        >
          <FlexBox flexDirection={"column"} alignItems={"center"}>
            <FlexBox>
              <Icon size="1.75rem">checkout-bag</Icon>
              <Typography fontWeight={700} fontSize="1.25rem" ml="0.5rem">
                My cart
              </Typography>
            </FlexBox>
            {/* todo make it dynamic */}
            {/* <Typography
              mt='0.2rem  '
              fontWeight={700}
              fontSize='0.75rem'>
              You are saving $14 from offer
            </Typography> */}
          </FlexBox>
        </FlexBox>

        {!!!state.cart?.length && (
          <FlexBox
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            height="calc(100% - 80px)"
          >
            <NextImage
              src="/assets/images/logos/shopping-bag.svg"
              width={90}
              height={90}
              alt="bonik"
            />
            <Paragraph
              mt="1rem"
              color="text.muted"
              textAlign="center"
              maxWidth="200px"
            >
              Your shopping bag is empty. Start shopping
            </Paragraph>
          </FlexBox>
        )}

        {state.cart?.map((item) => (
          <Fragment key={item.id}>
            <StyledBox
              backgroundColor={"#FFF"}
              margin={"2rem"}
              padding="0ren"
              borderRadius={"0.8125rem"}
              className="cart-item"
            >
              <Link href={`/product/${item.productSlug}`}>
                <Avatar
                  size={60}
                  mx="1rem"
                  /* marginBottom="2rem" */
                  alt={item.productName}
                  src={
                    item.productImageDefault ||
                    "/assets/images/product-placeholder.png"
                  }
                />
              </Link>

              <div className="product-details">
                <FlexBox alignItems="center" justifyContent={"space-between"}>
                  <Link href={`/product/${item.productSlug}`}>
                    <Typography
                      className={quicksand.className}
                      fontSize="0.93rem"
                      fontWeight={600}
                    >
                      {item.productName}
                      <Span
                        color="#6C6C6C"
                        ml="0.2rem"
                        className={quicksand.className}
                        fontSize="0.62rem"
                        fontWeight={600}
                      >
                        {/* (1mm) */}
                      </Span>
                    </Typography>
                  </Link>
                  <Image
                    height="0.9rem"
                    width="0.8125rem"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleRemoveItem(item.productId);
                    }}
                    src="/assets/images/icons/delete-checkout.png"
                  ></Image>
                </FlexBox>

                <Typography color="#FF5F5F" fontSize={"1rem"} fontWeight={700}>
                  {currency(item.price)}
                  <Span
                    fontSize="0.6rem"
                    color="#828181"
                    fontWeight={400}
                    mr="0.2rem"
                  >
                    /unit
                  </Span>
                  <Span fontSize="0.6rem" color="#828181" fontWeight={400}>
                    + 18% (GST)
                  </Span>
                </Typography>

                {/* <FlexBox
                  alignItems='center'
                  flexDirection='row'>
                  <Button
                    variant='outlined'
                    color='primary'
                    padding='5px'
                    size='none'
                    borderColor='primary.light'
                    borderRadius='300px'
                    onClick={handleCartAmountChange(item.qty + 1, item)}>
                    <Icon variant='small'>plus</Icon>
                  </Button>

                  <Typography
                    fontWeight={600}
                    fontSize='15px'
                    my='3px'>
                    {item.qty}
                  </Typography>

                  <Button
                    size='none'
                    padding='5px'
                    color='primary'
                    variant='outlined'
                    borderRadius='300px'
                    borderColor='primary.light'
                    onClick={handleCartAmountChange(item.qty - 1, item)}
                    disabled={item.qty === 1}>
                    <Icon variant='small'>minus</Icon>
                  </Button>
                </FlexBox> */}

                <FlexBox justifyContent={"flex-start"}>
                  <FlexBox
                    border="1px solid #BDBDBD"
                    borderRadius="0.3125rem"
                    alignItems="center"
                    height={"1.4rem"}
                    justifyContent={"center"}
                    marginTop={"0.5rem"}
                    marginBottom={"0.5rem"}
                  >
                    <StyledButton
                      p="5px"
                      size="small"
                      onClick={() =>
                        handleUpdateItemQty(
                          item?.qty - 1,
                          item?.productId,
                          item.id,
                          item?.minOrderQty,
                          item?.isSampleQty
                        )
                      }
                    >
                      <Typography
                        color="#000"
                        fontWeight={900}
                        fontSize={"0.9rem"}
                        className={quicksand.className}
                      >
                        -
                      </Typography>
                    </StyledButton>
                    <H3 fontWeight="600" fontSize={"0.9rem"}>
                      {item?.qty.toString().padStart(1, "0")}
                      {""}
                      <Span
                        className={quicksand.className}
                        fontSize={"0.63rem"}
                        fontWeight={700}
                      >
                        {item.minOrderQty && !item.isSampleQty && `x${item.minOrderQty}`}
                      </Span>
                    </H3>
                    <StyledButton
                      p="5px"
                      size="small"
                      onClick={() =>
                        handleUpdateItemQty(
                          item?.qty + 1,
                          item.productId,
                          item.id,
                          item?.minOrderQty,
                          item?.isSampleQty
                        )
                      }
                    >
                      <Typography
                        color="#000"
                        fontWeight={900}
                        fontSize={"0.9rem"}
                        className={quicksand.className}
                      >
                        +
                      </Typography>
                    </StyledButton>
                  </FlexBox>
                </FlexBox>
              </div>
            </StyledBox>
          </Fragment>
        ))}
      </div>

      {!!state.cart?.length && (
        <Fragment>
          {/*  <FlexBox margin={"1rem"}>
            <Box>
              <Image src="/assets/images/icons/coupon.png"></Image>
            </Box>
            <Box ml="0.5rem">
              <Typography
                className={roboto.className}
                fontSize="0.75rem"
                fontWeight={600}
              >
                Have a coupon code ?
              </Typography>
            </Box>

            <Box>
              <Typography
                color="#00789F"
                marginLeft={"0.5rem"}
                className={quicksand.className}
                fontSize="0.75rem"
                fontWeight={600}
              >
                Redeem
              </Typography>
            </Box>
          </FlexBox> */}
          <FlexBox justifyContent="center">
            <DashDivider />
          </FlexBox>
          <Box mx="2rem" mt="0.5rem">
            <FlexBox justifyContent={"space-between"}>
              <Box>
                <Typography
                  className={roboto.className}
                  fontSize={"1.125rem"}
                  fontWeight={400}
                >
                  SubTotal
                </Typography>
              </Box>
              <Box>
                <Typography
                  className={roboto.className}
                  fontSize={"1.125rem"}
                  fontWeight={400}
                >
                  {currency(state.cartInfo.subtotal)}
                </Typography>
              </Box>
            </FlexBox>
            {state.cartInfo?.isCouponApplied && (
              <>
                <FlexBox justifyContent={"space-between"}>
                  <Box>
                    <Typography
                      className={roboto.className}
                      fontSize={"1.125rem"}
                      fontWeight={400}
                    >
                      Discount
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      className={roboto.className}
                      fontSize={"1.125rem"}
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
                      fontSize={"1.125rem"}
                      fontWeight={400}
                    >
                      SubTotal
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      className={roboto.className}
                      fontSize={"1.125rem"}
                      fontWeight={400}
                    >
                      {currency(state.cartInfo.subtotalWithDiscount)}
                    </Typography>
                  </Box>
                </FlexBox>
              </>
            )}
            <FlexBox mt="0.5rem" justifyContent={"space-between"}>
              <Box>
                <Typography
                  className={roboto.className}
                  fontSize={"1.125rem"}
                  fontWeight={400}
                >
                  GST
                </Typography>
              </Box>
              <Box>
                <Typography
                  className={roboto.className}
                  fontSize={"1.125rem"}
                  fontWeight={400}
                >
                  {currency(
                    state.cartInfo?.isCouponApplied
                      ? state.cartInfo.discountedTaxAmount
                      : state.cartInfo.taxAmount
                  )}
                </Typography>
              </Box>
            </FlexBox>
            {/* todo uncomment shipping pricing section once logic enabled */}
            {/* <FlexBox mt="0.5rem" justifyContent={"space-between"}>
              <Box>
                <Typography
                  className={roboto.className}
                  fontSize={"1.125rem"}
                  fontWeight={400}
                >
                  Shipping
                </Typography>
              </Box>
              <Box>
                <Typography
                  className={roboto.className}
                  fontSize={"1.125rem"}
                  fontWeight={400}
                >
                  Free
                </Typography>
              </Box>
            </FlexBox> */}
          </Box>
          <FlexBox mt="1rem" justifyContent="center">
            <DashDivider />
          </FlexBox>
          <FlexBox mx="2rem" mt="0.5rem" justifyContent={"space-between"}>
            <Box>
              <Typography
                className={roboto.className}
                fontSize={"1.125rem"}
                fontWeight={600}
              >
                Grand Total
              </Typography>
            </Box>
            <Box>
              <Typography
                className={roboto.className}
                fontSize={"1.125rem"}
                fontWeight={600}
              >
                {currency(
                    state.cartInfo?.isCouponApplied
                      ? state.cartInfo.discountedGrandTotal
                      : state.cartInfo.grandTotal
                  )}
              </Typography>
            </Box>
          </FlexBox>

          <FlexBox mt="0.5rem" justifyContent="center">
            <DashDivider />
          </FlexBox>
          <Box
            padding="0.7rem"
            m="1rem"
            borderRadius=" 0.625rem"
            border="1px solid #D7D7D7"
          >
            <FlexBox flexDirection={"column"} alignItems={"flex-start"}>
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
          </Box>

          <Box mx="1rem" mb="0.7rem" textAlign={"center"}>
            <Button
              variant="contained"
              color="primary"
              fullwidth
              size="large"
              onClick={(e) => handleProceedCheckout()}
              disabled={
                state.buttonState?.name == "MINICART_CHECKOUT_BUTTON" &&
                state.buttonState?.state == true
              }
            >
              {state.buttonState?.name == "MINICART_CHECKOUT_BUTTON" &&
              state.buttonState?.state == true ? (
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                >
                  <CircularProgress color="inherit" size={20} />
                  &nbsp;
                  <>Proceed Checkout</>
                </Box>
              ) : (
                <>Proceed Checkout</>
              )}
            </Button>
          </Box>
        </Fragment>
      )}
    </StyledMiniCart>
  );
};

export default MiniCart;
