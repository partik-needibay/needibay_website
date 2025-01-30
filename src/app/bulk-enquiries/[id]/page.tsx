
import api from "@utils/__api__/orders";
import OrderDetailSection from "@component/orders/OrderDetailSection";
import { getServerSession } from "next-auth";
import cityList from "@data/cityList";
import countryList from "@data/countryList";
import zipcodeList from "@data/zipcodeList";
import stateList from "@data/stateList";
import { currency } from "@utils/utils";

// const StyledTopography = styled(Typography)`
// color: #656565;
// text-align: center;
// font-size: 0.9375rem;
// font-style: normal;
// font-weight: 500;
// line-height: normal;

// `
const OrderDetails = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession();
  const order = await api.getOrderByCustomerAndOrderId(
    session,
    String(params.id)
  );
  const orderStatus = await api.getOrderStatus();

  return (

    <OrderDetailSection order={order} />
  );
};

export default OrderDetails;
