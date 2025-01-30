import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import { useAppContext } from "@context/AppContext";
import Box from "@component/Box";
import Image from "@component/Image";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import Typography from "@component/Typography";
import { IconButton } from "@component/buttons";
import { currency, getTheme } from "@utils/utils";
import { arimo, overpass, roboto } from "@utils/fonts";
// styled component
const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  border-radius: 0.625rem;
  margin-bottom: 2rem;
  border: 1px solid #009733;
  box-shadow: ${getTheme("shadows.4")};
  background-color: #F2FFEC;
  .product-details {
    padding: 20px;
  }
  .title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  @media only screen and (max-width: 600px) {

    .product-details {
      margin: 0;
      padding: 0.01rem;
    }
    .offer_title{
      font-size: 0.8rem;
    }
  }
  ${space}
`;

// =====================================================================
interface OfferCard extends SpaceProps {
  qty: number;
  name: string;
  slug: string;
  price: number;
  imgUrl?: string;
  id: string | number;
}
// =====================================================================

const OfferCard = (props) => {
  return (
    <Wrapper>
      <FlexBox
        width='100%'
        minWidth='0px'
        className='product-details'
        justifyContent='center'
        ml='1rem'>
        <Typography
          className={`offer_title ${roboto.className}`}
          fontWeight={600}
          fontSize={"1rem"}
          lineHeight={"2.125rem"}
          color={"#009733"}>
          Add $200 more & get $25 off with online payments
        </Typography>
      </FlexBox>
    </Wrapper>
  );
};

export default OfferCard;
