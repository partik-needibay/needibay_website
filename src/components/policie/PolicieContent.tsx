"use client";
import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Box from "@mui/material/Box";
import { Button } from "@component/buttons";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const PolicieContent = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Grid
      container
      justifyContent={"center"}
      maxWidth={"1990px"}
      margin={"auto"}
    >
      <Grid item xs={12} md={11}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="scrollable"
            >
              <Tab
                label="Shipping"
                {...a11yProps(0)}
                sx={{
                  textTransform: "none",
                  minWidth: "auto",
                  // padding: "0px 0px",
                  // border: "2px solid red",
                  borderRadius: "10px",
                  height: "35px !important",
                  minHeight: "0px",
                  backgroundColor: value === 0 ? "#35004F" : "#EBC3FF",

                  color:
                    value === 0 ? "#EBC3FF !important" : "#35004F !important",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  marginRight: "1rem",
                }}
              />

              <Tab
                label="Cancellation"
                {...a11yProps(1)}
                sx={{
                  textTransform: "none",
                  minWidth: "auto",
                  // padding: "0px 0px",
                  // border: "2px solid red",
                  borderRadius: "10px",
                  height: "35px !important",
                  minHeight: "0px",
                  backgroundColor: value === 1 ? "#35004F" : "#EBC3FF",

                  color:
                    value === 1 ? "#EBC3FF !important" : "#35004F !important",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  marginRight: "1rem",
                }}
              />

              <Tab
                label="Return & Refund"
                {...a11yProps(2)}
                sx={{
                  textTransform: "none",
                  minWidth: "auto",
                  // padding: "0px 0px",
                  // border: "2px solid red",
                  borderRadius: "10px",
                  height: "35px !important",
                  minHeight: "0px",
                  backgroundColor: value === 2 ? "#35004F" : "#EBC3FF",

                  color:
                    value === 2 ? "#EBC3FF !important" : "#35004F !important",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  marginRight: "1rem",
                }}
              />
              <Tab
                label="Privacy & Policy"
                {...a11yProps(3)}
                sx={{
                  textTransform: "none",
                  minWidth: "auto",
                  // padding: "0px 0px",
                  // border: "2px solid red",
                  borderRadius: "10px",
                  height: "35px !important",
                  minHeight: "0px",
                  backgroundColor: value === 2 ? "#35004F" : "#EBC3FF",

                  color:
                    value === 2 ? "#EBC3FF !important" : "#35004F !important",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  marginRight: "1rem",
                }}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Box width={"97%"}>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={600}
              >
                Where do we ship to?
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={400}
              >
                We ship to almost every city in India. We do not offer an international shipping option currently, but we hope to offer it in the future.
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={600}
              >
                How long does an order take to process?
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={400}
              >
                We try to process the orders within 24 working hours, in most cases we try to fulfil the order within 5 working days, but please allow us 7 working days to fulfil the order. Order delivery time may vary during peak periods(after/during product launches, holidays and special promotions)


              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={600}
              >
                How long does it take to ship?
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={400}
              >
                We ship all confirmed orders within 24 working hours. You will receive an email once your order is shipped with your tracking number. We work as hard as we can to try to meet your expectations, but sometimes there may be delays – e.g. because of postal/carrier delays, logistics, bad weather, or things out of our control.
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={600}
              >How can you track your order?
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={400}
              >
                Once your order has been dispatched from our warehouse, you will receive an email or SMS with your tracking information.
              </Typography>
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
          <Box width={"97%"}>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={400}
              >
               You can cancel your orders by writing to us on our Email ID –support@needibay.com or please call us on 809-5000-700 (Monday to Friday, 10AM to 7PM) and we will help you in cancelling the order.
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={600}
              >
               How will I receive the refund for my cancelled order?
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={400}
              >
                For prepaid orders, money will be returned to the bank account/credit/debit card or where the payment was made within 7 business working days. We will be able to credit to the original method of payment, we cannot refund to another alternative card.
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={400}
              >
                Please Note: Orders can only be cancelled before they are shipped.
              </Typography>
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Box width={"97%"}>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={600}
              >
                We offer refund / replacement only in following cases:
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={400}
              >
                1. Wrong product delivered<br />
                2. Expired product delivered<br />
                3. Damaged product delivered – Physical damage<br />
                4. Missing product
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={600}
              >
               Under what conditions return/ replacement requests will not be accepted?
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={400}
              >
                - Opened/used/altered products. <br />
                - Original packaging (mono cartons, labels, etc.) missing. <br />
                - The return/replacement request is generated after 2 days from the date of delivery. <br />
                - The damaged/ missing product is reported after 2 days from the date of delivery. <br />
                - If marked delivered without actually delivering the product should be informed within 2 days of the case. <br />
              </Typography>
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Box width={"97%"}>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={400}
              >
                This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from www.needibay.com
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={600}
              >
                Personal information we collect
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={400}
              >
               When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information”.
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={400}
              >
                We collect Device Information using the following technologies:
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={400}
              >
                - “Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org. <br />
                - “Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps. <br />
                - “Web beacons”, “tags”, and “pixels” are electronic files used to record information about how you browse the Site. <br />
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={400}
              >
                Additionally when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers , UPI, email address, and phone number. We refer to this information as “Order Information”.
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={400}
              >
                When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={600}
              >
               How do we use your personal information?
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={400}
              >
                We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={400}
              >
                - Communicate with you;<br />
                - Screen our orders for potential risk or fraud; and <br />
                - When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services. <br />
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={600}
              >
                Sharing you personal Information
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={400}
              >
                We share your Personal Information with third parties to help us use your Personal Information, as described above.
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={600}
              >
                Behavioral advertising
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={400}
              >
                As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={600}
              >
                Do not track
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={400}
              >
                Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={600}
              >
                Data retention
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={400}
              >
              When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={600}
              >
               Changes
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={400}
              >
               We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulator
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={600}
              >
              Contact us
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={400}
              >
             For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e‑mail at support@needibay.com or by calling us at +91 809-5000-700
              </Typography>
              <Typography
                marginBottom={"1rem"}
                color={"#403944"}
                fontSize={"1.2rem"}
                fontWeight={400}
              >
              Any complaints, abuse or concerns with regards to content and or comment or breach of these Terms shall be immediately informed to Aman Kumar ("Grievance Officer") through email at aman@needibay.com  or by calling at +91 809-5000-700 or in writing at the following address to: support@needibay.com
              </Typography>
            </Box>
          </CustomTabPanel>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PolicieContent;
