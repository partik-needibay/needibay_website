import React from "react";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import Box from "@component/Box";
import { Button } from "@component/buttons";
const ProductButtonGroup = ({ iconName }) => {
  // got to add to wishlist
  return (
    <Box>
      <Button
        marginTop={"1rem"}
        style={{
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
          width: '2rem',
          padding: '0',
          height: '2rem',
        }}
        color='light'
        borderRadius={'50%'}
        variant='contained'>
        <Icon
          variant='xsmall'
          color='primary'>
          {iconName}
        </Icon>{" "}
      </Button>
    </Box>
  );
};

export default ProductButtonGroup;
