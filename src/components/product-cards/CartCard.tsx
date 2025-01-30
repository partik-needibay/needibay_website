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
import api2 from "@utils/__api__/market-1";

// styled component
const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  border-radius: 0.625rem 0.625rem 0 0;
  margin-bottom: 2rem;
  box-shadow: ${getTheme("shadows.4")};
  background-color: ${getTheme("colors.body.paper")};

  .product-details {
    padding: 20px;
  }
  .title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  @media only screen and (max-width: 425px) {
    flex-wrap: wrap;
    img {
      width: 1.5rem;
      height: 1.5rem;
    }
    .product-details {
      padding: 0.5rem;
    }
  }
  ${space}
`;

// =====================================================================
interface CartCard extends SpaceProps {
  qty: number;
  name: string;
  slug: string;
  price: number;
  imgUrl?: string;
  id: string | number;
}
// =====================================================================

const CartCard = (props) => {

  const { id, name, qty, price, imgUrl, slug, ...others } = props;

  const {state, dispatch } = useAppContext();
  const handleCartAmountChange = async () => {

    const response = await api2.deleteCart(state?.cartInfo?.id);
    /* dispatch({
      type: "DELETE_ALL_CART_ITEMS",
    }); */
  };

  return (
    <Wrapper {...others}>
      <FlexBox
        width='100%'
        minWidth='0px'
        className='product-details'
        justifyContent='space-between'
        ml='1rem'>
        <FlexBox alignItems='flex-start'>
          <FlexBox
            flexWrap='wrap'
            alignItems='center'>
            <Image
              size={"1.7rem"}
              alt={name}
              className='img'
              display='block'
              src={"/assets/images/shops/bag.png"}
              mr='1rem'
            />

            <Typography
              fontWeight={600}
              className={arimo.className}
              color='gray.777'
              lineHeight={"2.25rem"}
              fontSize={"1.125rem"}
              mr='1rem'>
              My Cart
            </Typography>
          </FlexBox>
        </FlexBox>
        <FlexBox alignItems='center'>
          <Typography
            className={arimo.className}
            style={{ cursor: "pointer" }}
            onClick={handleCartAmountChange}
            color='#545454'
            fontSize={"0.937rem"}
            fontWeight={"400"}>
            Clear All
          </Typography>
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
};

export default CartCard;
