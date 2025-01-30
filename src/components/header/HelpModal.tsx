import React from "react";
import FlexBox from "@component/FlexBox";
import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import styled from "styled-components";
import Typography from "@component/Typography";
import { sans } from "@utils/fonts";
import Link from "next/link";
const HelpModal = () => {
  return (
    <Box
      style={{
        zIndex: 100,
        minWidth: "200px",
        borderRadius: "6px",
        paddingTop: "0.5rem",
        position: "absolute",
        paddingBottom: "0.5rem",
        top: "calc(100% + 0.5rem)",
        boxShadow: " 0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
      }}
      borderRadius={"0.625rem"}
      padding="1rem"
      backgroundColor={"white"}
    >
      <FlexBox justifyContent={"flex-start"}>
        <Typography
          fontSize="0.93rem"
          fontWeight="600"
          color="#606060"
          className={sans.className}
        >
          Reach Us At
        </Typography>
      </FlexBox>

      <FlexBox flexDirection={"column"} justifyContent={"flex-start"}>
        <Link href={"/contactus"}>
          <FlexBox alignItems="flex-start" py="0.5rem">
            <Icon color="light" marginRight="1rem">
              header_phone
            </Icon>
            <Box>
              <Typography
                className={sans.className}
                color="#606060"
                fontSize="0.75rem"
              >
                Call
              </Typography>
              <Typography
                className={sans.className}
                color="#2F2F2F"
                fontSize="0.75rem"
              >
                +91 9060614360{" "}
              </Typography>
            </Box>
          </FlexBox>
        </Link>
        <a href={"mailto:+9182462392"}>
          <FlexBox alignItems="flex-start" py="0.5rem">
            <Icon color="light" marginRight="1rem">
              header_mail
            </Icon>
            <Box>
              <Typography
                className={sans.className}
                color="#606060"
                fontSize="0.75rem"
              >
                E-mail
              </Typography>
              <Typography
                className={sans.className}
                color="#2F2F2F"
                fontSize="0.75rem"
              >
                support@needibay.in
              </Typography>
            </Box>
          </FlexBox>
        </a>

        <FlexBox alignItems="flex-start" py="0.5rem">
          <Icon color="light" marginRight="1rem">
            header_locate
          </Icon>
          <Box>
            <Typography
              className={sans.className}
              color="#606060"
              fontSize="0.75rem"
            >
              Address
            </Typography>
            <Typography
              className={sans.className}
              color="#2F2F2F"
              fontSize="0.75rem"
            >
              L376 / A, 14th B Cross Rd, Sector 6, HSR Layout, Bengaluru, Karnataka 560102{" "}
            </Typography>
          </Box>
        </FlexBox>
      </FlexBox>
    </Box>
  );
};

export default HelpModal;
