import axios from "axios";
import Product from "@models/product.model";
import Shop from "@models/shop.model";
import NbProduct from "@models/nbProduct.model";

// get all product slug
const getSlugs = async (): Promise<{ params: { slug: string } }[]> => {
  const response = await axios.get("/api/products/slug-list");
  return response.data;
};

// get product based on slug
const getProduct = async (slug: string): Promise<NbProduct[]> => {
  console.log(slug);
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/contact/product/${slug}`, {
    params: { slug },
  });
  console.log(response.data.data);
  return response.data.data;
};

const getProductWithPagination = async (page = null): Promise<any> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/contact/product/pagination${page ? "?page=" + page : ""}`);
  console.log(response.data.data);
  return response.data;
};

const getProductWithFilter = async (payload, pageNum = null): Promise<any> => {
  console.log("================payload===============");
  console.log(payload);
  console.log("================payload===============");
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/contact/product/search${pageNum ? "?pageNum=" + pageNum : ""}`, payload);
  console.log(response.data.data);
  return response.data;
};



const getFrequentlyBought = async (): Promise<Product[]> => {
  const response = await axios.get("/api/frequently-bought-products");
  return response.data;
};

const getRelatedProducts = async (): Promise<Product[]> => {
  const response = await axios.get("/api/related-products");
  return response.data;
};

const getAvailableShop = async (): Promise<Shop[]> => {
  const response = await axios.get("/api/product/shops");
  return response.data;
};
const addBulkQuntity = async (payload): Promise<any> => {
  console.log("this is payload", payload);

  // const response = await axios.get("/api/product/shops");
  // return response.data;
};

const search = async (payload): Promise<any> => {
  /*   const q = {
      "query": {
        "query_string": {
          "query": payload
        }
      }
    } */

  const q = {
    "query": {
      "wildcard": {
        "productName": payload + "*"
      }
    }
  }
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/ele-search/_search`, q,
    { headers: { "Access-Control-Allow-Origin": "*" } });
  return response;
}

const fileUploadFunction = async (file: any) => {
  let formdata = new FormData();
  formdata.append("image", file, file?.name);
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/contact/product/search-by-image`, formdata, config)
  const prediction = JSON.parse(response.data?.data);
  const wildCardKeywordsList: any = [];

  if(prediction.length > 0){
    prediction.map(item => {
      const wildCardObj = {
        wildcard : {
          productName: item?.description + "*"
        }
      }
      wildCardKeywordsList.push(wildCardObj);
    })
    
    const q = {
      "query": {
        "bool" : {
          "should" : wildCardKeywordsList
        }
        
      }
    }
    console.log(q);
    const searchRes = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/ele-search/_search`, q,
      { headers: { "Access-Control-Allow-Origin": "*" } });

      return searchRes

  }
  
    
};


export default {
  search,
  getSlugs,
  getProduct,
  getFrequentlyBought,
  getRelatedProducts,
  getAvailableShop,
  addBulkQuntity,
  getProductWithPagination,
  getProductWithFilter,
  fileUploadFunction
};
