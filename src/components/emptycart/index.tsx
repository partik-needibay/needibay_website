"use client";
import { Grid, Box, Typography } from "@mui/material";
import Image from "@component/Image";
import FlexBox from "@component/FlexBox";
import Link from "next/link";
import { Button } from "@component/buttons";
import { theme } from "@utils/theme";

export default function EmptyCart() {
  return (
    <FlexBox
      minHeight="100vh"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Grid container display={"flex"} justifyContent={"center"}>
        <Grid lg={6} md={6}>
          <FlexBox
            p="1rem"
            minHeight="100vh"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
          >
            <Image
              src="/assets/images/cart/empty_cart.png"
              maxWidth="100px"
              width="100%"
            />

            <FlexBox flexWrap="wrap" m={3}>
              <Link href="/">
                <Button variant="contained" m="0.5rem" color={"primary"}>
                  Continue Shopping
                </Button>
              </Link>
            </FlexBox>
          </FlexBox>
        </Grid>
      </Grid>
    </FlexBox>
  );
}
