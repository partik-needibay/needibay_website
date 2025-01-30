"use client";
import { FC } from "react";
import Link from "next/link";
import { format } from "date-fns";
import Box from "@component/Box";
import { Chip } from "@component/Chip";
import Hidden from "@component/hidden";
import Icon from "@component/icon/Icon";
import TableRow from "@component/TableRow";
import { IconButton } from "@component/buttons";
import Typography, { H5, Small } from "@component/Typography";
import { currency } from "@utils/utils";
import Image from "@component/Image";
import Order from "@models/order.model";
import { roboto } from "@utils/fonts";
import styled from "styled-components";
import { useMediaQuery } from "@mui/material";

// =================================================
type OrderRowProps = { order: any };
// =================================================

const ResponsiveTableRow = styled(TableRow)`
  @media only screen and (max-width: 768px) {
    font-size: 0.7rem;
    .id1 {
      font-size: 0.8rem;
    }
    .create-date {
      display: none;
    }
    .status {
      display: none;
    }
  }
`;

const OrderRow: FC<OrderRowProps> = ({ order }) => {
  const isMobile = useMediaQuery("(max-width:767px)");
  const getColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "secondary";
      case "Processing":
        return "secondary";
      case "Delivered":
        return "success";
      case "Cancelled":
        return "error";
      default:
        return "";
    }
  };

  return (
    <Link
      href={`/orders/${order.id}`}
      passHref
      style={{ width: isMobile ? "100%" : "auto" }}
    >
      <ResponsiveTableRow my="1rem" padding="0.5rem">
        <H5 m="6px" className="id1" textAlign="left">
          #{order.incrementId}
        </H5>

        <Typography
          color="#484848"
          className={`create-date ${roboto.className}`}
          fontWeight={500}
          textAlign="left"
        >
          {format(new Date(order.createdAt), "MMM dd, yyyy")}
        </Typography>
        <Chip
          p="0.25rem 1rem"
          bg={`${order?.orderStatus?.backgroundColorCode}`}
        >
          <Small color={`${order?.orderStatus?.textColorCode}`}>
            {order?.orderStatus?.label}
          </Small>
        </Chip>

        <Typography
          m="6px"
          color="#484848"
          className={roboto.className}
          fontWeight={500}
          textAlign="left"
        >
          {currency(order.grandTotal)}
        </Typography>

        <Typography
          color={`${getColor("Pending")}.dark`}
          className={`status ${roboto.className}`}
          fontSize={"0.937rem"}
          fontWeight={500}
        >
          Pending
        </Typography>

        <Typography
          className={` flex grow pre ${roboto.className}`}
          m="6px"
          color="#484848"
          fontWeight={500}
          textAlign="left"
        >
          {format(new Date(order.createdAt), "MMM dd, yyyy")}
        </Typography>

        <Hidden flex="0 0 0 !important" down={769}>
          <Typography textAlign="left" color="text.muted">
            <Image
              src="/assets/images/orders/right.png"
              width="0.62rem"
              height="0.62rem"
            />
          </Typography>
        </Hidden>
      </ResponsiveTableRow>
    </Link>
  );
};

export default OrderRow;
