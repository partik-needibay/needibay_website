import { FC } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Box from "@component/Box";
import Rating from "@component/rating";
import FlexBox from "@component/FlexBox";
import TextArea from "@component/textarea";
import { Button } from "@component/buttons";
import Typography, { H2, H5 } from "@component/Typography";
import ProductComment from "./ProductComment";
import SearchInputWithCategory from "@component/search-box/SearchInputWithCategory";
import TextField from "@component/text-field";
import { quicksand } from "@utils/fonts";
import { getTheme } from "@utils/utils";
import styled from "styled-components";

import Search from "@component/search-icon/Search";
import ProductQuestion from "./ProductQuestion";

import MediaQuery from "react-responsive";

const StyledSearchBox = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;

  .search-icon {
    position: absolute;
    color: ${getTheme("colors.text.hint")};
    left: 1rem;
    z-index: 1;
  }

  .search-field {
    height: 50px;
    border-radius: 0.5;
    padding-left: 3.75rem;
    padding-right: 4.5rem;
  }

  @media only screen and (max-width: 900px) {
    .category-dropdown {
      display: none;
    }
    .search-box {
      width: 100%;
    }
    .camera {
      display: none;
    }
    .search-icon {
      left: 1rem;
    }
    .search-field {
      height: 40px;
      border-radius: 300px;
      padding-left: 2.75rem;
      padding-right: 3.5rem;
    }
    .search-button {
      padding-left: 1.25rem;
      padding-right: 1.25rem;
    }
    .menu-button {
      display: unset;
    }
  }
`;

const ProductSearch = () => {
  return (
    <>
      <MediaQuery minWidth={1280}>
        <StyledSearchBox>
          <div className='search-icon'>
            <Search />
          </div>

          <FlexBox
            width='80%'
            className={`search-box ${quicksand.className}`}>
            <TextField
              fullwidth
              className='search-field'
              placeholder='Search answers'
            />
          </FlexBox>

          <Button
            ml='1rem'
            size={"medium"}
            type='submit'
            color='primary'
            variant='contained'>
            Ask a question
          </Button>
        </StyledSearchBox>
      </MediaQuery>

      <MediaQuery maxWidth={1279}>
        <Box></Box>
        <StyledSearchBox>
          <div className='search-icon'>
            <Search />
          </div>

          <FlexBox
            width='80%'
            className={`search-box ${quicksand.className}`}>
            <TextField
              fullwidth
              className='search-field'
              placeholder='Search answers'
            />
          </FlexBox>
        </StyledSearchBox>
        <Box width='70%'>
          {" "}
          <Button
            ml='1rem'
            size={"small"}
            borderRadius={"300px"}
            type='submit'
            fullwidth
            color='primary'
            variant='contained'>
            <Typography
              fontSize={"0.7rem"}
              fontWeight={"600"}
              color={"white"}>
              Ask a question
            </Typography>
          </Button>
        </Box>
      </MediaQuery>
    </>
  );
};

const ProductQuestions: FC = () => {
  const initialValues = {
    rating: "",
    comment: "",
    date: new Date().toISOString(),
  };

  const validationSchema = yup.object().shape({
    rating: yup.number().required("required"),
    comment: yup.string().required("required"),
  });

  const handleFormSubmit = async (values: any, { resetForm }: any) => {
    console.log(values);
    resetForm();
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
    <Box padding='2rem'>
      <FlexBox
        justifyContent='flex-start'
        flex='1 1 0'>
        <ProductSearch />
      </FlexBox>
      {commentList.map((item, ind) => (
        <ProductQuestion
          {...item}
          key={ind}
        />
      ))}
    </Box>
  );
};

const commentList = [
  {
    name: "Jannie Schumm",
    imgUrl: "/assets/images/faces/7.png",
    rating: 4.7,
    date: "2021-02-14",
    question: "What is the least quantity to buy ?",
  },
  {
    name: "Joe Kenan",
    imgUrl: "/assets/images/faces/6.png",
    rating: 4.7,
    date: "2019-08-10",
    question: "What is the liftetime of this product ?",
  },
  {
    name: "Jenifer Tulio",
    imgUrl: "/assets/images/faces/8.png",
    rating: 4.7,
    date: "2021-02-05",
    question: "How many years of warranty can we expect ?",
  },
];

export default ProductQuestions;
