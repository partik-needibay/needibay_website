"use client";
import TableRow from "@component/TableRow";
import { H5 } from "@component/Typography";
import Hidden from "@component/hidden";
import React, { useEffect, useState } from "react";
import OrderRow from "./OrderRow";
import OrdersPagination from "./OrdersPagination";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import { useAppContext } from "@context/AppContext";
import orders from "@utils/__api__/orders";
import { useSession } from "next-auth/react";
import { useMediaQuery } from "@mui/material";

const Orders = ({ orderList }) => {
  const { data: session } = useSession();
  const { state, dispatch } = useAppContext();
  const [selectedOption, setSelectedOption] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(10); // Fixed page size
  const isMobile = useMediaQuery("(max-width:767px)");

  const handleOptionClick = async (opt: any) => {
    const respopnse = await orders
      .getOrderByCustomerId(
        session,
        currentPage,
        pageSize,
        opt > 0 ? opt : null
      )
      .then((res) => {
        setTotalPages(res?.totalPages);
        setCurrentPage(res?.number);
        dispatch({ type: "CUSTOMER_ORDERS", payload: res?.content });
        setSelectedOption(opt);
      });
  };

  useEffect(() => {
    handleOptionClick(selectedOption)
  }, [currentPage])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    console.log(
      "==========================Order lInst========================"
    );
    console.log(orderList);
    const fetchOrerStatus = async () => {
      const respopnse = await orders.getOrderStatus().then((res) => {
        const orderStatus = res.filter((o) => o.statusType?.id == 1);
        dispatch({ type: "ORDER_STATUS", payload: orderStatus });
      });
    };
    fetchOrerStatus().catch((e) => {
      console.log(e);
    });
  }, []);

  return (
    <>
      <Hidden down={769}>
        <FlexBox borderColor="gray.400" marginLeft="12px" mb="26px">
          <>
            <H5
              mr="25px"
              className="cursor-pointer"
              borderColor="primary.main"
              onClick={() => handleOptionClick(0)}
              borderBottom={selectedOption === 0 ? "2px solid" : ""}
              color={selectedOption === 0 ? "primary.main" : "#C5C5C5"}
            >
              All Orders
            </H5>
            {state.orderStatus?.length > 0 &&
              state.orderStatus?.map((item) => (
                <H5
                  className="cursor-pointer"
                  borderColor="primary.main"
                  mr="25px"
                  onClick={() => handleOptionClick(item?.id)}
                  borderBottom={selectedOption === item?.id ? "2px solid" : ""}
                  color={
                    selectedOption === item?.id ? "primary.main" : "#C5C5C5"
                  }
                >
                  {item?.status}
                </H5>
              ))}
          </>
        </FlexBox>
      </Hidden>
      <Hidden down={769}>
        <TableRow
          boxShadow="none"
          padding="0.5rem"
          borderRadius={"0.4375rem"}
          backgroundColor="#F3F3F3"
        >
          <H5
            color="text.muted"
            my="0px"
            fontSize={"0.937rem"}
            fontWeight={500}
            marginLeft={isMobile ? "1rem" : "3rem"}
            textAlign="left"
          >
            Id
          </H5>

          <H5
            color="text.muted"
            my="0px"
            mx="6px"
            fontSize={"0.937rem"}
            fontWeight={500}
            textAlign="left"
          >
            Date
          </H5>

          <H5
            color="text.muted"
            my="0px"
            fontSize={"0.937rem"}
            fontWeight={500}
            mx="6px"
            textAlign="left"
          >
            Status
          </H5>

          <H5
            color="text.muted"
            my="0px"
            fontSize={"0.937rem"}
            fontWeight={500}
            mx="6px"
            textAlign="left"
          >
            Total
          </H5>

          <H5
            color="text.muted"
            my="0px"
            mx="6px"
            fontSize={"0.937rem"}
            fontWeight={500}
            textAlign="left"
          >
            Payment
          </H5>

          <H5
            color="text.muted"
            my="0px"
            fontSize={"0.937rem"}
            fontWeight={500}
            marginRight={"3rem"}
            textAlign="center"
          >
            Placed At
          </H5>
        </TableRow>
      </Hidden>

      {orderList?.length > 0 &&
        orderList?.map((item) => <OrderRow order={item} key={item.id} />)}

      <OrdersPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Orders;
