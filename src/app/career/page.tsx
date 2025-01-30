import Section_6 from "@component/aboutus/Section_6";
import Section_8 from "@component/aboutus/Section_8";
import CareerBanner from "@component/career/CareerBanner";
import CareerPageSection2 from "@component/career/CareerPageSection2";
import CareerPageSection3 from "@component/career/CareerPageSection3";
import CareerPageSection4 from "@component/career/CareerPageSection4";
import CareerPageSection5 from "@component/career/CareerPageSection5";
import CareerPageSection6 from "@component/career/CareerPageSection6";
import CareerPageSection7 from "@component/career/CareerPageSection7";
import React from "react";

const Career = () => {
  return (
    <>
      {/* Banner section */}
      <CareerBanner />
      {/* Section2 */}
      <CareerPageSection2 />
      {/* Working at NeediBay*/}
      <CareerPageSection3 />
      {/* Culture Work in super-charged, aglie*/}
      <CareerPageSection4 />
      {/* Fasten your seat belts */}
      <CareerPageSection5 />
      {/* Integrity rign */}
      <CareerPageSection6 />
      {/* Make An Impact!*/}
      <CareerPageSection7 />
      {/* The Brains behind Needibay */}
      <Section_6 />
      {/* all service */}
      <Section_8 marginTop={"7"} mobileMarginTop={"4"} />
    </>
  );
};

export default Career;
