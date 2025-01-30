"use client"
import { FC, ReactNode, useEffect, useState } from "react";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import { useMediaQuery } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import stateList from "@data/stateList";
import { useAppContext } from "@context/AppContext";

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

const NbProfileDetails: FC<Props> = ({
  sessionData,
  profileData
}) => {

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [defaultGst, setDefaultGst] =useState<any>([]);
  const { state } = useAppContext();

  useEffect(() => {
    if(profileData && profileData?.gst?.length > 0 ){
      setDefaultGst(profileData?.gst.filter((item) => item.isDefault == true))
    }
    
  }, [profileData])


  return (
    <Box mb="30px" mt={`${isMobile ? "0rem" : "2rem"}`}>
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
            Full Name'
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
            {state.customerProfile?.fullName}
          </Box>
        </Box>
        <Box
          width="50%"
          className="flexbox1"
          paddingLeft={`${isMobile ? "0rem" : "2rem"}`}
          mt={`${isMobile ? "1rem" : "0rem"}`}
        >
          <Typography color="#8D8A8A" mb={"0.4rem"}>
            Designation
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
            {profileData?.position}
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
            Business Type
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
            {profileData?.businessType}
          </Box>
        </Box>
        <Box
          width="50%"
          className="flexbox1"
          paddingLeft={`${isMobile ? "0rem" : "2rem"}`}
          mt={`${isMobile ? "1rem" : "0rem"}`}
        >
          <Typography color="#8D8A8A" mb={"0.4rem"}>
            GST Number
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
            {defaultGst?.length > 0 && defaultGst[0]?.value}
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
            Business Name
          </Typography>
          <Box
            // border="1px solid #8D8A8A"
            width={"100%"}
            padding={"8px 10px"}
            backgroundColor="#ececec"
            borderRadius="0.4rem"
            fontWeight={600}
            height={"40px"}
          >
            {defaultGst?.length > 0 && defaultGst[0]?.value && JSON.parse(defaultGst[0].data).data.tradeNam}
          </Box>
        </Box>
      </ResponsiveFlexBox>
    </Box>
  );
};

export default NbProfileDetails;
