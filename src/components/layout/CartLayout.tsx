"use client";
import { FC, ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Box from "@component/Box";
import Stepper from "../Stepper";
import AppLayout from "./AppLayout";
import Navbar from "../navbar/Navbar";
import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import Sticky from "@component/sticky";
import { Header } from "@component/header";
import Typography from "@component/Typography";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Image from "@component/Image";
import { sans } from "@utils/fonts";
import { products } from "../../__server__/__db__/dashboard/products";
import { variant } from "styled-system";
import Icon from "@component/icon/Icon";
import Button from "@component/buttons/Button";
import styled from "styled-components";
import { useAppContext } from "@context/AppContext";
import EmptyCart from "@component/emptycart";

// ======================================================
type Props = { children: ReactNode };
// ======================================================

const CartLayout: FC<Props> = ({ children }) => {
  const { state, dispatch } = useAppContext();
  useEffect(() => {
    dispatch({type: "UPDATE_PAGE_LOADER", payload: false})
    dispatch({type: "UPDATE_BUTTON_STATE", payload: {name: "",  state : false}})
  }, [])
  return (
    <AppLayout navbar={<Navbar />}>
      {state?.cart?.length > 0 ? (
        <Container>{children}</Container>
      ) : (
        <EmptyCart />
      )}
    </AppLayout>
  );
};
export default CartLayout;
