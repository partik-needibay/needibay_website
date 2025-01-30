import { debounce } from "lodash";
import Link from "next/link";
import { FC, useCallback, useEffect, useState } from "react";
import Box from "../Box";
import Card from "../Card";
import MenuItem from "../MenuItem";
// import { Button } from "../buttons";
import FlexBox from "@component/FlexBox";
import Search from "@component/search-icon/Search";
import Button from "@mui/material/Button";
import products from "@utils/__api__/products";
import { quicksand } from "@utils/fonts";
import TextField from "../text-field";
import { Span } from "../Typography";
import SearchBoxStyle from "./styled";

const SearchInputMobile: FC = () => {
  const [resultList, setResultList] = useState<any[]>([]);
  const [uploadImage, setUploadImage] = useState(null);
  const [isSearching, setSearching] = useState(false);

  const search = debounce((e) => {
    const value = e.target?.value;

    if (!value) setResultList([]);
    else {
      setSearching(true);
      products
        .search(value)
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            setResultList(res.data?.hits?.hits);
          }
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setSearching(false);
        });
    }
  }, 500);

  const hanldeSearch = useCallback((event: any) => {
    event.persist();
    search(event);
  }, []);

  const handleDocumentClick = () => setResultList([]);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

  const handleCameraClick = () => {
    document.getElementById("cameraInput").click();
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const eventValue = event;
    // const reader = new FileReader();
    console.log("file", file);
    console.log("Event value", eventValue);
    setSearching(true);
    if (file.size > 5000000) {
      // File size exceeds 1MB, handle accordingly (e.g., show an error message)
      setSearching(false);
    } else {
      await products
        .fileUploadFunction(file)
        .then((res) => {
          if (res && res.status === 200) {
            console.log(res);
            setResultList(res.data?.hits?.hits);
          }
        })
        .catch((err) => {
          setSearching(false);
          console.log(err);
        })
        .finally(() => {
          setSearching(false);
        });
    }
    // console.log("reader", reader)
  };
  console.log("Upload file", uploadImage);

  return (
    <Box
      position="relative"
      flex="1 1 0"
      paddingBottom={"1rem"}
      px="1rem"
      style={{ boxShadow: "0px 10px 15px -5px rgba(0, 0, 0, 0.15)" }}
      backgroundColor="#fff"
      maxWidth="670px"
      mx="auto"
    >
      <SearchBoxStyle>
        <div className="search-icon">
          <Search />
        </div>

        <FlexBox
          width="100%"
          position="relative"
          className={`search-box ${quicksand.className}`}
        >
          <TextField
            fullwidth
            style={{
              border: "1.154px solid #6B6B6B",
              borderRadius: "0.5rem",
            }}
            onChange={hanldeSearch}
            className="search-field"
            placeholder="Searching for..."
          />
          <FlexBox
            alignItems="center"
            className="camera"
            // border="2px solid red"
            position={"absolute"}
            right="0"
            bottom="0"
            top="0"
          >
            <Button
              onClick={handleCameraClick}
              disableRipple={true}
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              {/* <VisuallyHiddenInput type="file" /> */}

              <input
                id="cameraInput"
                type="file"
                accept="image/*;capture=camera"
                // capture="environment"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
              {/* if give only file then camera and media picker will come */}
              <Box display={"flex"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="17"
                  viewBox="0 0 19 17"
                  fill="none"
                >
                  <path
                    d="M16.8677 2.41188H14.4688L13.2893 0.643038C13.2261 0.548323 13.1405 0.470656 13.0401 0.416918C12.9398 0.36318 12.8277 0.335029 12.7138 0.334961H7.17535C7.06149 0.335029 6.9494 0.36318 6.84902 0.416918C6.74864 0.470656 6.66306 0.548323 6.59987 0.643038L5.41948 2.41188H3.0215C2.47067 2.41188 1.9424 2.6307 1.5529 3.0202C1.1634 3.4097 0.94458 3.93797 0.94458 4.48881V14.1811C0.94458 14.7319 1.1634 15.2602 1.5529 15.6497C1.9424 16.0392 2.47067 16.258 3.0215 16.258H16.8677C17.4185 16.258 17.9468 16.0392 18.3363 15.6497C18.7258 15.2602 18.9446 14.7319 18.9446 14.1811V4.48881C18.9446 3.93797 18.7258 3.4097 18.3363 3.0202C17.9468 2.6307 17.4185 2.41188 16.8677 2.41188ZM17.56 14.1811C17.56 14.3647 17.487 14.5408 17.3572 14.6707C17.2274 14.8005 17.0513 14.8734 16.8677 14.8734H3.0215C2.83789 14.8734 2.6618 14.8005 2.53197 14.6707C2.40214 14.5408 2.3292 14.3647 2.3292 14.1811V4.48881C2.3292 4.3052 2.40214 4.1291 2.53197 3.99927C2.6618 3.86944 2.83789 3.7965 3.0215 3.7965H5.79073C5.90474 3.79657 6.017 3.76849 6.11755 3.71475C6.21809 3.661 6.30381 3.58326 6.36708 3.48842L7.54573 1.71958H12.3426L13.5221 3.48842C13.5854 3.58326 13.6711 3.661 13.7716 3.71475C13.8722 3.76849 13.9844 3.79657 14.0984 3.7965H16.8677C17.0513 3.7965 17.2274 3.86944 17.3572 3.99927C17.487 4.1291 17.56 4.3052 17.56 4.48881V14.1811ZM9.94458 5.18112C9.19149 5.18112 8.45531 5.40443 7.82914 5.82283C7.20297 6.24122 6.71493 6.8359 6.42673 7.53167C6.13854 8.22743 6.06313 8.99303 6.21005 9.73165C6.35697 10.4703 6.71962 11.1487 7.25213 11.6813C7.78465 12.2138 8.46312 12.5764 9.20174 12.7233C9.94036 12.8703 10.706 12.7949 11.4017 12.5067C12.0975 12.2185 12.6922 11.7304 13.1106 11.1042C13.529 10.4781 13.7523 9.7419 13.7523 8.98881C13.7511 7.9793 13.3496 7.01146 12.6358 6.29763C11.9219 5.58379 10.9541 5.18226 9.94458 5.18112ZM9.94458 11.4119C9.46534 11.4119 8.99686 11.2698 8.59839 11.0035C8.19992 10.7373 7.88935 10.3588 7.70595 9.91608C7.52255 9.47332 7.47457 8.98612 7.56806 8.51609C7.66156 8.04606 7.89233 7.61431 8.23121 7.27543C8.57008 6.93656 9.00183 6.70578 9.47186 6.61229C9.94189 6.51879 10.4291 6.56678 10.8719 6.75018C11.3146 6.93357 11.693 7.24414 11.9593 7.64262C12.2255 8.04109 12.3677 8.50957 12.3677 8.98881C12.3677 9.63145 12.1124 10.2478 11.658 10.7022C11.2035 11.1566 10.5872 11.4119 9.94458 11.4119Z"
                    fill="#8E8E8E"
                  />
                </svg>
              </Box>
            </Button>
          </FlexBox>
        </FlexBox>
      </SearchBoxStyle>

      {!!resultList.length && (
        <Card
          position="absolute"
          top="100%"
          py="0.5rem"
          width="100%"
          boxShadow="large"
          zIndex={99}
        >
          {resultList.map((item) => (
            <Link
              href={`/product/${item?._source?.productSlug}`}
              key={item?._source?.id}
            >
              <MenuItem key={item.id}>
                <Span fontSize="14px">{item?._source?.productName}</Span>
              </MenuItem>
            </Link>
          ))}
        </Card>
      )}
    </Box>
  );
};

const dummySearchResult = [
  "Macbook Air 13",
  "Ksus K555LA",
  "Acer Aspire X453",
  "iPad Mini 3",
];

export default SearchInputMobile;
