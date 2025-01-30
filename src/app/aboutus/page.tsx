import Container from "@component/Container";
import Our_Vision from "@component/aboutus/Our_Vision";
import Section_1 from "@component/aboutus/Section_1";
import Section_2 from "@component/aboutus/Section_2";
import Section_3 from "@component/aboutus/Section_3";
import Section_4 from "@component/aboutus/Section_4";
import Section_5 from "@component/aboutus/Section_5";
import Section_6 from "@component/aboutus/Section_6";
import Section_7 from "@component/aboutus/Section_7";
import Section_8 from "@component/aboutus/Section_8";
import React, { Fragment } from "react";

const AboutUs = () => {
  return (
    <>
      {/* 
    1. where we will palce Matter,vision content in about us page
     */}
      {/* bg image */}
      <Section_1 />
      {/* <Our_Vision /> */}
      {/*  NeediBay Header */}
      <Section_2 />
      {/*   We work for you */}
      <Section_3 />
      {/* Our Partners */}
      <Section_4 />
      {/*   Why Us? */}
      <Section_5 />
      {/* The Brains behind Needibay */}
      <Section_6 />
      {/* Words from our CEO */}
      <Section_7 />
      {/* Last section */}
      <Section_8 marginTop={"6"} mobileMarginTop={"4"} />
    </>
  );
};

export default AboutUs;
