"use client";
import Link from "next/link";
import styled from "styled-components";
import Box from "@component/Box";
import { Chip } from "@component/Chip";
import Hidden from "@component/hidden";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import TableRow from "@component/TableRow";
import { Button, IconButton } from "@component/buttons";
import Typography, { SemiSpan, Small } from "@component/Typography";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Support from "@component/support/SupportHeader";
import { roboto } from "@utils/fonts";
import MediaQuery from "react-responsive";
import ResponsiveBanner from "@component/banners/ResponsiveBanner";
import SupportMobileTicket from "./SupportMobileTicket";

const ResponsiveFlexBox = styled(FlexBox)`
  @media only screen and (max-width: 600px) {
    padding: 0.5rem;

    .text {
      font-size: 0.7rem !important;
      padding: 0.2rem !important;
    }
  }
`;

const SupportTickets = ({ ticketList }) => {
  return (
    <>
      <MediaQuery minWidth={768}>
        <Box
          backgroundColor={"white"}
          padding='2rem'>
          <DashboardPageHeader
            title='Raised Tickets'
            order={true}
            subheading='Tickets'
            iconName='support'
          />

          <Support />

          {ticketList.map((item) => (
            <Link
              href={`/support-tickets/${item.slug}`}
              key={item.id}
              passHref>
              <TableRow
                as='a'
                my='1rem'
                padding='0.5rem'>
                <ResponsiveFlexBox justifyContent={"space-evenly"}>
                  <Typography
                    className={`text ${roboto.className}`}
                    fontSize={"0.9375rem"}
                    fontWeight={500}
                    textAlign={"left"}
                    color='#484848'>
                    372536
                  </Typography>
                  <Typography
                    className={`text ${roboto.className}`}
                    fontSize={"0.9375rem"}
                    fontWeight={500}
                    textAlign={"left"}
                    color='#484848'>
                    Oct 18, 2023
                  </Typography>

                  <Typography
                    className={`text ${roboto.className}`}
                    fontSize={"0.9375rem"}
                    fontWeight={500}
                    textAlign={"left"}
                    color='#484848'>
                    Missing Product
                  </Typography>

                  <Typography
                    className={`text ${roboto.className}`}
                    color={item.status === "Open" ? "#00A31A" : "#FF5B5B"}
                    fontSize={"0.9375rem"}
                    fontWeight={500}>
                    {item.status}
                  </Typography>
                  <Typography
                    className={`text ${roboto.className}`}
                    fontSize={"0.9375rem"}
                    fontWeight={500}
                    textAlign={"left"}
                    color='#484848'>
                    Oct 18, 2023
                  </Typography>
                  <Button
                    borderRadius='2.1875rem'
                    variant='contained'
                    color='warn'>
                    <Typography color='white'>Close</Typography>
                  </Button>
                  <Hidden
                    flex='0 0 0 !important'
                    down={769}>
                    <Typography
                      textAlign='center'
                      color='text.muted'>
                      <IconButton>
                        <Icon
                          variant='small'
                          defaultcolor='currentColor'>
                          arrow-right
                        </Icon>
                      </IconButton>
                    </Typography>
                  </Hidden>
                </ResponsiveFlexBox>
              </TableRow>
            </Link>
          ))}
        </Box>
      </MediaQuery>

      <MediaQuery maxWidth={767}>
        <Box
          paddingLeft={"0rem"}
          marginBottom='2rem'
          backgroundColor={"white"}>
          <FlexBox
            flexDirection='column'
            alignItems='center'
            padding={"1rem"}
            justifyContent='center'>
            <Typography
              color={"#858585"}
              fontWeight={500}
              className={roboto.className}
              fontSize={"1.125rem"}>
              Support Ticket
            </Typography>

            {ticketList.map((item) => (
              <SupportMobileTicket ticket={item} />
            ))}
          </FlexBox>
        </Box>
      </MediaQuery>
    </>
  );
};

export default SupportTickets;
