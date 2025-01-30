import React from "react";
import Box from "@component/Box";


import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import Typography, { H1, H2, H3, H6, SemiSpan } from "@component/Typography";
import styled from "styled-components";
import { sans } from "@utils/fonts";
const StyledMobileCard = styled(FlexBox)`
  background: linear-gradient(100deg, #70b0ff -0.84%, #29405e 118.55%);
`;

const MobileCarouselCard = ({ iconName, title, subtitle, size}) => {
  return (
    <>
      <StyledMobileCard
        mt='1rem'
        padding='0.4rem'
        borderRadius={"0.7rem"}
        width='100%'>
        <FlexBox
          width='100%'
          justifyContent={"space-evenly"}>
            {/* todo - fix icon size issue */}
          <Icon
            style={{width: 45, height: 45}}
            size={'small'}
            variant={'small'}
            color='light'>
           {iconName}
          </Icon>
          <Box>
            <Typography
              fontSize={"1rem"}
              className={sans.className}
              color='white'
              fontWeight={600}>
              {title}
            </Typography>
            <Typography
              fontSize={"0.93rem"}
              color='white'
              className={sans.className}
              fontWeight={400}>
              {subtitle}
            </Typography>
          </Box>
        </FlexBox>
      </StyledMobileCard>
    </>
  );
};

export default MobileCarouselCard;
