import axios from "axios";

const applyCoupon = async (session, payload): Promise<any> => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/contact/cart/apply-coupon`,
        payload,
        { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } }
    );
    return response.data;
};

const removeAppliedCoupon = async (session, payload): Promise<any> => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/contact/cart/remove-coupon`,
        payload,
        { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } }
    );
    return response.data;
};
const fetchCoupons = async (): Promise<any> => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/contact/admin/coupon`,
    );
    return response.data;
};

export default {
    applyCoupon,
    removeAppliedCoupon,
    fetchCoupons
};