"use client";
import React, { useEffect, useState } from "react";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import OrdersPagination from "@component/orders/OrdersPagination";
import Box from "@component/Box";
import { roboto } from "@utils/fonts";
import OrderMobileCard from "@component/orders/OrderMobileCard";
import MediaQuery from "react-responsive";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import Orders from "@component/orders/Orders";
import orders from "@utils/__api__/orders";
import { useSession } from "next-auth/react";
import { useAppContext } from "@context/AppContext";
import { useMediaQuery } from "@mui/material";
import Image from "@component/Image";

const OrderSection = () => {
  const { data: session } = useSession();
  const { state, dispatch } = useAppContext();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10); // Fixed page size
  const [totalPages, setTotalPages] = useState(0);
  const [orderss, setOrders] = useState([]);
  const isMobile = useMediaQuery("(max-width:767px)");

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await orders
        .getOrderByCustomerId(session, currentPage, pageSize)
        .then((res) => {
          setOrders(res.content);
          setTotalPages(res.totalPages);
          dispatch({ type: "CUSTOMER_ORDERS", payload: res.content });
        });
    };

    fetchOrders()
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      });
  }, [currentPage, pageSize, session, dispatch]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <MediaQuery minWidth={768}>
        <Box marginBottom={"2rem"} backgroundColor={"white"} padding="1rem">
          {state?.customerOrders ? (
            <>
              <DashboardPageHeader
                title="Orders"
                order={true}
                subheading="orders"
                iconName="bag_filled"
              />
              <Orders orderList={state?.customerOrders} />
            </>
          ) : (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              height={500}
            >
              <Image
                src="/assets/images/order-not-found.png"
                width={100}
                height={100}
              />

              <Typography
                color={"#858585"}
                fontWeight={500}
                className={roboto.className}
                fontSize={"1.125rem"}
              >
                No Order Found
              </Typography>
            </Box>
          )}
        </Box>
      </MediaQuery>

      <MediaQuery maxWidth={767}>
        <Box paddingLeft={"0rem"} marginBottom="2rem" backgroundColor={"white"}>
          {state?.customerOrders ? (
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
              {state?.customerOrders && state.customerOrders.length > 0 ? (
                state.customerOrders.map((item) => (
                  <OrderMobileCard key={item.id} order={item} />
                ))
              ) : (
                <Typography
                  color={"#858585"}
                  fontWeight={500}
                  className={roboto.className}
                  fontSize={"1rem"}
                  marginTop="1rem"
                >
                  No orders available.
                </Typography>
              )}
              <OrdersPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </FlexBox>
          ) : (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              height={500}
            >
              <Image
                src="/assets/images/order-not-found.png"
                width={100}
                height={100}
              />

              <Typography
                color={"#858585"}
                className={roboto.className}
                fontSize={"1.125rem"}
              >
                No Order Found
              </Typography>
            </Box>
          )}
        </Box>
      </MediaQuery>
    </>
  );
};

export default OrderSection;
