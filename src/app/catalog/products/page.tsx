"use client";
import { Fragment, useEffect } from "react";
import Hidden from "@component/hidden";
import Grid from "@component/grid/Grid";
import api from "@utils/__api__/shops";
import ProductFilterCard from "@component/products/ProductFilterCard";
import ShopIntroCard from "@sections/shop/ShopIntroCard";
import ProductDetails from "@component/shop/ProductDetails";
import SaleCategory from "@component/sale-page-1/SaleCategory";
import Box from "@component/Box";
import api2 from "@utils/__api__/fashion-2";
import api3 from "@utils/__api__/products";
import { useAppContext } from "@context/AppContext";
import { useSearchParams } from "next/navigation";
import useProductFilter from "@hook/useProductFilter";

type filterOption = {
  filterKey: string;
  operation: string;
  value: any;
  attributeValue: string;
};

const ShopDetails = async ({ params }: { params: { slug: string } }) => {
  const { state, dispatch } = useAppContext();
  const searchParams = useSearchParams();
  const offerFilter = searchParams.get("offer");

  useProductFilter();

  const fetchProduct = async () => {
    await api3.getProductWithPagination().then((res) => {
      console.log(res);
      if (res?.success) {
        dispatch({
          type: "UPDATE_PRODUCT_LIST",
          payload: res.data,
        });
      }
    });
  };

/*   useEffect(() => {
    if (offerFilter && offerFilter != null && offerFilter != "") {
    } else {
      fetchProduct().catch((e) => {
        console.log(e);
      });
    }
  }, []); */

  return (
    <Fragment>
      {/* <Box>
        <SaleCategory saleCategoryList={serviceList} />
      </Box> */}
      <Grid container>
        {/* SHOW IN LARGE DEVICE */}
        <Hidden as={Grid} item md={3} xs={12} down={1000}>
          <ProductFilterCard />
        </Hidden>

        <ProductDetails />
      </Grid>
    </Fragment>
  );
};

// ShopDetails.layout = NavbarLayout;

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = await api.getSlugs();

//   return {
//     paths: paths, //indicates that no page needs be created at build time
//     fallback: "blocking", //indicates the type of fallback
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const shop = await api.getShopBySlug(String(params.slug));
//   return { props: { shop } };
// };

export default ShopDetails;
