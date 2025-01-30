import Hidden from "@component/hidden";
import api from "@utils/__api__/leads";
import OrderSection from "@component/orders/OrderSection";
import { getServerSession } from "next-auth";
import BulkEnquiriesSection from "@component/enquiries/BulkEnquiries";

const BulkEnquiriesList = async () => {
  
  const session = await getServerSession();
  const enquiries = await api.getBulkQuantityEnquiry(session)

  return (
    <BulkEnquiriesSection enquiries={enquiries} />
  );
};

export default BulkEnquiriesList;
