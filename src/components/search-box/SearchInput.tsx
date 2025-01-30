import { FC, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { debounce } from "lodash";
import Box from "../Box";
import Card from "../Card";
import Icon from "../icon/Icon";
import MenuItem from "../MenuItem";
import { Button } from "../buttons";
import { Span } from "../Typography";
import TextField from "../text-field";
import SearchBoxStyle from "./styled";
import productList from "@data/productList";

const SearchInput: FC = () => {
  const [resultList, setResultList] = useState<any>([]);

  const search = debounce((e) => {
    const value = e.target?.value;

    if (!value) setResultList([]);
    else {
      const data = productList.filter(item => item.productName == value);
      setResultList(data);}
  }, 200);

  const hanldeSearch = useCallback((event: any) => {
    event.persist();
    search(event);
  }, []);

  const handleDocumentClick = () => setResultList([]);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <SearchBoxStyle>
        <Icon className="search-icon" size="18px">
          search
        </Icon>

        <TextField
          fullwidth
          onChange={hanldeSearch}
          className="search-field"
          placeholder="What are you looking for ..."
        />

        <Button className="search-button" variant="contained" color="primary">
          Search
        </Button>

        <Box className="menu-button" ml="14px" cursor="pointer">
          <Icon color="primary">menu</Icon>
        </Box>
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
            <Link href={`/product/search/${item.productSlug}`} key={item.id}>
            <MenuItem key={item.id}>
              <Span fontSize="14px">{item.productName}</Span>
            </MenuItem>
          </Link>
          ))}
        </Card>
      )}
    </Box>
  );
};


export default SearchInput;
