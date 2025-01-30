import axios from "axios";
import Order from "@models/order.model";

const getOrders = async (): Promise<Order[]> => {
  const response = await axios.get("/api/users/orders");
  return response.data;
};

const getIds = async (): Promise<{ params: { id: string } }[]> => {
  const response = await axios.get("/api/users/order-ids");
  return response.data;
};

const getOrder = async (id: string): Promise<Order> => {
  const response = await axios.get("/api/users/order", { params: { id } });
  return response.data;
};

const getOrderByCustomerAndOrderId = async (session: any, id: string): Promise<any> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/contact/customer/${session?.user?.name?.userData?.id}/orders/${id}`);
  return response.data.data;
};

const getOrderByCustomerId = async (session, page = 0, size = 10, orderStatus=null): Promise<any> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/contact/customer/${session?.user?.name?.userData?.id}/orders`, {
    params: { page, size, orderStatus }
  });
  return response.data.data;
};

const getOrderStatus = async (): Promise<any> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/lead/status`);
  return response.data;
};


export default { 
getOrders, 
getOrder, 
getIds, 
getOrderByCustomerId, 
getOrderByCustomerAndOrderId,
getOrderStatus };
