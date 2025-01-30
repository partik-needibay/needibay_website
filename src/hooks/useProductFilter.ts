import React, { useEffect, useState } from "react";
import { useAppContext } from "@context/AppContext";
import productFilterAPI from "@utils/__api__/products";
import { useSearchParams } from "next/navigation";

type filterOption = {
  filterKey: string;
  operation: string;
  value: any;
  attributeValue: string;
};

const filterConfigList = {
  category: {
    key: "categoryId",
    operation: "eq",
    isExtendedAttribute: false,
  },
  isBranded: {
    key: "isBranded",
    operation: "eq",
    isExtendedAttribute: false,
  },
  isCustomizable: {
    key: "isCustomizable",
    operation: "eq",
    isExtendedAttribute: false,
  },
  productDeliveryType: {
    key: "productDeliveryType",
    operation: "eq",
    isExtendedAttribute: false,
  },
  minprice: {
    key: "basePrice",
    isExtendedAttribute: false,
    operation: "gt",
  },
  maxprice: {
    key: "basePrice",
    isExtendedAttribute: false,
    operation: "lt",
  },
  offer: {
    key: "offerCode",
    operation: "eq",
    isExtendedAttribute: false,
    attributeValue: "true"
  },
  color: {
    key: "attributeCode",
    operation: "eq",
    value: "color",
    isExtendedAttribute: true,
    attributeValue: "true"
  },
  rating:{
    key: "genThree",
    operation: "ge",
    isExtendedAttribute: false,
    attributeValue: "true"
  }
};

function getFilters(searchParams): filterOption[] | any {
  return Object.keys(filterConfigList)
    .map((filter): filterOption | null => {
      if (searchParams.has(filter)) {
        let value = searchParams.get(filter);
        const filterConfig = filterConfigList[filter];
        if (filterConfig) {
          if(value == "true"){
            value = 1;
          }
          if(value == "false"){
            value = 0;
          }
          const payload = {
            filterKey: filterConfig.key,
            operation: filterConfig.operation,
            value: filterConfig?.isExtendedAttribute ? filterConfig.value : value,
            attributeValue: filterConfig?.isExtendedAttribute ? value : "true",
          };
          console.log("================search payload ==================")
          console.log(payload)
          console.log("================search payload ==================")
          return {
            filterKey: filterConfig.key,
            operation: filterConfig.operation,
            value: filterConfig?.isExtendedAttribute ? filterConfig.value : value,
            attributeValue: filterConfig?.isExtendedAttribute ? value : "true",
          };
        }
      }
      return null;
    })
    .filter((a: filterOption): filterOption => a);
}

function useProductFilter(page= null) {
  const { state, dispatch } = useAppContext();
  const [pageNum, setPageNum] = useState(page);
  const searchParams = useSearchParams();
  const offerFilter = searchParams.get("offer");
  const categoryFilter = searchParams.get("category");

  const updatePageNum = (pageCount) => {
    setPageNum(pageCount);
  };

  useEffect(() => {
    try {
      let searchCriteriaList: filterOption[] = [
        /* {
          filterKey: "isVariant",
          operation: "eq",
          value: false,
          attributeValue: "true",
        }, */
      ];

      /* let filterOption: filterOption = {
        filterKey: "offerCode",
        operation: "eq",
        value: offerFilter,
        attributeValue: "true",
      }; */

      searchCriteriaList = [...searchCriteriaList, ...getFilters(searchParams)];

      console.log("======================searchCriteriaList============")
      console.log(searchCriteriaList)
      console.log("======================searchCriteriaList============")

      const payload = {
        dataOption: "all",
        searchCriteriaList: searchCriteriaList,
      };

      productFilterAPI
        .getProductWithFilter(payload, pageNum)
        .then((res) => {
          dispatch({
            type: "UPDATE_PRODUCT_LIST",
            payload: res.data,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (er) {
      // ..
    }
  }, [searchParams, pageNum]);

  return {updatePageNum};
}

export default useProductFilter;
