"use client";
import { FC, useState, useEffect } from "react";

import { useTimer } from "react-timer-hook";
import Card from "@component/Card";

// ** COMPONENT IMPORTS
import Box from "@component/Box";
import { ProductCard1 } from "@component/product-cards";
import Product from "@models/product.model";
import Container from "@component/Container";
import Grid from "@component/grid/Grid";
import OfferCard from "@component/product-cards/OfferCard";
import { useAppContext } from "@context/AppContext";
import NbProduct from "@models/nbProduct.model";
// ** MOBILE IMPORTS
import { isMobile } from "react-device-detect";
import ResponsiveProductCard from "@component/product-cards/ResponsiveProductCard";

// =============================================================
type Props = { products: NbProduct[]; title?: string };
// =============================================================

const Section11: FC<Props> = ({ products }) => {
  const [stateMobile, setState] = useState(false);
  const { state, dispatch } = useAppContext();
  const time = new Date();
  time.setSeconds(time.getSeconds() + 7200);

  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.warn("onExpire called"),
  });

  useEffect(() => {
    if (!isMobile && typeof window !== "undefined") {
      setState(stateMobile);
    } else {
      setState(!stateMobile);
    }
  }, []);
  return (
    <Box mb="3.75rem">
      <Container pb="1rem">
        <Box mt="-0.25rem" mb="-0.25rem">
          <Grid container spacing={5}>
            <Grid item md={3} xs={12}>
              <Card
                elevation={0}
                style={{
                  height: "100%",
                  borderRadius: "3px",
                  border: 0,
                }}
              >
                <OfferCard
                  hours={hours}
                  mins={minutes}
                  secs={seconds}
                />
            

                
              </Card>
            </Grid>

            {products?.map((item, ind) => (
              <Grid item lg={3} md={6} xs={6} key={ind}>
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
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Section11;
