import { Fragment } from "react";
import api from "@utils/__api__/products";
import ProductIntro from "@component/products/ProductIntro";
import ProductView from "@component/products/ProductView";
import Box from "@component/Box";
import api2 from "@utils/__api__/market-1";
import MediaQuery from "react-responsive";

const ProductDetails = async ({ params }: { params: { slug: string } }) => {
  const shops = await api.getAvailableShop();
  const relatedProducts = await api2.getRelatedProducts();
  const frequentlyBought = await api.getFrequentlyBought();
  const relatedProduct = await api2.getRelatedProducts();

  const product: any = await api.getProduct(params.slug as string);

  return (
    <Fragment>
      <Box>
        <ProductIntro
          id={product.id}
          slug={product.productSlug}
          price={product.basePriceWithCommission}
          title={product.productName}
          images={product.media}
          productInfo={product}
        />
        {product.relatedProducts && product.relatedProducts.length > 0 ? (
          <ProductView
            shops={shops}
            relatedProducts={relatedProducts}
            frequentlyBought={frequentlyBought}
            flashDealsData={relatedProduct.filter(
              (o) =>
                o.id ==
                product.relatedProducts.find(
                  (y) =>
                    y.linked_product_id == o.id &&
                    y.link_type == "RELATED_PRODUCT"
                )?.linked_product_id
            )}
            currentProductId={product.id}
            productInfo={product}
          />
        ): (
          <ProductView
            shops={shops}
            relatedProducts={relatedProducts}
            frequentlyBought={frequentlyBought}
            flashDealsData={relatedProducts}
            currentProductId={product.id}
            productInfo={product}
          />

        )}
      </Box>
    </Fragment>
  );
};

export default ProductDetails;
