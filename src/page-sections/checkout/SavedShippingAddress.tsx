import { FC} from "react";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@context/AppContext";
import cityList from "@data/cityList";
import stateList from "@data/stateList";
import zipcodeList from "@data/zipcodeList";


interface AddressInfo {
  isDefault;
  id;
  addressLineOne;
  addressLineTwo;
  landmark;
  contactPerson;
  phone;
  city;
  state;
  zipcode;
}

type Props = { addressInfo: AddressInfo, selectedShippingAddress?:  number | string };


const SavedShippingAddress: FC<Props> = ({
  addressInfo,
  selectedShippingAddress
}) => {
  return (
    <FlexBox
      width="100%"
      border={selectedShippingAddress === addressInfo.id ? "2.2px solid" : "1px solid"}
      borderColor={selectedShippingAddress === addressInfo.id ? "primary.main" : "black"}
      borderRadius="0.625rem"
      padding="0.7rem"
      marginBottom={"1rem"}
      flexDirection={"column"}
      justifyContent={"column"}
      alignItems={"flex-start"}
    >
      <Typography
        fontSize={"1em"}
        fontWeight={700}
        color="product_detail.grey"
      >
        {addressInfo.isDefault ? "Default" : ""}
      </Typography>
      <Typography fontWeight={500} fontSize="0.7rem" color="black">
        {`${addressInfo.addressLineOne}, ${addressInfo.addressLineTwo}, ${cityList.filter(item => item.value == addressInfo.city)[0].label}, ${stateList.filter(item => item.value == addressInfo.state)[0].label},  ${zipcodeList.filter(item => item.value == addressInfo.zipcode)[0]?.label}`}
      </Typography>

      <FlexBox>
        {" "}
        <Typography
          fontSize={"12px"}
          fontWeight={500}
          marginRight={"1rem"}
          color="product_detail.grey2"
        >
          {`Reciever: ${addressInfo.contactPerson}`}
        </Typography>
        <Typography
          fontSize={"12px"}
          fontWeight={500}
          color="product_detail.grey2"
        >
          {`Reciever Phone: ${addressInfo.phone}`}
        </Typography>
      </FlexBox>
    </FlexBox>
  );
};

export default SavedShippingAddress;
