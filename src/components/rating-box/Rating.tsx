
import { FC, useState } from "react";
import { noto } from "@utils/fonts";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import Image from "@component/Image";

 interface RatingProps {
    rating?: number
};

export const Rating: FC<RatingProps>= ({rating}) => {
  return (
      <>
          <FlexBox padding='0.3rem' borderRadius={'0.2615rem'} alignItems='center' justifyContent='space-between' backgroundColor='#009733'>
              <Typography fontSize={'0.62rem'} fontWeight={600} className={noto.className} color='#FFF'>{rating}</Typography>
              <Image src='/assets/images/stars/star.png' />
          </FlexBox>
      </>
  )
}
