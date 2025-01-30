"use client";

import { Fragment } from "react";
import { useAppContext } from "@context/AppContext";

import { format } from "date-fns";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { currency } from "@utils/utils";
import Divider from "@component/Divider";
import Icon from "@component/icon/Icon";
import Image from "@component/Image";
import { overpass } from "@utils/fonts";
import Link from "next/link";
import FlexBox from "@component/FlexBox";
import OrderListButton from "@component/orders/OrderListButton";
import Typography, { H5, H6, Paragraph } from "@component/Typography";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import OrderStatus from "@component/orders/OrderStatus";

import { roboto } from "@utils/fonts";
import Button from "@component/buttons/Button";
import ProductCard77 from "@component/product-cards/ProductCard7(7)";

import Avatar from "@component/avatar";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import cityList from "@data/cityList";
import stateList from "@data/stateList";
import zipcodeList from "@data/zipcodeList";

const OrderDetailSection = ({ order }) => {
  const { state } = useAppContext();

  const DashDivider = styled(Box)`
    height: 2px;
    width: 100%;
    border: 1px dashed #ababab;
  `;

  return (
    <>
      <MediaQuery minWidth={1024}>
        <Box backgroundColor={"white"} padding={"2rem"}>
          <DashboardPageHeader
            title="Order Details"
            iconName="bag_filled"
            order={true}
            id={order?.id}
            orderID={order?.incrementId}
            orderDetail={true}
            orderDate={format(new Date(order?.createdAt), "dd MMM, yyyy")}
            button={<OrderListButton />}
          />

          <OrderStatus />

          <FlexBox
            bg="#F3F3F3"
            width="100%"
            padding="0.5rem"
            justifyContent={"space-around"}
            borderRadius={"0.43rem"}
          >
            <Box></Box>
            <Box>
              <Typography
                fontSize={"1rem"}
                fontWeight={500}
                color="#656565"
                lineHeight={"normal"}
                className={roboto.className}
              >
                Product Name
              </Typography>
            </Box>
            <Box>
              <Typography
                fontSize={"1rem"}
                fontWeight={500}
                lineHeight={"normal"}
                color="#656565"
                marginLeft={"3rem"}
                className={roboto.className}
              >
                Quantity
              </Typography>
            </Box>
            <Box>
              <Typography
                fontSize={"1rem"}
                fontWeight={500}
                color="#656565"
                lineHeight={"normal"}
                marginLeft={"0.5rem"}
                className={roboto.className}
              >
                Price
              </Typography>
            </Box>

            <Box width="139px"></Box>
          </FlexBox>

          {order?.salesOrderItem.map((item) => (
            <FlexBox
              marginBottom={"2rem"}
              mt="2rem"
              py={2}
              width="100%"
              border="1px solid #B0B0B0"
              justifyContent={"space-around"}
              alignItems={"center"}
              borderRadius={"0.43rem"}
            >
              <Box>
                <Avatar src={item?.productImageDefault} size={38} />
              </Box>

              <Box width="10%">
                <Typography
                  className={roboto.className}
                  fontSize={"1rem"}
                  fontWeight={500}
                  color="#484848"
                  lineHeight={"normal"}
                >
                  {item?.productName}
                </Typography>
              </Box>

              <Box paddingRight={"2rem"} width="10%">
                <Typography
                  className={roboto.className}
                  fontSize={"1rem"}
                  fontWeight={500}
                  color="#484848"
                  lineHeight={"normal"}
                >
                  {item?.qty}
                </Typography>
              </Box>

              <Box width="10%">
                <Typography
                  className={roboto.className}
                  fontSize={"1rem"}
                  fontWeight={500}
                  color="#484848"
                  lineHeight={"normal"}
                >
                  {currency(item?.rowTotal)}
                </Typography>
              </Box>

              <Box width="10%">
                <Button borderRadius="1rem" color="primary" variant="contained">
                  Raise a Ticket
                </Button>
              </Box>
            </FlexBox>
          ))}
          <Grid container spacing={6}>
            <Grid item mt="2rem" lg={6} md={6} xs={12}>
              <Box p="20px 30px" border="1px solid #B0B0B0" borderRadius={8}>
                <H5 mt="0px" mb="10px">
                  Delivery Address
                </H5>

                <Paragraph fontSize="14px" my="0px">
                  {order?.shippingAddressDetails?.addressLineOne}
                </Paragraph>
                <Paragraph fontSize="14px" my="0px">
                  {`${
                    cityList.filter(
                      (data) =>
                        data.value == order?.shippingAddressDetails?.city
                    )[0].label
                  },
                  ${
                    stateList.filter(
                      (data) =>
                        data.value == order?.shippingAddressDetails?.state
                    )[0].label
                  }, ${
                    zipcodeList.filter(
                      (data) =>
                        data.value == order?.shippingAddressDetails?.zipcode
                    )[0].label
                  }`}
                </Paragraph>

                <Box mt="2rem">
                  <H5 color="#484848" fontSize={"1rem"}>
                    Transaction Details
                  </H5>
                  <FlexBox marginTop="0.5rem" alignItems={"center"}>
                    <Box>
                      <Typography color="#A5A5A5" fontSize={"0.9rem"}>
                        Id:
                      </Typography>
                    </Box>
                    <Box marginLeft={"0.5rem"}>
                      <Typography color="#3B3B3B" fontSize={"0.9rem"}>
                        {order?.incrementId}
                      </Typography>
                    </Box>
                    <Box marginLeft={"2rem"}>
                      <Typography color="#A5A5A5" fontSize={"0.9rem"}>
                        Date
                      </Typography>
                    </Box>
                    <Box marginLeft={"0.5rem"}>
                      <Typography color="#3B3B3B" fontSize={"0.9rem"}>
                        {format(new Date(order?.createdAt), "dd MMM, yyyy")}
                      </Typography>
                    </Box>
                  </FlexBox>

                  <FlexBox marginTop={"0.3rem"}>
                    <Box>
                      <Typography color="#A5A5A5" fontSize={"0.9rem"}>
                        Mode:
                      </Typography>
                    </Box>
                    <Box marginLeft={"0.5rem"}>
                      <Typography color="#3B3B3B" fontSize={"0.9rem"}>
                        Netbanking
                      </Typography>
                    </Box>
                  </FlexBox>
                </Box>
              </Box>
            </Grid>

            <Grid item lg={6} md={6} xs={12}>
              <Box
                height="234px"
                p="20px 30px"
                border="1px solid #B0B0B0"
                borderRadius={8}
              >
                <H5 mt="0px" mb="14px">
                  Total Summary
                </H5>

                <FlexBox
                  justifyContent="space-between"
                  alignItems="center"
                  mb="0.5rem"
                >
                  <Typography fontSize="14px" color="text.hint">
                    Subtotal:
                  </Typography>

                  <H6 my="0px">{currency(order?.subtotal)}</H6>
                </FlexBox>

                <FlexBox
                  justifyContent="space-between"
                  alignItems="center"
                  mb="0.5rem"
                >
                  <Typography fontSize="14px" color="text.hint">
                    Tax:
                  </Typography>

                  <H6 my="0px">
                    {currency(order?.grandTotal - order?.subtotal)}
                  </H6>
                </FlexBox>

                {/* <FlexBox
                  justifyContent="space-between"
                  alignItems="center"
                  mb="0.5rem"
                >
                  <Typography fontSize="14px" color="text.hint">
                    Shipping fee:
                  </Typography>

                  <H6 my="0px">$10</H6>
                </FlexBox> */}

                {order?.isDiscountApplied && (
                  <FlexBox
                    justifyContent="space-between"
                    alignItems="center"
                    mb="0.5rem"
                  >
                    <Typography fontSize="14px" color="text.hint">
                      Discount:
                    </Typography>

                    <H6 my="0px">-${order?.discountAmount}</H6>
                  </FlexBox>
                )}

                <Divider mb="0.5rem" />

                <FlexBox
                  justifyContent="space-between"
                  alignItems="center"
                  mb="1rem"
                >
                  <H6 my="0px">Total</H6>
                  <H6 my="0px">{currency(order?.grandTotal)}</H6>
                </FlexBox>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </MediaQuery>
      <MediaQuery maxWidth={1023}>
        <Box mb="1rem" backgroundColor={"white"} paddingBottom={"2rem"}>
          <FlexBox
            flexDirection="column"
            alignItems="center"
            padding={"1rem"}
            justifyContent="center"
          >
            <Typography
              color={"#858585"}
              fontWeight={500}
              className={roboto.className}
              fontSize={"1.125rem"}
            >
              Orders
            </Typography>

            <Typography
              color={"#484848"}
              fontWeight={500}
              className={roboto.className}
              fontSize={"1.125rem"}
            >
              Order Id: #{order?.incrementId}
            </Typography>
            <Typography
              color={"#21A700"}
              fontWeight={500}
              className={roboto.className}
              fontSize={"1.125rem"}
            >
              Delivery By Nov 1’2023
            </Typography>
          </FlexBox>
          <OrderStatus />
          <Box padding="0.5rem">
            <FlexBox justifyContent="space-between" width="100%">
              <FlexBox>
                <Typography
                  className={roboto.className}
                  fontSize={"0.81rem"}
                  color="#A5A5A5"
                >
                  Placed on:
                </Typography>
                <Typography
                  className={roboto.className}
                  ml="0.25rem"
                  fontSize={"0.81rem"}
                  fontWeight={500}
                  color="#373737"
                >
                  {format(new Date(order?.createdAt), "dd MMM, yyyy")}
                </Typography>
              </FlexBox>

              <Link href={`/invoice/${order?.id}`} target="_blank">
                <FlexBox>
                  <Typography
                    color="primary.main"
                    fontWeight={500}
                    className={roboto.className}
                  >
                    Invoice
                  </Typography>
                  <Icon color="primary">download-2</Icon>
                </FlexBox>
              </Link>
            </FlexBox>
            {order?.salesOrderItem.map((item) => (
              <FlexBox
                mt="0.75rem"
                borderRadius={"0.23931rem"}
                border="1px solid #D0D0D0"
              >
                <Box>
                  <Avatar src={item?.productImageDefault} size={38} />
                </Box>

                <FlexBox
                  width="100%"
                  minWidth="0px"
                  paddingLeft={10}
                  flexDirection="column"
                  className="product-details"
                  justifyContent="center"
                >
                  <Typography
                    className={`${roboto.className} title `}
                    fontWeight="600"
                    fontSize="0.9rem"
                  >
                    {item.productName}
                  </Typography>

                  <FlexBox alignItems="flex-start">
                    <FlexBox alignItems="center">
                      <Typography
                        className={`${overpass.className}`}
                        color="green.100"
                        fontSize={"0.98rem"}
                        fontWeight={"700"}
                        mr="0.5rem"
                      >
                        {currency(item?.rowTotal)}
                      </Typography>

                      <Typography
                        fontWeight={600}
                        className={`${overpass.className}`}
                        color="gray.777"
                        fontSize={"0.7rem"}
                        mr="1rem"
                      >
                        + 18%(GST)
                      </Typography>
                    </FlexBox>
                    <Box>
                      <Typography
                        color="#414141"
                        fontWeight={600}
                        className={roboto.className}
                      >
                        Qty: {item?.qty}
                      </Typography>
                    </Box>
                  </FlexBox>
                </FlexBox>
              </FlexBox>
            ))}

            <FlexBox mt="0.5rem" justifyContent={"flex-end"}>
              <Typography
                color="primary.main"
                fontWeight={500}
                className={roboto.className}
              >
                Raise a ticket
              </Typography>
            </FlexBox>
          </Box>
          <Box padding="1rem">
            <FlexBox mt="1rem" mb="0.5rem" justifyContent={"space-between"}>
              <Typography
                fontSize={"1rem"}
                className={roboto.className}
                fontWeight={300}
                color="product_detail.grey3"
              >
                Sub Total
              </Typography>
              <Typography
                fontSize={"1.08rem"}
                fontWeight={300}
                className={roboto.className}
                color="product_detail.grey3"
              >
                {currency(order?.subtotal)}
              </Typography>
            </FlexBox>

            {/*    <FlexBox mt="1rem" mb="0.5rem" justifyContent={"space-between"}>
              <Typography
                fontSize={"0.93rem"}
                className={roboto.className}
                fontWeight={700}
                color="product_detail.grey3"
              >
                Shipping
              </Typography>
              <Typography
                fontSize={"1.08rem"}
                fontWeight={400}
                className={roboto.className}
                color="product_detail.grey3"
              >
                Free
              </Typography>
            </FlexBox> */}

            {order?.isDiscountApplied && (
              <FlexBox mt="1rem" mb="0.5rem" justifyContent={"space-between"}>
                <Typography
                  fontSize={"0.93rem"}
                  className={roboto.className}
                  fontWeight={700}
                  color="product_detail.grey"
                >
                  Discount
                </Typography>
                <Typography
                  fontSize={"1.08rem"}
                  fontWeight={400}
                  className={roboto.className}
                  color="product_detail.grey3"
                >
                  {currency(order?.discountAmount)}
                </Typography>
              </FlexBox>
            )}
            <FlexBox mt="1rem" mb="0.5rem" justifyContent={"space-between"}>
              <Typography
                fontSize={"0.93rem"}
                className={roboto.className}
                fontWeight={300}
                color="product_detail.grey"
              >
                Tax
              </Typography>
              <Typography
                fontSize={"1.08rem"}
                fontWeight={400}
                className={roboto.className}
                color="product_detail.grey3"
              >
                {currency(order?.grandTotal - order?.subtotal)}
              </Typography>
            </FlexBox>

            <FlexBox mt="1rem" mb="0.5rem" justifyContent="center">
              <DashDivider />
            </FlexBox>

            <FlexBox mt="1rem" mb="0.5rem" justifyContent={"space-between"}>
              <Typography
                fontSize={"1rem"}
                className={roboto.className}
                fontWeight={700}
                color="product_detail.grey3"
              >
                Grand Total
              </Typography>
              <Typography
                fontSize={"1rem"}
                fontWeight={700}
                className={roboto.className}
                color="product_detail.green"
              >
                {currency(order?.grandTotal)}
              </Typography>
            </FlexBox>
            <FlexBox mt="1rem" mb="0.5rem" justifyContent="center">
              <DashDivider />
            </FlexBox>
          </Box>
          <Box
            margin="1rem"
            p="20px 30px"
            border="1px solid #B0B0B0"
            borderRadius={8}
          >
            <Typography
              mt="-10px"
              className={roboto.className}
              fontWeight={500}
              mb="14px"
            >
              Delivery Address
            </Typography>

            <Typography fontSize={"0.75rem"} color="#A5A5A5">
              {order?.shippingAddressDetails?.addressLineOne}
            </Typography>
            <Typography fontSize={"0.75rem"} color="#A5A5A5">
              {`${
                cityList.filter(
                  (data) => data.value == order?.shippingAddressDetails?.city
                )[0].label
              },
                  ${
                    stateList.filter(
                      (data) =>
                        data.value == order?.shippingAddressDetails?.state
                    )[0].label
                  }, ${
                zipcodeList.filter(
                  (data) => data.value == order?.shippingAddressDetails?.zipcode
                )[0].label
              }`}
            </Typography>

            <Typography
              mt="10px"
              className={roboto.className}
              fontWeight={500}
              mb="14px"
            >
              Transaction Details
            </Typography>
            <FlexBox>
              <Typography
                className={roboto.className}
                fontSize={"0.81rem"}
                color="#A5A5A5"
              >
                Id:
              </Typography>
              <Typography
                className={roboto.className}
                ml="0.25rem"
                fontSize={"0.81rem"}
                fontWeight={500}
                color="#373737"
              >
                {order?.incrementId}
              </Typography>
            </FlexBox>

            <FlexBox>
              <Typography
                className={roboto.className}
                fontSize={"0.81rem"}
                color="#A5A5A5"
              >
                Date:
              </Typography>
              <Typography
                className={roboto.className}
                ml="0.25rem"
                fontSize={"0.81rem"}
                fontWeight={500}
                color="#373737"
              >
                {format(new Date(order?.createdAt), "dd MMM, yyyy")}
              </Typography>
            </FlexBox>
          </Box>
        </Box>
      </MediaQuery>
    </>
  );
};

export default OrderDetailSection;
