"use client";
import React from "react";
import FlexBox from "@component/FlexBox";
import Pagination from "@component/pagination";

const OrdersPagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <FlexBox justifyContent="center" mt="2.5rem">
      <Pagination
        pageCount={totalPages} // total number of pages
        onChange={(newPage) => onPageChange(newPage)} // handle page change
      />
    </FlexBox>
  );
};

export default OrdersPagination;
