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
// import { Typography } from "@mui/material";
// import ResponsiveBanner from "@component/banners/ResponsiveBanner";

// // custom styled components

// const CardWrapper = styled(Box)({
//   maxHeight: 240,
//   overflow: "hidden",
// //   width: "90%",
// //   borderRadius: "10px",
// //   position: "relative",
// //   ":hover": { img: { transform: "scale(1.7)" } },
// // });

// // const overpass = Overpass({
// //   subsets: ["latin"],
// // });
// // const CardContent = styled(Box)<{ contentAlign: "right" | "left" | null }>(
// //   ({ contentAlign }) => ({
// //     top: 0,
// //     zIndex: 1,
// //     color: "black",
// //     height: "100%",
// //     display: "flex",
// //     position: "absolute",
// //     flexDirection: "column",
// //     justifyContent: "center",
// //     ...(contentAlign === "left"
// //       ? { left: 32 }
// //       : { right: 32, alignItems: "flex-end" }),
// //   })
// // );

// // // ========================================================
// // type ResponsiveBannerProps = {
// //   img: string;
// //   imgHeight?: string;
// //   rightImg?: string;
// //   url?: string;
// //   title?: string;
// //   underText?: string;
// //   subTitle?: string;
// //   style?: CSSProperties;
// //   contentPosition?: "left" | "right";
// // };
// // // ========================================================

// // const ResponsiveBanner3: FC<ResponsiveBannerProps> = ({
// //   img,
// //   url,
// //   imgHeight,
// //   rightImg,
// //   title,
// //   subTitle,
// //   underText,
// //   style = {},
// // }) => {
// //   return (
// //     <FlexBox height='100%' justifyContent={"center"}>
// //       <StyledFlexBox
// //         height='92%'
// //         style={{
// //           overflow: "clip",
// //           overflowClipMargin: "20rem",
// //           backgroundPosition: "center left",
// //           backgroundRepeat: "no-repeat",
// //           backgroundImage: `url(/assets/images/banners/blue_banner.png)`,
// //         }}
// //         padding='2rem'
// //         borderRadius={"0.5rem"}
// //         justifyContent={"space-around"}>
// //         <Box mr='3rem'>
// //           <H2
// //             fontSize='1.3rem'
// //             className={overpass.className}>
// //             {title}
// //           </H2>
// //           <Paragraph
// //             className={overpass.className}
// //             fontSize='0.7rem'>
// //             {subTitle}
// //           </Paragraph>
// //           <Paragraph
// //             className={overpass.className}
// //             fontSize='0.7rem'>
// //             {underText}
// //           </Paragraph>
// //           <Link href={url}>
// //             <Button
// //               variant='contained'
// //               size='xxsmall'
// //               style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
// //               mt='1rem'
// //               color='primary'>
// //               <Typography
// //                 fontSize='1rem'
// //                 fontWeight={700}
// //                 className={quicksand.className}>
// //                 Shop Now
// //               </Typography>
// //             </Button>
// //           </Link>
// //         </Box>

// //         <StyledImage
// //           className='flash_hover'
// //           style={{ height: "8.427rem", overflow: "hidden" }}>
// //           <Box>
// //             <Image
// //               src='/assets/images/flash_cards/bottle_2.png'
// //               height={"20rem"}
// //               width={"6rem"}
// //             />
// //           </Box>
// //         </StyledImage>
// //       </StyledFlexBox>
// //     </FlexBox>
// //   );
// // };

// // export default ResponsiveBanner3;

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
// import { Typography } from "@mui/material";

// const StyledImage = styled(Box)`
//   position: relative;
//   top: 0;

//   /* &:hover {
//     transform: scale(1.3);
//     clip-path: inset(0 0 2% 0);
//     transform-origin: left top;
//     top: -3rem;
//     zindex: 2;
//   } */
// `;

// const StyledFlexBox = styled(FlexBox)`
//   overflow: hidden;
// `;
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
//   top: 0,
//   zIndex: 1,
//   color: "black",
//   height: "100%",
//   overflow: "hidden",
//   display: "flex",
//   position: "absolute",
//   flexDirection: "column",
//   width: "100%",
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

// const ResponsiveBoxBanner3: FC<ResponsiveBannerProps> = ({
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

//         <CardContent className='content'>
//           <FlexBox
//             width='100%'
//             justifyContent={"space-between"}
//             height='100%'>
//             <Box padding={"2rem"}>
//               <H2
//                 fontSize='1.2rem'
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
//                   style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
//                   mt='1rem'
//                   color='primary'>
//                   <Typography
//                     fontSize='1rem'
//                     fontWeight={700}
//                     className={quicksand.className}>
//                     Shop Now
//                   </Typography>
//                 </Button>
//               </Link>
//             </Box>
//             <Box
//               mr='2rem'
//               pt='1rem'
//               height='100%'>
//               <StyledImage
//                 className='flash_hover'
//                 style={{ height: "94%", overflow: "hidden" }}>
//                 <Box>
//                   <Image
//                     src='/assets/images/flash_cards/bottle_2.png'
//                     height={"20rem"}
//                     width={"6rem"}
//                   />
//                 </Box>
//               </StyledImage>
//             </Box>
//           </FlexBox>
//         </CardContent>
//       </CardWrapper>
//     </FlexBox>
//   );
// };

// export default ResponsiveBoxBanner3;

import React from "react";
import FlexBox from "@component/FlexBox";
import Box from "@component/Box";
import Typography from "@component/Typography";
import { overpass } from "../../utils/fonts";
import { quicksand } from "../../utils/fonts";
import { Button } from "@component/buttons";
import Image from "@component/Image";
const ResponsiveBanner3 = () => {
  return (
    <>
      <FlexBox
        marginLeft={"3rem"}
        borderRadius='0.41688rem'
        width='95%'
        justifyContent={"space-between"}
        height='10rem'
        alignItems='center'
        backgroundColor={"#C7E0FF"}>
        <Box
          px='1rem'
          py='1rem'>
          <Typography
            fontSize={"1.5rem"}
            color='black'
            className={overpass.className}
            fontWeight={700}>
            Daily Offers
          </Typography>
          <Typography
            fontSize={"0.74169rem"}
            color='black'
            className={overpass.className}
            fontWeight={400}>
            40% off on plastic bottles
          </Typography>

          <Button
            mt='0.5rem'
            color='primary'
            size='xxsmall'
            variant='contained'>
            <Typography
              fontSize={"0.8rem"}
              className={quicksand.className}>
              Shop Now
            </Typography>
          </Button>
        </Box>

        <Box
          mr='2.5rem'
          pt='0.9rem'
          height='100%'>
          <Image
            width='5rem'
            src='/assets/images/flash_cards/bottle_2.png'
            alt='box'
          />
        </Box>
      </FlexBox>
    </>
  );
};

export default ResponsiveBanner3;
