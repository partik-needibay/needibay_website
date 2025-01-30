"use client";
import React from "react";
import MediaQuery from "react-responsive";
// import AddNewAddress from "@sections/address/AddNewAddress";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import AddressItem from "@sections/address/AddressItem";
import Box from "@component/Box";
import EnquiryItem from "@sections/enquiries/EnquiryItem";
import EnquiryMobileCard from "@sections/enquiries/EnquiryMobileCard";

const BulkEnquiriesSection = ({ enquiries }) => {
  return (
    <>
      <MediaQuery minWidth={768}>
        <Box padding="2rem" backgroundColor={"white"}>
          <DashboardPageHeader
            title="Enquiries"
            iconName="pin_filled"
            enquiries={true}
            enquiriesCount = {enquiries.length || 0}
            subheading="enquiries"
            // button={<AddNewAddress />}
          />

          {enquiries.length > 0 &&
            enquiries.map((item) => <EnquiryItem item={item} />)}
        </Box>
      </MediaQuery>
      <MediaQuery maxWidth={767}>
      {enquiries.length > 0 &&
            enquiries.map((item) => <EnquiryMobileCard item={item} />)}
      </MediaQuery>
      
    </>
  );
};

export default BulkEnquiriesSection;
