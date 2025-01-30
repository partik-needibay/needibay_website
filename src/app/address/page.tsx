
import AddressSection from "@sections/address/AddressSection";
import api from "@utils/__api__/address";
import { getServerSession } from "next-auth";


const AddressList = async () => {
  const session = await getServerSession();
  const addressList = await api.getAllAddresses(session);

  return (
    <>
      <AddressSection addresses={addressList} />
    </>
  );
};

export default AddressList;
