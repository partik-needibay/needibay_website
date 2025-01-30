import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Image from "@component/Image";
import Typography from "@component/Typography";
import { IconButton } from "@component/buttons";
import Icon from "@component/icon/Icon";
import { useAppContext } from "@context/AppContext";
import api2 from "@utils/__api__/market-1";
import { overpass, roboto } from "@utils/fonts";
import { currency, getTheme } from "@utils/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import styled from "styled-components";
import { space, SpaceProps } from "styled-system";

// styled component

const StyledIcon = styled(Icon)`
  @media only screen and (max-width: 600px) {
    color: white;
  }
`;
const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
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

  @media only screen and (max-width: 600px) {
    img {
      height: 6rem;

      width: 6rem;
    }
    .product-details {
      padding: 0.5rem;
    }

    .gst {
      font-size: 0.7rem;
    }

    .price {
      font-size: 1.1rem;
    }
    .title {
      font-size: 0.93rem;
    }
    .delivery {
      font-size: 0.8rem;
    }
  }
  ${space}
`;

const StyledBox = styled(Box)`
  cursor: "pointer";
  @media only screen and (max-width: 600px) {
    border-radius: 50%;
    padding: 0.1rem;
    background-color: ${getTheme("primary.main")};
  }
`;
// =====================================================================
interface ProductCard77Props extends SpaceProps {
  qty: number;
  name: string;
  slug: string;
  price: number;
  imgUrl?: string;
  id: string | number;
  productId: any;
  cartSize;
  cartId;
  isSampleQty;
  minOrderQty;
}
type updateCartItem = {
  qty: number;
  productId: number; // Product ID
  id: any; // Cart Item Id Primary Key Cart Item Table
  minOrderQty: string | number | null;
  isSampleQty: boolean;
};
// =====================================================================

const ProductCard77: FC<ProductCard77Props> = (props) => {
  const {
    id,
    productId,
    name,
    qty,
    price,
    imgUrl,
    slug,
    cartSize,
    cartId,
    minOrderQty,
    isSampleQty,
    ...others
  } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const { state, dispatch } = useAppContext();

  const handleUpdateItemQty = async (updatedQty) => {
    if (session?.user) {
      if (updatedQty === 0) {
        return false;
        const payload = {
          customerId: session?.user?.name?.userData?.id,
          cartItems: [{ productId: productId }],
        };
        const response = await api2.removeCartItem(payload, state.cartInfo.id);
        const cart = await api2.getCartItem(session?.user?.name?.userData?.id);
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: cart ? cart : null,
        });
        return false;
      }
      let updateCartItems: updateCartItem[] = [];

      const updateCartItem: updateCartItem = {
        qty: updatedQty,
        productId,
        id,
        minOrderQty: minOrderQty,
        isSampleQty: isSampleQty,
      };

      updateCartItems.push(updateCartItem);

      const payload = {
        customerId: session?.user?.name?.userData?.id,
        cartItems: updateCartItems,
      };
      const response = await api2.updateCartItem(payload, cartId);
      const cart = await api2.getCartItem(session?.user?.name?.userData?.id);
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: cart ? cart : null,
      });

      console.log(response);
    } else {
      dispatch({ type: "LOGIN_POPUP", payload: true });
    }
  };

  const handleRemoveItem = async (productId) => {
    if (session?.user) {
      const payload = {
        customerId: session?.user?.name?.userData?.id,
        cartItems: [{ productId: productId }],
      };
      const response = await api2.removeCartItem(payload, cartId);
      const cart = await api2.getCartItem(session?.user?.name?.userData?.id);
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: cart ? cart : null,
      });
      console.log(response);
    }
  };

  return (
    <Wrapper {...others}>
      <Image
        size={140}
        alt={name}
        display="block"
        src={imgUrl || "/assets/images/products/iphone-xi.png"}
      />

      <FlexBox
        width="100%"
        minWidth="0px"
        flexDirection="column"
        className="product-details"
        justifyContent="space-between"
      >
        <Link href={`/product/${slug}`}>
          <Typography
            className={`${roboto.className} title `}
            fontWeight="600"
            fontSize="18px"
            mb="0.5rem"
          >
            {name}
          </Typography>
        </Link>

        <Box position="absolute" right="1rem" top="1rem">
          <IconButton
            padding="4px"
            ml="12px"
            onClick={() => handleRemoveItem(productId)}
          >
            <Icon size="1rem">delete</Icon>
          </IconButton>
        </Box>

        <FlexBox alignItems="flex-start">
          <FlexBox flexWrap="wrap" alignItems="center">
            <Typography
              className={`price ${overpass.className}`}
              color="green.100"
              fontSize={"1.5625rem"}
              fontWeight={"700"}
              mr="0.5rem"
            >
              {currency(price)}
            </Typography>

            <Typography
              fontWeight={600}
              className={`gst ${overpass.className}`}
              color="gray.777"
              mr="1rem"
            >
              + 18%(GST)
            </Typography>
          </FlexBox>
        </FlexBox>

        <FlexBox alignItems="flex-start">
          <FlexBox flexWrap="wrap" alignItems="center">
            
          </FlexBox>
        </FlexBox>

        <FlexBox justifyContent="space-between" alignItems="flex-end">
          <FlexBox flexWrap="wrap" alignItems="center">
           
          </FlexBox>

          <FlexBox alignItems="center">
            <StyledBox
              size="none"
              padding="5px"
              color="white"
              cursor={qty === 1 ? "not-allowed" : "pointer"}
              backgroundColor={qty === 1 ? "grey" : "primary.main"}
              borderRadius={"0.24rem"}
              borderColor="#3B3B3B"
              //onClick={handleCartAmountChange(qty - 1)}
              onClick={() => handleUpdateItemQty(qty - 1)}
            >
              <StyledIcon variant="small">minus</StyledIcon>
            </StyledBox>

            <Typography
              mx="0.5rem"
              className={overpass.className}
              color="#121212"
              fontWeight="600"
              fontSize="0.88rem"
            >
              {`${qty}`} {minOrderQty && !isSampleQty && `x${minOrderQty}`}
            </Typography>

            <StyledBox
              size="none"
              padding="5px"
              backgroundColor="primary.main"
              color="white"
              cursor="pointer"
              borderColor="#3B3B3B"
              borderRadius={"0.24rem"}
              onClick={() => handleUpdateItemQty(qty + 1)}
            >
              <Icon variant="small">plus</Icon>
            </StyledBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
};

export default ProductCard77;
