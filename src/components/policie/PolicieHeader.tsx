import { Grid, Typography } from "@mui/material";
import React from "react";

const PolicieHeader = () => {
  return (
    <>
      {/* Our policie header start */}
      <Grid container>
        <Grid item xs={12} md={12}>
          <Typography
            fontSize={"2.5rem"}
            fontWeight={600}
            color={"#35004F"}
            textAlign={"center"}
            marginTop={"2rem"}
            marginBottom={"2.6rem"}
          >
            OUR POLICIES
          </Typography>
        </Grid>
      </Grid>
      {/* Our policie header ends */}
    </>
  );
};

export default PolicieHeader;
