"use client";

import { FC, useState, useEffect } from "react";
// ** COMPONENT IMPORTS
import Box from "@component/Box";
import { ProductCard1 } from "@component/product-cards";
import CategorySectionCreator from "@component/CategorySectionCreator";
import Container from "@component/Container";
import Grid from "@component/grid/Grid";

// ** MODEL
import Product from "@models/product.model";

// ** MOBILE IMPORTS
import { isMobile } from "react-device-detect";
import ResponsiveProductCard from "@component/product-cards/ResponsiveProductCard";
import { Carousel } from "@component/carousel";
import NbProduct from "@models/nbProduct.model";
import { useAppContext } from "@context/AppContext";

// =============================================================
type Props = { products: NbProduct[]; title?: string };
// =============================================================

const Section13: FC<Props> = ({ products }) => {
  const { state, dispatch } = useAppContext();
  return (
    <>
      {isMobile ? (
        <CategorySectionCreator iconName="path" title="FOR YOU" seeMoreLink="#">
          {" "}
          <Container mt="2.25rem" pb="1rem">
            <Carousel
              totalSlides={products.length}
              showArrow={false}
              visibleSlides={isMobile ? 2 : 4}
            >
              {products.map((item, ind) => (
                <Box py="0.25rem" key={ind}>
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
                    cartItemInfo={
                      state.cart?.find(
                        (cartItem) => cartItem.productId === item.id
                      )
                        ? state.cart.find(
                            (cartItem) => cartItem.productId === item.id
                          )
                        : null
                    }
                    isAdded={
                      state.cart?.find(
                        (cartItem) => cartItem.productId === item.id
                      )
                        ? true
                        : false
                    }
                    cartSize={state.cart?.length}
                    cartId={state.cartInfo ? state.cartInfo.id : null}
                  />
                </Box>
              ))}
            </Carousel>
          </Container>
        </CategorySectionCreator>
      ) : (
        <Box mb="3.75rem" mt="3rem">
          <CategorySectionCreator
            iconName="path"
            title="FOR YOU"
            seeMoreLink="#"
          >
            <Container mt="2.25rem" pb="1rem">
              <Box mt="-0.25rem" mb="-0.25rem">
                <Grid container spacing={5}>
                  {products.map((item, ind) => (
                    <Grid item lg={3} md={6} xs={6} key={ind}>
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
                        cartItemInfo={
                          state.cart?.find(
                            (cartItem) => cartItem.productId === item.id
                          )
                            ? state.cart.find(
                                (cartItem) => cartItem.productId === item.id
                              )
                            : null
                        }
                        isAdded={
                          state.cart?.find(
                            (cartItem) => cartItem.productId === item.id
                          )
                            ? true
                            : false
                        }
                        cartSize={state.cart?.length}
                        cartId={state.cartInfo ? state.cartInfo.id : null}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Container>
          </CategorySectionCreator>
        </Box>
      )}
    </>
  );
};

export default Section13;
