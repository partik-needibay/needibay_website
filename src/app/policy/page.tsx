import FlexBox from "@component/FlexBox";
import Typography, { Paragraph } from "@component/Typography";
import React from "react";
import { roboto } from "@utils/fonts";
import Box from "@component/Box";
const page = () => {
  return (
    <>
      <FlexBox
        justifyContent={"center"}
        alignItems={"center"}>
        <FlexBox
          padding='5rem'
          flexDirection={"column"}
          alignItems={"center"}>
          <Box
            backgroundColor={"white"}
            borderRadius={"1.25rem"}
            padding='2rem'>
            <Typography
              className={roboto.className}
              color='policy.main'
              textAlign={"center"}
              fontSize={"1.875rem"}
              marginBottom={"2rem"}
              fontWeight={600}>
              Cancellation Policy
            </Typography>
            <Paragraph
              textAlign={"justify"}
              fontSize={"1.25rem"}
              color='policy.main'
              fontWeight={400}>
              The Website Owner, including subsidiaries and affiliates
              (“Website” or “Website Owner” or “we” or “us” or “our”) provides
              the information contained on the website or any of the pages
              comprising the website (“website”) to visitors (“visitors”)
              (cumulatively referred to as “you” or “your” hereinafter) subject
              to the terms and conditions set out in these website terms and
              conditions, the privacy policy and any other relevant terms and
              conditions, policies and notices which may be applicable to a
              specific section or module of the website.
              <br /> Welcome to our website. If you continue to browse and use
              this website you are agreeing to comply with and be bound by the
              following terms and conditions of use, which together with our
              privacy policy govern BHADRAWATI TEXTILE INDUSTRIES PRIVATE
              LIMITED''s relationship with you in relation to this website. The
              term 'BHADRAWATI TEXTILE INDUSTRIES PRIVATE LIMITED' or 'us' or
              'we' refers to the owner of the website whose
              registered/operational office is D -45/3, Bhadrawati Complex, Old
              Kumbhari Naka Solapur MAHARASHTRA 413006. The term 'you' refers to
              the user or viewer of our website.
              <br />
              <br /> The use of this website is subject to the following terms
              of use:
              <ul>
                {" "}
                <li>
                  The content of the pages of this website is for your general
                  information and use only. It is subject to change without
                  notice.
                </li>{" "}
                <li>
                  {" "}
                  Neither we nor any third parties provide any warranty or
                  guarantee as to the accuracy, timeliness, performance,
                  completeness or suitability of the information and materials
                  found or offered on this website for any particular purpose.
                  You acknowledge that such information and materials may
                  contain inaccuracies or errors and we expressly exclude
                  liability for any such inaccuracies or errors to the fullest
                  extent permitted by law.
                </li>
              </ul>{" "}
              Disclaimer: The above content is created at BHADRAWATI TEXTILE
              INDUSTRIES PRIVATE LIMITED's sole discretion. Razorpay shall not
              be liable for any content provided here and shall not be
              responsible for any claims and liability that may arise due to
              merchant’s non-adherence to it.
            </Paragraph>
          </Box>
        </FlexBox>
      </FlexBox>
    </>
  );
};

export default page;
