"use client";
import Link from "next/link";
import Image from "next/legacy/image";
import { FC, Fragment, useCallback, useState } from "react";
import styled from "styled-components";
import { useAppContext } from "@context/AppContext";
import Box from "@component/Box";
import Rating from "@component/rating";
import { Chip } from "@component/Chip";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import Card, { CardProps } from "@component/Card";
import Typography, { H2, H3, Paragraph, SemiSpan } from "@component/Typography";
import { calculateDiscount, currency, getTheme } from "@utils/utils";
import { deviceSize } from "@utils/constants";
import ProductQuickView from "@component/products/ProductQuickView";
import { mukta, quicksand } from "@utils/fonts";

import { isMobile } from "react-device-detect";
import { useRouter } from "next/router";
import NavLink from "@component/nav-link";

// styled component
const Wrapper = styled(Card)`
  margin: auto;
  height: 100%;
  display: flex;
  overflow: hidden;
  background-color: ${getTheme("colors.gray.200")};
  flex-direction: column;
  justify-content: space-between;
  transition: all 250ms ease-in-out;

  &:hover {
    .details {
      .add-cart {
        display: flex;
      }
    }
    .image-holder {
      .extra-icons {
        display: block;
      }
    }
  }

  .break {
    flex-basis: 100%;
    width: 0px;
    height: 0px;
    overflow: hidden;
  }

  .image-holder {
    text-align: center;
    position: relative;
    display: inline-block;

    .extra-icons {
      z-index: 2;
      top: 0.75rem;
      display: none;
      right: 0.75rem;
      cursor: pointer;
      position: absolute;
    }

    @media only screen and (max-width: ${deviceSize.sm}px) {
      padding-left: 1rem
      display: block;
      margin-top: 1rem;
    }
  }

  @media only screen and (max-width: 600px) {
    .details {
      margin-top: 0.1rem;
      .add-cart {
        display: flex;
      }
    }

    .box {
      margin-right: -3rem;
    }
  }
`;

// =======================================================================
interface OfferCard1Props extends CardProps {
  off?: number;
  slug?: string;
  title?: string;
  price?: number;
  imgUrl?: string;
  hours?: number;
  mins?: number;
  secs?: number;
  rating?: number;
  images?: string[];
  id?: string | number;
}
// =======================================================================

const OfferCard: FC<OfferCard1Props> = ({
  hours,
  mins,
  secs,
}) => {
  const [open, setOpen] = useState(false);
  const toggleDialog = useCallback(() => setOpen((open) => !open), []);

  return (
    <>
      <Wrapper borderRadius={isMobile ? "2rem" : "1rem 0 0 1rem"}>
        <div className="image-holder">
          {isMobile ? (
            <FlexBox justifyContent={"center"}>
              <H2
                className={quicksand.className}
                marginTop={"-1rem"}
                fontSize={"2rem"}
                fontWeight={"700"}
                color="white   "
              >
                Offer Ending In
              </H2>
            </FlexBox>
          ) : (
            <>
              <FlexBox ml="2rem" mt="2rem" justifyContent={"flex-start"}>
                <H2
                  className={quicksand.className}
                  fontSize={"3rem"}
                  fontWeight={"700"}
                  color="white   "
                >
                  Offer
                </H2>
              </FlexBox>
              <FlexBox ml="2rem" justifyContent={"flex-start"}>
                <H2
                  className={quicksand.className}
                  fontSize={"3rem"}
                  fontWeight={"700"}
                  color="white   "
                >
                  Ending In
                </H2>
              </FlexBox>
            </>
          )}
        </div>

        <div className="details">
          <FlexBox justifyContent={"space-evenly"} alignItems={"center"}>
            <Box
              className="box"
              backgroundColor={"white"}
              borderRadius={"0.5rem"}
              height={"3.685rem"}
              width={"3.685rem"}
            >
              <FlexBox justifyContent={"center"} alignItems={"center"}>
                <H2 fontSize={"1.5rem"} className={quicksand.className}>
                  {hours}
                </H2>
              </FlexBox>
              <FlexBox justifyContent={"center"}>
                <H2 fontSize={"0.9rem"} className={quicksand.className}>
                  Hours
                </H2>
              </FlexBox>
            </Box>
            <Box
              className="box"
              backgroundColor={"white"}
              borderRadius={"0.5rem"}
              height={"3.685rem"}
              width={"3.685rem"}
            >
              <FlexBox justifyContent={"center"} alignItems={"center"}>
                <H2 fontSize={"1.5rem"} className={quicksand.className}>
                  {mins}
                </H2>
              </FlexBox>
              <FlexBox justifyContent={"center"}>
                <H2 fontSize={"0.9rem"} className={quicksand.className}>
                  Mins
                </H2>
              </FlexBox>
            </Box>
            <Box
              backgroundColor={"white"}
              borderRadius={"0.5rem"}
              height={"3.685rem"}
              width={"3.685rem"}
            >
              <FlexBox justifyContent={"center"} alignItems={"center"}>
                <H2 fontSize={"1.5rem"} className={quicksand.className}>
                  {secs}
                </H2>
              </FlexBox>
              <FlexBox justifyContent={"center"}>
                <H2 fontSize={"0.9rem"} className={quicksand.className}>
                  Secs
                </H2>
              </FlexBox>
            </Box>
          </FlexBox>
          {isMobile ? (
            <FlexBox mt="0.5rem" mb="0.5rem" justifyContent={"center"}>
              <Paragraph
                color="white"
                className={quicksand.className}
                fontWeight="600"
              >
                Get your products in a single click
              </Paragraph>
            </FlexBox>
          ) : (
            <>
              <FlexBox justifyContent={"flex-start"} ml="2rem" mt="2rem">
                <Paragraph
                  fontSize={"1.5rem"}
                  color="white"
                  className={quicksand.className}
                  fontWeight="600"
                >
                  Get your products
                </Paragraph>
              </FlexBox>
              <FlexBox justifyContent={"flex-start"} ml="2rem" mt="1rem">
                <Paragraph
                  color="white"
                  fontSize={"1.5rem"}
                  className={quicksand.className}
                  fontWeight="600"
                >
                  On a single click
                </Paragraph>
              </FlexBox>
            </>
          )}
        </div>
        <FlexBox justifyContent={"center"}>
          <Button
            className="box"
            marginBottom={"2rem"}
            width="70%"
            display={isMobile ? "none" : ""}
            size="large"
            borderRadius={"0.5rem"}
            color="box"
            variant="contained"
          >
            <NavLink href={"/catalog/products"}>
              <Typography fontSize="1.25rem" className={quicksand.className}>
                Shop Now
              </Typography>
            </NavLink>
          </Button>
        </FlexBox>
      </Wrapper>

    </>
  );
};

export default OfferCard;
