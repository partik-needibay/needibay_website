import Home from "@component/home/Home";
import Box from "@component/Box";
import Loading from "./loading";
import { Suspense } from "react";

const FashionTwo = () => {
  return (
    <Box style={{ overflow: "hidden" }}>
      <Home />
    </Box>
  );
};

export default FashionTwo;
