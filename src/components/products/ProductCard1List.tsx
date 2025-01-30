"use client";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Pagination from "@component/pagination";
import { ProductCard1 } from "@component/product-cards";
import ResponsiveProductCard from "@component/product-cards/ResponsiveProductCard";
import { SemiSpan } from "@component/Typography";
import { useAppContext } from "@context/AppContext";
import useProductFilter from "@hook/useProductFilter";
import { FC } from "react";
import { isMobile } from "react-device-detect";


// ==========================================================
type Props = { products: any };
// ==========================================================

const ProductCard1List: FC<Props> = ({ products }) => {
  const { state, dispatch } = useAppContext();
  const {updatePageNum} = useProductFilter();

  return (
    <div>
      <Grid container spacing={1}>
        {products && products?.content?.map((item, ind) => (
          <Grid item lg={4} sm={6} xs={6} key={item.id}>

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
           {/*  <ProductCard1
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
                /> */}
          </Grid>
        ))}
      </Grid>

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mt="32px"
      >
        <SemiSpan>Showing {products?.numberOfElements} of {products?.totalElements} Products</SemiSpan>
        <Pagination pageCount={products?.totalPages} onChange={(page) => updatePageNum(page)} />
      </FlexBox>
    </div>
  );
};

export default ProductCard1List;
