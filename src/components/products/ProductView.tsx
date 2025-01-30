"use client";
import Box from "@component/Box";
import Container from "@component/Container";
import FlexBox from "@component/FlexBox";
import ProductDescription from "@component/products/ProductDescription";
import ProductReview from "@component/products/ProductReview";
import { H5 } from "@component/Typography";
import NbProduct from "@models/nbProduct.model";
import Product from "@models/product.model";
import Shop from "@models/shop.model";
import Section2 from "@sections/market-1/Section2";
import { useState } from "react";
import MediaQuery from "react-responsive";
import ProductBanner from "./ProductBanner";
type Props = {
  shops: Shop[];
  relatedProducts: NbProduct[];
  frequentlyBought: Product[];
  flashDealsData: NbProduct[];
  currentProductId: any;
  productInfo: any;
};

const ProductView = (props: Props) => {
  const {
    shops,
    relatedProducts,
    frequentlyBought,
    flashDealsData,
    currentProductId,
    productInfo,
  } = props;
  const [selectedOption, setSelectedOption] = useState("description");
  const handleOptionClick = (opt: any) => () => setSelectedOption(opt);

  return (
    <>
      <Container>
        <Box mt="1rem" overflow={"hidden"} backgroundColor={"white"}>
          <FlexBox
            borderBottom="1px solid"
            borderColor="gray.400"
            mt="0.1rem"
            mb="22px"
          >
            <MediaQuery maxWidth={767}>
              {" "}
              <H5
                padding="1.5rem"
                className="cursor-pointer"
                borderColor="primary.main"
                onClick={handleOptionClick("description")}
                borderBottom={
                  selectedOption === "description" ? "2px solid" : ""
                }
                color={selectedOption === "description" ? "dark" : "text.muted"}
              >
                Description
              </H5>
              <H5
                p="4px 10px"
                className="cursor-pointer"
                borderColor="primary.main"
                padding="1.5rem"
                onClick={handleOptionClick("review")}
                borderBottom={selectedOption === "review" ? "2px solid" : ""}
                color={selectedOption === "review" ? "dark" : "text.muted"}
              >
                Review
              </H5>
             
            </MediaQuery>
            <MediaQuery minWidth={768}>
              {" "}
              <H5
                mr="25px"
                p="4px 10px"
                padding="1.5rem"
                className="cursor-pointer"
                borderColor="primary.main"
                onClick={handleOptionClick("description")}
                borderBottom={
                  selectedOption === "description" ? "2px solid" : ""
                }
                color={selectedOption === "description" ? "dark" : "text.muted"}
              >
                Description
              </H5>
              <H5
                p="4px 10px"
                className="cursor-pointer"
                borderColor="primary.main"
                padding="1.5rem"
                onClick={handleOptionClick("review")}
                borderBottom={selectedOption === "review" ? "2px solid" : ""}
                color={selectedOption === "review" ? "dark" : "text.muted"}
              >
                Review
              </H5>
              
            </MediaQuery>
          </FlexBox>{" "}
          {/* DESCRIPTION AND REVIEW TAB DETAILS */}
          <Box mb="50px">
            {selectedOption === "description" && (
              <ProductDescription productDescription={productInfo?.genTwo} />
            )}
            {selectedOption === "review" && (
              <ProductReview productId={currentProductId} />
            )}
          </Box>
        </Box>
      </Container>
      {/* FREQUENTLY BOUGHT TOGETHER PRODUCTS */}
      <Section2 title="Related Products" products={flashDealsData} />

      {/* RELATED PRODUCTS */}
      <Section2 title="Also Viewed" products={flashDealsData} />

      <ProductBanner></ProductBanner>
    </>
  );
};

export default ProductView;
