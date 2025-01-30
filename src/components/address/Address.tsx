"use client";
import TableRow from "@component/TableRow";
import { H5 } from "@component/Typography";
import Hidden from "@component/hidden";
import React, { useState } from "react";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";

const Address = ({ }) => {
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
                      marginLeft={'3rem'}
            textAlign='left'>
            Name
          </H5>

          <H5
            color='text.muted'
            my='0px'
            mx='6px'
            fontSize={"0.937rem"}
            fontWeight={500}
            textAlign='left'>
            Address
          </H5>

          <H5
            color='text.muted'
            my='0px'
            fontSize={"0.937rem"}
            fontWeight={500}
            mx='6px'
            textAlign='left'>
            Phone Number
          </H5>

          <H5
            color='text.muted'
            my='0px'
            fontSize={"0.937rem"}
            fontWeight={500}
            mx='6px'
            textAlign='left'>
            Person Name
          </H5>
        </TableRow>
      </Hidden>
    </>
  );
};

export default Address;
