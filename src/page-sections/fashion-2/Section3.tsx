"use client";
import { FC } from "react";
import Image from "next/legacy/image";
import styled from "styled-components";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import { H2, H4 } from "@component/Typography";
import { theme } from "@utils/theme";
import Category from "@models/category.model";
import FlexBox from "@component/FlexBox";

//  styled components
const Wrapper = styled(Box)({
  cursor: "pointer",
  overflow: "hidden",
  borderRadius: "4px",
  "& img": { transition: "all 0.3s" },
  ":hover": {
    img: { transform: "scale(1.1)" },
    "& .category-title": {
      color: "white",
      backgroundColor: theme.colors.secondary.main,
    },
  },
});

const CategoryCard = styled(Box)({
  cursor: "pointer",
  overflow: "hidden",
  borderRadius: "4px",
  position: "relative",
  "& img": { transition: "all 0.3s" },
  ":hover": {
    img: { transform: "scale(1.1)" },
    boxShadow: " 0 3px 10px rgb(0 0 0 / 0.2);",
  },
});

const CategoryTitle = styled(Box)({
  left: 10,
  right: 10,
  bottom: 10,
  padding: 8,
  textAlign: "center",
  borderRadius: "2px",
  position: "absolute",
  transition: "all 0.3s",
});

// ===========================================================
type Section3Props = { categories: Category[] };
// ===========================================================

const Section3: FC<Section3Props> = ({ categories }) => {
  return (
    <Container mt='4rem'>
      <H2
        textAlign='center'
        mb={4}>
        <div style={{ display: 'inline', marginRight: '0.1rem', marginTop: '0.1rem'}}>
          <svg
            style={{ paddingTop: '0.1rem' }}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'>
            <g clip-path='url(#clip0_0_1272)'>
              <path
                d='M10 3H4C3.73478 3 3.48043 3.10536 3.29289 3.29289C3.10536 3.48043 3 3.73478 3 4V10C3 10.2652 3.10536 10.5196 3.29289 10.7071C3.48043 10.8946 3.73478 11 4 11H10C10.2652 11 10.5196 10.8946 10.7071 10.7071C10.8946 10.5196 11 10.2652 11 10V4C11 3.73478 10.8946 3.48043 10.7071 3.29289C10.5196 3.10536 10.2652 3 10 3ZM20 3H14C13.7348 3 13.4804 3.10536 13.2929 3.29289C13.1054 3.48043 13 3.73478 13 4V10C13 10.2652 13.1054 10.5196 13.2929 10.7071C13.4804 10.8946 13.7348 11 14 11H20C20.2652 11 20.5196 10.8946 20.7071 10.7071C20.8946 10.5196 21 10.2652 21 10V4C21 3.73478 20.8946 3.48043 20.7071 3.29289C20.5196 3.10536 20.2652 3 20 3ZM10 13H4C3.73478 13 3.48043 13.1054 3.29289 13.2929C3.10536 13.4804 3 13.7348 3 14V20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21H10C10.2652 21 10.5196 20.8946 10.7071 20.7071C10.8946 20.5196 11 20.2652 11 20V14C11 13.7348 10.8946 13.4804 10.7071 13.2929C10.5196 13.1054 10.2652 13 10 13ZM17 13C17.7826 13 18.548 13.2296 19.2014 13.6603C19.8549 14.091 20.3676 14.7039 20.6761 15.4232C20.9846 16.1424 21.0753 16.9363 20.9371 17.7066C20.7988 18.4769 20.4376 19.1898 19.8983 19.7568C19.3589 20.3239 18.665 20.7202 17.9026 20.8968C17.1402 21.0734 16.3427 21.0225 15.6089 20.7503C14.8752 20.4782 14.2374 19.9967 13.7745 19.3657C13.3117 18.7346 13.0441 17.9816 13.005 17.2L13 17L13.005 16.8C13.0563 15.775 13.4996 14.809 14.2432 14.1017C14.9868 13.3944 15.9738 13 17 13Z'
                fill='#FF3838'
              />
            </g>
            <defs>
              <clipPath id='clip0_0_1272'>
                <rect
                  width='24'
                  height='24'
                  fill='white'
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        CATEGORIES
      </H2>

      <Grid
        container
        spacing={6}>
        {categories.map((item) => (
          <Grid
            item
            lg={2}
            md={3}
            sm={4}
            xs={4}
            key={item.id}>
            <CategoryCard>
              <Image
                width={150}
                height={150}
                alt='category'
                src={item.image as string}
                objectFit='contain'
                layout='responsive'
              />

              <CategoryTitle className='category-title'>
                <H4>{item.name}</H4>
              </CategoryTitle>
            </CategoryCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Section3;
