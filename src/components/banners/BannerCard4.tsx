import Box from "@component/Box";
import Divider from "@component/Divider";
import Image from "@component/Image";
import { H2, Paragraph, Span } from "@component/Typography";
import Link from "next/link";
import { CSSProperties, FC } from "react";
import styled from "styled-components";
import { overpass } from "@utils/fonts";
import { deviceSize } from "@utils/constants";

import FlexBox from "@component/FlexBox";

// custom styled components
const CardWrapper = styled(Box)({
  borderRadius: "10px",
  position: "relative",
  marginLeft: "2rem",
});

const CardContent = styled(Box)<{ contentAlign: "right" | "left" | null }>(
  ({ contentAlign }) => ({
    top: 0,
    zIndex: 1,
    height: "100%",
    display: "flex",
    position: "absolute",
    flexDirection: "column",
    justifyContent: "center",
    ":hover": {
      img: {
        transform: contentAlign === "left" ? "scale(1.15)" : "scale(1.4)",
        transformOrigin: contentAlign === "left" ? "bottom right" : "bottom left",
      },
    },

    ...(contentAlign === "left"
      ? {
          left: 32,
          marginTop: "1rem",
          [`@media(max-width: ${deviceSize.sm}px)`]: {
            ".image": {
              width: "70% !important",
              height: "100%",
              paddingRight: "3rem",
            },
          },
        }
      : { right: 10, alignItems: "flex-end" }),
  })
);

// ========================================================
type BannerCard4Props = {
  img: string;
  img2: string;
  contentPosition?: "left" | "right";
};
// ========================================================

const BannerCard4: FC<BannerCard4Props> = ({
  img,
  img2,

  contentPosition,
}) => {
  return (
    <CardWrapper>
      <Image
        alt='category'
        height='100%'
        width='100%'
        src={img}
      />

      <CardContent
        contentAlign={contentPosition ? contentPosition : null}
        className='content'>
        <FlexBox mb='3rem'>
          <Box className='outer_box'>
            <Image
              className='image'
              src={img2}></Image>
          </Box>
        </FlexBox>
      </CardContent>
    </CardWrapper>
  );
};

export default BannerCard4;
