import axios from "axios";

const postRequestChangePassword = async (payload): Promise<any> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/customer/password/reset`, payload);
    return response.data;
  };

  const postRequestUpdatePassword = async (payload): Promise<any> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/customer/password/change`, payload);
    return response.data;
  };
  export default {postRequestChangePassword, postRequestUpdatePassword}