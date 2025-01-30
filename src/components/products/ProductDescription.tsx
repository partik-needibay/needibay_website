import { FC } from "react";
import Box from "@component/Box";
import Typography, { H3, Paragraph } from "@component/Typography";
import { sans } from "@utils/fonts";
import Image from "@component/Image";
import FlexBox from "@component/FlexBox";
import MediaQuery from "react-responsive";
import { SanitizeHTML } from "@component/SanitizeHTML";


const ProductDescription = (props) => {
  const { productDescription } = props;

  return (
    <>
      <MediaQuery minWidth={1280}>
        <Box padding='2rem'>
        <SanitizeHTML html={productDescription} />
        </Box>
      </MediaQuery>

      <MediaQuery maxWidth={1279}>
        <Box px='1rem' paddingBottom={'0.5rem'}>
        <SanitizeHTML html={productDescription} />
        </Box>
      </MediaQuery>
    </>
  );
};

export default ProductDescription;
