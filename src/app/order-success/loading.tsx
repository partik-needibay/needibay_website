"use client"
import { Grid, Box, Typography } from "@mui/material";
import Image from "@component/Image";
import FlexBox from "@component/FlexBox";


export default function Loading() {
  return  <FlexBox minHeight="100vh" alignItems="center" flexDirection="column" justifyContent="center">
  <Grid container display={"flex"} justifyContent={"center"}>
   <Grid lg={6} md={6}>
   <FlexBox
      px="1rem"
      minHeight="100vh"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Image
        src="/assets/images/loader/loaderOrderPlaced.svg"
        maxWidth="100px"
        width="100%"
        mb={4}
      />
    </FlexBox>
   </Grid>
  </Grid>
 </FlexBox>;
}
