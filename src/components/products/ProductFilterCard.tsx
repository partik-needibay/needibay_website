"use client";
import { Accordion, AccordionHeader } from "@component/accordion";
import Avatar from "@component/avatar";
import Card from "@component/Card";
import CheckBox from "@component/CheckBox";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Rating from "@component/rating";
import { H6, Paragraph, SemiSpan } from "@component/Typography";
import { useAppContext } from "@context/AppContext";
import Slider from "@mui/material/Slider";
import api from "@utils/__api__/fashion-2";
import { currency, setQueryParams } from "@utils/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";

const StyledSlider = styled(Slider)({
  color: "#672DD1",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#672DD1",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

type searchCriteriaList = filterOption[];

type filterOption = {
  filterKey: string;
  operation: string;
  value: any;
  attributeValue: string;
};

const ProductFilterCard: FC = () => {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [priceRangeSelected, setPriceRangeSelected] = useState<string | number | null>(null);
  const [deliveryType, setDeliveryType] = useState<string | number| null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  useEffect(() => {
    dispatch({ type: "UPDATE_PAGE_LOADER", payload: true });
    const fetchCategory = async () => {
      await api
        .getServices()
        .then((res) => {
          console.log(
            "Service========================================================"
          );
          console.log(res);
          dispatch({ type: "CATEGORY_LIST", payload: res });
          dispatch({ type: "UPDATE_PAGE_LOADER", payload: false });
        })
        .catch((e) => {
          dispatch({ type: "UPDATE_PAGE_LOADER", payload: false });
        })
        .finally(() => {
          dispatch({ type: "UPDATE_PAGE_LOADER", payload: false });
        });
    };
    fetchCategory().catch((e) => console.log(e));
  }, []);

  const [value, setValue] = useState([20, 37]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  // const applyCategoryFilter = async (e) => {
  //   const params = setQueryParams(searchParams, "category", e.target.value);
  //   router.push("/catalog/products/?" + params);

  //   // await productFilterAPI.getProductWithFilter(payload)
  //   // .then((res) => {
  //   //   dispatch({
  //   //     type: "UPDATE_PRODUCT_LIST",
  //   //     payload: res.data
  //   //   })
  //   // }).catch((e) => {
  //   //   console.log(e)
  //   // })

  //   console.log(e.target.value);
  // };

  const applyCategoryFilter = async (e) => {
    const selectedCategory = e.target.value;
    const currentCategory = searchParams.get("category");
  
    if (selectedCategory === currentCategory) {
      // Deselect the category if it is already selected
      removeQueryParam("category");
      router.push("/catalog/products/"); // Redirect without the filter
    } else {
      // Apply the selected category
      const params = setQueryParams(searchParams, "category", selectedCategory);
      router.push("/catalog/products/?" + params); // Redirect with the updated filter
    }
  };
  

  const removeQueryParam = async (paramToDelete) => {
    // Create a new URLSearchParams object based on the current search params
    const currentParams = new URLSearchParams(searchParams.toString());

    // Delete the parameter
    currentParams.delete(paramToDelete);

    const newUrl = `${window.location.pathname}`;

    // Convert the updated URLSearchParams object back to a string and navigate
    router.push(newUrl);
  };

  const applyColorFilter = async (id) => {
    const params = setQueryParams(searchParams, "color", id);
    router.push("/catalog/products/?" + params);
  };

  const applyBrandFilter = async (e) => {
    const value = e.target.value;
    const currentBrandFilter = searchParams.get("isBranded"); // Assuming you're using URLSearchParams for searchParams
  
    if (currentBrandFilter === value) {
      // If the value is already selected, remove the filter (deselect)
      removeQueryParam("isBranded");
      router.push("/catalog/products/"); // Redirect without the filter
    } else {
      // Apply the brand filter by setting the query parameter
      const params = setQueryParams(searchParams, "isBranded", value);
      router.push("/catalog/products/?" + params); // Redirect with the updated filter
    }
  };

  const applyCustomizationFilter = async (e) => {
    const params = setQueryParams(
      searchParams,
      "isCustomizable",
      e.target.value
    );
    router.push("/catalog/products/?" + params);
  };

  const applyDeliveryFilter = async (e) => {
  };

  const applyRatingFilter = async (rating: number) => {
    if (selectedRating === rating) {
      // Deselect the rating if it's already selected
      setSelectedRating(null);
      removeQueryParam("rating"); // Remove rating query param
      router.push("/catalog/products/"); // Redirect to products without the filter
    } else {
      // Apply the rating filter
      setSelectedRating(rating);
      const params = setQueryParams(searchParams, "rating", String(rating)); // Convert to string
      router.push("/catalog/products/?" + params); // Redirect with the updated filter
    }
  };
  

  const applyPriceRangeFilter = async (e, min, max) => {
    const selectedValue = e.target.value;
  
    // Toggle selection/deselection
    if (selectedValue == priceRangeSelected) {
      setPriceRangeSelected(null); // Deselect the checkbox
      removeQueryParam("minprice");
      removeQueryParam("maxprice");
      console.log("Price range deselected");
    } else {
      setPriceRangeSelected(selectedValue); // Select the new range
      const minprice = setQueryParams(searchParams, "minprice", min);
      const maxprice = setQueryParams(searchParams, "maxprice", max);
      console.log("/catalog/products/?" + minprice + "&" + maxprice);
      router.replace(
        "/catalog/products/?" + "minprice=" + min + "&" + "maxprice=" + max
      );
       //router.push("/catalog/products/?" + minprice +"&"+ maxprice);
    /* let searchCriteriaList: filterOption[] = [
      {
        filterKey: "isVariant",
        operation: "eq",
        value: false,
        attributeValue: "false",
      },
    ];
    let filterOptionMin: filterOption = {
      filterKey: "basePrice",
      operation: "gt",
      value: min,
      attributeValue: "false",
    };
    let filterOptionMax: filterOption = {
      filterKey: "basePrice",
      operation: "lt",
      value: max,
      attributeValue: "false",
    };
    searchCriteriaList.push(filterOptionMin);
    searchCriteriaList.push(filterOptionMax);

    const payload = {
      dataOption: "all",
      searchCriteriaList: searchCriteriaList,
    };


    console.log(payload);

    await productFilterAPI
      .getProductWithFilter(payload)
      .then((res) => {
        dispatch({
          type: "UPDATE_PRODUCT_LIST",
          payload: res.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });

    console.log(e.target.value); */
    }
  };
  
  const applyDeliveryModeFilter = async (e) => {
    const value = e.target.value; // Get the value of the clicked checkbox
    const searchString: any = deliveryOption.find(o => o.id == value);
  
    if (deliveryType == value) {
      setDeliveryType(null); // Deselect if it's already selected
      removeQueryParam("productDeliveryType"); // Optionally remove from query params
    } else {
      const params = await setQueryParams(
        searchParams,
        "productDeliveryType",
        searchString?.value
      );
      setDeliveryType(value); // Set the selected delivery type
      router.push("/catalog/products/?" + params); // Update the URL with the new query params
    }
  };
  

  const handleBlur = () => {
    if (value[0] < 0) {
      setValue([0, value[1]]);
    } else if (value[1] > 250) {
      setValue([value[0], 250]);
    }
  };

  const render = (items: string[]) =>
    items.map((name) => (
      <Paragraph
        py="6px"
        pl="22px"
        key={name}
        fontSize="14px"
        color="text.muted"
        className="cursor-pointer"
      >
        {name}
      </Paragraph>
    ));

  return (
    <Card p="18px 27px" elevation={5}>
      <H6 mb="10px">Categories</H6>
      {state.categories?.length > 0 &&
        state.categories
          ?.filter((o) => o.isStoreVisible == true)
          .map((item, index) =>
            item.child ? (
              <Accordion key={item.categoryName} expanded>
                <AccordionHeader px="0px" py="6px" color="text.muted">
                  <SemiSpan className="cursor-pointer" mr="9px">
                    {item.categoryName}
                  </SemiSpan>
                </AccordionHeader>

                {render(item.child)}
              </Accordion>
            ) : (
              <CheckBox
                my="10px"
                checked={item.id == searchParams.get("category")}
                key={item.index}
                name={item.categoryName}
                value={item.id}
                color="secondary"
                label={<SemiSpan color="inherit">{item.categoryName}</SemiSpan>}
                onChange={applyCategoryFilter}
              />
            )
          )}
      <Divider mt="18px" mb="24px" />
      {/* PRICE RANGE FILTER */}
      <H6 mb="16px">Price Range</H6>
      {priceRange.map((item, index) => (
        <CheckBox
          my="10px"
          key={index}
          name={item.label}
          value={item.id}
          checked={item.id == priceRangeSelected}
          color="secondary"
          label={<SemiSpan color="inherit">{item.label}</SemiSpan>}
          onChange={(e) => applyPriceRangeFilter(e, item.min, item.max)}
        />
        
        
      ))}
      {/*  <StyledSlider
        value={value}
        onChange={handleChange}
        valueLabelDisplay='auto'
        disableSwap
        min={100}
        max={10000}
      />
      <FlexBox
        justifyContent='space-between'
        alignItems='center'>
        <TextField
          placeholder='0'
          type='number'
          onChange={(e) => setValue([Number(e.target.value), value[1]])}
          value={value[0]}
          onBlur={handleBlur}
          min={0}
          step={10}
          max={10000}
          fullwidth
        />

        <H5
          color='text.muted'
          px='0.5rem'>
          -
        </H5>

        <TextField
          placeholder='250'
          type='number'
          onChange={(e) => setValue([value[0], Number(e.target.value)])}
          value={value[1]}
          onBlur={handleBlur}
          min={0}
          step={10}
          max={10000}
          fullwidth
        />
      </FlexBox> */}
      <Divider my="24px" />
      {/* Delivery Time FILTER */}
      <H6 mb="16px">Delivery Time</H6>
      {deliveryOption.map((item) => (
        <CheckBox
          my="10px"
          key={item.id}
          name={item.value}
          value={item.id}
          color="secondary"
          label={<SemiSpan color="inherit">{item.value}</SemiSpan>}
          onChange={(e) => applyDeliveryModeFilter(e)}
          checked={String(deliveryType) === String(item.id)} 
        />
      ))}
      <Divider my="24px" />
      {/* Delivery Time FILTER */}
      <H6 mb="16px">Customization Scope</H6>
      <CheckBox
        my="10px"
        key={0}
        name={"isCustomizable"}
        value={"false"}
        checked={searchParams.get("isCustomizable") == "false"}
        color="secondary"
        label={<SemiSpan color="inherit">{"No"}</SemiSpan>}
        onChange={(e) => applyCustomizationFilter(e)}
      />
      <CheckBox
        my="10px"
        key={1}
        name={"isCustomizable"}
        value={"true"}
        checked={searchParams.get("isCustomizable") == "true"}
        color="secondary"
        label={<SemiSpan color="inherit">{"Yes"}</SemiSpan>}
        onChange={(e) => applyCustomizationFilter(e)}
      />
      <Divider my="24px" />
      {/* BRANDS FILTER */}
      <H6 mb="16px">Quality</H6>
      <CheckBox
        my="10px"
        key={0}
        name={"isBranded"}
        value={"false"}
        checked={searchParams.get("isBranded") == "false"}
        color="secondary"
        label={<SemiSpan color="inherit">{"Non Branded"}</SemiSpan>}
        onChange={(e) => applyBrandFilter(e)}
      />
      <CheckBox
        my="10px"
        key={0}
        name={"isBranded"}
        value={"true"}
        checked={searchParams.get("isBranded") == "true"}
        color="secondary"
        label={<SemiSpan color="inherit">{"Branded"}</SemiSpan>}
        onChange={(e) => applyBrandFilter(e)}
      />
      <Divider my="24px" />
      {/* COLORS FILTER */}
      <H6 mb="16px">Colors</H6>
      <FlexBox mb="1rem">
        {colorList.map((item, ind) => (
          <Avatar
            key={ind}
            bg={item.value}
            size={25}
            mr="10px"
            style={{ cursor: "pointer" }}
            onClick={(e) => applyColorFilter(item.id)}
          />
        ))}
      </FlexBox>
      <Divider my="24px" />
      {/* RATING FILTER */}
      <H6 mb="16px">Ratings</H6>
      {[5, 4, 3, 2, 1].map((item) => (
  <CheckBox
    my="10px"
    key={item}
    value={(item)}
    name={"rating"}
    checked={Number(searchParams.get('rating')) === item}
    color="secondary"
    label={<Rating value={item} outof={5} color="warn" />}
    onChange={() => applyRatingFilter(item)}
  />
))}
    </Card>
  );
};

const categroyList = [
  {
    title: "Brown Boxes",
    child: [
      "Single Wall - 3 Ply",
      "Double Wall - 5 Ply",
      "Triple Wall - 7 Ply",
    ],
  },
  { title: "Mailer Boxes" },
  { title: "Festive Mailers" },
  { title: "Reverse Tuck" },
  { title: "Cardboard Boxes" },
];

const otherOptions = ["On Sale", "In Stock", "Featured"];
const brandList = ["Branded", "Non Braned"];
const colorList = [
  {
    id: "5",
    value: "#1C1C1C",
  },
  {
    id: "6",
    value: "#FF7A7A",
  },
  {
    id: "7",
    value: "#FFC672",
  },
  {
    id: "8",
    value: "#84FFB5",
  },
];

const priceRange = [
  {
    id: 0,
    min: "100",
    max: "200",
    label: `${currency(100)} - ${currency(200)}`,
  },
  {
    id: 1,
    min: "201",
    max: "500",
    label: `${currency(201)} - ${currency(500)}`,
  },
];

const deliveryOption = [
  { id: 1, value: "Fastest Mode" },
  { id: 2, value: "Normal Mode" },
  { id: 3, value: "5-7 days" },
  { id: 4, value: "8-14 days" },
];

export default ProductFilterCard;
