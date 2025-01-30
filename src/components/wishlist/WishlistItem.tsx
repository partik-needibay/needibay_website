"use client";
import Link from "next/link";
import TableRow from "@component/TableRow";
import { Button, IconButton } from "@component/buttons";
import Icon from "@component/icon/Icon";
import styled from "styled-components";
import { currency } from "@utils/utils";
import wishlist from "@utils/__api__/wishlist";
import { useAppContext } from "@context/AppContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import api2 from "@utils/__api__/market-1";
import { useState } from "react";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Card, { CardProps } from "@component/Card";
import { CircularProgress } from "@mui/material";
import { arimo, mukta, overpass, quicksand } from "@utils/fonts";
import Typography, {
  H3,
  H6,
  Paragraph,
  SemiSpan,
  Span,
} from "@component/Typography";
import { isMobile } from "react-device-detect";
import { toast } from "react-toastify";


const ResponsiveTableRow = styled(TableRow)`
  @media only screen and (max-width: 768px) {
    font-size: 0.7rem;

    .add {
      display: none;
    }
  }
`;
const HoverButton = styled(Button)`
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.03);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  }
`;

type addCartItem = {
  qty: number;
  productId: number;
  isSampleQty: boolean;
};

type updateCartItem = {
  qty: number;
  productId: number;
  id: number | string;
};

const WishlistItem = ({
  item,
  cartItemInfo,
  isAdded,
  cartSize,
  cartId,
  buttonLoader,
}) => {
  const { state, dispatch } = useAppContext();
  const { data: session } = useSession();
  const router = useRouter();
  const [isSampleQty, setIsSampleQty] = useState(false);


  const handleAddItemInExistingCart = async (
    qty: number,
    productId: number,
    cartId: number
  ) => {
    dispatch({
      type: "UPDATE_BUTTON_STATE",
      payload: {
        name: "ADD_TO_CART_BUTTON_" + productId,
        state: true,
      },
    });

    if (item.productDetails?.productType == "configurable") {
      router.push(`/product/${item.productDetails?.productSlug}`);
      return false;
    }
    if (session?.user) {
      let addCartItems: addCartItem[] = [];

      const addCartItem: addCartItem = { productId, qty, isSampleQty: false };

      addCartItems.push(addCartItem);

      const payload = {
        customerId: session?.user?.name?.userData?.id,
        cartItems: addCartItems,
      };

      if (cartId) {
        const response = await api2.addCartItemExistingCart(payload, cartId);
        dispatch({
          type: "UPDATE_BUTTON_STATE",
          payload: {
            name: "",
            state: false,
          },
        });
        const cart = await api2.getCartItem(session?.user?.name?.userData?.id);
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: cart ? cart : null,
        });
      } else {
        const response = await api2.addCartItem(payload);
        dispatch({
          type: "UPDATE_BUTTON_STATE",
          payload: {
            name: "",
            state: false,
          },
        });
        const cart = await api2.getCartItem(session?.user?.name?.userData?.id);
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: cart ? cart : null,
        });
      }
    } else {
      dispatch({ type: "LOGIN_POPUP", payload: true });
    }
  };

  const handleUpdateItemQty = async (
    qty: number,
    productId: number,
    cartId: number
  ) => {
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
      const cartItemId = cartItemInfo.id;

      let updateCartItems: updateCartItem[] = [];

      const updateCartItem: updateCartItem = { qty, productId, id: cartItemId };

      updateCartItems.push(updateCartItem);

      const payload = {
        customerId: session?.user?.name?.userData?.id,
        cartItems: updateCartItems,
      };
      const response = await api2.updateCartItem(payload, cartId);
      const cart = await api2.getCartItem(session?.user?.name?.userData?.id);
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: cart ? cart : null,
      });
    } else {
      dispatch({ type: "LOGIN_POPUP", payload: true });
    }
  };

  const removeProductWishList = async () => {
    await wishlist
      .removeWishList(session, item?.id)
      .then((res) => {
        toast.success("Product removed to Wishlist", { theme: "light" });
      })
      .catch((e) => {
        toast.error(
          "There is some issue at the moment to remove item from the wishlist!",
          { theme: "light" }
        );
        console.log(e);
      })
      .finally(() => {});
    const wishList = await wishlist.getWishList(session);
    dispatch({ type: "WISHLIST", payload: wishList });
  };

  return (
    <>
      {isMobile ? (
        <Box
          mt="1rem"
          borderRadius={"0.58331rem"}
          width="100%"
          p={2}
          border="1px solid #D8E0E9"
        >
          <FlexBox
            py={3}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              fontSize={"1rem"}
              fontWeight={"600"}
              color="primary"
            >{`${item.productDetails?.productName}`}</Typography>

            <Typography fontSize={"1rem"} fontWeight={"600"} color="#009733">
              {currency(item.productDetails?.basePriceWithCommission)}
            </Typography>
          </FlexBox>

          <FlexBox
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              {item.productDetails?.productType == "simple" ? (
                <>
                  {isAdded ? (
                    <FlexBox justifyContent={"center"}>
                      <FlexBox
                        border="4px solid #C4A4FF"
                        borderRadius="0.625rem"
                        width="100%"
                        alignItems="center"
                        justifyContent={"space-around"}
                      >
                        <Button
                          size="xxsmall"
                          onClick={() =>
                            handleUpdateItemQty(
                              cartItemInfo?.qty - 1,
                              item.productDetails?.id,
                              cartItemInfo.cart
                            )
                          }
                        >
                          <Typography color="#333">-</Typography>
                        </Button>
                        <H6>
                          {cartItemInfo?.qty.toString().padStart(1, "0")}
                          &nbsp;
                          <Span
                            className={quicksand.className}
                            fontWeight={700}
                          >
                            {item?.productDetails?.productType !=
                              "configurable" &&
                              item?.productDetails?.minOrderQty && (
                                <>{`x${item?.productDetails?.minOrderQty}`}</>
                              )}
                          </Span>
                        </H6>
                        <Button
                          size="xxsmall"
                          onClick={() =>
                            handleUpdateItemQty(
                              cartItemInfo?.qty + 1,
                              item.productDetails?.id,
                              cartItemInfo.cart
                            )
                          }
                        >
                          <Typography color="#333">+</Typography>
                        </Button>
                      </FlexBox>
                    </FlexBox>
                  ) : (
                    <>
                      {cartSize > 0 ? (
                        <HoverButton
                          width="100%"
                          onClick={() =>
                            handleAddItemInExistingCart(
                              1,
                              item.productDetails?.id,
                              cartId
                            )
                          }
                          size="xxsmall"
                          color="primary"
                          variant="contained"
                          disabled={
                            state.buttonState?.name ==
                              "ADD_TO_CART_BUTTON_" + item.productDetails?.id &&
                            state.buttonState?.state == true
                          }
                        >
                          {state.buttonState?.name ==
                            "ADD_TO_CART_BUTTON_" + item.productDetails?.id &&
                          state.buttonState?.state == true ? (
                            <Box
                              display={"flex"}
                              flexDirection={"row"}
                              alignItems={"center"}
                            >
                              <CircularProgress color="inherit" size={20} />
                              &nbsp;
                              <Typography className={overpass.className}>
                                Adding to Cart...
                              </Typography>
                            </Box>
                          ) : (
                            <Typography className={overpass.className}>
                              Add to Cart
                            </Typography>
                          )}
                        </HoverButton>
                      ) : (
                        <HoverButton
                          width="100%"
                          onClick={() =>
                            handleAddItemInExistingCart(
                              1,
                              item.productDetails?.id,
                              cartId
                            )
                          }
                          size="small"
                          color="primary"
                          variant="contained"
                          disabled={
                            state.buttonState?.name ==
                              "ADD_TO_CART_BUTTON_" + item.productDetails?.id &&
                            state.buttonState?.state == true
                          }
                        >
                          {state.buttonState?.name ==
                            "ADD_TO_CART_BUTTON_" + item.productDetails?.id &&
                          state.buttonState?.state == true ? (
                            <Box
                              display={"flex"}
                              flexDirection={"row"}
                              alignItems={"center"}
                            >
                              <CircularProgress color="inherit" size={20} />
                              &nbsp;
                              <Typography className={overpass.className}>
                                Adding to Cart...
                              </Typography>
                            </Box>
                          ) : (
                            <Typography className={overpass.className}>
                              Add to Cart
                            </Typography>
                          )}
                        </HoverButton>
                      )}
                    </>
                  )}
                </>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  className="add"
                  size="xxsmall"
                  onClick={() =>
                    router.push(`/product/${item.productDetails?.productSlug}`)
                  }
                >
                  <Typography fontSize="0.7rem"></Typography>
                </Button>
              )}
            </Box>
            <Box>
              <FlexBox justifyContent="center" alignItems={"center"}>
                <Typography className="pre" color="text.muted">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      removeProductWishList();
                    }}
                  >
                    <Icon variant="small" defaultcolor="currentColor">
                      delete
                    </Icon>
                  </IconButton>
                </Typography>
              </FlexBox>
            </Box>
          </FlexBox>
        </Box>
      ) : (
        <ResponsiveTableRow my="1rem" padding="6px 18px" key={item.id}>
          <Typography m="6px" textAlign="center">
            {item.productDetails?.productName}
          </Typography>

          <Typography m="6px" textAlign="center">
            {currency(item.productDetails?.basePriceWithCommission)}
          </Typography>

          <Typography
            className="pre"
            m="6px"
            color="#39B300"
            textAlign="center"
          >
            {item.productDetails?.isActive ? "Available" : "Not Availlable"}
          </Typography>

          {item.productDetails?.productType == "simple" ? (
            <>
              {isAdded ? (
                <FlexBox justifyContent={"center"}>
                  <FlexBox
                    border="4px solid #C4A4FF"
                    borderRadius="0.625rem"
                    width="100%"
                    alignItems="center"
                    justifyContent={"space-around"}
                    marginTop={"1rem"}
                    marginBottom={"1rem"}
                  >
                    <Button
                      size="small"
                      onClick={() =>
                        handleUpdateItemQty(
                          cartItemInfo?.qty - 1,
                          item.productDetails?.id,
                          cartItemInfo.cart
                        )
                      }
                    >
                      <Typography
                        color="#333"
                        fontSize={"2rem"}
                        className={quicksand.className}
                      >
                        -
                      </Typography>
                    </Button>
                    <H3 fontWeight="600" mx="20px">
                      {cartItemInfo?.qty.toString().padStart(1, "0")}
                      &nbsp;
                      <Span
                        className={quicksand.className}
                        fontSize={"1.05rem"}
                        fontWeight={700}
                      >
                        {item?.productDetails?.productType != "configurable" &&
                          item?.productDetails?.minOrderQty && (
                            <>{`x${item?.productDetails?.minOrderQty}`}</>
                          )}
                      </Span>
                    </H3>
                    <Button
                      size="small"
                      onClick={() =>
                        handleUpdateItemQty(
                          cartItemInfo?.qty + 1,
                          item.productDetails?.id,
                          cartItemInfo.cart
                        )
                      }
                    >
                      <Typography
                        color="#333"
                        fontSize={"2rem"}
                        className={quicksand.className}
                      >
                        +
                      </Typography>
                    </Button>
                  </FlexBox>
                </FlexBox>
              ) : (
                <>
                  {cartSize > 0 ? (
                    <HoverButton
                      marginTop={"1rem"}
                      marginBottom={"1rem"}
                      width="100%"
                      onClick={() =>
                        handleAddItemInExistingCart(
                          1,
                          item.productDetails?.id,
                          cartId
                        )
                      }
                      size="small"
                      color="primary"
                      variant="contained"
                      disabled={
                        state.buttonState?.name ==
                          "ADD_TO_CART_BUTTON_" + item.productDetails?.id &&
                        state.buttonState?.state == true
                      }
                    >
                      {state.buttonState?.name ==
                        "ADD_TO_CART_BUTTON_" + item.productDetails?.id &&
                      state.buttonState?.state == true ? (
                        <Box
                          display={"flex"}
                          flexDirection={"row"}
                          alignItems={"center"}
                        >
                          <CircularProgress color="inherit" size={20} />
                          &nbsp;
                          <Typography className={overpass.className}>
                            Adding to Cart...
                          </Typography>
                        </Box>
                      ) : (
                        <Typography className={overpass.className}>
                          Add to Cart
                        </Typography>
                      )}
                    </HoverButton>
                  ) : (
                    <HoverButton
                      marginTop={"1rem"}
                      marginBottom={"1rem"}
                      width="100%"
                      height="3rem"
                      onClick={() =>
                        handleAddItemInExistingCart(
                          1,
                          item.productDetails?.id,
                          cartId
                        )
                      }
                      size="small"
                      color="primary"
                      variant="contained"
                      disabled={
                        state.buttonState?.name ==
                          "ADD_TO_CART_BUTTON_" + item.productDetails?.id &&
                        state.buttonState?.state == true
                      }
                    >
                      {state.buttonState?.name ==
                        "ADD_TO_CART_BUTTON_" + item.productDetails?.id &&
                      state.buttonState?.state == true ? (
                        <Box
                          display={"flex"}
                          flexDirection={"row"}
                          alignItems={"center"}
                        >
                          <CircularProgress color="inherit" size={20} />
                          &nbsp;
                          <Typography className={overpass.className}>
                            Adding to Cart...
                          </Typography>
                        </Box>
                      ) : (
                        <Typography className={overpass.className}>
                          Add to Cart
                        </Typography>
                      )}
                    </HoverButton>
                  )}
                </>
              )}
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className="add"
              size="xxsmall"
              onClick={() =>
                router.push(`/product/${item.productDetails?.productSlug}`)
              }
            >
              <Typography fontSize="0.7rem"></Typography>
            </Button>
          )}

          <Typography className="pre" textAlign="center" color="text.muted">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                removeProductWishList();
              }}
            >
              <Icon variant="small" defaultcolor="currentColor">
                delete
              </Icon>
            </IconButton>
          </Typography>
        </ResponsiveTableRow>
      )}
    </>
  );
};

export default WishlistItem;
