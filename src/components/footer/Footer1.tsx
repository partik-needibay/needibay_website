"use client";
import { FC, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import Box from "@component/Box";
import Image from "@component/Image";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import AppStore from "@component/AppStore";
import Container from "@component/Container";
import Typography, { Paragraph } from "@component/Typography";
import { getTheme } from "@utils/utils";
import BulkQuantityModal from "@component/products/BulkQuantityModal";
import BulkQuantityForm from "@component/products/BulkQuantityForm";

// styled component
const StyledLink = styled(Link)`
  position: relative;
  display: block;
  padding: 0.3rem 0rem;
  color: ${getTheme("colors.gray.500")};
  cursor: pointer;
  border-radius: 4px;
  :hover {
    color: ${getTheme("colors.gray.100")};
  }
`;

const Footer1: FC = () => {
  const [isBulkQuantityFormOpen, setisBulkQuantityFormOpen] = useState(false);

  const handleBlukReqFormClose = () => {
    setisBulkQuantityFormOpen(false); // Update the state to close the modal
  };

  const openBulkQuantity = () => {
    setisBulkQuantityFormOpen(true)
  };
  return (
    <footer>
      {isBulkQuantityFormOpen ? (
        <BulkQuantityModal open={isBulkQuantityFormOpen}>
          <BulkQuantityForm
            onCloseModal={handleBlukReqFormClose}
            minOrderQty={1}
          />
        </BulkQuantityModal>
      ) : null}
      <Box bg="#290f57">
        <Container p="1rem" color="white">
          <Box py="5rem" overflow="hidden">
            <Grid container spacing={12}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Link href="/career">
                  <Image
                    alt="logo"
                    mb="1.25rem"
                    src="/assets/images/logos/needibay_logo.png"
                  />
                </Link>

                <Paragraph mb="5rem" color="gray.500">
                  Let's get the best for you.
                  <br />
                  Contact us for any query.
                </Paragraph>

                <AppStore />
              </Grid>

              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1"
                  fontSize="25px"
                  fontWeight="600"
                >
                  About Us
                </Typography>

                <div>
                  {aboutLinks.map((item, ind) => (
                    // <StyledLink href="/" key={ind}>
                    //   {item}
                    // </StyledLink>
                    <>
                      {ind === 0 ? (
                        <StyledLink href="/career" key={ind}>
                          {item}
                        </StyledLink>
                      ) : ind === 1 ? (
                        <StyledLink
                          href="/catalog/products"
                          key={ind}
                        >
                          {item}
                        </StyledLink>
                      ) : ind === 2 ? (
                        <StyledLink href="/contactus" key={ind}>
                          {item}
                        </StyledLink>
                      ) : ind === 3 ? (
                        <StyledLink href="/policies" key={ind}>
                          {item}
                        </StyledLink>
                      ) : ind === 4 ? (
                        <StyledLink href="/policies" key={ind}>
                          {item}
                        </StyledLink>
                      ) : null}
                    </>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1"
                  fontSize="25px"
                  fontWeight="600"
                >
                  Customer Care
                </Typography>

                <div>
                  {customerCareLinks.map((item, ind) => (
                    <>
                      {ind === 0 ? (
                        <StyledLink href="/contactus" key={ind}>
                          {item}
                        </StyledLink>
                      ) : ind === 1 ? (
                        <StyledLink href="/contactus" key={ind}>
                          {item}
                        </StyledLink>
                      ) : ind === 2 ? (
                        <StyledLink href="/orders" key={ind}>
                          {item}
                        </StyledLink>
                      ) : ind === 3 ? (
                        <StyledLink href="#blukBuy" key={ind} onClick={openBulkQuantity}>
                          {item}
                        </StyledLink>
                      ) : ind === 4 ? (
                        <StyledLink href="/policies" key={ind}>
                          {item}
                        </StyledLink>
                      ) : null}
                    </>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1"
                  fontSize="25px"
                  fontWeight="600"
                >
                  Contact Us
                </Typography>

                <Typography py="0.3rem" color="gray.500">
                L376 / A, 14th B Cross Rd, Sector 6, HSR Layout, Bengaluru, Karnataka 560102{" "}
                </Typography>

                <Typography py="0.3rem" color="gray.500">
                  Email : enquiry@needibay.com sales@needibay.com
                  grivience@needibay.com
                </Typography>

                <Typography py="0.3rem" mb="1rem" color="gray.500">
                  Phone: +91 9060614360
                </Typography>

                <FlexBox className="flex" mx="-5px">
                  {iconList.map((item) => (
                    <a
                      href={item.url}
                      target="_blank"
                      key={item.iconName}
                      rel="noreferrer noopenner"
                    >
                      <Box
                        m="5px"
                        p="10px"
                        size="small"
                        borderRadius="50%"
                        bg="#4B566B"
                      >
                        <Icon size="12px" defaultcolor="auto">
                          {item.iconName}
                        </Icon>
                      </Box>
                    </a>
                  ))}
                </FlexBox>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

const aboutLinks = [
  "Careers",
  "Our Products",
  "Reach us Out",
  "Terms & Conditions",
  "Privacy Policy",
];

const customerCareLinks = [
  "Help Center",
  "How to Buy",
  "Track Your Order",
  "Corporate & Bulk Purchasing",
  "Returns & Refunds",
];

const iconList = [
  { iconName: "facebook", url: "https://www.facebook.com/profile.php?id=100090657191506&mibextid=ZbWKwL"},
  { iconName: "linkedin", url: "https://www.linkedin.com/company/needibay/" },
  {
    iconName: "youtube",
    url: "https://www.youtube.com/channel/UCsIyD-TSO1wQFz-n2Y4i3Rg",
  },
  { iconName: "google", url: "https://www.needibay.com/" },
  { iconName: "instagram", url: "https://www.instagram.com/needibay.online/" },
];

export default Footer1;
