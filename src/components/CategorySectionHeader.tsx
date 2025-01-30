import Link from "next/link";
import { FC } from "react";
import FlexBox from "./FlexBox";
import Icon from "./icon/Icon";
import styled from "styled-components";
import { H2, SemiSpan } from "./Typography";
import { sans } from "@utils/fonts";
export interface CategorySectionHeaderProps {
  title?: string;
  iconName?: string;
  seeMoreLink?: string;
}

const ResponsiveFlexBox = styled(FlexBox)`
    @media only screen and (max-width: 900px) {
      justify-content: flex-start;
      margin-top: 1rem;
      margin-bottom: 1rem;

    }
  .title{
    font-size: 1.7rem;
    @media only screen and (max-width: 900px) {
      font-size: 1.2rem;
    }

  }
`;

const CategorySectionHeader: FC<CategorySectionHeaderProps> = ({
  title,
  iconName,
}) => {
  return (
    <ResponsiveFlexBox
      justifyContent='center'
      alignItems='center'
      mb='1.5rem'>
      <FlexBox
        className='inner-flex'
        alignItems='center'>
        {iconName && (
          <Icon
            mr='0.5rem'
          color='primary'>
            {iconName}
          </Icon>
        )}
        <H2
          className={ `title ${sans.className}`}
          fontWeight='700'
          fontSize={'1.56rem'}
          lineHeight='1'>
          {title}
        </H2>
      </FlexBox>
    </ResponsiveFlexBox>
  );
};

export default CategorySectionHeader;
