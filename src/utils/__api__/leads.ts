import axios from "axios";

const saveScheduleMeetingForm = async (payload: any): Promise<any> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/lead/schedule-meeting-request`, payload);
    console.log(response.data.data);
    return response.data;
};

const saveBulkEnquiryForm = async (payload: any): Promise<any> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/lead/bulk-enquiry`, payload);
    console.log(response.data.data);
    return response.data;
};
const getBulkQuantityEnquiry = async (session): Promise<any> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/lead/bulk-enquiry/${session?.user?.name?.userData?.id}`,
    { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } }
    );
    console.log(response.data.data);
    return response.data.data;
};

const saveRequestCallForm = async (payload: any): Promise<any> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/lead/request-call`, payload);
    console.log(response.data.data);
    return response.data;
};

const saveManufacturerForm = async (payload: any): Promise<any> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/lead/manufacturer`, payload);
    console.log(response.data.data);
    return response.data;
};

const verifyEmailOTPAndSavePhone = async (payload): Promise<any> => {
    console.log(payload)
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/customer/verify-schedule-meeting/email`,
      payload,
    );
    return response;
  };

export default {
    saveScheduleMeetingForm,
    saveBulkEnquiryForm,
    saveRequestCallForm,
    saveManufacturerForm,
    verifyEmailOTPAndSavePhone,
    getBulkQuantityEnquiry
  };