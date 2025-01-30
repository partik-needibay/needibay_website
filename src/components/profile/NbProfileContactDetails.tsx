"use client";
import { FC, ReactNode, useEffect, useState } from "react";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import { useMediaQuery } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import { useSession } from "next-auth/react";

type Props = any;

const ResponsiveFlexBox = styled(FlexBox)`
  @media only screen and (max-width: 768px) {
    display: block;
  }

  .flexbox1 {
    @media only screen and (max-width: 768px) {
      width: 100%;
    }
  }

  .flexbox2 {
    @media only screen and (max-width: 768px) {
      margin-botton: 1rem;
      width: 100%;
    }
  }
`;

const NbProfileContactDetails: FC<Props> = ({ sessionData, profileData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedEmail, setSelecetdEmail] = useState("");
  const [selectedPhone, setSelecetdPhone] = useState("");

  useEffect(() => {
    let phoneOptions: any = [];

    let emailOptions: any = [];

    if (profileData && profileData?.emailBooks?.length > 0) {
      setSelecetdEmail(
        profileData?.emailBooks.filter((item) => item.isDefault == true)[0]
          ?.email
      );
    }

    if (profileData && profileData?.phoneBooks?.length > 0) {
      setSelecetdPhone(
        profileData?.phoneBooks.filter((item) => item.isDefault == true)[0]
          ?.phone
      );
    }
  }, [profileData]);

  return (
    <Box mb="30px" mt={`${isMobile ? "0rem" : "2rem"}`} paddingBottom={"1rem"}>
      <ResponsiveFlexBox
        mt={`${isMobile ? "1rem" : "2rem"}`}
        mr={`${isMobile ? "0rem" : "2rem"}`}
      >
        <Box
          className="flexbox1"
          width={"50%"}
          paddingLeft={`${isMobile ? "0rem" : "2rem"}`}
          alignItems={"center"}
        >
          <Typography color="#8D8A8A" mb={"0.4rem"}>
            Email
          </Typography>
          <Box
            // border="1px solid #8D8A8A"
            width={"100%"}
            padding={"8px 12px"}
            backgroundColor="#ececec"
            borderRadius="0.4rem"
            fontWeight={600}
            height={"40px"}
          >
            {selectedEmail}
          </Box>
        </Box>
      </ResponsiveFlexBox>

      <ResponsiveFlexBox
        mt={`${isMobile ? "1rem" : "2rem"}`}
        mr={`${isMobile ? "0rem" : "2rem"}`}
      >
        <Box
          width="50%"
          className="flexbox1"
          paddingLeft={`${isMobile ? "0rem" : "2rem"}`}
        >
          <Typography color="#8D8A8A" mb={"0.4rem"}>
            Phone
          </Typography>
          <Box
            // border="1px solid #8D8A8A"
            width={"100%"}
            padding={"8px 12px"}
            backgroundColor="#ececec"
            borderRadius="0.4rem"
            fontWeight={600}
            height={"40px"}
          >
            {selectedPhone}
          </Box>
        </Box>
      </ResponsiveFlexBox>
    </Box>
  );
};

export default NbProfileContactDetails;
