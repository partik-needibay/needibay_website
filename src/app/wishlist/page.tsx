import Box from "@component/Box";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import WishList from "@component/wishlist/Wishlist";
import WishlistItemWrappeer from "@component/wishlist/WishlistItemWrapper";
import wishlist from "@utils/__api__/wishlist";
import { getServerSession } from "next-auth";
const AddressList = async () => {
  const session = await getServerSession();

  const getWishList = await wishlist.getWishList(session)

  return (
    <Box padding='2rem' backgroundColor={'white'}>
      <DashboardPageHeader
        title="My Wishlist"
        iconName="pin_filled"
        wishlist={true}
        subheading="Products"
      />
      <WishList />
      <WishlistItemWrappeer wishListData={getWishList} />
     
    </Box>
  );
};

export default AddressList;
