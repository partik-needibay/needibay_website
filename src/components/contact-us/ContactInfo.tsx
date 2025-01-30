"use client";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Image from "@component/Image";
import Typography from "@component/Typography";
import { Button } from "@component/buttons";
import { Grid } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavLink from "@component/nav-link";
const ContactInfo = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmDesktop = useMediaQuery(
    "(min-width: 769px) and (max-width: 1025px)"
  );

  return (
    <>
      <Grid
        container
        // border={"2px solid red"}
        justifyContent={"center"}
        //
        // margin={"top right bottom left"}
        margin={`${
          isMobile
            ? "4rem auto 0px auto"
            : isSmDesktop
            ? "12rem auto 0px auto"
            : "14rem auto 0px auto"
        }`}
        maxWidth={"2000px"}
      >
        <Grid item xs={11} md={10}>
          <Grid
            container
            spacing={5}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {/* Need any assistance box */}
            {isMobile ? (
              <Grid item xs={12} sm={9} md={6}>
                <FlexBox
                  // border={"2px solid orange"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  borderRadius={"1.25rem"}
                  style={{
                    paddingLeft: "1.9rem",
                    boxShadow: "0px 0px 15.8px 0px rgba(0, 0, 0, 0.25)",
                    paddingTop: "1.2rem",
                    paddingBottom: "1.2rem",
                  }}
                >
                  <Box>
                    <Typography
                      fontSize={"1.8rem"}
                      fontWeight={700}
                      color={"#35004F"}
                      // marginBottom={"0.8rem"}
                    >
                      Want us to call
                    </Typography>
                    <Typography
                      fontSize={"1.9rem"}
                      fontWeight={700}
                      color={"#35004F"}
                      marginBottom={"0.8rem"}
                    >
                      you?
                    </Typography>
                    <a href="tel:+91-9060614360">
                    <Button
                      variant="contained"
                      backgroundColor={"#35004F"}
                      color={"light"}
                      borderRadius={"0.625rem"}
                    >
                      Call me
                    </Button>
                    </a>
                   
                  </Box>
                  <Box>
                    <Image
                      width="100%"
                      src="/assets/images/contactus/Support_service.png"
                    />
                  </Box>
                </FlexBox>
              </Grid>
            ) : null}
            <Grid item xs={12} sm={9} md={6} lg={6}>
              <FlexBox
                // border={"2px solid orange"}
                justifyContent={"space-between"}
                alignItems={"center"}
                borderRadius={"1.25rem"}
                style={{
                  paddingLeft: "1.9rem",
                  boxShadow: "0px 0px 15.8px 0px rgba(0, 0, 0, 0.25)",
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                }}
              >
                <Box>
                  <Typography
                    fontSize={`${
                      isMobile ? "1.4rem" : isSmDesktop ? "1.3rem" : "1.7rem"
                    }`}
                    fontWeight={700}
                    color={"#35004F"}
                    marginBottom={"0.8rem"}
                  >
                    Need any assistance?
                  </Typography>
                  <Typography
                    fontSize={"1.2rem"}
                    fontWeight={700}
                    color={"#35004F"}
                    marginBottom={"0.8rem"}
                  >
                    We are here to help you
                  </Typography>
                  <a href="https://api.whatsapp.com/send/?phone=%2B919535409901&text=Hey%2C%0A%0AI%27m+interested+in+buying+products+for+my+business+from+NeediBay%C2%AE%0A%0ACould+you+please+help+me+in+my+bulk+buying+or+get+me+connected+with+the+sales+team.%0A%0ALooking+forward+to+your+prompt+response.%0A%0AThank+you%21&type=phone_number&app_absent=0" target="_blank">
                  <Button
                    variant="contained"
                    backgroundColor={"#35004F"}
                    color={"light"}
                    borderRadius={"0.625rem"}
                  >
                    Chat now
                  </Button>
                  </a>
                  
                </Box>
                <Box width={`${isMobile ? "40%" : "37%"}`}>
                  <Image
                    width="100%"
                    src="/assets/images/contactus/Online-meeting-via-group-call.png"
                  />
                </Box>
              </FlexBox>
            </Grid>

            {/* Wanna call Us? */}
            <Grid item xs={12} sm={9} md={6} lg={6}>
              <FlexBox
                // border={"2px solid orange"}
                justifyContent={"space-between"}
                alignItems={"center"}
                borderRadius={"1.25rem"}
                paddingLeft={`${isMobile ? "1.9rem" : "1.6rem"}`}
                paddingTop={`${isMobile ? "1.2rem" : "0.5rem"}`}
                paddingBottom={`${isMobile ? "1.2rem" : "0.5rem"}`}
                style={{
                  boxShadow: "0px 0px 15.8px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                <Box>
                  <Typography
                    fontSize={`${
                      isMobile ? "1.6rem" : isSmDesktop ? "1.6rem" : "2rem"
                    }`}
                    fontWeight={700}
                    color={"#35004F"}
                    marginBottom={"0.8rem"}
                  >
                    Wanna call us?
                  </Typography>
                  <Typography
                    fontSize={"1.1rem"}
                    fontWeight={700}
                    color={"#35004F"}
                    marginBottom={"0.3rem"}
                  >
                    We got you
                  </Typography>
                  <Typography
                    fontSize={"1.1rem"}
                    fontWeight={700}
                    color={"#35004F"}
                    marginBottom={"0.3rem"}
                  >
                    Call Us at: +91-9060614360
                  </Typography>
                  <Typography
                    fontSize={"1.1rem"}
                    fontWeight={700}
                    color={"#35004F"}
                    mb={"0.1rem"}
                  >
                    24x7 Support
                  </Typography>
                </Box>
                <Box width={`${isMobile ? "20%" : "25%"}`}>
                  <Image
                    width="100%"
                    src="/assets/images/contactus/chatgpt-robot-calling-on-phone.png"
                  />
                </Box>
              </FlexBox>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ContactInfo;
