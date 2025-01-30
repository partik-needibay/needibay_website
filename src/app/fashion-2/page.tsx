import { Fragment } from 'react';

// ** API IMPORTS **
import api from "@utils/__api__/fashion-2";
import api2 from "@utils/__api__/market-1";
import api3 from "@utils/__api__/market-2";
import categoryApi from "@utils/__api__/market-2";

// ** COMPONENT IMPORTS **
import Section1 from "@sections/fashion-2/Section1";
import Section2 from "@sections/market-1/Section2";
import Section5 from "@sections/fashion-2/Section5";
import Section7 from "@sections/fashion-2/Section7";
import Section8 from "@sections/fashion-2/Section8";
import Section12 from "@sections/market-1/Section12";
import Section11 from "@sections/fashion-2/Section11";
import Section13 from "@sections/fashion-2/Section13";
import Section14 from "@sections/fashion-2/Section14";

const FashionTwo = async () => {


  const products = await api.getProducts();
  const serviceList = await api.getServices();
  const mainCarouselData = await api.getMainCarouselData();
  const flashDealsData = await api2.getFlashDeals();
  const adbrands = await api3.getBrands();

    return (
    <Fragment>
      {/* HERO CAROUSEL AREA */}
      <Section1
        data={mainCarouselData}
        brands={adbrands}
      />

      {/* CATEGORIES AREA */}
      <Section12 serviceList={serviceList} />

      {/* FLASH CARD BANNERS AREA*/}
      <Section5 />

      {/* TRENDING PRODUCTS CAROUSEL AREA */}
      <Section2 title="TRENDING PRODUCTS" products={flashDealsData} />

      {/* TRENDING PRODUCTS GRID   */}
      <Section11 products={flashDealsData} />

      {/* MAIN BANNER  */}
      <Section7 />

      {/* FOR YOU  AREA */}
      <Section13 products={flashDealsData} />

      {/* SECOND BANNER */}
      <Section14 />

      {/* TESTIMONIALS */}
      <Section8 products={products} />
    </Fragment>
  );
};

export default FashionTwo;
