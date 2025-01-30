// import Box from "@component/Box";
// import Divider from "@component/Divider";
// import Image from "@component/Image";
// import { H2, Paragraph, Span } from "@component/Typography";
// import Link from "next/link";
// import { CSSProperties, FC } from "react";
// import styled from "styled-components";
// import { Overpass } from "next/font/google";
// import { over } from "lodash";
// import { Button } from "@component/buttons";
// import { quicksand } from "@utils/fonts";
// import FlexBox from "@component/FlexBox";

// // custom styled components
// const CardWrapper = styled(Box)({
//   maxHeight: 240,
//   overflow: "hidden",
//   width: "90%",
//   height: "11rem",
//   borderRadius: "10px",
//   position: "relative",
// });

// const overpass = Overpass({
//   subsets: ["latin"],
// });
// const CardContent = styled(Box)({
//   top: '1rem',
//   zIndex: 1,
//   color: "black",
//   height: "92%",
//   display: "flex",
//   width: "100%",

//   position: "absolute",
//   flexDirection: "column",
//   justifyContent: "center",
// });

// // ========================================================
// type ResponsiveBannerProps = {
//   img: string;
//   imgHeight?: string;
//   rightImg?: string;
//   url?: string;
//   title?: string;
//   underText?: string;
//   subTitle?: string;
//   style?: CSSProperties;
//   contentPosition?: "left" | "right";
// };
// // ========================================================

// const ResponsiveBanner: FC<ResponsiveBannerProps> = ({
//   img,
//   url,
//   imgHeight,
//   rightImg,
//   title,
//   subTitle,
//   underText,
//   style = {},
//   contentPosition = "left",
// }) => {
//   return (
//     <FlexBox justifyContent={"center"}>
//       {" "}
//       <CardWrapper style={style}>
//         <Image
//           alt='category'
//           height='95%'
//           width='100%'
//           src={img}
//         />

//         <CardContent padding='0.5rem' className='content'>
//           <FlexBox
//             justifyContent={"space-between"}
//             width='100%'>
//             <Box ml='2rem' mt='0.5rem'>
//               <H2
//                 fontSize='1.5rem'
//                 className={overpass.className}>
//                 {title}
//               </H2>
//               <Paragraph
//                 className={overpass.className}
//                 fontSize='0.7rem'>
//                 {subTitle}
//               </Paragraph>
//               <Paragraph
//                 className={overpass.className}
//                 fontSize='0.7rem'>
//                 {underText}
//               </Paragraph>
//               <Link href={url}>
//                 <Button
//                   variant='contained'
//                   size='xxsmall'
//                   mt='1rem'
//                   color='primary'>
//                   <p className={quicksand.className}>Shop Now</p>
//                 </Button>
//               </Link>
//             </Box>
//             <Box mb='2rem'>
//               <Image
//                 height={imgHeight}
//                 src={rightImg}></Image>
//             </Box>
//           </FlexBox>
//         </CardContent>
//       </CardWrapper>
//     </FlexBox>
//   );
// };

// export default ResponsiveBanner;

import React from "react";
import FlexBox from "@component/FlexBox";
import Box from "@component/Box";
import Typography from "@component/Typography";
import { overpass } from "../../utils/fonts";
import { quicksand } from "../../utils/fonts";
import { Button } from "@component/buttons";
import Image from "@component/Image";
const ResponsiveBanner = () => {
  return (
    <>
      <FlexBox
        marginLeft={'3rem'}
        borderRadius='0.41688rem'
        width='95%'
        height='10rem'
        justifyContent={'space-between'}
        alignItems='center'
        backgroundColor={"#FFD0D0"}>
        <Box marginLeft='0.5rem' px='1rem' py='0.7rem'>
          <Typography
            fontSize={"1.5rem"}
            color='black'
            className={overpass.className}
            fontWeight={700}>
            Flash Sale
          </Typography>
          <Typography
            fontSize={"0.7rem"}
            color='black'
            className={overpass.className}
            fontWeight={400}>
            Only 24 hours
          </Typography>
          <Typography
            fontSize={"0.7rem"}
            color='black'
            className={overpass.className}
            fontWeight={400}>
            Upto 30% off on everything
          </Typography>

          <Button mt='0.5rem' color='primary' size='xxsmall' variant='contained'>
            <Typography fontSize={'0.7rem'} className={quicksand.className}>Shop Now</Typography>
          </Button>
        </Box>

        <Box>
          <Image width='8rem' src='/assets/images/flash_cards/flash.png' alt='thunder' />
        </Box>
      </FlexBox>
    </>
  );
};

export default ResponsiveBanner;
