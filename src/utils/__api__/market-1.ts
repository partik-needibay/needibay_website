import axios from "axios";
import Shop from "@models/shop.model";
import Brand from "@models/Brand.model";
import Product from "@models/product.model";
import Service from "@models/service.model";
import Category from "@models/category.model";
import MainCarouselItem from "@models/market-1.model";
import NbProduct from "@models/nbProduct.model";
import NbCart from "@models/nbCart.model";

const getTopRatedProduct = async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-1/toprated-product");
  return response.data;
};

const getSideProducts = async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-1/products");
  return response.data;
};

const getTopRatedBrand = async () => {
  const response = await axios.get("/api/market-1/toprated-brand");
  return response.data;
};

const getNewArrivalList = async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-1/new-arrivals");
  return response.data;
};

const getCarBrands = async (): Promise<Brand[]> => {
  const response = await axios.get("/api/market-1/car-brand-list");
  return response.data;
};

const getCarList = async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-1/car-list");
  return response.data;
};

const getMobileBrands = async (): Promise<Brand[]> => {
  const response = await axios.get("/api/market-1/mobile-brand-list");
  return response.data;
};

const getMobileShops = async (): Promise<Shop[]> => {
  const response = await axios.get("/api/market-1/mobile-shop-list");
  return response.data;
};

const getMobileList = async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-1/mobile-list");
  return response.data;
};

const getOpticsBrands = async (): Promise<Brand[]> => {
  const response = await axios.get("/api/market-1/optics/watch-brands");
  return response.data;
};

const getOpticsShops = async (): Promise<Shop[]> => {
  const response = await axios.get("/api/market-1/optics/watch-shops");
  return response.data;
};

const getOpticsList = async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-1/optics-list");
  return response.data;
};

const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get("/api/market-1/bottom-categories");
  return response.data;
};

const getMoreItems = async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-1/get-more-items");
  return response.data;
};

const getServiceList = async (): Promise<Service[]> => {
  const response = await axios.get("/api/market-1/get-service-list");
  return response.data;
};

const getMainCarousel = async (): Promise<[MainCarouselItem]> => {
  const response = await axios.get("/api/market-1/main-carousel");
  return response.data;
};

const getFlashDeals = async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-1/flash-deals");
  return response.data;
};

const getCountDownOffer = async (): Promise<NbProduct[]> => {
  const trendingProductsFilter = {
    dataOption: "all",
    searchCriteriaList: [
        {
            filterKey: "attributeCode",
            operation: "eq",
            value: "daily_sale_tag",
            attributeValue : "true"
        }
    ]
}
const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/contact/product/search`, trendingProductsFilter);
return response.data?.data?.content;
};

const getTrendingProducts = async (): Promise<NbProduct[]> => {
  const trendingProductsFilter = {
      dataOption: "all",
      searchCriteriaList: [
          {
              filterKey: "attributeCode",
              operation: "eq",
              value: "is_trending",
              attributeValue : "true"
          },
          {
            filterKey: "isActive",
            operation: "eq",
            value: true,
            attributeValue: "true"
        }
      ]
  }
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/contact/product/search`, trendingProductsFilter);
  return response.data?.data?.content;
};

const getRelatedProducts = async (): Promise<any> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/contact/product`);
  return response.data.data;
};

const getAlsoViewProduct = async (): Promise<NbProduct[]> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/contact/product`);
  return response.data.data;
};

const getCartItem = async (customerId): Promise<any> => {
  console.log(
    "=====================customer api response ====================="
  );
  console.log(customerId);
  console.log(
    "=====================customer api response ====================="
  );
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/contact/cart/customer/${customerId}`
  );
  console.log("=====================cart api response =====================");
  console.log(response);
  console.log("=====================cart api response =====================");
  return response.data.data;
};

const addCartItem = async (payload): Promise<any> => {
  console.log(payload);
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/contact/cart`,
    payload
  );
  return response.data.data;
};
const addCartItemExistingCart = async (payload, cartId): Promise<any> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/contact/cart/${cartId}/item`,
    payload
  );
  return response.data.data;
};

const removeCartItem = async (payload, cartId): Promise<NbCart> => {
  console.log("cartId", cartId);
  console.log("====================");
  console.log(payload);
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/contact/cart/${cartId}/item`,
    { data: payload }
  );
  return response.data.data;
};

const updateCartItem = async (payload, cartId): Promise<NbCart> => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/contact/cart/${cartId}`,
    payload
  );
  return response.data.data;
};

const deleteCart = async (cartId): Promise<NbCart> => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/contact/cart/${cartId}`
  );
  return response.data.data;
};

const getCityList = async (session): Promise<any> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customer/address/city`,
    { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } }
  );
  return response.data.data;
};

const getStateList = async (session): Promise<any> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customer/address/state`,
    { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } }
  );
  return response.data.data;
};

const getZipcodeList = async (session): Promise<any> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customer/address/zipcode`,
    { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } }
  );
  return response.data.data;
};

const getShippingAddress = async (session): Promise<any> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customer/${session?.user?.name?.userData?.id}/address/shipping`,
    { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } }
  );
  console.log(response.data.data);
  return response.data.data;
};

const saveShippingAddress = async (session, payload): Promise<any> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customer/${session?.user?.name?.userData?.id}/address/shipping`,
    payload,
    { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } }
  );
  return response.data;
};

const getCustomerProfile = async (session): Promise<any> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customer/profile/${session?.user?.name?.userData?.id}`,
    { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } }
  );
  return response.data.data;
};

const updateCustomerProfile = async (session, payload): Promise<any> => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customer/profile/${session?.user?.name?.userData?.id}`,
    payload,
    { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } }
  );
  return response.data;
};

const getBillingAddress = async (session): Promise<any> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customer/${session?.user?.name?.userData?.id}/address/billing`,
    { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } }
  );
  console.log(response.data.data);
  return response.data.data;
};

const saveBillingAddress = async (session, payload): Promise<any> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customer/${session?.user?.name?.userData?.id}/address/billing`,
    payload,
    { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } }
  );
  console.log(response);
  return response.data;
};

const getCustomerGst = async (session): Promise<any> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customer/${session?.user?.name?.userData?.id}/gstin`,
    { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } }
  );
  console.log(response);
  return response.data.data;
};

const saveCustomerGst = async (session, payload): Promise<any> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customer/${session?.user?.name?.userData?.id}/gstin/${payload.newGst}`,
    {
      gstin: payload.newGst,
      isDefault: payload.isDefault,
    },
    { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } }
  );
  console.log(response);
  return response.data;
};

const saveCustomerEmail = async (session, payload): Promise<any> => {
  console.log(payload)
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customer/${session?.user?.name?.userData?.id}/email/verify`,
    payload,
    { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } }
  );
  return response;
};

const getTopCategories = async (): Promise<Category[]> => {
  const response = await axios.get("/api/market-1/top-categories");
  return response.data;
};

const getBigDiscountList = async (): Promise<Product[]> => {
  const response = await axios.get("/api/market-1/big-discounts");
  return response.data;
};

const customerSignup = async (payload): Promise<any> => {
  console.log(payload)
  /* await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/customer/register`, payload).then((res) => {
      debugger;
      return res.data;
  }).catch((e) => {
    console.log(e)
  }); */

  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/customer/register`, payload);
  return response.data;
  
  
};


const generateOtp = async (payload): Promise<any> => {
  console.log(payload)
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/customer/otp/generate`, payload);
  return response.data;
};

const generateOtpNewContact = async (session, payload): Promise<any> => {
  console.log(payload)
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/customer/otp/phone`,  
  payload,
  { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } },
  );
  return response;
};

const verifyOtp = async (session, payload): Promise<any> => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/customer/verify-otp/phone`, 
  payload,
  { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } },);
  return response;
};

const confirmEmailforgotPassword = async (payload): Promise<Product[]> => {
  console.log(payload)
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/customer/verify-otp/phone`, payload);
  return response.data;
};

const changePassword = async (payload): Promise<Product[]> => {
  console.log(payload)
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/customer/verify-otp/phone`, payload);
  return response.data;
};

const getCurrentLocation = async (url): Promise<any> => {
  const response = await axios.get(url);
  return response.data;
};

const placeOrder = async (payload): Promise<any> => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/contact/order`, payload);
  return response.data;
};


export default {
  getCountDownOffer,
  getCarList,
  getCarBrands,
  getMoreItems,
  getFlashDeals,
  getSideProducts,
  getMobileList,
  getCategories,
  getOpticsList,
  getServiceList,
  getMobileShops,
  getOpticsShops,
  getMainCarousel,
  getMobileBrands,
  getOpticsBrands,
  getTopCategories,
  getTopRatedBrand,
  getNewArrivalList,
  getBigDiscountList,
  getTopRatedProduct,
  getTrendingProducts,
  getRelatedProducts,
  getAlsoViewProduct,
  addCartItem,
  removeCartItem,
  updateCartItem,
  getCartItem,
  addCartItemExistingCart,
  getCityList,
  getStateList,
  getZipcodeList,
  getShippingAddress,
  saveShippingAddress,
  getCustomerProfile,
  getBillingAddress,
  saveBillingAddress,
  getCustomerGst,
  saveCustomerGst,
  customerSignup,
  verifyOtp,
  generateOtp,
  saveCustomerEmail,
  generateOtpNewContact,
  getCurrentLocation,
  placeOrder,
  updateCustomerProfile,
  deleteCart
};
