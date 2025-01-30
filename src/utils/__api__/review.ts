import axios from "axios";

const submitReview = async (payload, session): Promise<any> => {
    console.log(`${session?.user?.name?.userData?.id}`);
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/contact/review`,
        payload,
        { headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` } }
    );
    console.log(response);
    return response.data;
};
// New function to get reviews by product ID
const getReviewsByProductId = async (productId, session) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/contact/reviews/product/${productId}`,
        {
          headers: { Authorization: `Bearer ${session?.user?.name?.accessToken}` }
        }
      );
      return Array.isArray(response.data.data) ? response.data : [];  // Ensure it's an array
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return [];  // Return an empty array on error
    }
  };
  
export default {
    submitReview,
    getReviewsByProductId 
};