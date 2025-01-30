"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import Box from "@component/Box";
import Skeleton from "@mui/material/Skeleton";
import Image from "@component/Image";
import HeaderMenu from "@component/HeaderMenu";
import MobileNavigationBar from "@component/mobile-navigation";
import CircularProgress from "@mui/material/CircularProgress";
import Menu from "@component/Menu";
import MenuItem from "@component/MenuItem";
import MediaQuery from "react-responsive";
import styled from "styled-components";
import SearchInputMobile from "@component/search-box/SearchInputMobile";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import MiniCart from "@component/mini-cart";
import Container from "@component/Container";
import Typography, { Tiny } from "@component/Typography";
import LoginPopup from "@component/sessions/LoginPopup";
import { IconButton } from "@component/buttons";
import Sidenav from "@component/sidenav/Sidenav";
import Categories from "@component/categories/Categories";
import { SearchInputWithCategory } from "@component/search-box";
import { useAppContext } from "@context/AppContext";
import locate from "@assets/images/icons/location.svg";
import { Locate } from "@component/locate/Locate";
import StyledHeader from "./styles";
import { Content, Quicksand } from "next/font/google";
import UserLoginDialog from "./LoginDialog";
import User from "@component/user/User";
import Bag from "@component/bag/Bag";
import Help from "@component/help/Help";
import { Burger } from "./Burger";
import { isMobile, isTablet } from "react-device-detect";
import Search from "./Search";
import Card from "@component/Card";
import { marginRight } from "styled-system";
import DashboardProfileNavigation from "@component/layout/DashboardProfileNavigation";
import LoginDialog from "./LoginDialog";
import HelpModal from "./HelpModal";
import UserModal from "./UserModal";
import DashboardNavigation from "@component/layout/DashboardNavigation";
import { Button } from "@component/buttons";
import api2 from "@utils/__api__/market-1";
import Service from "@models/service.model";
import api from "@utils/__api__/fashion-2";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import useCurrentLocation from "@hook/useCurrentLocation";
import axios from "axios";
import wishlist from "@utils/__api__/wishlist";
import BulkQuantityModal from "@component/products/BulkQuantityModal";
import BulkQuantityForm from "@component/products/BulkQuantityForm";

// ====================================================================
type HeaderProps = {
  isFixed?: boolean;
  className?: string;
  serviceList?: Service[];
};
// =====================================================================

const quicksand = Quicksand({ subsets: ["latin"] });

const Header: FC<HeaderProps> = ({ isFixed, className, serviceList }) => {
  const { state, dispatch } = useAppContext();
  const { data: session } = useSession();
  const [openSearch, setOpenSearch] = useState(false);
  const [openModal, setOpenModal] = useState<"user" | "help" | null>(null);
  const [isSidenavOpen, setIsSidenavOpen] = useState(true);
  const [category, setCategory] = useState<any>([]);
  const [currentCity, setCurrentCity] = useState<any>("");
  const [isBulkQuantityFormOpen, setisBulkQuantityFormOpen] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const userPopOverRef = useRef(false);
  userPopOverRef.current = showUser;
  const toggleUserPopover = (e: any) => {
    e.stopPropagation();
    setShowUser(!showUser);
    setShowHelp(false);
  };

  const handleBlukReqFormClose = () => {
    dispatch({
      type: "ISBULKQUANTITYFORMOPEN",
      payload: false
    })
    setisBulkQuantityFormOpen(false); // Update the state to close the modal
  };

  const [showHelp, setShowHelp] = useState(false);
  const helpPopOverRef = useRef(showHelp);
  helpPopOverRef.current = showHelp;
  const toggleHelpPopover = (e: any) => {
    e.stopPropagation();
    setShowHelp(!showHelp);
    setShowUser(false);
  };

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

  const handleDocumentClick = () => {
    if (helpPopOverRef.current) setShowHelp(false);
    if (userPopOverRef.current) setShowUser(false);
  };

  useEffect(() => {
    fetchCartDetail();
    fetchWishList();
  }, [session]);

  useEffect(() => {
    getCurrentLocation();
    fetchCategoryDetail();
  }, []);

  const getCurrentLocation = async () => {
    let apiStr = `https://maps.googleapis.com/maps/api/geocode/json?`;
    navigator?.geolocation.getCurrentPosition(async (position) => {
      apiStr += `latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyBFA-ryKStAdbM_je5gvPUqMiuG7EKuIAI`;
      axios
        .get(apiStr)
        .then((res: any) => {
          if (res.status == 200) {
            console.log("current location");
            console.log(res?.data?.results[0].address_components);
            res?.data?.results[0].address_components.map((value, index) => {
              if (value?.types[0] == "locality") {
                setCurrentCity(value?.short_name);
              }
            });
            console.log("current location");
          }
        })
        .catch((e) => {
          console.log(e.getMessage());
        });
    });
  };

  const fetchCartDetail = async () => {
    if (session?.user) {
      console.log(session);
      const cart = await api2.getCartItem(session?.user?.name?.userData?.id);
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: cart ? cart : null,
      });
    }
  };

  const fetchCategoryDetail = async () => {
    const categoryList = await api.getServices();
    setCategory(categoryList);
  };

  const fetchWishList = async () => {
    const wishList = await wishlist.getWishList(session);
    console.log("====================================");
    console.log(wishList);
    console.log("====================================");
    dispatch({ type: "WISHLIST", payload: wishList });
  };

  const closeSidenav = () => {
    setIsSidenavOpen(false);
  };

  const openSidenav = () => {
    setIsSidenavOpen(true);
  };

  const openHelpModal = (event) => {
    event.stopPropagation();
    if (openModal === "help") {
      setOpenModal(null);
    } else {
      setOpenModal("help");
    }
  };

  const openUserModal = () => {
    if (openModal === "user") {
      setOpenModal(null);
    } else {
      setOpenModal("user");
    }
  };

  const toggleSearch = () => setOpenSearch(!openSearch);

  const [open, setOpen] = useState(false);
  const toggleSidenav = () => setOpen(!open);

  const StyledSvg = styled(Icon)`
    display: none;

    // Add other styles as needed
  `;
  const Wrapper = styled.div`
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &:hover ${StyledSvg} {
      top: 70%;
      position: absolute;
      display: block;
    }
  `;

  const CART_HANDLE = (
    <Box ml="10px" position="relative">
      <IconButton p="3px" size="xsmall">
        <Bag />
      </IconButton>

      {state.cart?.length > 0 && (
        <FlexBox
          top={-5}
          right={-5}
          height={20}
          minWidth={20}
          bg="#D23F57"
          borderRadius="50%"
          alignItems="center"
          position="absolute"
          justifyContent="center"
        >
          <Tiny color="white" fontWeight="600" lineHeight={1}>
            {state.cart.length}
          </Tiny>
        </FlexBox>
      )}
    </Box>
  );

  return (
    <StyledHeader className={className}>
      <MediaQuery query="(max-width: 768px)">
        <>
          <Box
            display={"flex"}
            paddingTop={"0.1rem"}
            position="relative"
            alignItems={"center"}
            width="100%"
            height="100%"
          >
            <FlexBox
              ml="0.5rem"
              alignItems="center"
              mb="0.5rem"
              justifyContent={"flex-start"}
              width={"100%"}
            >
              <Icon variant="large" color="primary">
                pin-2
              </Icon>
              <Box
                style={{
                  marginLeft: "0.1rem",
                  marginTop: "0.5rem",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  fontSize="0.6rem"
                  fontWeight="500"
                  color="#909090"
                  lineHeight="1"
                >
                  <p
                    style={{ marginBottom: "0" }}
                    className={quicksand.className}
                  >
                    Delivery to
                  </p>
                </Typography>
                <Typography color="#282828" fontSize="0.7rem" fontWeight="600">
                  <p style={{ marginTop: "0" }} className={quicksand.className}>
                    {currentCity != "" ? currentCity : <>Locate Me</>}
                  </p>
                </Typography>
              </Box>
            </FlexBox>

            <FlexBox
              width="100%"
              position="absolute"
              left="0"
              right="0"
              marginLeft={"auto"}
              marginRight={"auto"}
              zIndex={-1}
              alignItems="center"
              justifyContent="center"
            >
              <Link href="/">
                <Image
                  width="8rem"
                  src="/assets/images/logos/needibay_logo.png"
                  alt="logo"
                />
              </Link>
            </FlexBox>
            <FlexBox
              width="100%"
              alignItems={"center"}
              justifyContent={"flex-end"}
              flexDirection={"row"}
            >
              <Box mr="1rem" onClick={toggleSearch}>
                <Search />
              </Box>
              <Sidenav
                position="left"
                open={open}
                toggleSidenav={toggleSidenav}
                handle={
                  <Box mr="1rem">
                    <Burger />
                  </Box>
                }
              >
                <DashboardProfileNavigation toggleSidenav={toggleSidenav} />
              </Sidenav>
            </FlexBox>
          </Box>
        </>
      </MediaQuery>
      <MediaQuery query="(min-width: 769px)">
        <Container
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          height="100%"
        >
          {state?.isBulkQuantityFormOpen ? (
            <BulkQuantityModal open={state?.isBulkQuantityFormOpen}>
              <BulkQuantityForm
                onCloseModal={handleBlukReqFormClose}
                minOrderQty={1}
              />
            </BulkQuantityModal>
          ) : null}
          <FlexBox alignItems="center" mr="1.5rem">
            <Link href="/">
              <Image
                style={{ cursor: "pointer" }}
                className="logo"
                src="/assets/images/logos/needibay_logo.png"
                alt="logo"
              />
            </Link>
          </FlexBox>

          <FlexBox className="locate" alignItems="center" mr="1.5rem">
            <FlexBox alignItems="center" onClick={() => getCurrentLocation()}>
              <Wrapper>
                <Box mt="0.2rem">
                  <Locate />
                </Box>
                <StyledSvg color="dark">shadow</StyledSvg>
              </Wrapper>

              <Box
                style={{
                  marginLeft: "0.5rem",
                  marginTop: "1rem",
                  display: "flex-container",
                  flexFlow: "column",
                }}
              >
                <Typography
                  fontSize="0.75rem"
                  fontWeight="500"
                  color="#909090"
                  lineHeight="1.125"
                >
                  <p
                    style={{ marginBottom: "0" }}
                    className={quicksand.className}
                  >
                    Delivery to
                  </p>
                </Typography>
                <Typography color="#282828" fontSize="1.25rem" fontWeight="600">
                  <p style={{ marginTop: "0" }} className={quicksand.className}>
                    {currentCity ? currentCity : <>Locate Me</>}
                  </p>
                </Typography>
              </Box>
            </FlexBox>
          </FlexBox>

          <FlexBox className="navigation" justifyContent="center" flex="1 1 0">
            <SearchInputWithCategory serviceList={category} />
          </FlexBox>

          <Box position="relative" ml={3}>
            <IconButton
              className="locate modal"
              onClick={toggleHelpPopover}
              p="2px"
            >
              <Help />
            </IconButton>
            {showHelp && <HelpModal />}
          </Box>

          <UserLoginDialog>
            <div>
              <LoginPopup />
            </div>
          </UserLoginDialog>

          <FlexBox className="header-right" alignItems="center">
            <Sidenav
              open={open}
              width={380}
              position="right"
              handle={CART_HANDLE}
              toggleSidenav={toggleSidenav}
            >
              <MiniCart toggleSidenav={toggleSidenav} />
            </Sidenav>
          </FlexBox>

          <Box position="relative">
            {session?.user ? (
              <>
                <IconButton
                  blink={!session?.user?.name?.userData?.customerData?.isCompleted}
                  onClick={toggleUserPopover}
                  title={(openModal !== "user") as never}
                  ml="1rem"
                  className="modal"
                  padding="7px"
                >
                  <User />
                </IconButton>
                {showUser && <UserModal />}
              </>
            ) : (
              <Link href={"/login"}>
                <Button
                  variant="outlined"
                  color="primary"
                  size={"small"}
                  ml={3}
                >
                  Login
                </Button>
              </Link>
            )}
          </Box>
        </Container>
      </MediaQuery>

      {openSearch && (
        <FlexBox justifyContent={"center"}>
          <FlexBox justifyContent="center" flex="1 1 0">
            <SearchInputMobile />
          </FlexBox>
        </FlexBox>
      )}

      <MobileNavigationBar />
    </StyledHeader>
  );
};

export default Header;
