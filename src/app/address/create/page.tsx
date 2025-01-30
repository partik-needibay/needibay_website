import { Fragment } from "react";
import { Card1 } from "@component/Card1";
import api from "@utils/__api__/address";
import AddressForm from "@component/address/AddressForm";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import BackToAddress from "@sections/address/BackToAddress";
import ShippingAddress from "@sections/checkout/ShippingAddress";
import EditAddressForm from "@sections/address/EditAddressForm";
import { getServerSession } from "next-auth";
import { useParams } from "next/navigation";

const AddressDetails = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession();

  return (
    <Fragment>
      <DashboardPageHeader
        iconName="pin_filled"
        title="Add Address"
        button={<BackToAddress />}
      />

      <EditAddressForm create />
    </Fragment>
  );
};

export default AddressDetails;
