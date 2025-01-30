import axios from "axios";
import Address from "models/address.model";

const getAddressList = async (): Promise<Address[]> => {
  const response = await axios.get("/api/address/user");
  return response.data;
};

const getIds = async (): Promise<{ params: { id: string } }[]> => {
  const response = await axios.get("/api/address/address-ids");
  return response.data;
};

const getAddress = async (id: string): Promise<Address> => {
  const response = await axios.get("/api/address/user/1", { params: { id } });
  return response.data;
};


const getAddressById = async (session, params): Promise<any> => {

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/customer/${session?.user?.name?.userData?.id}/address/${params?.id}`,
  { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } }
);
  return response.data.data;
};

const updateAddressByIdAndCustomerId = async (session, payload, id): Promise<any> => {
  console.log(session?.user)
  const response = await axios.put(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/customer/${session?.user?.name?.userData?.id}/address/${id}`,
  payload,
  { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } }
);
  return response.data;
};

const getAllAddresses = async (session): Promise<any> => {
  console.log(`${session?.user?.name?.userData?.id}`);
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customer/${session?.user?.name?.userData?.id}/address`,
    { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } }
  );
  console.log(response.data.data);
  return response.data.data;
};

const getShippingAddress = async (session): Promise<any> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customer/${session?.user?.name?.userData?.id}/address/shipping`,
    { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } }
  );
  console.log(response.data.data);
  return response.data.data;
};

const getBillingAddress = async (session): Promise<any> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customer/${session?.user?.name?.userData?.id}/address/billing`,
    { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } }
  );
  console.log(response.data.data);
  return response.data.data;
};


export default { getAddressList, getIds, getAddress, getAllAddresses, getShippingAddress, getBillingAddress,
  getAddressById, updateAddressByIdAndCustomerId
 };
