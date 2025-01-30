import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import Button from "@component/buttons/Button";
import { roboto } from "@utils/fonts";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import Container from "@component/Container";

const Banner = styled(Box)`
  background-image: linear-gradient(100deg, #70b0ff -0.84%, #29405e 118.55%);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const ProductBanner = () => {
  return (
    <>
      <MediaQuery minWidth={1280}>
        <Container>
          <Banner mb="5rem  ">
            <FlexBox
              padding="1rem"
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography
                className={roboto.className}
                fontSize={"1.875rem"}
                mr="2rem"
                fontWeight={600}
                color="white"
              >
                Have any query?
              </Typography>
              <Button
                backgroundColor={"white"}
                borderRadius={"0.5rem"}
                color="text2"
                ml={2}
                mr={"1rem"}
                onClick={() => {
                  window.location.href =
                    "https://api.whatsapp.com/send/?phone=%2B919535409901&text=Hey%2C%0A%0AI%27m+interested+in+buying+products+for+my+business+from+NeediBay%C2%AE%0A%0ACould+you+please+help+me+in+my+bulk+buying+or+get+me+connected+with+the+sales+team.%0A%0ALooking+forward+to+your+prompt+response.%0A%0AThank+you%21&type=phone_number&app_absent=0";
                }}
              >
                {" "}
                Chat with us
              </Button>
              <Button
                backgroundColor={"white"}
                borderRadius={"0.5rem"}
                color="text2"
                ml={2}
                onClick={() => {
                  window.location.href =
                    "https://api.whatsapp.com/send/?phone=%2B919535409901&text=Hey%2C%0A%0AI%27m+interested+in+buying+products+for+my+business+from+NeediBay%C2%AE%0A%0ACould+you+please+help+me+in+my+bulk+buying+or+get+me+connected+with+the+sales+team.%0A%0ALooking+forward+to+your+prompt+response.%0A%0AThank+you%21&type=phone_number&app_absent=0";
                }}
              >
                {" "}
                Talk to our expert
              </Button>
            </FlexBox>
          </Banner>
        </Container>
      </MediaQuery>
      <MediaQuery maxWidth={1279}>
        <Container>
          <Banner borderRadius={"0.5rem"}>
            <FlexBox
              py="0.5rem"
              mb="0.2rem"
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography
                className={roboto.className}
                fontSize={"2rem"}
                fontWeight={600}
                color="white"
              >
                Have any query?
              </Typography>

              <FlexBox>
                {" "}
                <Button
                  backgroundColor={"white"}
                  borderRadius={"0.5rem"}
                  color="text2"
                  ml={2}
                  mr={"1rem"}
                >
                  {" "}
                  Chat with us
                </Button>
                <Button
                  backgroundColor={"white"}
                  borderRadius={"0.5rem"}
                  color="text2"
                  ml={2}
                >
                  {" "}
                  Talk to our expert
                </Button>
              </FlexBox>
            </FlexBox>
          </Banner>
        </Container>
      </MediaQuery>
    </>
  );
};

export default ProductBanner;
