"use client";
import { useEffect, useState } from "react";

const useProductAvailableAttributes = (productAttributeOption, productVariationExtendedAttribute) => {
    const [updateAttributeOption, setUpdateAttributeOption] = useState([]);

  useEffect(() => {
    console.log(productAttributeOption);
    console.log(productVariationExtendedAttribute);
    if (productAttributeOption && productAttributeOption.length > 0) {
        productAttributeOption.map((value, index) => {
            productVariationExtendedAttribute.map((exAttr, ind) => {
                const checkAttr = exAttr.extendedAttributes?.some(element => element.attributeCode == value.attributeCode);
                console.log(checkAttr);
                if(checkAttr){
                    value.attributeOption.map((v, i) => {
                        const checkAttrOpt = exAttr.extendedAttributes?.find(attr => attr.attributeCode == value.attributeCode && attr.valueId == v.value );
                        console.log(checkAttrOpt)
                        if(checkAttrOpt){
                            v.isDisabled = false;
                        }else{
                            v.isDisabled = true;
                        }
                    })
                }
            })
            
            
        })
              
      setUpdateAttributeOption(productAttributeOption);

      console.log(productAttributeOption)
    }
  }, [productAttributeOption, productVariationExtendedAttribute]);

  return updateAttributeOption;
};

export default useProductAvailableAttributes;
