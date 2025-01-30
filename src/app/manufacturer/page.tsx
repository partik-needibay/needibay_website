"use client";
import FlexBox from "@component/FlexBox";
import styled from "styled-components";
import Box from "@component/Box";
import Image from "@component/Image";
import ManufacturerForm from "@component/manufacturer/ManufacturerForm";

const ResponsiveFlexBox = styled(FlexBox)`
  @media only screen and (max-width: 768px) {
    background-color: white;
  }
`;
const Page = () => {
  return (
    <ResponsiveFlexBox
      padding='2rem'
      justifyContent={"center"}>
      <ManufacturerForm></ManufacturerForm>
    </ResponsiveFlexBox>
  );
};

export default Page;
