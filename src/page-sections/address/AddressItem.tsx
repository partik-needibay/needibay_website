"use client";
import Link from "next/link";
import TableRow from "@component/TableRow";
import Typography from "@component/Typography";
import { IconButton } from "@component/buttons";
import Address from "@models/address.model";
import Icon from "@component/icon/Icon";
import cityList from "@data/cityList";
import zipcodeList from "@data/zipcodeList";
import countryList from "@data/countryList";
import stateList from "@data/stateList";
import { useMediaQuery } from "@mui/material";

const AddressItem = ({ item }: { item: any }) => {
  const isMobile = useMediaQuery("(max-width:767px)");

  return (
    <TableRow my="1rem" padding="6px 18px" key={item.id}>
      <Typography
        style={{ wordWrap: "break-word" }}
        className="pre"
        m="6px"
        textAlign="left"
      >
        {item.addressLineOne}
      </Typography>

      <Typography
        flex="1 1 260px !important"
        m="6px"
        padding={isMobile ? 0 : "1rem"}
        textAlign="left"
      >
        {`${stateList.filter((o) => o.value == item.state)[0]?.label}, ${
          cityList.filter((o) => o.value == item.city)[0]?.label
        }`}
      </Typography>

      <Typography className="pre" m="6px" textAlign="left">
        {item.phone}
      </Typography>

      <Typography className="pre" m="6px" textAlign="center">
        {item.contactPerson}
      </Typography>

      <Typography className="pre" textAlign="center" color="text.muted">
        <Link href={`/address/${item.id}`}>
          <IconButton>
            <Icon variant="small" defaultcolor="currentColor">
              edit
            </Icon>
          </IconButton>
        </Link>

        {/*  <IconButton onClick={(e) => e.stopPropagation()}>
          <Icon
            variant='small'
            defaultcolor='currentColor'>
            delete
          </Icon>
        </IconButton> */}
      </Typography>
    </TableRow>
  );
};

export default AddressItem;
