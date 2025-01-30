"use client";
import Box from "@component/Box";
import { Card7 } from "@component/Card7";
import Container from "@component/Container";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Image from "@component/Image";
import { SanitizeHTML } from "@component/SanitizeHTML";
import Select from "@component/Select";
import Typography, { H1, H2, H3, SemiSpan } from "@component/Typography";
import Avatar from "@component/avatar";
import { Button } from "@component/buttons";
import { Carousel, NbCarousel } from "@component/carousel";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import { Rating } from "@component/rating-box/Rating";
import TextField from "@component/text-field";
import { useAppContext } from "@context/AppContext";
import zipcodeList from "@data/zipcodeList";
import useProductAvailableAttributes from "@hook/useProductAvailableAttributes";
import useProductCartFilter from "@hook/useProductCartFilter";
import useScrollStatic from "@hook/useScrollStatic";
import Media from "@models/media.model";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import api2 from "@utils/__api__/market-1";
import wishlist from "@utils/__api__/wishlist";
import { layoutConstant } from "@utils/constants";
import { inter, noto, overpass, roboto, sans } from "@utils/fonts";
import { theme } from "@utils/theme";
import { currency } from "@utils/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import MediaQuery from "react-responsive";
import {
  FacebookIcon,
  FacebookShareButton,
  InstapaperIcon,
  InstapaperShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { toast } from "react-toastify";
import styled from "styled-components";
import * as yup from "yup";
import BulkQuantityForm from "./BulkQuantityForm";
import BulkQuantityModal from "./BulkQuantityModal";
import MobileCarouselCard from "./MobileCarouselCard";
import ProductButtonGroup from "./ProductButtonGroup";


const StyledFlexBox = styled(FlexBox)`
  box-shadow: 0px 4px 6.7px 0px rgba(0, 0, 0, 0.25);
  width: 100%;
`;

const HoverButton = styled.div`
  &:hover {
    transform: scale(1.2);
  }
`;

const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1.5,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1.5,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1.5,
    partialVisibilityGutter: 30,
  },
};

// ========================================
type ProductIntroProps = {
  price: number;
  title: string;
  images: Media[];
  id: string | number;
  productInfo: any;
  slug: string;
};

type addCartItem = {
  qty: number;
  productId: number;
  minOrderQty: string | number | null;
  isSampleQty: boolean;
};

type updateCartItem = {
  qty: number;
  productId: number;
  id: number | string;
  minOrderQty: string | number | null;
  isSampleQty: boolean;
};

// ========================================

const mobList = [
  {
    iconName: "piggy-bank",
    title: "Money Guarantee",
    subtitle: "7 days back",
    size: "small",
  },
  {
    iconName: "truck",
    title: "Fast Delivery",
    subtitle: "Start from $10",
    size: "small",
  },
  {
    iconName: "alarm-clock",
    title: "365 Days",
    subtitle: "For free return",
    size: "small",
  },
  {
    iconName: "credit",
    title: "Payments",
    subtitle: "Secure system",
    size: "small",
  },
];

const HeartIcon = styled(Icon)`
  transition: transform 0.3s ease-in-out;
  &:active {
    animation: clickHeart 0.3s;
  }
`;

const StyledMobileCard = styled(FlexBox)`
  background: linear-gradient(100deg, #70b0ff -0.84%, #29405e 118.55%);
`;

const StyledButton = styled(Button)`
  border-radius: 0.625rem;
  background: #fff;
  box-shadow: 0px 0px 12px 0px rgba(103, 45, 209, 0.7);
`;
const ScrollableGrid = styled(Grid)`
  overflow-y: scroll;
  height: 700px;
`;
const List = styled.ul`
  margin: 0;
  position: relative;
  height: 90px;
`;

const Input = styled(TextField)`
  ::placeholder {
    color: #ddd;
    font-size: 0.81rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2.125rem; /* 340% */
  }
`;
const TransparentBox = styled(FlexBox)<{ isExpanded: boolean }>`
  background-image: ${(props) =>
    props.isExpanded
      ? "none"
      : "linear-gradient(to bottom, transparent, white)"};
  height: 87px;
  width: 100%;
  position: absolute;
  top: ${(props) => (props.isExpanded ? "3.6rem" : "0")};
`;

const UnderlineSpan = styled(Typography)`
  color: #1e6cff;
  font-size: 0.875rem;
  font-style: normal;
  text-decoration: line-through;
  font-weight: 500;
  line-height: normal;
  text-decoration-line: underline;
`;

const UnderlineSpan2 = styled(Typography)`
  color: #1e6cff;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-decoration-line: underline;
`;

const StyledSpan = styled(SemiSpan)`
  color: #565656;
  font-size: 0.8125rem;
  font-style: normal;
  text-decoration: line-through;
  font-weight: 500;
  line-height: normal;
`;
const AboveWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: ${layoutConstant.mobileNavHeight}; // Adjust this value as needed
  width: 100%;
  background: #f5f5f5; // Change this as needed
  z-index: 1000; // Make sure this is less than the z-index of Wrapper
  // Add other styles as needed
`;

const ProductIntro: FC<ProductIntroProps> = ({
  images,
  title,
  price,
  id,
  productInfo,
  slug,
}) => {
  const param = useParams();
  const isScrolled = useScrollStatic();
  const { state, dispatch } = useAppContext();
  const [toggleHeart, setToggleHeart] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [options, setOptions] = useState([1, 2, 3, 4]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = images?.length;
  const router = useRouter();
  const { data: session } = useSession();
  const currentCartProduct: any = useProductCartFilter(
    state.cart,
    "productId",
    id
  );
  const [thumbs, setThumbs] = useState([]);
  const [isBulkQuantityFormOpen, setisBulkQuantityFormOpen] = useState(false);
  const [selectedProductVarientSku, setSelectedProductVarientSku] = useState(
    {}
  );
  const [currentSelectedVariant, setCurrentSelectedVariant] =
    useState<any>(null);
  const [currentCity, setCurrentCity] = useState<any>("");
  const [currentPostalCode, setCurrentPostalCode] = useState<any>("");
  const [error, setError] = useState<any>("");
  const [attributeError, setAttributeError] = useState<any>({});
  const [isSampleQty, setIsSampleQty] = useState(false);
  const filterAttrOption = useProductAvailableAttributes(
    productInfo.productAttributeOption,
    productInfo.productVariation
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [shareButton, setShareButton] = useState(false);

  const getCurrentLocation = async () => {
    dispatch({
      type: "UPDATE_PAGE_LOADER",
      payload: true,
    });
    let apiStr = `https://maps.googleapis.com/maps/api/geocode/json?`;
    navigator?.geolocation.getCurrentPosition(async (position) => {
      apiStr += `latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyBFA-ryKStAdbM_je5gvPUqMiuG7EKuIAI`;
      axios
        .get(apiStr)
        .then((res: any) => {
          if (res.status == 200) {
            console.log("current location");
            console.log(res?.data?.results[0].address_components);
            res?.data?.results[0].address_components.map((value, index) => {
              if (value?.types[0] == "locality") {
                setCurrentCity(value?.short_name);
              }
              if (value?.types[0] == "postal_code") {
                setError("");
                setCurrentPostalCode(value?.short_name);
              }
            });
            console.log("current location");
          }
          dispatch({
            type: "UPDATE_PAGE_LOADER",
            payload: false,
          });
        })
        .catch((e) => {
          dispatch({
            type: "UPDATE_PAGE_LOADER",
            payload: false,
          });
          console.log(e.getMessage());
        })
        .finally(() => {
          dispatch({
            type: "UPDATE_PAGE_LOADER",
            payload: false,
          });
        });
    });
  };

  // schema for yup validation
  const schema = yup.object().shape({
    color: yup.mixed().required(),
    size: yup.mixed().required(),
  });

  const handleSlideChange = (count: number) => () => {
    if (count < 0) setCurrentSlide(0);
    else if (count > totalSlides - 1) setCurrentSlide(totalSlides - 1);
    else setCurrentSlide(count);
  };
  const sildeChangeUsingAvatar = (ind: number) => () => {
    setCurrentSlide(ind);
  };

  const routerId = param.slug as string;
  const cartItem = state.cart?.find(
    (item) => item.id === id || item.id === routerId
  );

  const handleReadMoreLess = () => {
    setIsExpanded(!isExpanded);
    if (options.length === 4) {
      setOptions([...options, 5, 6]); // Add two more numbers
    } else {
      setOptions(options.slice(0, 4)); // Remove the extra numbers
    }
  };

  const handleImageClick = (ind: number) => () => setSelectedImage(ind);

  const handleNextClick = () => {
    if (selectedImage < images?.length - 1) {
      setSelectedImage(selectedImage + 1);
    } else {
      setSelectedImage(0);
    }
  };

  const handlePrevClick = () => {
    if (selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    } else {
      setSelectedImage(images?.length - 1);
    }
  };

  const handleBuyNow = async () => {
    if (
      productInfo?.productType?.toLowerCase() == "simple" &&
      state.cart?.some((ele) => ele.productId == productInfo?.id)
    ) {
      router.push("/cart");
    }
    if (
      productInfo?.productType?.toLowerCase() == "configurable" &&
      state.cart?.some(
        (ele) =>
          productInfo?.productVariation.filter(
            (obj) => obj.id == ele.productId
          ) && currentSelectedVariant
      )
    ) {
      router.push("/cart");
    }
  };

  useEffect(() => {
    if (productInfo?.productType?.toLowerCase() == "configurable") {
      //const result = productInfo?.productVariation.filter(obj1 => state.cart?.some(obj2 => obj2.productId == obj1.id));

      const result = state.cart?.some((ele) =>
        productInfo?.productVariation.filter((obj) => obj.id == ele.productId)
      );

      console.log(result);

      console.log(
        state.cart?.some(
          (ele) => ele.productId == productInfo?.productVariation
        )
      );
    }
  }, [state.cart]);

  /*   useEffect(() => {
    console.log(attributeError);
  }, [attributeError]); */

  /*   useEffect(() => {
    const handleRemoveItem = async () => {
      if (session?.user) {
        const payload = {
          customerId: session?.user?.name?.userData?.id,
          cartItems: [{ productId: productInfo.id }],
        };
        await api2.removeCartItem(payload, state.cartInfo.id);
        const cart = await api2.getCartItem(session?.user?.name?.userData?.id);
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: cart ? cart : null,
        });
      }
    };

    handleRemoveItem();
  }, [isSampleQty]); */

  const handleGetSampleQty = async () => {
    handleUpdateItemQty(
      parseInt(currentCartProduct[0].qty),
      parseInt(productInfo.id),
      state.cartInfo.id,
      true
    );
  };

  const handleAddToCart = async (qty: number, productId: number) => {
    dispatch({ type: "UPDATE_BUTTON_LOADER", payload: true });
    if (session?.user) {
      let sku = productInfo.sku;

      let addCartItems: addCartItem[] = [];

      const addCartItem: addCartItem = {
        productId,
        qty,
        minOrderQty: productInfo.minOrderQty,
        isSampleQty,
      };

      addCartItems.push(addCartItem);

      const payload = {
        customerId: session?.user?.name?.userData?.id,
        cartItems: addCartItems,
      };
      if (state.cartInfo?.id) {
        const response = await api2.addCartItemExistingCart(
          payload,
          state.cartInfo.id
        );
        const cart = await api2.getCartItem(session?.user?.name?.userData?.id);
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: cart ? cart : null,
        });
        dispatch({ type: "UPDATE_BUTTON_LOADER", payload: false });
      } else {
        const response = await api2.addCartItem(payload);
        const cart = await api2.getCartItem(session?.user?.name?.userData?.id);
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: cart ? cart : null,
        });
        dispatch({ type: "UPDATE_BUTTON_LOADER", payload: false });
      }
    } else {
      dispatch({ type: "LOGIN_POPUP", payload: true });
    }
  };

  const handleAddItemInExistingCart = async () => {
    dispatch({ type: "UPDATE_BUTTON_LOADER", payload: true });
    debugger;
    if (session?.user) {
      let sku = productInfo.sku;

      const sortedAttribute = [...productInfo.productAttributeOption];

      sortedAttribute?.map((item, index) => {
        if (!selectedProductVarientSku?.[item.attributeCode]) {
          dispatch({ type: "UPDATE_BUTTON_LOADER", payload: false });
          setAttributeError((prev) => ({
            ...prev,
            [item.attributeCode]: `${item.attributeCode} field is required!`,
          }));
        }
        sku +=
          "-" +
          item.attributeCode +
          selectedProductVarientSku?.[item.attributeCode];
      });

      if (!productInfo.selectedVariant) {
        return false;
      }

      let addCartItems: addCartItem[] = [];

      const moq = parseInt(
        productInfo?.selectedVariant?.extendedAttributes?.filter(
          (item) => item.attributeCode == "moq"
        )[0].value
      );

      const addCartItem: addCartItem = {
        productId: productInfo.selectedVariant.id,
        qty: 1,
        minOrderQty: moq ? moq : null,
        isSampleQty,
      };

      addCartItems.push(addCartItem);

      const payload = {
        customerId: session?.user?.name?.userData?.id,
        cartItems: addCartItems,
      };
      if (state.cartInfo?.id) {
        const response = await api2.addCartItemExistingCart(
          payload,
          state.cartInfo.id
        );
        const cart = await api2.getCartItem(session?.user?.name?.userData?.id);
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: cart ? cart : null,
        });

        dispatch({ type: "UPDATE_BUTTON_LOADER", payload: false });
      } else {
        const response = await api2.addCartItem(payload);
        const cart = await api2.getCartItem(session?.user?.name?.userData?.id);
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: cart ? cart : null,
        });
        dispatch({ type: "UPDATE_BUTTON_LOADER", payload: false });
      }
    } else {
      dispatch({ type: "LOGIN_POPUP", payload: true });
    }
  };

  const handleUpdateItemQty = async (
    qty: number,
    productId: number,
    cartId: number,
    isSampleButton: any = null
  ) => {
    if (session?.user) {
      if (qty === 0) {
        const payload = {
          customerId: session?.user?.name?.userData?.id,
          cartItems: [{ productId: productId }],
        };
        const response = await api2.removeCartItem(payload, state.cartInfo.id);
        const cart = await api2.getCartItem(session?.user?.name?.userData?.id);
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: cart ? cart : null,
        });
        return false;
      }
      let updateCartItems: updateCartItem[] = [];

      const updateCartItem: updateCartItem = {
        qty,
        productId,
        id: currentCartProduct[0]?.id,
        minOrderQty: productInfo.minOrderQty,
        isSampleQty: isSampleButton
          ? !currentCartProduct[0]?.isSampleQty
          : currentCartProduct[0]?.isSampleQty,
      };

      updateCartItems.push(updateCartItem);

      const payload = {
        customerId: session?.user?.name?.userData?.id,
        cartItems: updateCartItems,
      };
      const response = await api2.updateCartItem(payload, cartId);

      const cart = await api2.getCartItem(session?.user?.name?.userData?.id);
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: cart ? cart : null,
      });
    } else {
      dispatch({ type: "LOGIN_POPUP", payload: true });
    }
  };

  const handleChange = (e) => {
    setError("");
    setCurrentPostalCode(e.target.value);
  };

  const handleBlur = (e) => {
    setCurrentPostalCode(e.target.value);
    if (currentPostalCode == "") {
      setError("Please enter a valid pincode!");
      return false;
    }
    let exist = zipcodeList.filter((item) => item.label == e.target.value);
    if (exist.length == 0) {
      setError("We are not servicable at the location!");
    }
  };

  useEffect(() => {
    // This block of code will run every time yourState is updated
    // Do something with the updated state here
    if (productInfo.productAttributeOption) {
      let sku = productInfo.sku;
      const sortedAttribute = [...productInfo.productAttributeOption];
      sortedAttribute?.map((item, index) => {
        if (selectedProductVarientSku?.[item.attributeCode]) {
          setAttributeError((prev) => {
            delete prev[item.attributeCode];
            return prev;
          });
          sku +=
            "-" +
            item.attributeCode +
            selectedProductVarientSku?.[item.attributeCode];
        }
      });

      var selectedVariation = productInfo.productVariation.find(
        (e) => e.sku == sku
      );
      console.log(selectedVariation);
      if (selectedVariation) {
        setCurrentSelectedVariant(selectedVariation);
      } else {
        setCurrentSelectedVariant(null);
      }

      productInfo.selectedVariant = selectedVariation;

      //console.log(productInfo.selectedVariant);
    }
  }, [selectedProductVarientSku]);

  const handleVarientChange = async (v, data) => {
    console.log(data);
    console.log(v);
    setSelectedProductVarientSku((o) => {
      return { ...o, [data.name]: v.value };
    });
  };

  useEffect(() => {
    // Adjust this value as needed
    if (window.innerWidth <= 900) {
      // Adjust this value as needed
      document.body.style.paddingBottom = "10rem"; // Assuming the height of CheckoutWrapper is 60px
    } // Assuming the height of CheckoutWrapper is 60px
  }, [productInfo.id]);

  const handleCartAmountChange = (amount: number) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price,
        qty: amount,
        name: title,
        imgUrl: images[0],
        id: id || routerId,
      },
    });
  };
  //console.log("this currentSlide value", currentSlide);

  const renderActiveThumbnail = (updatedCurrent) => {
    const thumbnails = [];
    const step = 1;
    const total = totalSlides - 1 + 1;
    console.log("total value", total);

    for (let i = 0; i < total; i += step) {
      console.log("inside for");
      console.log("inside for i value", i);
      console.log("Inside for currect slide", currentSlide);
      console.log("Inside for totalslde - 1", totalSlides - 1);
    }
  };

  const addProductWishList = async () => {
    const payload = {
      customerId: session?.user?.name?.userData?.id,
      productId: id,
      relationType: "WISHLIST",
    };
    await wishlist
      .saveWishList(session, payload)
      .then((res) => {
        toast.success("Product added to Wishlist", { theme: "light" });
      })
      .catch((e) => {
        console.log(e);
        toast.error(
          "There is some issue at the moment to add item in the product!",
          { theme: "light" }
        );
      })
      .finally(() => {});

    const wishList = await wishlist.getWishList(session);
    dispatch({ type: "WISHLIST", payload: wishList });
  };

  const removeProductWishList = async () => {
    const payload = state.wishList?.find((o) => o.productId == id);
    await wishlist
      .removeWishList(session, payload?.id)
      .then((res) => {
        toast.success("Product removed to Wishlist", { theme: "light" });
        setToggleHeart(true);
      })
      .catch((e) => {
        toast.error(
          "There is some issue at the moment to remove item from the product!",
          { theme: "light" }
        );
        console.log(e);
      })
      .finally(() => {});
    const wishList = await wishlist.getWishList(session);
    dispatch({ type: "WISHLIST", payload: wishList });
  };

  const handleBlukReqFormClose = () => {
    setisBulkQuantityFormOpen(false); // Update the state to close the modal
  };
  return (
    <>
      <MediaQuery minWidth={768}>
        {isScrolled && (
          <StyledFlexBox
            justifyContent={"space-around"}
            position={"fixed"}
            width={"100%"}
            zIndex={1}
            alignItems={"center"}
            backgroundColor={"white"}
          >
            <Box padding={"2rem"}>
              <FlexBox alignItems={"center"}>
                <HoverButton
                  style={{ cursor: "pointer" }}
                  onClick={scrollToTop}
                >
                  <Image
                    width="1.625rem"
                    height="1.625rem"
                    src="/assets/images/product_detail/back_to_top.png"
                  />
                </HoverButton>
                <Typography
                  className={sans.className}
                  fontWeight={400}
                  ml="0.5rem"
                  lineHeight="1.125rem"
                  fontSize={"0.9375rem"}
                  color="black"
                >
                  Go back to products
                </Typography>
              </FlexBox>
            </Box>

            <FlexBox width="50%">
              <FlexBox width="100%" justifyContent={"center"}>
                <Box marginRight={"1rem"}>
                  <Button
                    variant="contained"
                    color="cart"
                    size="small"
                    onClick={() =>
                      state.wishList?.find((o) => o.productId == id)
                        ? removeProductWishList()
                        : addProductWishList()
                    }
                  >
                    <Icon>
                      {state.wishList?.find((o) => o.productId == id)
                        ? "heart_filled"
                        : "heart"}
                    </Icon>
                    <Typography
                      className={sans.className}
                      marginLeft="0.5rem"
                      fontSize={"1rem"}
                      fontWeight={400}
                    >
                      {state.wishList?.find((o) => o.productId == id)
                        ? "Added In Wishlist"
                        : "Add to Wishlist"}
                    </Typography>
                  </Button>
                </Box>

                <Box marginRight={"1rem"}>
                  {productInfo?.productType?.toLowerCase() ==
                    "configurable" && (
                    <>
                      {state.cart?.some((ele) =>
                        productInfo?.productVariation.filter(
                          (obj) => obj.id == ele.productId
                        )
                      ) && currentSelectedVariant ? (
                        <FlexBox alignItems="center">
                          <Button
                            p="9px"
                            size="small"
                            color="primary"
                            variant="outlined"
                            onClick={() =>
                              handleUpdateItemQty(
                                parseInt(currentCartProduct[0].qty) - 1,
                                parseInt(productInfo.id),
                                state.cartInfo.id
                              )
                            }
                          >
                            <Icon variant="small">minus</Icon>
                          </Button>

                          <H3 fontWeight="600" mx="20px">
                            {
                              state.cart.filter((ele) =>
                                productInfo?.productVariation.filter(
                                  (obj) => obj.id == ele.productId
                                )
                              )[0].qty
                            }
                            x
                            {
                              state.cart.filter((ele) =>
                                productInfo?.productVariation.filter(
                                  (obj) => obj.id == ele.productId
                                )
                              )[0]?.minOrderQty
                            }
                          </H3>

                          <Button
                            p="9px"
                            size="small"
                            color="primary"
                            variant="outlined"
                            onClick={() =>
                              handleUpdateItemQty(
                                parseInt(currentCartProduct[0].qty) + 1,
                                parseInt(productInfo.id),
                                state.cartInfo.id
                              )
                            }
                          >
                            <Icon variant="small">plus</Icon>
                          </Button>
                        </FlexBox>
                      ) : (
                        <Button
                          backgroundColor={"#EBEFF4"}
                          borderRadius={"0.5rem"}
                          maxWidth={"500px"}
                          onClick={() =>
                            productInfo?.productType?.toLowerCase() == "simple"
                              ? handleAddToCart(1, parseInt(productInfo.id))
                              : handleAddItemInExistingCart()
                          }
                          disabled={state.buttonLoader}
                        >
                          {state.buttonLoader ? (
                            <Box
                              display={"flex"}
                              flexDirection={"row"}
                              alignItems={"center"}
                            >
                              <CircularProgress color="inherit" size={20} />
                              &nbsp;
                              <Typography
                                fontSize="1.25rem"
                                className={overpass.className}
                              >
                                Adding to Cart...
                              </Typography>
                            </Box>
                          ) : (
                            <>
                              <Image
                                src="/assets/images/shops/bag_2.png"
                                mr="0.5rem"
                                width={20}
                                height={20}
                              />
                              <Typography
                                className={sans.className}
                                fontSize={"1rem"}
                                fontWeight={500}
                                color="#2B3445"
                                lineHeight={"1.625rem"}
                              >
                                Add to Cart
                              </Typography>
                            </>
                          )}
                        </Button>
                      )}
                    </>
                  )}

                  {productInfo?.productType.toLowerCase() == "simple" && (
                    <>
                      {state.cart?.some(
                        (ele) => ele.productId == productInfo?.id
                      ) ? (
                        <FlexBox alignItems="center">
                          <Button
                            p="9px"
                            size="small"
                            color="primary"
                            variant="outlined"
                            onClick={() =>
                              handleUpdateItemQty(
                                parseInt(currentCartProduct[0].qty) - 1,
                                parseInt(productInfo.id),
                                state.cartInfo.id
                              )
                            }
                          >
                            <Icon variant="small">minus</Icon>
                          </Button>

                          <H3 fontWeight="600" mx="20px">
                            {
                              state.cart.filter(
                                (ele) => ele.productId == productInfo?.id
                              )[0].qty
                            }
                            {productInfo.minOrderQty &&
                              !currentCartProduct[0]?.isSampleQty &&
                              `x${productInfo.minOrderQty}`}
                          </H3>

                          <Button
                            p="9px"
                            size="small"
                            color="primary"
                            variant="outlined"
                            onClick={() =>
                              handleUpdateItemQty(
                                parseInt(currentCartProduct[0].qty) + 1,
                                parseInt(productInfo.id),
                                state.cartInfo.id
                              )
                            }
                          >
                            <Icon variant="small">plus</Icon>
                          </Button>
                        </FlexBox>
                      ) : (
                        <Button
                          backgroundColor={"#EBEFF4"}
                          borderRadius={"0.5rem"}
                          maxWidth={"500px"}
                          onClick={() =>
                            productInfo?.productType?.toLowerCase() == "simple"
                              ? handleAddToCart(1, parseInt(productInfo.id))
                              : handleAddItemInExistingCart()
                          }
                          disabled={state.buttonLoader}
                        >
                          {state.buttonLoader ? (
                            <Box
                              display={"flex"}
                              flexDirection={"row"}
                              alignItems={"center"}
                            >
                              <CircularProgress color="inherit" size={10} />
                              &nbsp;
                              <Typography
                                fontSize="0.7rem"
                                className={overpass.className}
                              >
                                Adding to Cart...
                              </Typography>
                            </Box>
                          ) : (
                            <>
                              <Image
                                src="/assets/images/shops/bag_2.png"
                                mr="0.5rem"
                              />
                              <Typography
                                className={sans.className}
                                fontSize={"1rem"}
                                fontWeight={500}
                                color="#2B3445"
                                lineHeight={"1.625rem"}
                              >
                                Add to Cart
                              </Typography>
                            </>
                          )}
                        </Button>
                      )}
                    </>
                  )}
                </Box>

                <Box width="50%">
                  <Button
                    fullwidth
                    variant="contained"
                    borderRadius={"0.625rem"}
                    color="primary"
                    size="small"
                  >
                    <Typography
                      className={sans.className}
                      marginLeft="0.5rem"
                      fontSize={"1rem"}
                      fontWeight={400}
                    >
                      Buy Now
                    </Typography>
                  </Button>
                </Box>
              </FlexBox>
            </FlexBox>
          </StyledFlexBox>
        )}
      </MediaQuery>
      <Backdrop
        sx={{
          backgroundColor: "#FFF",
          opacity: "0.5",
          color: "primary.main",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={state.pageLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* For Desktop view start */}
      <MediaQuery minWidth={768}>
        <Container>
          <Box
            overflow="hidden"
            width={"100%"}
            borderRadius={"0.5rem"}
            backgroundColor={"white"}
            paddingLeft={"2rem"}
            py="3rem"
            maxHeight={"90vh"}
          >
            <Grid container justifyContent="center" spacing={16}>
              <Grid
                item
                style={{ paddingRight: "0rem" }}
                md={6}
                xs={12}
                alignItems="center"
              >
                <FlexBox
                  justifyContent={"space-between"}
                  height="100%"
                  width="100%"
                >
                  <MediaQuery minWidth={1024}>
                    <FlexBox
                      flexDirection="column"
                      height="100%"
                      position="relative"
                      justifyContent="flex-start"
                      overflow="auto"
                    >
                      <FlexBox justifyContent="center" height="2rem">
                        <Box
                          cursor="pointer"
                          onClick={handlePrevClick}
                          position="absolute"
                        >
                          <Icon color="dark">product_up</Icon>
                        </Box>
                      </FlexBox>
                      {images?.length > 0 &&
                        images?.map((item, ind) => (
                          <Box
                            key={ind}
                            size={100}
                            bg="white"
                            minWidth={100}
                            display="flex"
                            cursor="pointer"
                            border="1px solid"
                            borderRadius="10px"
                            alignItems="center"
                            justifyContent="center"
                            mb="10px"
                            borderColor={
                              selectedImage === ind
                                ? "primary.main"
                                : "gray.400"
                            }
                            onClick={handleImageClick(ind)}
                          >
                            <Avatar
                              src={item.mediaPath}
                              borderRadius="10px"
                              size={65}
                            />
                          </Box>
                        ))}
                      <FlexBox justifyContent="center" height="2rem">
                        <Box
                          height="2rem"
                          cursor="pointer"
                          onClick={handleNextClick}
                          position="absolute"
                        >
                          <Icon color="product">product_down</Icon>
                        </Box>
                      </FlexBox>
                    </FlexBox>
                  </MediaQuery>

                  <FlexBox width="80%">
                    <FlexBox
                      border="1px solid #E1E1E1"
                      height="100%"
                      flexDirection={"row"}
                      position="relative"
                      alignItems="center"
                      width="100%"
                      borderRadius={16}
                      justifyContent="space-between"
                    >
                      <Box position="absolute" top="0" right="0">
                        <Button
                          onClick={() =>
                            state.wishList?.find((o) => o.productId == id)
                              ? removeProductWishList()
                              : addProductWishList()
                          }
                        >
                          <ProductButtonGroup
                            iconName={
                              state.wishList?.find((o) => o.productId == id)
                                ? "heart_filled"
                                : "heart"
                            }
                          />
                        </Button>
                        <Button onClick={() => setShareButton(!shareButton)}>
                          <ProductButtonGroup iconName="product_share" />
                        </Button>
                        {shareButton && (
                          <Box mt={3} display={"flex"} flexDirection={"column"}>
                            <FacebookShareButton
                              url={"https://needibay.com"}
                              quote={"testing"}
                              hashtag="#test"
                            >
                              <FacebookIcon size={32} round />
                            </FacebookShareButton>
                            <WhatsappShareButton
                              url={"https://needibay.com"}
                              title={"tesing"}
                              separator=":: "
                            >
                              <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                            <InstapaperShareButton
                              url={"https://needibay.com"}
                              title={"tesing"}
                            >
                              <InstapaperIcon size={32} round />
                            </InstapaperShareButton>
                          </Box>
                        )}
                      </Box>
                      <Image
                        height={375}
                        width={375}
                        src={
                          images?.length > 0
                            ? images[selectedImage]?.mediaPath
                            : `/assets/images/product-placeholder.png`
                        }
                        style={{
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                          height: "auto",
                        }}
                      />
                      {images?.length > 0 && (
                        <Button
                          marginRight="1rem"
                          height="3rem"
                          width="3rem"
                          style={{
                            filter:
                              "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                          }}
                          color="light"
                          borderRadius={"50%"}
                          variant="contained"
                          onClick={handleNextClick}
                        >
                          <Icon color="dark">arrow-right</Icon>
                        </Button>
                      )}
                    </FlexBox>
                  </FlexBox>
                </FlexBox>
              </Grid>

              <ScrollableGrid item md={6} xs={12} alignItems="center">
                <H1
                  fontSize="1.5625rem"
                  fontWeight={600}
                  lineHeight={"2.125rem"}
                  className={roboto.className}
                >
                  {title}
                </H1>
                {/* color */}
                {/* <H6
                  color="#8F8F8F"
                  fontWeight={500}
                  lineHeight={"2.125rem"}
                  className={noto.className}
                >
                  Blue Color
                </H6> */}

                {/* reviews */}

                <FlexBox justifyContent={"flex-start"} alignItems={"center"}>
                  <Rating rating={4.5} />
                  <Typography
                    ml="0.4rem"
                    fontSize={"0.75rem"}
                    fontWeight={500}
                    className={noto.className}
                    color="#434343"
                  >
                    34 reviews
                  </Typography>
                </FlexBox>

                {/* <FlexBox
                mt='0.5rem'
                justifyContent={"flex-start"}
                alignItems={"center"}
              >
                <Image src="/assets/images/badges/box.png" />
                <Typography
                  ml="0.4rem"
                  fontSize={"0.75rem"}
                  fontWeight={600}
                  className={noto.className}
                  color="#434343"
                >
                  
                </Typography>
              </FlexBox> */}

                <Box mt="24px" mb="24px">
                  {productInfo.isDiscounted && (
                    <Typography
                      fontSize="0.75rem"
                      fontWeight={600}
                      className={noto.className}
                      color="#009733"
                    >
                      Offer Price
                    </Typography>
                  )}

                  <FlexBox mb={"0.2rem"} justifyContent={"flex-start"}>
                    {state.cart?.some(
                      (ele) => ele.productId == productInfo?.id
                    ) ? (
                      <H2 color="#009733" fontSize={"2.5rem"} lineHeight="1">
                        {productInfo.productDynamicPricing?.length > 0
                          ? productInfo.productDynamicPricing.find(
                              (o) =>
                                state.cart.find(
                                  (ele) => ele.productId == productInfo?.id
                                )?.rowTotalQty >= o.minQty &&
                                state.cart.find(
                                  (ele) => ele.productId == productInfo?.id
                                )?.rowTotalQty <= o.maxQty
                            )?.price
                            ? currency(
                                state.cart.find(
                                  (ele) => ele.productId == productInfo?.id
                                )?.price
                              )
                            : currency(
                                state.cart.find(
                                  (ele) => ele.productId == productInfo?.id
                                )?.price
                              )
                          : currency(
                              parseInt(
                                currentSelectedVariant
                                  ? currentSelectedVariant?.basePriceWithCommission
                                  : productInfo.basePriceWithCommission
                              )
                            )}
                      </H2>
                    ) : (
                      <H2 color="#009733" fontSize={"2.5rem"} lineHeight="1">
                        {currency(
                          parseInt(
                            currentSelectedVariant
                              ? currentSelectedVariant?.basePriceWithCommission
                              : productInfo.basePriceWithCommission
                          )
                        )}
                      </H2>
                    )}

                    <FlexBox ml="0.2rem" alignItems="flex-end">
                      {/* <Typography
                      fontSize={"0.9375rem"}
                      fontWeight={500}
                      className={noto.className}
                    >
                      + $0.5(GST)
                    </Typography> */}
                    </FlexBox>
                  </FlexBox>

                  {/* <SemiSpan color='inherit'>
                  MRP
                  <StyledSpan className={inter.className}>$50.99</StyledSpan>
                </SemiSpan> */}
                </Box>

                {/* Option */}
                {productInfo?.productType?.toLowerCase() == "configurable" && (
                  <Box mt="24px" mb="24px">
                    {productInfo.productAttributeOption && (
                      <Typography
                        fontSize="1rem"
                        fontWeight={500}
                        className={inter.className}
                        color="#565656"
                      >
                        {productInfo.productAttributeOption.fieldLabel}
                      </Typography>
                    )}

                    <FlexBox
                      mb={"0.2rem"}
                      mt={"0.2rem"}
                      py={2}
                      justifyContent={"flex-start"}
                      flexDirection={"column"}
                    >
                      {productInfo.productAttributeOption?.length > 0 &&
                        productInfo.productAttributeOption?.map((item, ind) => (
                          <>
                            {item?.frontendInput == "selectDropdown" && (
                              <FlexBox flexDirection={"column"} py={3}>
                                <FlexBox>
                                  <Select
                                    name={item?.attributeCode}
                                    options={item?.attributeOption}
                                    placeholder={`Select ${item.frontendLabel}`}
                                    onChange={(v) =>
                                      handleVarientChange(v, {
                                        name: item?.attributeCode,
                                      })
                                    }
                                  />
                                </FlexBox>
                                <FlexBox>
                                  {attributeError?.[item?.attributeCode] && (
                                    <Typography color={theme.colors.error.main}>
                                      {attributeError?.[item?.attributeCode]}
                                    </Typography>
                                  )}
                                </FlexBox>
                              </FlexBox>
                            )}
                            {item?.frontendInput == "select" &&
                              item?.attributeCode == "color" && (
                                <FlexBox flexDirection={"column"} py={3} pl={1}>
                                  <FlexBox>
                                    {item?.attributeOption.length > 0 &&
                                      item?.attributeOption.map((v, i) => {
                                        return (
                                          <>
                                            {!v?.isDisabled ? (
                                              <Avatar
                                                key={i}
                                                bg={v?.label}
                                                size={25}
                                                mr="10px"
                                                borderStyle={"double"}
                                                borderColor={"primary.main"}
                                                borderWidth={"2px"}
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                  handleVarientChange(v, {
                                                    name: item?.attributeCode,
                                                    sortOrder: item?.sortOrder,
                                                  })
                                                }
                                              ></Avatar>
                                            ) : (
                                              <Avatar
                                                key={i}
                                                bg={v?.label}
                                                size={25}
                                                mr="10px"
                                                borderStyle={"double"}
                                                borderColor={"primary.main"}
                                                borderWidth={"2px"}
                                                style={{ cursor: "pointer" }}
                                              ></Avatar>
                                            )}
                                          </>
                                        );
                                      })}
                                  </FlexBox>
                                  <FlexBox>
                                    {attributeError?.[item?.attributeCode] && (
                                      <Typography
                                        color={theme.colors.error.main}
                                      >
                                        {attributeError?.[item?.attributeCode]}
                                      </Typography>
                                    )}
                                  </FlexBox>
                                </FlexBox>
                              )}
                          </>
                        ))}
                    </FlexBox>
                  </Box>
                )}

                {/* delivery */}
                <Box mt="24px" mb="24px">
                  <Typography
                    fontSize="1rem"
                    fontWeight={500}
                    className={inter.className}
                    color="#565656"
                  >
                    Delivery
                  </Typography>

                  <FlexBox
                    mt="0.5rem"
                    width="75%"
                    justifyContent="space-evenly"
                  >
                    <Box width="65%" mr="0.5rem">
                      {/* <Input
                      className={noto.className}
                      borderRadius="0.5rem"
                      placeholder="Enter your pincode"
                      fullwidth
                      value={currentPostalCode? currentPostalCode : ""}
                    /> */}
                      <TextField
                        fullwidth
                        mb="0.75rem"
                        name="email"
                        type="email"
                        className={noto.className}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={currentPostalCode || ""}
                        placeholder="e.g. 560028"
                        errorText={error ? error : ""}
                      />
                    </Box>
                    <FlexBox width="35%">
                      <Button
                        color="primary"
                        padding={"0rem"}
                        size="small"
                        onClick={() => getCurrentLocation()}
                      >
                        <Image
                          src="/assets/images/illustrations/locate.png"
                          mr="0.1rem"
                        />
                        Locate
                      </Button>
                    </FlexBox>
                  </FlexBox>

                  <Link href="/contactus">
                    <UnderlineSpan>Have Questions ?</UnderlineSpan>
                  </Link>
                </Box>

                <FlexBox
                  width={"75%"}
                  mb="36px"
                  display={"flex"}
                  style={{ columnGap: "20px" }}
                >
                  {productInfo?.productType?.toLowerCase() ==
                    "configurable" && (
                    <>
                      {state.cart?.some((ele) =>
                        productInfo?.productVariation.filter(
                          (obj) => obj.id == ele.productId
                        )
                      ) && currentSelectedVariant ? (
                        <FlexBox alignItems="center">
                          <Button
                            p="9px"
                            size="small"
                            color="primary"
                            variant="outlined"
                            onClick={() =>
                              handleUpdateItemQty(
                                parseInt(currentCartProduct[0].qty) - 1,
                                parseInt(productInfo.id),
                                state.cartInfo.id
                              )
                            }
                          >
                            <Icon variant="small">minus</Icon>
                          </Button>

                          <H3 fontWeight="600" mx="20px">
                            {
                              state.cart.filter((ele) =>
                                productInfo?.productVariation.filter(
                                  (obj) => obj.id == ele.productId
                                )
                              )[0].qty
                            }
                            x
                            {
                              state.cart.filter((ele) =>
                                productInfo?.productVariation.filter(
                                  (obj) => obj.id == ele.productId
                                )
                              )[0]?.minOrderQty
                            }
                          </H3>

                          <Button
                            p="9px"
                            size="small"
                            color="primary"
                            variant="outlined"
                            onClick={() =>
                              handleUpdateItemQty(
                                parseInt(currentCartProduct[0].qty) + 1,
                                parseInt(productInfo.id),
                                state.cartInfo.id
                              )
                            }
                          >
                            <Icon variant="small">plus</Icon>
                          </Button>
                        </FlexBox>
                      ) : (
                        <Button
                          backgroundColor={"#EBEFF4"}
                          borderRadius={"0.5rem"}
                          maxWidth={"500px"}
                          onClick={() =>
                            productInfo?.productType?.toLowerCase() == "simple"
                              ? handleAddToCart(1, parseInt(productInfo.id))
                              : handleAddItemInExistingCart()
                          }
                          disabled={state.buttonLoader}
                        >
                          {state.buttonLoader ? (
                            <Box
                              display={"flex"}
                              flexDirection={"row"}
                              alignItems={"center"}
                            >
                              <CircularProgress color="inherit" size={20} />
                              &nbsp;
                              <Typography
                                fontSize="1.25rem"
                                className={overpass.className}
                              >
                                Adding to Cart...
                              </Typography>
                            </Box>
                          ) : (
                            <>
                              <Image
                                src="/assets/images/shops/bag_2.png"
                                mr="0.5rem"
                              />
                              <Typography
                                className={sans.className}
                                fontSize={"1rem"}
                                fontWeight={500}
                                color="#2B3445"
                                lineHeight={"1.625rem"}
                              >
                                Add to Cart
                              </Typography>
                            </>
                          )}
                        </Button>
                      )}
                    </>
                  )}

                  {productInfo?.productType.toLowerCase() == "simple" && (
                    <>
                      {state.cart?.some(
                        (ele) => ele.productId == productInfo?.id
                      ) ? (
                        <FlexBox alignItems="center">
                          <Button
                            p="9px"
                            size="small"
                            color="primary"
                            variant="outlined"
                            onClick={() =>
                              handleUpdateItemQty(
                                parseInt(currentCartProduct[0].qty) - 1,
                                parseInt(productInfo.id),
                                state.cartInfo.id
                              )
                            }
                          >
                            <Icon variant="small">minus</Icon>
                          </Button>

                          <H3 fontWeight="600" mx="20px">
                            {
                              state.cart.filter(
                                (ele) => ele.productId == productInfo?.id
                              )[0].qty
                            }
                            {productInfo.minOrderQty &&
                              !currentCartProduct[0]?.isSampleQty &&
                              `x${productInfo.minOrderQty}`}
                          </H3>

                          <Button
                            p="9px"
                            size="small"
                            color="primary"
                            variant="outlined"
                            onClick={() =>
                              handleUpdateItemQty(
                                parseInt(currentCartProduct[0].qty) + 1,
                                parseInt(productInfo.id),
                                state.cartInfo.id
                              )
                            }
                          >
                            <Icon variant="small">plus</Icon>
                          </Button>
                        </FlexBox>
                      ) : (
                        <Button
                          backgroundColor={"#EBEFF4"}
                          borderRadius={"0.5rem"}
                          maxWidth={"500px"}
                          onClick={() =>
                            productInfo?.productType?.toLowerCase() == "simple"
                              ? handleAddToCart(1, parseInt(productInfo.id))
                              : handleAddItemInExistingCart()
                          }
                          disabled={state.buttonLoader}
                        >
                          {state.buttonLoader ? (
                            <Box
                              display={"flex"}
                              flexDirection={"row"}
                              alignItems={"center"}
                            >
                              <CircularProgress color="inherit" size={20} />
                              &nbsp;
                              <Typography
                                fontSize="1.25rem"
                                className={overpass.className}
                              >
                                Adding to Cart...
                              </Typography>
                            </Box>
                          ) : (
                            <>
                              <Image
                                src="/assets/images/shops/bag_2.png"
                                mr="0.5rem"
                              />
                              <Typography
                                className={sans.className}
                                fontSize={"1rem"}
                                fontWeight={500}
                                color="#2B3445"
                                lineHeight={"1.625rem"}
                              >
                                Add to Cart
                              </Typography>
                            </>
                          )}
                        </Button>
                      )}
                    </>
                  )}
                </FlexBox>

                <FlexBox alignItems="center" justifyContent={"center"}>
                  <Button
                    borderRadius={"0.5rem"}
                    size={"medium"}
                    fullwidth
                    variant="contained"
                    color="primary"
                    onClick={handleBuyNow}
                  >
                    <Typography fontSize={"1.1rem"}>Buy Now </Typography>
                  </Button>
                </FlexBox>
                {productInfo?.isSampleEnable &&
                  state.cart?.some(
                    (ele) => ele.productId == productInfo?.id
                  ) && (
                    <FlexBox
                      alignItems="center"
                      justifyContent={"center"}
                      mt="0.5rem"
                    >
                      <StyledButton
                        variant="outlined"
                        color="primary"
                        width="100%"
                        borderRadius={"0.5rem"}
                        size="medium"
                        mt="1rem"
                        onClick={() => handleGetSampleQty()}
                      >
                        {currentCartProduct[0]?.isSampleQty ? (
                          <Typography fontSize={"1.1rem"}>
                            Order With MOQ
                          </Typography>
                        ) : (
                          <Typography fontSize={"1.1rem"}>
                            Get a Sample
                          </Typography>
                        )}
                      </StyledButton>
                    </FlexBox>
                  )}

                <FlexBox
                  alignItems="center"
                  justifyContent={"center"}
                  mt="0.5rem"
                >
                  <StyledButton
                    variant="outlined"
                    color="primary"
                    width="100%"
                    borderRadius={"0.5rem"}
                    size="medium"
                    mt="1rem"
                    mb="1rem"
                    onClick={() =>
                      setisBulkQuantityFormOpen(!isBulkQuantityFormOpen)
                    }
                  >
                    <Typography fontSize={"1.1rem"}>Bulk Quantity</Typography>
                  </StyledButton>
                </FlexBox>

                <Card7
                  backgroundColor={"#F2FFEC"}
                  border="#009733"
                  mb="1rem"
                  mt="1rem"
                >
                  <FlexBox justifyContent={"flex-start"} alignItems={"center"}>
                    <Typography
                      color="black"
                      fontWeight={500}
                      fontSize="1rem"
                      className={roboto.className}
                    >
                      Offer and Coupons
                    </Typography>
                  </FlexBox>

                  <Box
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    mt="0.5rem"
                  >
                    <FlexBox
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                      mt="0.5rem"
                    >
                      <Image
                        height={30}
                        width={30}
                        src="/assets/images/savings/reminder.png"
                      />
                      <Box>
                        <Typography
                          fontSize="0.9rem"
                          ml="0.5rem"
                          fontWeight={500}
                          color={"#009733"}
                          className={roboto.className}
                        >
                          Save instantly 20% with online payments
                        </Typography>
                      </Box>
                    </FlexBox>

                    <FlexBox ml={"2.375rem"} alignItems={"flex-start"}>
                      <Typography
                        className={roboto.className}
                        fontSize={"0.8rem"}
                        fontWeight={400}
                        lineHeight={"1.625rem"}
                        color="#000"
                      >
                        <Typography as="span" mr="0.2rem" fontWeight={200}>
                          via
                        </Typography>
                        UPI, NetBanking, Cards
                      </Typography>
                    </FlexBox>
                  </Box>

                  <Box>
                    <Divider ml="2rem" mt="1rem" color="#E6E6E6"></Divider>
                  </Box>

                  <Box alignItems={"center"} mt="0.5rem">
                    <FlexBox
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                      mt="0.5rem"
                    >
                      <Image
                        height={30}
                        width={30}
                        src="/assets/images/savings/coupons.png"
                      />
                      <Box>
                        <Typography
                          fontSize="0.9rem"
                          ml="0.5rem"
                          fontWeight={500}
                          color={"#009733"}
                          className={roboto.className}
                        >
                          Save more 25% using this coupon
                        </Typography>
                      </Box>
                      <FlexBox width={"40%"} justifyContent={"flex-end"}>
                        <Box
                          backgroundColor="#CAFFB8"
                          border="1px dashed #009733"
                          borderRadius="0.3125rem"
                        >
                          <Typography
                            className={roboto.className}
                            fontWeight={700}
                            fontSize="0.95rem"
                            padding="0.3rem 1rem"
                            color={"#009733"}
                          >
                            NB25
                          </Typography>
                        </Box>
                      </FlexBox>
                    </FlexBox>
                  </Box>

                  <Box>
                    <Divider ml="2rem" mt="1rem" color="#E6E6E6"></Divider>
                  </Box>

                  <Box alignItems={"center"} mt="0.5rem">
                    <FlexBox
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                      mt="0.5rem"
                    >
                      <Image
                        height={30}
                        width={30}
                        src="/assets/images/savings/calender.png"
                      />
                      <Box>
                        <Typography
                          fontSize="0.9rem"
                          ml="0.5rem"
                          fontWeight={500}
                          color={"#009733"}
                          className={roboto.className}
                        >
                          Pay using no cost EMI options
                        </Typography>
                      </Box>
                      <FlexBox justifyContent="flex-end" width={"43%"}>
                        <Box>
                          <Typography
                            className={roboto.className}
                            fontWeight={700}
                            fontSize="0.75rem"
                            padding="0.3rem 1rem"
                            color={"#247BBB"}
                          >
                            view
                          </Typography>
                        </Box>
                      </FlexBox>
                    </FlexBox>
                  </Box>
                </Card7>

                <FlexBox justifyContent={"flex-start"}>
                  <Typography
                    fontSize={"1rem"}
                    className={noto.className}
                    color="black"
                    fontWeight={600}
                  >
                    <SanitizeHTML html={productInfo?.genOne} />
                  </Typography>
                </FlexBox>

                <FlexBox
                  mt={isExpanded ? "3.5rem" : "0.75rem"}
                  justifyContent={"flex-start"}
                >
                  <Typography
                    className={noto.className}
                    fontSize={"1rem"}
                    fontWeight={600}
                    lineHeight={"1.625rem"}
                  >
                    Needibay Benefits
                  </Typography>
                </FlexBox>

                <FlexBox mt="1rem" justifyContent={"space-evenly"}>
                  <FlexBox
                    className={noto.className}
                    fontSize={"0.9375rem"}
                    verticalAlign={"center"}
                    fontWeight={500}
                    color="#000"
                    lineHeight={"1.625rem"}
                  >
                    <Image
                      height={30}
                      width={30}
                      mr="0.2rem"
                      src="/assets/images/benefits/bill.png"
                    />
                    GST Bill
                  </FlexBox>
                  <FlexBox
                    className={noto.className}
                    fontSize={"0.9375rem"}
                    fontWeight={500}
                    color="#000"
                    lineHeight={"1.625rem"}
                  >
                    <Image
                      height={30}
                      width={30}
                      mr="0.2rem"
                      src="/assets/images/benefits/lock.png"
                    />
                    Secure Payments
                  </FlexBox>
                  <FlexBox
                    className={noto.className}
                    fontSize={"0.9375rem"}
                    fontWeight={500}
                    color="#000"
                    lineHeight={"1.625rem"}
                  >
                    <Image
                      height={30}
                      width={30}
                      mr="0.2rem"
                      src="/assets/images/benefits/thunder.png"
                    />
                    Fast Delivery
                  </FlexBox>
                </FlexBox>

                <FlexBox mt="1rem" justifyContent={"space-evenly"}>
                  <FlexBox
                    className={noto.className}
                    fontSize={"0.9375rem"}
                    fontWeight={500}
                    color="#000"
                    lineHeight={"1.625rem"}
                  >
                    <Image
                      height={30}
                      width={30}
                      mr="0.2rem"
                      src="/assets/images/benefits/benefits.png"
                    />
                    Best Price
                  </FlexBox>
                  <FlexBox
                    className={noto.className}
                    fontSize={"0.9375rem"}
                    fontWeight={500}
                    color="#000"
                    lineHeight={"1.625rem"}
                  >
                    <Image
                      height={30}
                      width={30}
                      mr="0.2rem"
                      src="/assets/images/benefits/bill.png"
                    />
                    Support
                  </FlexBox>
                </FlexBox>
              </ScrollableGrid>
            </Grid>
          </Box>

          <Box mt="5rem">
            <Image
              src="/assets/images/banners/last_banner.png"
              alt="offer"
              width="100%"
              height="100%"
            />
          </Box>
        </Container>
      </MediaQuery>
      {/* For Desktop view End */}

      {/* For Mobile view start */}

      <MediaQuery maxWidth={767}>
        <Container>
          <Box>
            <Box
              margin="0.5rem"
              padding="2rem"
              borderRadius={"0.75rem"}
              backgroundColor={"white"}
            >
              <NbCarousel
                totalSlides={images?.length}
                visibleSlides={1}
                showArrow={false}
                currentSlide={currentSlide}
                showDots
                showthumbnailImg
                test={(updatedCurrent) => renderActiveThumbnail(currentSlide)}
              >
                {images?.map((url, ind) => (
                  <FlexBox
                    border="1px solid #E1E1E1"
                    height="100%"
                    flexDirection={"row"}
                    position="relative"
                    alignItems="center"
                    width="100%"
                    borderRadius={16}
                    justifyContent="space-between"
                  >
                    <Box position="absolute" top="0.1rem" right="-0.5">
                      <Button
                        onClick={() =>
                          state.wishList?.find((o) => o.productId == id)
                            ? removeProductWishList()
                            : addProductWishList()
                        }
                      >
                        <ProductButtonGroup
                          iconName={
                            state.wishList?.find((o) => o.productId == id)
                              ? "heart_filled"
                              : "heart"
                          }
                        />
                      </Button>
                      <Button onClick={() => setShareButton(!shareButton)}>
                        <ProductButtonGroup iconName="product_share" />
                      </Button>
                      {shareButton && (
                        <Box mt={3} display={"flex"} flexDirection={"column"}>
                          <FacebookShareButton
                            url={"https://needibay.com"}
                            quote={"testing"}
                            hashtag="#test"
                          >
                            <FacebookIcon size={32} round />
                          </FacebookShareButton>
                          <WhatsappShareButton
                            url={"https://needibay.com"}
                            title={"tesing"}
                            separator=":: "
                          >
                            <WhatsappIcon size={32} round />
                          </WhatsappShareButton>
                          <InstapaperShareButton
                            url={"https://needibay.com"}
                            title={"tesing"}
                          >
                            <InstapaperIcon size={32} round />
                          </InstapaperShareButton>
                        </Box>
                      )}
                    </Box>
                    <Button
                      // marginRight="1rem"
                      height="3rem"
                      width="3rem"
                      style={{
                        position: "absolute",
                        left: "0px",
                        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                      }}
                      color="light"
                      borderRadius={"50%"}
                      variant="contained"
                      onClick={handleSlideChange(currentSlide - 1)}
                    >
                      <Icon color="dark">arrow-left</Icon>
                    </Button>
                    <Image
                      height={400}
                      width={400}
                      src={url}
                      style={{ display: "block", height: "auto" }}
                    />
                    <Button
                      // marginRight="1rem"
                      height="3rem"
                      width="3rem"
                      style={{
                        position: "absolute",
                        right: "0px",
                        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                      }}
                      color="light"
                      borderRadius={"50%"}
                      variant="contained"
                      onClick={handleSlideChange(currentSlide + 1)}
                    >
                      <Icon color="dark">arrow-right</Icon>
                    </Button>
                  </FlexBox>
                ))}
              </NbCarousel>

              <FlexBox mt="2rem" overflow="auto">
                {images?.map((url, ind) => (
                  <Box
                    key={ind}
                    size={70}
                    bg="white"
                    minWidth={70}
                    display="flex"
                    cursor="pointer"
                    border="1px solid"
                    borderRadius="10px"
                    alignItems="center"
                    justifyContent="center"
                    ml={ind === 0 ? "auto" : ""}
                    mr={ind === images?.length - 1 ? "auto" : "10px"}
                    borderColor={
                      currentSlide === ind ? "primary.main" : "gray.400"
                    }
                    onClick={sildeChangeUsingAvatar(ind)}
                  >
                    <Avatar src={url} borderRadius="10px" size={65} />
                  </Box>
                ))}
              </FlexBox>
              {/* -----------Original----------- */}
              {/* <FlexBox
              border="1px solid #E1E1E1"
              height="100%"
              flexDirection={"row"}
              position="relative"
              alignItems="center"
              width="100%"
              borderRadius={16}
              justifyContent="space-between"
            >
              <Box position="absolute" top="0.1rem" right="1rem">
                <ProductButtonGroup iconName="product_heart" />
                <ProductButtonGroup iconName="product_share" />
              </Box>
              <Image
                height={400}
                width={400}
                src={images[selectedImage].mediaPath}
                style={{ display: "block", height: "auto" }}
              /> */}
              {/* <Button
                marginRight='2rem'
                style={{
                  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                  padding: "0.5rem",
                  height: "2rem",
                  width: "2rem",
                }}
                color='light'
                borderRadius={"50%"}
                variant='contained'
                onClick={handleNextClick}>
                <Icon
                  variant='xsmall'
                  color='dark'>
                  arrow-right
                </Icon>
              </Button> */}
              {/* </FlexBox> */}

              {/* <FlexBox mt="2rem" overflow="auto">
              {images?.map((url, ind) => (
                <Box
                  key={ind}
                  size={70}
                  bg="white"
                  minWidth={70}
                  display="flex"
                  cursor="pointer"
                  border="1px solid"
                  borderRadius="10px"
                  alignItems="center"
                  justifyContent="center"
                  ml={ind === 0 ? "auto" : ""}
                  mr={ind === images?.length - 1 ? "auto" : "10px"}
                  borderColor={
                    selectedImage === ind ? "primary.main" : "gray.400"
                  }
                  onClick={handleImageClick(ind)}
                >
                  <Avatar src={url} borderRadius="10px" size={65} />
                </Box>
              ))}
            </FlexBox> */}
              {/* -----------Original----------- */}
            </Box>

            <Box margin="0.5rem">
              <H1
                fontSize="1.5625rem"
                fontWeight={600}
                lineHeight={"2.125rem"}
                className={roboto.className}
              >
                {title}
              </H1>
              {/* reviews */}

              <FlexBox justifyContent={"flex-start"} alignItems={"center"}>
                <Rating rating={4.5} />
                <Typography
                  ml="0.4rem"
                  fontSize={"0.75rem"}
                  fontWeight={500}
                  className={noto.className}
                  color="#434343"
                >
                  34 reviews
                </Typography>
              </FlexBox>
              <Box mt="24px" mb="24px">
                <Typography
                  fontSize="0.75rem"
                  fontWeight={600}
                  className={noto.className}
                  color="#009733"
                >
                  Offer Price
                </Typography>

                <FlexBox mb={"0.2rem"} justifyContent={"flex-start"}>
                  <H2 color="#009733" fontSize={"2.5rem"} lineHeight="1">
                    {currency(price)}
                  </H2>
                  <FlexBox ml="0.2rem" alignItems="flex-end">
                    <Typography
                      fontSize={"0.9375rem"}
                      fontWeight={500}
                      className={noto.className}
                    >
                      {`+${productInfo?.taxPercent}% GST`}
                    </Typography>
                  </FlexBox>
                </FlexBox>
              </Box>
              {/* delivery */}
              <Box mt="24px" mb="24px">
                <Typography
                  fontSize="1rem"
                  fontWeight={500}
                  className={inter.className}
                  color="#565656"
                >
                  Delivery
                </Typography>

                <FlexBox mt="0.5rem" width="75%" justifyContent="space-evenly">
                  <Box width="65%" mr="0.5rem">
                    {/* <Input
                    
                    borderRadius="0.5rem"
                    placeholder="Enter your pincode"
                    fullwidth
                    value={currentPostalCode}
                    onChange={(e) => setCurrentPostalCode(e.target.value)}
                  /> */}
                    <TextField
                      fullwidth
                      mb="0.75rem"
                      name="email"
                      type="email"
                      className={noto.className}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={currentPostalCode || ""}
                      placeholder="560028"
                      errorText={error ? error : ""}
                    />
                  </Box>
                  <FlexBox width="35%">
                    <Button
                      color="primary"
                      padding={"0rem"}
                      size="small"
                      onClick={() => getCurrentLocation()}
                    >
                      <Image
                        src="/assets/images/illustrations/locate.png"
                        mr="0.1rem"
                      />
                      Locate
                    </Button>
                  </FlexBox>
                </FlexBox>

                <Link href="/contactus">
                  <UnderlineSpan>Have Questions ?</UnderlineSpan>
                </Link>
              </Box>

              <FlexBox width={"100%"}>
                {/* <FlexBox alignItems="center" mb="36px" mr="2rem">
                  <Button
                    p="9px"
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={handleCartAmountChange(cartItem?.qty - 1)}
                  >
                    <Icon variant="small">minus</Icon>
                  </Button>

                  <H3 fontWeight="600" mx="20px">
                    {cartItem?.qty.toString().padStart(2, "0")}
                  </H3>

                  <Button
                    p="9px"
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={handleCartAmountChange(cartItem?.qty + 1)}
                  >
                    <Icon variant="small">plus</Icon>
                  </Button>
                </FlexBox> */}
                {productInfo?.isSampleEnable && (
                  <Button
                    borderRadius={"0.5rem"}
                    size={"small"}
                    width="100%"
                    variant="contained"
                    color="primary"
                    onClick={() => handleGetSampleQty()}
                  >
                    <Typography fontSize={"0.9rem"}>Get a sample </Typography>
                  </Button>
                )}
              </FlexBox>

              <FlexBox alignItems="center" justifyContent={"center"}>
                <StyledButton
                  variant="outlined"
                  color="primary"
                  width="100%"
                  borderRadius={"0.5rem"}
                  size="small"
                  onClick={() =>
                    setisBulkQuantityFormOpen(!isBulkQuantityFormOpen)
                  }
                >
                  <Typography fontSize={"0.9rem"} fontWeight={700}>
                    Bulk Quantity
                  </Typography>
                </StyledButton>
              </FlexBox>

              <Box>
                <Carousel
                  visibleSlides={1.4}
                  totalSlides={4}
                  infinite={true}
                  autoPlay={false}
                  spacing={"1rem"}
                  showArrow={false}
                >
                  {mobList.map((item, ind) => (
                    <MobileCarouselCard
                      key={ind}
                      title={item.title}
                      subtitle={item.subtitle}
                      iconName={item.iconName}
                      size={item.size}
                    />
                  ))}
                </Carousel>
              </Box>
              {/* coupons-mobile */}
              <Card7
                backgroundColor={"#F2FFEC"}
                border="#009733"
                mb="1rem"
                mt="1rem"
              >
                <FlexBox justifyContent={"flex-start"} alignItems={"center"}>
                  <Typography
                    color="#009733"
                    fontWeight={500}
                    fontSize="0.9rem"
                    className={roboto.className}
                  >
                    Offer and Coupons
                  </Typography>
                </FlexBox>

                <Box justifyContent={"flex-start"} alignItems={"center"}>
                  <FlexBox
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    mt="0.5rem"
                  >
                    <Image
                      height={30}
                      width={30}
                      src="/assets/images/savings/reminder.png"
                    />
                    <Box>
                      <Typography
                        fontSize="0.8rem"
                        ml="0.5rem"
                        fontWeight={500}
                        color={"#009733"}
                        className={roboto.className}
                      >
                        Save instantly 20% with online payments
                      </Typography>
                    </Box>
                  </FlexBox>

                  <FlexBox ml={"2.375rem"} alignItems={"flex-start"}>
                    <Typography
                      className={roboto.className}
                      fontSize={"0.7rem"}
                      fontWeight={400}
                      lineHeight={"1.625rem"}
                      color="#000"
                    >
                      <Typography as="span" mr="0.2rem" fontWeight={200}>
                        via
                      </Typography>
                      UPI, NetBanking, Cards
                    </Typography>
                  </FlexBox>
                </Box>

                <Box>
                  <Divider ml="2rem" mt="0.1rem" color="#E6E6E6"></Divider>
                </Box>

                <Box alignItems={"center"} mt="0.5rem">
                  <FlexBox
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    mt="0.5rem"
                  >
                    <Image
                      height={30}
                      width={30}
                      src="/assets/images/savings/coupons.png"
                    />
                    <Box>
                      <Typography
                        fontSize="0.8rem"
                        ml="0.5rem"
                        fontWeight={500}
                        color={"#009733"}
                        className={roboto.className}
                      >
                        Save more 25% using this coupon
                      </Typography>
                    </Box>
                    <FlexBox width={"40%"} justifyContent={"flex-end"}>
                      <Box
                        backgroundColor="#CAFFB8"
                        border="1px dashed #009733"
                        borderRadius="0.3125rem"
                      >
                        <Typography
                          className={roboto.className}
                          fontWeight={700}
                          fontSize="0.7rem"
                          padding="0.3rem 1rem"
                          color={"#009733"}
                        >
                          NB25
                        </Typography>
                      </Box>
                    </FlexBox>
                  </FlexBox>
                </Box>

                <Box>
                  <Divider ml="2rem" mt="0.1rem" color="#E6E6E6"></Divider>
                </Box>

                <Box alignItems={"center"} mt="0.5rem">
                  <FlexBox
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    mt="0.5rem"
                  >
                    <Image
                      height={30}
                      width={30}
                      src="/assets/images/savings/calender.png"
                    />
                    <Box>
                      <Typography
                        fontSize="0.7rem"
                        ml="0.5rem"
                        fontWeight={500}
                        color={"#009733"}
                        className={roboto.className}
                      >
                        Pay using no cost EMI options
                      </Typography>
                    </Box>
                    <FlexBox justifyContent="flex-end" width={"43%"}>
                      <Box>
                        <Typography
                          className={roboto.className}
                          fontWeight={700}
                          fontSize="0.75rem"
                          padding="0.3rem 1rem"
                          color={"#247BBB"}
                        >
                          view
                        </Typography>
                      </Box>
                    </FlexBox>
                  </FlexBox>
                </Box>
              </Card7>

              <FlexBox mt="1.7rem" justifyContent={"flex-start"}>
                <Typography
                  className={noto.className}
                  fontSize={"1rem"}
                  fontWeight={600}
                  lineHeight={"1.625rem"}
                >
                  Needibay Benefits
                </Typography>
              </FlexBox>

              <FlexBox mt="1rem" justifyContent={"space-evenly"}>
                <FlexBox
                  className={noto.className}
                  alignItems={"center"}
                  color="#000"
                >
                  <Image
                    height={25}
                    width={25}
                    mr="0.2rem"
                    src="/assets/images/benefits/bill.png"
                  />
                  <Typography fontWeight={700} fontSize={"0.7rem"}>
                    GST Bill
                  </Typography>
                </FlexBox>
                <FlexBox className={noto.className} alignItems={"center"}>
                  <Image
                    height={25}
                    width={25}
                    mr="0.2rem"
                    src="/assets/images/benefits/lock.png"
                  />
                  <Typography fontWeight={700} fontSize={"0.7rem"}>
                    Secure Payments
                  </Typography>
                </FlexBox>
                <FlexBox className={noto.className} alignItems={"center"}>
                  <Image
                    height={25}
                    width={25}
                    mr="0.2rem"
                    src="/assets/images/benefits/thunder.png"
                  />
                  <Typography fontWeight={700} fontSize={"0.7rem"}>
                    Fast Delivery
                  </Typography>
                </FlexBox>
              </FlexBox>

              <FlexBox mt="1rem" justifyContent={"space-evenly"}>
                <FlexBox className={noto.className} alignItems={"center"}>
                  <Image
                    height={25}
                    width={25}
                    mr="0.2rem"
                    src="/assets/images/benefits/benefits.png"
                  />
                  <Typography fontWeight={700} fontSize={"0.7rem"}>
                    Best price
                  </Typography>
                </FlexBox>
                <FlexBox className={noto.className} alignItems={"center"}>
                  <Image
                    height={25}
                    width={25}
                    mr="0.2rem"
                    src="/assets/images/benefits/bill.png"
                  />
                  <Typography fontWeight={700} fontSize={"0.7rem"}>
                    Secure Payments
                  </Typography>
                </FlexBox>
              </FlexBox>
            </Box>
          </Box>

          <AboveWrapper>
            <FlexBox
              py="1rem"
              justifyContent={"space-around"}
              width={"100%"}
              zIndex={99}
              alignItems={"center"}
              backgroundColor={"white"}
            >
              <FlexBox width="100%">
                <FlexBox width="100%" justifyContent={"center"}>
                  <Box marginRight={"1rem"}>
                    {/* <Button
                      variant="contained"
                      color="cart"
                      size="small"
                      onClick={() => alert("adding in cart")}
                    >
                      <Icon variant="small">bag</Icon>
                      <Typography
                        className={sans.className}
                        marginLeft="0.5rem"
                        fontSize={"0.9rem"}
                        fontWeight={600}
                      >
                        Add to Cartm
                      </Typography>
                    </Button> */}
                    {productInfo?.productType?.toLowerCase() ==
                      "configurable" && (
                      <>
                        {state.cart?.some((ele) =>
                          productInfo?.productVariation.filter(
                            (obj) => obj.id == ele.productId
                          )
                        ) && currentSelectedVariant ? (
                          <FlexBox alignItems="center">
                            <Button
                              p="9px"
                              size="small"
                              color="primary"
                              variant="outlined"
                              onClick={() =>
                                handleUpdateItemQty(
                                  parseInt(currentCartProduct[0].qty) - 1,
                                  parseInt(productInfo.id),
                                  state.cartInfo.id
                                )
                              }
                            >
                              <Icon variant="small">minus</Icon>
                            </Button>

                            <H3 fontWeight="600" mx="20px">
                              {
                                state.cart.filter((ele) =>
                                  productInfo?.productVariation.filter(
                                    (obj) => obj.id == ele.productId
                                  )
                                )[0].qty
                              }
                              x
                              {
                                state.cart.filter((ele) =>
                                  productInfo?.productVariation.filter(
                                    (obj) => obj.id == ele.productId
                                  )
                                )[0]?.minOrderQty
                              }
                            </H3>

                            <Button
                              p="9px"
                              size="small"
                              color="primary"
                              variant="outlined"
                              onClick={() =>
                                handleUpdateItemQty(
                                  parseInt(currentCartProduct[0].qty) + 1,
                                  parseInt(productInfo.id),
                                  state.cartInfo.id
                                )
                              }
                            >
                              <Icon variant="small">plus</Icon>
                            </Button>
                          </FlexBox>
                        ) : (
                          <Button
                            backgroundColor={"#EBEFF4"}
                            borderRadius={"0.5rem"}
                            maxWidth={"500px"}
                            onClick={() =>
                              productInfo?.productType?.toLowerCase() ==
                              "simple"
                                ? handleAddToCart(1, parseInt(productInfo.id))
                                : handleAddItemInExistingCart()
                            }
                            disabled={state.buttonLoader}
                          >
                            {state.buttonLoader ? (
                              <Box
                                display={"flex"}
                                flexDirection={"row"}
                                alignItems={"center"}
                              >
                                <CircularProgress color="inherit" size={20} />
                                &nbsp;
                                <Typography
                                  fontSize="1.25rem"
                                  className={overpass.className}
                                >
                                  Adding to Cart...
                                </Typography>
                              </Box>
                            ) : (
                              <>
                                <Image
                                  src="/assets/images/shops/bag_2.png"
                                  mr="0.5rem"
                                />
                                <Typography
                                  className={sans.className}
                                  fontSize={"1rem"}
                                  fontWeight={500}
                                  color="#2B3445"
                                  lineHeight={"1.625rem"}
                                >
                                  Add to Cart
                                </Typography>
                              </>
                            )}
                          </Button>
                        )}
                      </>
                    )}

                    {productInfo?.productType.toLowerCase() == "simple" && (
                      <>
                        {state.cart?.some(
                          (ele) => ele.productId == productInfo?.id
                        ) ? (
                          <FlexBox alignItems="center">
                            <Button
                              p="9px"
                              size="small"
                              color="primary"
                              variant="outlined"
                              onClick={() =>
                                handleUpdateItemQty(
                                  parseInt(currentCartProduct[0].qty) - 1,
                                  parseInt(productInfo.id),
                                  state.cartInfo.id
                                )
                              }
                            >
                              <Icon variant="small">minus</Icon>
                            </Button>

                            <H3 fontWeight="600" mx="20px">
                              {
                                state.cart.filter(
                                  (ele) => ele.productId == productInfo?.id
                                )[0].qty
                              }
                              {productInfo.minOrderQty &&
                                !currentCartProduct[0]?.isSampleQty &&
                                `x${productInfo.minOrderQty}`}
                            </H3>

                            <Button
                              p="9px"
                              size="small"
                              color="primary"
                              variant="outlined"
                              onClick={() =>
                                handleUpdateItemQty(
                                  parseInt(currentCartProduct[0].qty) + 1,
                                  parseInt(productInfo.id),
                                  state.cartInfo.id
                                )
                              }
                            >
                              <Icon variant="small">plus</Icon>
                            </Button>
                          </FlexBox>
                        ) : (
                          <Button
                            backgroundColor={"#EBEFF4"}
                            borderRadius={"0.5rem"}
                            maxWidth={"500px"}
                            onClick={() =>
                              productInfo?.productType?.toLowerCase() ==
                              "simple"
                                ? handleAddToCart(1, parseInt(productInfo.id))
                                : handleAddItemInExistingCart()
                            }
                            disabled={state.buttonLoader}
                          >
                            {state.buttonLoader ? (
                              <Box
                                display={"flex"}
                                flexDirection={"row"}
                                alignItems={"center"}
                              >
                                <CircularProgress color="inherit" size={10} />
                                &nbsp;
                                <Typography
                                  fontSize="0.7rem"
                                  className={overpass.className}
                                >
                                  Adding to Cart...
                                </Typography>
                              </Box>
                            ) : (
                              <>
                                <Image
                                  src="/assets/images/shops/bag_2.png"
                                  mr="0.5rem"
                                />
                                <Typography
                                  className={sans.className}
                                  fontSize={"1rem"}
                                  fontWeight={500}
                                  color="#2B3445"
                                  lineHeight={"1.625rem"}
                                >
                                  Add to Cart
                                </Typography>
                              </>
                            )}
                          </Button>
                        )}
                      </>
                    )}
                  </Box>

                  <Box width="50%">
                    <Button
                      fullwidth
                      variant="contained"
                      borderRadius={"0.625rem"}
                      color="primary"
                      size="small"
                    >
                      <Typography
                        className={sans.className}
                        marginLeft="0.5rem"
                        fontSize={"0.9rem"}
                        fontWeight={400}
                      >
                        Buy Now
                      </Typography>
                    </Button>
                  </Box>
                </FlexBox>
              </FlexBox>
            </FlexBox>
          </AboveWrapper>
        </Container>
      </MediaQuery>
      {/* For Mobile view end */}
      {isBulkQuantityFormOpen ? (
        <BulkQuantityModal open={isBulkQuantityFormOpen}>
          <BulkQuantityForm
            onCloseModal={handleBlukReqFormClose}
            minOrderQty={productInfo?.minOrderQty}
          />
        </BulkQuantityModal>
      ) : null}
    </>
  );
};

export default ProductIntro;
