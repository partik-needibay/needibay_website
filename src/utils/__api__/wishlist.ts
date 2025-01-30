import axios from "axios";


const saveWishList = async (session, payload): Promise<any> => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customer/wishlist`,
      payload,
      { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } }
    );
    return response.data.data;
  };

  const getWishList = async (session): Promise<any> => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customer/${session?.user?.name?.userData?.id}/wishlist`,
      { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } }
    );
    return response.data.data;
  };

  const removeWishList = async (session, payload): Promise<any> => {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customer/wishlist/${payload}`,
      { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } }
    );
    return response.data.data;
  };

export default { saveWishList, getWishList, removeWishList };
