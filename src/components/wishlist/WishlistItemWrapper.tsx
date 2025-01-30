"use client";
import Link from "next/link";
import TableRow from "@component/TableRow";
import Typography from "@component/Typography";
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
import WishlistItem from "./WishlistItem";

const WishlistItemWrappeer = ({ wishListData }) => {
  const { state, dispatch } = useAppContext();
  const { data: session } = useSession();

  return (
    <>
      {state.wishList?.length > 0 &&
        state.wishList?.map((item) => (
          <WishlistItem
            item={item}
            cartItemInfo={
              state.cart?.find((cartItem) => cartItem.productId === item?.productDetails?.id)
                ? state.cart.find((cartItem) => cartItem.productId === item?.productDetails?.id)
                : null
            }
            isAdded={
              state.cart?.find((cartItem) => cartItem.productId === item?.productDetails?.id)
                ? true
                : false
            }
            cartSize={state.cart?.length}
            cartId={state.cartInfo ? state.cartInfo.id : null}
            buttonLoader={
              !state.cart?.find((cartItem) => cartItem.productId === item?.productDetails?.id) &&
              state?.buttonLoader
            }
          />
        ))}
    </>
  );
};

export default WishlistItemWrappeer;
