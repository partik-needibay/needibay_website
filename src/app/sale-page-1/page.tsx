import axios from "axios";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import { H1 } from "@component/Typography";

import api from "@utils/__api__/fashion-2";

import Container from "@component/Container";
import SaleNavbar from "@component/sale-page-1/SaleNavbar";
import SaleCategory from "@component/sale-page-1/SaleCategory";
import SaleProducts from "@component/sale-page-1/SaleProducts";
import { SearchParams } from "interfaces";
import ProductFilterCard from "@component/products/ProductFilterCard";
import Grid from "@component/grid/Grid";
import Hidden from "@component/hidden";

const SalePage1 = async ({ searchParams }: SearchParams) => {
  const PAGE_SIZE = 28;
  const PAGE = searchParams?.page ? Number(searchParams.page) : 1;
  const { data } = await axios.get("/api/products", {
    params: { page: PAGE, pageSize: PAGE_SIZE },
  });

  const serviceList = await api.getServices();

  const saleCategoryList = [
    { icon: "women-dress", title: "Women" },
    { icon: "beauty-products", title: "Cosmetics" },
    { icon: "camera", title: "Eelctronics" },
    { icon: "sofa", title: "Furniture" },
  ];

  return (
    <Container mt='2rem'>
      <SaleNavbar saleCategoryList={serviceList} />

      <Box>
        <SaleCategory saleCategoryList={serviceList} />
      </Box>

      
        <SaleProducts
          products={data.result}
          meta={data.meta}
        />

    </Container>
  );
};

export default SalePage1;
