"use client";

// ** COMPONENT IMPORTS
import { FC, useEffect, useState } from "react";
import Box from "@component/Box";
import { Carousel } from "@component/carousel";
import { ProductCard1 } from "@component/product-cards";
import CategorySectionCreator from "@component/CategorySectionCreator";
import FlexBox from "@component/FlexBox";
// ** CUSTOM HOOKS
import useWindowSize from "@hook/useWindowSize";
import { useAppContext } from "@context/AppContext";


//** MODEL
import Product from "@models/product.model";

//**  MOBILE IMPORTS
import { isMobile } from "react-device-detect";
import ResponsiveProductCard from "@component/product-cards/ResponsiveProductCard";
import NbProduct from "@models/nbProduct.model";


// =============================================================
type Props = { products: NbProduct[], title?:  string };
// =============================================================

const Section2: FC<Props> = ({ products, title }) => {
  const width: any = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(4);
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    if (width < 500) setVisibleSlides(2);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(2);
    else setVisibleSlides(4);
  }, [width]);

  return (
    <CategorySectionCreator
      iconName='fire'
      title={ title ? title : "Trending roducts"}
      seeMoreLink='#'>
      <FlexBox
        width='100%'
        justifyContent='center'
        flexDirection={'column'}
        mt= { isMobile ? '1rem' : '2.25rem'}
        /* mb='-0.25rem' */>
        <Carousel
          totalSlides={products?.length}
          spacing={ isMobile ? '0.7rem' :'1.5rem'}
          showArrow={isMobile ? false : true}
          visibleSlides={ isMobile ? 2: visibleSlides}>
          {products && products.map((item, ind) => (
            <Box
              py='0.25rem'
              key={ind}>
              {isMobile ? (
                <ResponsiveProductCard
                  key={ind}
                  id={item.id}
                  slug={item.productSlug}
                  price={item.basePriceWithCommission}
                  title={item.productName}
                  productInfo={item}
                  //off={item.discount}
                  images={item.media as any[]}
                  //imgUrl={item.thumbnail}
                  //rating={item.rating || 4}
                  cartItemInfo={state.cart?.find((cartItem) => cartItem.productId === item.id) ? state.cart.find((cartItem) => cartItem.productId === item.id) : null}
                  isAdded={state.cart?.find((cartItem) => cartItem.productId === item.id) ? true : false}
                  cartSize={state.cart?.length}
                  cartId={state.cartInfo? state.cartInfo.id : null}
                />
              ) : (
                <ProductCard1
                  key={ind}
                  id={item.id}
                  slug={item.productSlug}
                  price={item.basePriceWithCommission}
                  title={item.productName}
                  productInfo={item}
                  //off={item.discount}
                  images={item.media as any[]}
                  //imgUrl={item.thumbnail}
                  //rating={item.rating || 4}
                  cartItemInfo={state.cart?.find((cartItem) => cartItem.productId === item.id) ? state.cart.find((cartItem) => cartItem.productId === item.id) : null}
                  isAdded={state.cart?.find((cartItem) => cartItem.productId === item.id) ? true : false}
                  cartSize={state.cart?.length}
                  cartId={state.cartInfo? state.cartInfo.id : null}
                  buttonLoader={!state.cart?.find((cartItem) => cartItem.productId === item.id) && state?.buttonLoader}
                />
              )}
            </Box>
          ))}
        </Carousel>
      </FlexBox>
    </CategorySectionCreator>
  );
};

export default Section2;
