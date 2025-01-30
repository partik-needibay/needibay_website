import { FC } from "react";
import Box from "@component/Box";
import Avatar from "@component/avatar";
import Rating from "@component/rating";
import FlexBox from "@component/FlexBox";
import Typography, { H5, H6, Paragraph, SemiSpan } from "@component/Typography";
import { getDateDifference } from "@utils/utils";
import MediaQuery from "react-responsive";
// =========================================
type ProductQuestionProps = {
  name: string;
  date: string;
  imgUrl: string;
  rating: number;
  question: string;
};
// =========================================

const ProductQuestion: FC<ProductQuestionProps> = (props) => {
  const { name, imgUrl, rating, date, question } = props;

  return (
    <>
      {" "}
      <MediaQuery minWidth={1280}>
        <Box
          mb='32px'
          mt='32px'
          width={"50%"}>
          <FlexBox
            alignItems='center'
            justifyContent={"flex-start"}
            alignContent={"center"}
            mb='1rem'>
            <FlexBox>
              <Avatar src={imgUrl} />
              <Box ml='1rem'>
                <H5 mb='4px'>{name}</H5>

                <SemiSpan>{getDateDifference(date)}</SemiSpan>
              </Box>
            </FlexBox>

            <Box ml='3rem'>
              <Typography
                fontSize={"1rem"}
                fontWeight='600'>
                {question}
              </Typography>
              <Typography
                fontSize={"0.9rem"}
                fontWeight={"400"}
                color={"#1e6cff"}>
                View answer
              </Typography>
            </Box>
          </FlexBox>
        </Box>
      </MediaQuery>
      <MediaQuery maxWidth={1279}>
        <Box
          mb='32px'
          mt='32px'
          width={"100%"}>
          <Box
            alignItems='center'
            alignContent={"center"}
            mb='1rem'>
            <FlexBox>
              <Avatar src={imgUrl} />
              <Box ml='1rem'>
                <H5 mb='4px'>{name}</H5>

                <SemiSpan>{getDateDifference(date)}</SemiSpan>
              </Box>
            </FlexBox>

            <Box mt='1rem'>
              <Typography
                fontSize={"1rem"}
                fontWeight='600'>
                {question}
              </Typography>
              <Typography
                fontSize={"0.9rem"}
                fontWeight={"400"}
                color={"#1e6cff"}>
                View answer
              </Typography>
            </Box>
          </Box>
        </Box>
      </MediaQuery>
    </>
  );
};

export default ProductQuestion;
