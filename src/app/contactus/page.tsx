import Section_8 from "@component/aboutus/Section_8";
import AddressCards from "@component/contact-us/AddressCards";
import ContactInfo from "@component/contact-us/ContactInfo";
import ContactusBanner from "@component/contact-us/ContactusBanner";
import SupportLine from "@component/contact-us/SupportLine";
import React from "react";

const ContactUs = () => {
  return (
    <>
      {/* Contact us banner */}
      <ContactusBanner />
      <SupportLine />
      {/* Need any assistance and Wanna call Us? box */}
      <ContactInfo />
      {/* Have any F&Q? and Our Office Address section */}
      <AddressCards />
      {/* all services */}
      <Section_8 marginTop={"3"} mobileMarginTop={"2.5"} />
    </>
  );
};

export default ContactUs;
