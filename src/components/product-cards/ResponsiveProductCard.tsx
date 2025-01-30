"use client";
import Box from "@component/Box";
import { Button } from "@component/buttons";
import Card, { CardProps } from "@component/Card";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import Image from "@component/Image";
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
import { quicksand } from "@utils/fonts";
import { currency, getTheme } from "@utils/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { overpass } from "../../utils/fonts";

// styled component

const HeartIcon = styled(Icon)`
  transition: transform 0.3s ease-in-out;
  &:active {
    animation: clickHeart 0.3s;
  }
`;
const Wrapper = styled(Card)`
  margin-top: 0.7rem;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  transition: all 250ms ease-in-out;

  @media only screen and (max-width: ${deviceSize.sm}px) {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  &:hover {
    .details {
      .add-cart {
        display: flex;
      }
    }
    .image-holder {
      .extra-icons {
        display: block;
      }
    }
  }

  .break {
    flex-basis: 100%;
    width: 0px;
    height: 0px;
    overflow: hidden;
  }

  .image {
    @media only screen and (max-width: ${deviceSize.sm}px) {
      width: 8rem;
      height: 8rem;
    }
  }
  .image-holder {
    text-align: center;
    position: relative;
    display: inline-block;
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
      display: flex;
      justify-content: center;
      align-items: center;
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
      .title {
        font-size: 1rem;
      }
      .price {
        font-size: 1.4rem;
      }
      .box {
        font-size: 0.7rem;
      }
    }

    .sold {
      font-size: 0.7rem;
    }
  }
`;

// =======================================================================
interface ResponsiveProductCardProps extends CardProps {
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
}
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
// =======================================================================

const ResponsiveProductCard: FC<ResponsiveProductCardProps> = ({
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
  ...props
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useAppContext();
  const [toggleHeart, setToggleHeart] = useState(false);
  const cartItem = state.cart?.find((item) => item.id === id);

  const toggleDialog = useCallback(() => setOpen((open) => !open), []);

  const handleCartAmountChange = (amount: number) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        id: id as number | string,
        slug,
        price,
        //imgUrl,
        name: title,
        qty: amount,
      },
    });
  };

  const addProductWishList = async () => {
    const payload = {
      customerId: session?.user?.name?.userData?.id,
      productId: id,
      relationType: "WISHLIST",
    };
    await wishlist
      .saveWishList(session, payload)
      .then((res) => {
        toast.success("Product added to Wishlist", { theme: "light" });
      })
      .catch((e) => {
        console.log(e);
        toast.error(
          "There is some issue at the moment to add item in the wishlist!",
          { theme: "light" }
        );
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
        toast.success("Product removed to Wishlist", { theme: "light" });
        setToggleHeart(true);
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
            <Image
              alt={title}
              className="image"
              width={5}
              src={
                images?.length > 0 && images[0].mediaPath
                  ? images[0].mediaPath
                  : "/assets/images/products/needibay/dummy_box.png"
              }
              height={5}
              objectFit="none"
              layout="responsive"
            />
          </Link>
        </div>

        <div className="details">
          <FlexBox px={"1rem"}>
            <Box flex="1 1 0" minWidth="0px">
              <Link href={`/product/${slug}`}>
                <H3
                  title={title}
                  className={`${quicksand.className} title`}
                  fontSize="1rem"
                  textAlign="left"
                  fontWeight="600"
                  color="text.tertiary"
                >
                  {title}
                </H3>
              </Link>

              <FlexBox alignItems="center">
                <SemiSpan fontWeight="700" color="primary.main">
                  {currency(price)}
                </SemiSpan>
                <SemiSpan
                  className={`${quicksand.className} box`}
                  fontWeight={"400"}
                >
                  /unit
                </SemiSpan>
                <SemiSpan
                  color="text.muted"
                  className="box"
                  fontWeight="600"
                  ml="0.5rem"
                >
                  +
                </SemiSpan>
                <SemiSpan
                  color="text.muted"
                  fontWeight="600"
                  className="box"
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
        <FlexBox marginTop={"-0.3rem"} paddingLeft={"1rem"} alignItems="center">
          <Paragraph
            color="primary.box2"
            className={`${quicksand.className} sold`}
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
                  size="xxsmall"
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
                  size="xxsmall"
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
                <Button
                  marginTop={"0.7rem"}
                  height={"1rem"}
                  marginBottom={"1rem"}
                  width="100%"
                  size="xxsmall"
                  color="primary"
                  variant="contained"
                  onClick={() => handleAddItemInExistingCart(1, id, cartId)}
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
                        fontSize="0.8rem"
                        className={overpass.className}
                      >
                        Adding...
                      </Typography>
                    </Box>
                  ) : (
                    <Typography
                      fontSize="0.8rem"
                      className={overpass.className}
                    >
                      Add to Cart
                    </Typography>
                  )}
                </Button>
              ) : (
                <Button
                  marginTop={"0.7rem"}
                  height={"1rem"}
                  marginBottom={"1rem"}
                  width="100%"
                  size="xxsmall"
                  color="primary"
                  variant="contained"
                  disabled={
                    state.buttonState?.name == "ADD_TO_CART_BUTTON_" + id &&
                    state.buttonState?.state == true
                  }
                  onClick={() => handleAddItemInExistingCart(1, id, cartId)}
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
                        fontSize="0.8rem"
                        className={overpass.className}
                      >
                        Adding to Cart...
                      </Typography>
                    </Box>
                  ) : (
                    <Typography
                      fontSize="0.8rem"
                      className={overpass.className}
                    >
                      Add to Cart
                    </Typography>
                  )}
                </Button>
              )}
            </>
          )}
        </Box>
        {/* <Box
          className='button'
          px={3}>
          {!cartItem?.qty ? (
            <Button
              marginTop={"0.7rem"}
              height={"1rem"}
              marginBottom={"1rem"}
              width='100%'
              size='xxsmall'
              color='primary'
              onClick={handleCartAmountChange(1)}
              variant='contained'>
              <Typography
                fontSize='0.8rem'
                className={overpass.className}>
                
                Add to Cart
              </Typography>
            </Button>
          ) : (
            <FlexBox justifyContent={"center"}>
              <FlexBox
                border='4px solid #C4A4FF'
                borderRadius='0.625rem'
                width='100%'
                height={"2rem"}
                alignItems='center'
                justifyContent={"center"}
                marginTop={"0.7rem"}
                marginBottom={"1rem"}>
                
                <Button
                  p='8px'
                  size='xxsmall'
                  onClick={handleCartAmountChange(cartItem?.qty - 1)}>
                  <Typography
                    color='#333'
                    fontSize={"2rem"}
                    className={quicksand.className}>
                    -
                  </Typography>
                </Button>
                <H3
                  fontSize={"1rem"}
                  fontWeight='600'
                  mx='10px'>
                  {cartItem?.qty.toString().padStart(1, "0")}
                  <Span
                    className={quicksand.className}
                    fontSize={"0.7rem"}
                    fontWeight={700}>
                    X50
                  </Span>
                </H3>
                <Button
                  p='9px'
                  size='small'
                  onClick={handleCartAmountChange(cartItem?.qty + 1)}>
                  <Typography
                    color='#333'
                    fontSize={"2rem"}
                    className={quicksand.className}>
                    +
                  </Typography>
                </Button>
              </FlexBox>
            </FlexBox>
          )}
        </Box> */}
      </Wrapper>

      <ProductQuickView
        open={open}
        onClose={toggleDialog}
        product={{ images, title, price, id: id as number | string, slug }}
      />
    </>
  );
};

export default ResponsiveProductCard;
