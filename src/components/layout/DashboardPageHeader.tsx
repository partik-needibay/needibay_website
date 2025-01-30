"use client";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Image from "@component/Image";
import Typography, { H2 } from "@component/Typography";
import Button from "@component/buttons/Button";
import { useAppContext } from "@context/AppContext";
import useWindowSize from "@hook/useWindowSize";
import { roboto } from "@utils/fonts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";

export interface DashboardPageHeaderProps {
  iconName?: string;
  title?: string;
  subheading?: string;
  orderDate?: string;
  button?: any;
  order?: boolean;
  firstName?: string;
  orderID?: string;
  orderDetail?: boolean;
  lastName?: string;
  id?: any;
  address?: boolean;
  wishlist?:boolean;
  enquiries?:boolean;
  addressCount?:string;
  enquiriesCount?:string;
}

const DashboardPageHeader: FC<DashboardPageHeaderProps> = ({
  iconName,
  title,
  button,
  order,
  orderDate,
  orderDetail,
  orderID,
  wishlist,
  address,
  addressCount,
  enquiries,
  enquiriesCount,
  subheading,
  firstName,
  lastName,
  id,
}) => {
  const width: any = useWindowSize();
  const isTablet = width < 1025;
  const { state, dispatch } = useAppContext();
  const { push } = useRouter();
  const wishlistCount =  state.wishList?.length


  const getItemsFoundText = () => {
    // Dynamically return "Orders found" or "Addresses found"
    if (order) {
      return `${state?.customerOrders?.length || 0} Orders found`;
    }
    if (address) {
      return `${addressCount || 0} Addresses found`;
    }
    if (wishlist) {
      return `${wishlistCount || 0} Items found`;
    }
    if (enquiries) {
      return `${enquiriesCount || 0} Enquiries found`;
    }
    return "";
  };

  return (
    <Box padding={order ? "0rem" : "2rem"} paddingBottom={"2rem"} mb="1.5rem">
      <FlexBox justifyContent="space-between" alignItems="center" mt="1rem">
        <Box width="100%">
          {orderDetail ? (
            <FlexBox alignItems="center" justifyContent={"space-between"}>
              <H2
                className={roboto.className}
                fontSize="1.5rem"
                fontWeight={500}
                marginLeft={"12px"}
                my="0px"
                lineHeight="1"
                whitespace="pre"
              >
                {title}
              </H2>
              <Link href={`/invoice/${id}`} target="_blank">
                <Button
                  borderRadius="1rem"
                  color="primary"
                  size="small"
                  variant="contained"
                >
                  Invoice{" "}
                  <Image
                    width="1rem"
                    height="1rem"
                    src="/assets/images/orders/invoice.png"
                  />
                </Button>
              </Link>
            </FlexBox>
          ) : (
            <>
              <FlexBox
                justifyContent="space-between"
                alignItems="center"
                mt="1rem"
              >
                <H2
                  className={roboto.className}
                  fontSize="1.5rem"
                  fontWeight={500}
                  marginLeft={"12px"}
                  my="0px"
                  lineHeight="1"
                  whitespace="pre"
                >
                  {title}
                </H2>
                <Box mt="1rem">{button}</Box>
              </FlexBox>
            </>
          )}

            {(order || address || wishlist || enquiries) && subheading && (
            <Typography
              className={roboto.className}
              fontSize={"1.125rem"}
              mt="1rem"
              marginLeft={"12px"}
              color="#9F9F9F"
              fontWeight={500}
              lineHeight={"normal"}
            >
              {getItemsFoundText()} {/* Dynamically renders based on order or address */}
            </Typography>
          )}


          {order && orderDetail && (
            <FlexBox>
              <Typography
                className={roboto.className}
                fontSize={"1rem"}
                mt="1rem"
                marginLeft={"12px"}
                color="#484848"
                fontWeight={500}
                lineHeight={"normal"}
              >
                Order ID: #{orderID}
              </Typography>
              <Typography
                className={roboto.className}
                fontSize={"1rem"}
                mt="1rem"
                paddingLeft={"1rem"}
                marginLeft={"12px"}
                color="#484848"
                fontWeight={500}
                lineHeight={"normal"}
              >
                Order Date: {orderDate}
              </Typography>
            </FlexBox>
          )}
        </Box>
      </FlexBox>
    </Box>
  );
};

export default DashboardPageHeader;
