import Hidden from "@component/hidden";
import api from "@utils/__api__/orders";
import TableRow from "@component/TableRow";
import Typography, { H5 } from "@component/Typography";
import OrderRow from "@component/orders/OrderRow";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import OrdersPagination from "@component/orders/OrdersPagination";
import OrderSection from "@component/orders/OrderSection";
import Box from "@component/Box";
import { roboto } from "@utils/fonts";
import Orders from "@component/orders/Orders";
const OrderList = () => {

  return (
    <OrderSection />
  );
};

export default OrderList;
