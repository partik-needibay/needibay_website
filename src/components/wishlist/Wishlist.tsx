"use client";
import TableRow from "@component/TableRow";
import { H5 } from "@component/Typography";
import Hidden from "@component/hidden";
import React, { useState } from "react";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";

const Wishlist = ({}) => {
  return (
    <>
      <Hidden down={769}>
        <TableRow
          boxShadow='none'
          padding='0.5rem   '
          mb='2rem'
          borderRadius={"0.4375rem"}
          backgroundColor='#F3F3F3'>
          <H5
            color='text.muted'
            my='0px'
            fontSize={"0.937rem"}
            fontWeight={500}
            marginLeft={"3rem"}
            textAlign='left'>
            Product Name
          </H5>

          <H5
            color='text.muted'
            my='0px'
            mx='6px'
            fontSize={"0.937rem"}
            fontWeight={500}
            textAlign='left'>
            Unit Price
          </H5>

          <H5
            color='text.muted'
            my='0px'
            fontSize={"0.937rem"}
            fontWeight={500}
            marginRight='8rem'
            textAlign='left'>
            Stock Status
          </H5>
          <H5
            flex='1 1 0 !important'
            color='text.muted'
            my='0px'
          />

        </TableRow>
      </Hidden>
    </>
  );
};

export default Wishlist;
