"use client";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Image from "@component/Image";
import Typography from "@component/Typography";
import { Button } from "@component/buttons";
import { Chip, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const AddressCards = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isXlDesktop = useMediaQuery(theme.breakpoints.up("xl"));
  const isSmDesktop = useMediaQuery(
    "(min-width: 769px) and (max-width: 1025px)"
  );
  return (
    <>
      <Grid
        container
        // border={"2px solid red"}
        justifyContent={"center"}
        // margin={"top right bottom left"}

        margin={`${isMobile ? "1rem auto 0px auto" : "3rem auto 0px auto"}`}
        maxWidth={"2000px"}
      >
        <Grid item xs={11} md={10}>
          <Grid
            container
            spacing={5}
            alignItems={"center"}
            justifyContent={"center"}
            // border={"2px solid red"}
          >
            {/*Have any F&Q? */}
            <Grid item xs={12} sm={9} md={4}>
              <FlexBox
                // border={"2px solid orange"}
                justifyContent={"space-between"}
                alignItems={"center"}
                borderRadius={"1.25rem"}
                paddingY={`${isXlDesktop ? "1.8rem" : "0rem"}`}
                // paddingTop={`${isMobile ? "0.8rem" : "1.3rem"}`}
                // paddingBottom={`${isMobile ? "1.4rem" : "0.7rem"}`}
                style={{
                  //   paddingBottom: "0.9rem",
                  paddingLeft: "2rem",
                  boxShadow: "0px 0px 15.8px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                <Box>
                  <Typography
                    fontSize={`${
                      isMobile ? "1.4rem" : isSmDesktop ? "1.3rem" : "1.9rem"
                    }`}
                    fontWeight={700}
                    color={"#35004F"}
                    marginBottom={"0.8rem"}
                    marginTop={"0.8rem"}
                  >
                    Have any F&Q?
                  </Typography>
                  <Typography
                    fontSize={"1.24rem"}
                    fontWeight={700}
                    color={"#35004F"}
                    marginBottom={"0.2rem"}
                  >
                    We have answers to all your
                  </Typography>
                  <Typography
                    fontSize={"1.24rem"}
                    fontWeight={700}
                    color={"#35004F"}
                    marginBottom={"0.8rem"}
                  >
                    questions
                  </Typography>
                  <a href="https://api.whatsapp.com/send/?phone=%2B919535409901&text=Hey%2C%0A%0AI%27m+interested+in+buying+products+for+my+business+from+NeediBay%C2%AE%0A%0ACould+you+please+help+me+in+my+bulk+buying+or+get+me+connected+with+the+sales+team.%0A%0ALooking+forward+to+your+prompt+response.%0A%0AThank+you%21&type=phone_number&app_absent=0" target="_blank">
                  <Button
                    variant="contained"
                    backgroundColor={"#35004F"}
                    color={"light"}
                    borderRadius={"0.625rem"}
                    marginBottom={"1.2rem"}
                  >
                    Chat now
                  </Button>
                  </a>
                </Box>
              </FlexBox>
            </Grid>
            {/* Our Office Address */}
            <Grid item xs={12} sm={9} md={8}>
              <FlexBox
                // border={"2px solid orange"}
                justifyContent={"space-around"}
                alignItems={"center"}
                borderRadius={"1.25rem"}
                paddingLeft={`${isMobile ? "1.8rem" : "2rem"}`}
                paddingRight={`${isMobile ? "1rem" : "2rem"}`}
                paddingTop={`${isMobile ? "1.2rem" : "1.3rem"}`}
                paddingBottom={`${isMobile ? "1.2rem" : "1.3rem"}`}
                style={{
                  boxShadow: "0px 0px 15.8px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                <Box
                  //   border={"2px solid red"}
                  width={`${isMobile ? "none" : "60%"}`}
                >
                  <Typography
                    fontSize={`${isMobile ? "1.6rem" : "2.1rem"}`}
                    fontWeight={700}
                    color={"#35004F"}
                    marginBottom={`${isMobile ? "1rem" : "0.3rem"}`}
                  >
                    <Chip
                      label="HeadOffice"
                      sx={{ background: "#ECC5FF", borderRadius: "6px" }}
                    />
                  </Typography>
                  <Typography
                    fontSize={"1.5rem"}
                    fontWeight={700}
                    color={"#35004F"}
                    marginBottom={"0.3rem"}
                  >
                    Our Office Address
                  </Typography>
                  <Typography
                    fontSize={`${isMobile ? "1rem" : "1.3rem"}`}
                    fontWeight={700}
                    color={"#35004F"}
                    marginBottom={"0.3rem"}
                    // width={`${isMobile ? "100%" : "100%"}`}
                    // border="2px solid red"
                  >
                    Needibay Internet Pvt Ltd , L376 / A, 14th B Cross Rd, Sector 6, HSR Layout, Bengaluru, Karnataka 560102
                  </Typography>
                </Box>
                <Box width={`${isMobile ? "30%" : "30%"}`}>
                  <Image
                    width="100%"
                    src="/assets/images/contactus/Woman-planning-route-for-travel.png"
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

export default AddressCards;
