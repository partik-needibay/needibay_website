"use client";
import { FC, useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Box from "@component/Box";
import Rating from "@component/rating";
import FlexBox from "@component/FlexBox";
import TextArea from "@component/textarea";
import { Button } from "@component/buttons";
import Typography, { H2, H5 } from "@component/Typography";
import ProductComment from "./ProductComment";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useAppContext } from "@context/AppContext";

import api from "@utils/__api__/review";
import { CircularProgress } from "@mui/material";
import { overpass } from "@utils/fonts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductReview = (props) => {
  const { productId } = props;
  const { data: session } = useSession();
  const { state, dispatch } = useAppContext();
  const [reviews, setReviews] = useState<any[]>([]); // To store fetched reviews
  const [loading, setLoading] = useState<boolean>(false);
  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      if (!session?.user?.name?.accessToken) return;
      setLoading(true);
      try {
        const reviewsData = await api.getReviewsByProductId(productId, session);
        
        // Ensure reviewsData.data is an array and assign it to state
        if (reviewsData?.data && Array.isArray(reviewsData.data)) {
          setReviews(reviewsData.data); // Update the reviews state with the fetched data
        } else {
          setReviews([]); // Default to an empty array if no valid data is found
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]); // Handle errors by setting reviews to an empty array
      }
      setLoading(false);
    };
  
    fetchReviews();
  }, [productId, session]);  

  const initialValues = {
    rating: "",
    review: "",
    isApproved:0,
    date: new Date().toISOString(),
  };

  const validationSchema = yup.object().shape({
    rating: yup.number().required("required"),
    review: yup.string().required("required"),
  });

  const handleFormSubmit = async (values: any, { resetForm }: any) => {
    console.log(values);
    dispatch({
      type: "UPDATE_BUTTON_STATE",
      payload: {
        name: "SUBMIT_PRODUCT_REVIEW",
        state: true,
      },
    });
    const payload = {
      customerId: session?.user?.name?.userData?.id,
      productId: productId,
      rating: values.rating,
      review: values.review,
    };
    await api
      .submitReview(payload, session)
      .then((res) => {
        console.log(res);
        if (res.success) {
          toast.success(res.message, { theme: "light" });
        }
        resetForm();
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message, { theme: "light" });
        dispatch({
          type: "UPDATE_BUTTON_STATE",
          payload: {
            name: "SUBMIT_PRODUCT_REVIEW",
            state: false,
          },
        });
      })
      .finally(() => {
        dispatch({
          type: "UPDATE_BUTTON_STATE",
          payload: {
            name: "SUBMIT_PRODUCT_REVIEW",
            state: false,
          },
        });
      });
  };

  const {
    values,
    errors,
    touched,
    dirty,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <>
      <ToastContainer />
      <Box padding="2rem">
      {reviews.length > 0 ? (
        reviews
        .filter(review => review.isApproved === true)
        .map((review, index) => (
          <ProductComment
            key={index}
            imgUrl={review.imgUrl}
            rating={review.rating}
            comment={review.review}
            date={review.createdAt}
            isApproved={review.isApproved}
          />
        ))
      ) : (
        <p>No reviews yet.</p>
      )}

        <H2 fontWeight="600" mt="55px" mb="20">
          Write a Review for this products
        </H2>

        <form onSubmit={handleSubmit}>
          <Box mb="20px">
            <FlexBox mb="12px">
              <H5 color="gray.700" mr="6px">
                Your Rating
              </H5>
              <H5 color="error.main">*</H5>
            </FlexBox>

            <Rating
              outof={5}
              color="warn"
              size="medium"
              readonly={false}
              value={parseInt(values.rating) || 0}
              onChange={(value) => setFieldValue("rating", value)}
            />
          </Box>

          <Box mb="24px">
            <FlexBox mb="12px">
              <H5 color="gray.700" mr="6px">
                Your Review
              </H5>
              <H5 color="error.main">*</H5>
            </FlexBox>

            <TextArea
              fullwidth
              rows={8}
              name="review"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.review || ""}
              placeholder="Write a review here..."
              errorText={touched.review && errors.review}
            />
          </Box>

          <Button
            size="small"
            type="submit"
            color="primary"
            variant="contained"
            disabled={!(dirty && isValid)}
          >
            {state.buttonState?.name == "SUBMIT_PRODUCT_REVIEW" &&
            state.buttonState?.state ? (
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
                <CircularProgress color="inherit" size={15} />
                &nbsp;
                <Typography className={overpass.className}>
                  Submitting...
                </Typography>
              </Box>
            ) : (
              <>Submit</>
            )}
          </Button>
        </form>
      </Box>
    </>
  );
};

const commentList = [
  {
    name: "Jannie Schumm",
    imgUrl: "/assets/images/faces/7.png",
    rating: 4.7,
    date: "2021-02-14",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.",
  },
  {
    name: "Joe Kenan",
    imgUrl: "/assets/images/faces/6.png",
    rating: 4.7,
    date: "2019-08-10",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.",
  },
  {
    name: "Jenifer Tulio",
    imgUrl: "/assets/images/faces/8.png",
    rating: 4.7,
    date: "2021-02-05",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.",
  },
];

export default ProductReview;
