"use client";
import Box from "@component/Box";
import { Button } from "@component/buttons";
import Card, { CardProps } from "@component/Card";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import ProductQuickView from "@component/products/ProductQuickView";
import Typography, {
  H3,
  Paragraph,
  SemiSpan,
  Span,
} from "@component/Typography";
import { useAppContext } from "@context/AppContext";
import { CircularProgress } from "@mui/material";
import api2 from "@utils/__api__/market-1";
import wishlist from "@utils/__api__/wishlist";
import { deviceSize } from "@utils/constants";
import { overpass, quicksand } from "@utils/fonts";
import { getTheme } from "@utils/utils";
import { useSession } from "next-auth/react";
//import Image from "next/legacy/image";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

// styled component

const HeartIcon = styled(Icon)`
  transition: transform 0.3s ease-in-out;
  &:active {
    animation: clickHeart 0.3s;
  }
`;

const HoverButton = styled(Button)`
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.03);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  }
`;

const Wrapper = styled(Card)`
  margin: auto;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  transition: all 250ms ease-in-out;

  @media only screen and (max-width: ${deviceSize.sm}px) {
    width: 10.492rem;
    height: 15rem;
    margin: 0px;
    margin-bottom: 1.5rem;
  }

  &:hover {
    box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.1);
    .details {
      .add-cart {
        display: flex;
      }
    }
    /* .image-holder {
      .extra-icons {
        display: flex;
      }
    } */
  }

  .break {
    flex-basis: 100%;
    width: 0px;
    height: 0px;
    overflow: hidden;
  }

  .image {
    width: 255px;
    height: 255px;
    padding: 2rem;
    @media only screen and (max-width: ${deviceSize.sm}px) {
      width: 6.77rem;
      height: 1rem;
    }
  }
  .image-holder {
    text-align: center;
    position: relative;
    display: block;
    height: 100%;

    .extra-icons {
      z-index: 2;
      top: 0.75rem;
      /* display: none; */
      right: 0.75rem;
      cursor: pointer;
      position: absolute;
    }

    @media only screen and (max-width: ${deviceSize.sm}px) {
      display: block;
    }
  }

  .details {
    .title,
    .categories {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .icon-holder {
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      justify-content: space-between;
    }

    .favorite-icon {
      cursor: pointer;
    }
    .outlined-icon {
      svg path {
        fill: ${getTheme("colors.text.hint")};
      }
    }
    .add-cart {
      display: none;
      margin-top: auto;
      align-items: center;
      flex-direction: column;
    }
  }

  @media only screen and (max-width: 768px) {
    .details {
      .add-cart {
        display: flex;
      }
    }
  }
`;

// =======================================================================
interface ProductCard1Props extends CardProps {
  key;
  id;
  slug;
  price;
  title;
  //off,
  images;
  isAdded;
  cartItemInfo;
  cartSize;
  cartId;
  productInfo;
  buttonLoader?;
}
// =======================================================================

type addCartItem = {
  qty: number;
  productId: number;
  isSampleQty: boolean;
};

type updateCartItem = {
  qty: number;
  productId: number;
  id: number;
};

const ProductCard1: FC<ProductCard1Props> = ({
  key,
  id,
  slug,
  price,
  title,
  //off,
  images,
  isAdded,
  cartItemInfo,
  cartSize,
  cartId,
  productInfo,
  buttonLoader,
  ...props
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useAppContext();
  const [toggleHeart, setToggleHeart] = useState(false);
  //const [moq, setMoq] = useState();
  const toggleDialog = useCallback(() => setOpen((open) => !open), []);

  useEffect(() => {}, [cartItemInfo, state.cart?.length]);

  const handleAddToCart = async (qty: number, productId: number) => {
    if (session?.user) {
      let addCartItems: addCartItem[] = [];

      const addCartItem: addCartItem = { productId, qty, isSampleQty: false };

      addCartItems.push(addCartItem);

      const payload = {
        customerId: session?.user?.name?.userData?.id,
        cartItems: addCartItems,
      };
      const response = await api2.addCartItem(payload);

      console.log(response);
    } else {
      dispatch({ type: "LOGIN_POPUP", payload: true });
    }
  };

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

    if (productInfo.productType == "configurable") {
      router.push(`/product/${slug}`);
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

  const addProductWishList = async () => {
    const payload = {
      customerId: session?.user?.name?.userData?.id,
      productId: id,
      relationType: "WISHLIST",
    };
    await wishlist
      .saveWishList(session, payload)
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {});

    const wishList = await wishlist.getWishList(session);
    dispatch({ type: "WISHLIST", payload: wishList });
  };

  const removeProductWishList = async () => {
    const payload = state.wishList?.find((o) => o.productId == id);
    await wishlist
      .removeWishList(session, payload?.id)
      .then((res) => {
        setToggleHeart(true);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {});
    const wishList = await wishlist.getWishList(session);
    dispatch({ type: "WISHLIST", payload: wishList });
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

  return (
    <>
      <Wrapper borderRadius={8} {...props}>
        <div className="image-holder">
          <FlexBox className="extra-icons">
            <HeartIcon
              onClick={() =>
                state.wishList?.find((o) => o.productId == id)
                  ? removeProductWishList()
                  : addProductWishList()
              }
              style={{
                color: state.wishList?.find((o) => o.productId == id)
                  ? "#FF0000"
                  : "#000000",
              }}
              className="favorite-icon outlined-icon"
              variant="small"
            >
              {state.wishList?.find((o) => o.productId == id)
                ? "heart_filled"
                : "heart"}
            </HeartIcon>
          </FlexBox>

          <Link href={`/product/${slug}`}>
            {/* <Typography>
              {images?.length > 0 && images[0].mediaPath ? images[0].mediaPath  : "/assets/images/products/needibay/dummy_box.png"}
            </Typography> */}
            <img
              alt={title}
              className="image"
              src={
                images?.length > 0 && images[0].mediaPath
                  ? images[0].mediaPath
                  : "/assets/images/products/needibay/dummy_box.png"
              }
            />
          </Link>
        </div>

        <div className="details">
          <FlexBox paddingLeft={"1rem"}>
            <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
              <Link href={`/product/${slug}`}>
                <H3
                  title={title}
                  className={`${quicksand.className} title`}
                  fontSize="1.345rem"
                  textAlign="left"
                  fontWeight="600"
                  color="text.tertiary"
                >
                  {title}
                </H3>
              </Link>

              <FlexBox alignItems="center">
                <SemiSpan
                  className={quicksand.className}
                  fontSize={"1.41rem"}
                  fontWeight="700"
                  color="primary.main2"
                >
                  {price}
                </SemiSpan>
                <SemiSpan
                  className={quicksand.className}
                  mt="0.35rem"
                  fontWeight={"400"}
                >
                  /unit
                </SemiSpan>
                <SemiSpan
                  color="text.muted"
                  fontWeight="600"
                  mt="0.35rem"
                  ml="0.5rem"
                >
                  +
                </SemiSpan>
                <SemiSpan
                  color="text.muted"
                  fontWeight="600"
                  mt="0.35rem"
                  ml="0.1rem"
                >
                  <p
                    className={quicksand.className}
                  >{`${productInfo.taxPercent}% GST`}</p>
                </SemiSpan>
              </FlexBox>
            </Box>
          </FlexBox>
        </div>
        <FlexBox paddingLeft={"1rem"} alignItems="center">
          <Paragraph
            color="primary.box2"
            className={quicksand.className}
            fontWeight="600"
          ></Paragraph>
        </FlexBox>
        <Box px={3}>
          {isAdded ? (
            <FlexBox justifyContent={"center"}>
              <FlexBox
                height="3rem"
                border="4px solid #C4A4FF"
                borderRadius="0.625rem"
                width="90%"
                alignItems="center"
                justifyContent={"space-around"}
                marginTop={"1rem"}
                marginBottom={"1rem"}
              >
                <Button
                  p="9px"
                  size="small"
                  onClick={() =>
                    handleUpdateItemQty(
                      cartItemInfo?.qty - 1,
                      id,
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
                    {productInfo.productType != "configurable" &&
                      productInfo.minOrderQty && (
                        <>{`x${productInfo.minOrderQty}`}</>
                      )}
                  </Span>
                </H3>
                <Button
                  p="9px"
                  size="small"
                  onClick={() =>
                    handleUpdateItemQty(
                      cartItemInfo?.qty + 1,
                      id,
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
                  height="3rem"
                  onClick={() => handleAddItemInExistingCart(1, id, cartId)}
                  size="small"
                  py={"1rem"}
                  color="primary"
                  variant="contained"
                  disabled={
                    state.buttonState?.name == "ADD_TO_CART_BUTTON_" + id &&
                    state.buttonState?.state == true
                  }
                >
                  {state.buttonState?.name == "ADD_TO_CART_BUTTON_" + id &&
                  state.buttonState?.state == true ? (
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      alignItems={"center"}
                    >
                      <CircularProgress color="inherit" size={20} />
                      &nbsp;
                      <Typography
                        fontSize="1.25rem"
                        className={overpass.className}
                      >
                        Adding to Cart...
                      </Typography>
                    </Box>
                  ) : (
                    <Typography
                      fontSize="1.25rem"
                      className={overpass.className}
                    >
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
                  onClick={() => handleAddItemInExistingCart(1, id, cartId)}
                  size="small"
                  py={"1rem"}
                  color="primary"
                  variant="contained"
                  disabled={
                    state.buttonState?.name == "ADD_TO_CART_BUTTON_" + id &&
                    state.buttonState?.state == true
                  }
                >
                  {state.buttonState?.name == "ADD_TO_CART_BUTTON_" + id &&
                  state.buttonState?.state == true ? (
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      alignItems={"center"}
                    >
                      <CircularProgress color="inherit" size={20} />
                      &nbsp;
                      <Typography
                        fontSize="1.25rem"
                        className={overpass.className}
                      >
                        Adding to Cart...
                      </Typography>
                    </Box>
                  ) : (
                    <Typography
                      fontSize="1.25rem"
                      className={overpass.className}
                    >
                      Add to Cart
                    </Typography>
                  )}
                </HoverButton>
              )}
            </>
          )}
        </Box>
      </Wrapper>

      <ProductQuickView
        open={open}
        onClose={toggleDialog}
        product={{ images, title, price, id: id as number | string, slug }}
      />
    </>
  );
};

export default ProductCard1;
