import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@component/Box";
import Section_8 from "@component/aboutus/Section_8";
import PolicieContent from "@component/policie/PolicieContent";
import PolicieHeader from "@component/policie/PolicieHeader";

const PoliciePage = () => {
  return (
    <>
      <PolicieHeader />
      <PolicieContent />
      {/* all services */}

      <Section_8 marginTop={"2"} mobileMarginTop={"0"} />
    </>
  );
};

export default PoliciePage;
