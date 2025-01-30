import { FC, ReactNode } from "react";
import Box from "./Box";
import Container from "./Container";
import CategorySectionHeader from "./CategorySectionHeader";
import styled from "styled-components";
// =======================================================
export interface CategorySectionCreatorProps {
  title?: string;
  iconName?: string;
  children: ReactNode;
  seeMoreLink?: string;
}
// =======================================================


const ResponsiveBox = styled(Box)`
  @media only screen and (max-width: 900px) {
    margin-bottom: 0px;


  }

`
const CategorySectionCreator: FC<CategorySectionCreatorProps> = ({
  title,
  iconName,
  children,
  seeMoreLink,
}) => {
  return (
    <ResponsiveBox>
      <Container py='2rem'>
        {title && (
          <CategorySectionHeader title={title} iconName={iconName} seeMoreLink={seeMoreLink} />
        )}

        {children}
      </Container>
    </ResponsiveBox>
  );
};

export default CategorySectionCreator;
