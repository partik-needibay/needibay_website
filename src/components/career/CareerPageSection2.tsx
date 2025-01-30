import Box from "@component/Box";
import Typography from "@component/Typography";
import { Grid } from "@mui/material";
import React from "react";

const CareerPageSection2 = () => {
  return (
    <>
      <Box marginTop={"4rem"}>
        <Grid
          container
          justifyContent={"center"}
          margin={"auto"}
          alignItems={"center"}
          maxWidth={"1950px"}
          height={"100%"}
        >
          <Grid item xs={11} md={8}>
            {/* We succeed by providing the best service para starts here */}
            <Typography
              color="#785689"
              fontSize={" 1.25rem"}
              fontWeight={600}
              textAlign={"center"}
            >
              We suceed because we seek passionate, entrepreneurial individuals
              with a flair for problem-solving attitude. Embrace challenges,
              drive innovation, and thrive with us!
            </Typography>
            {/* AROJEET SAHA CO-FOUNDER & CEO text start here */}
            <Typography
              color="#797979"
              fontSize={"1.3rem"}
              fontWeight={600}
              textAlign={"center"}
              marginTop={"1.6rem"}
              marginBottom={"2rem"}
            >
              - Human Resource Team
            </Typography>
            {/* Our operations involves a number of complex challenges para start here */}
            <Typography
              color="#969696"
              fontSize={"1.25rem"}
              fontWeight={600}
              textAlign={"center"}
            >
              Our operations involves a number of complex challenges, which is
              why
            </Typography>
            <Typography
              color="#969696"
              fontSize={"1.25rem"}
              fontWeight={600}
              textAlign={"center"}
            >
              we invest heavily in both technology and out team.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CareerPageSection2;
