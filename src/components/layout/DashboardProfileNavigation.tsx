"use client";
import { Fragment } from "react";
import Box from "@component/Box";
import Card from "@component/Card";
import styled from "styled-components";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import Image from "@component/Image";
import { usePathname } from "next/navigation";
import Typography from "@component/Typography";
import NavLink from "@component/nav-link";
import { getTheme } from "@utils/utils";
import Link from "next/link";
import IconButton from "@component/buttons/IconButton";
import Divider from "@component/Divider";
import { roboto, sans } from "@utils/fonts";
import Button from "@component/buttons/Button";
import MediaQuery from "react-responsive";
import { variant } from "styled-system";
import { useSession, signOut } from "next-auth/react";
import { useAppContext } from "@context/AppContext";

// styled component
const DashboardNavigationWrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 768px) {
    height: calc(100vh);
    box-shadow: none;
    overflow-x: visible;
    overflow-y: auto;
    z-index: 2000;
  }
`;

const StyledFlexBox = styled(FlexBox)`
  margin-top: auto;
`;

const StyledDashboardNav = styled(NavLink)<{ isCurrentPath?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 4px solid;
  color: ${({ isCurrentPath }) =>
    isCurrentPath ? getTheme("colors.primary.main") : "inherit"};
  border-left-color: ${({ isCurrentPath }) =>
    isCurrentPath ? getTheme("colors.primary.main") : "transparent"};

  .dashboard-nav-icon-holder {
    color: ${getTheme("colors.gray.600")};
  }

  :hover {
    border-left-color: ${getTheme("colors.primary.main")};

    .dashboard-nav-icon-holder {
      color: ${getTheme("colors.primary.main")};
    }
  }
`;

const DashboardNavigation = ({ toggleSidenav }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const {state} = useAppContext();

  return (
    <>
      <MediaQuery minWidth={768}>
        <DashboardNavigationWrapper
          px="0px"
          pb="1.5rem"
          color="gray.900"
          borderRadius={8}
        >
          {/* main header */}
          {session?.user && (
            <>
              <FlexBox
                mt="2rem"
                mb="1rem"
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems="center"
              >
                <Image src="/assets/images/profile/profile.svg" alt="profile" />

                <Box textAlign={"center"}>
                  <Typography
                    color="#0F3460"
                    className={sans.className}
                    fontSize="1.5rem"
                    fontWeight={700}
                  >
                    {state.customerProfileData?.fullName? state.customerProfileData?.fullName : session?.user?.name?.userData?.customerData?.fullName}
                  </Typography>
                  <Link href="/profile">
                    <Typography
                      color="#9F9F9F"
                      className={sans.className}
                      fontSize="1rem"
                      fontWeight={700}
                    >
                      {`+91 ${session?.user?.name?.userData?.phone}`}
                    </Typography>
                  </Link>
                </Box>
              </FlexBox>

              <Box width="100%">
                <Divider mt="1rem" color="#F5F5F5" />
                {profList.map((item) => (
                  <Fragment key={item.title}>
                    {item.list.map((item) => (
                      <StyledDashboardNav
                        px="1.5rem"
                        mb="0.5rem"
                        href={item.href}
                        key={item.title}
                        isCurrentPath={pathname.includes(item.href)}
                      >
                        <FlexBox mt="1rem" alignItems="center">
                          <Typography
                            fontSize="1.25rem"
                            fontWeight={500}
                            className={roboto.className}
                          >
                            {item.title}
                          </Typography>
                        </FlexBox>
                      </StyledDashboardNav>
                    ))}
                  </Fragment>
                ))}
              </Box>
            </>
          )}

          <Box width="100%">
            <Divider mt="1rem" mb="1rem" color="#F5F5F5" />
            {desktopLinkList.map((item) => (
              <Fragment key={item.title}>
                {item.list.map((item) => (
                  <StyledDashboardNav
                    px="1.5rem"
                    mb="0.5rem"
                    href={item.href}
                    key={item.title}
                    isCurrentPath={pathname.includes(item.href)}
                  >
                    <FlexBox mt="1rem" alignItems="center">
                      <Typography
                        fontSize="1.25rem"
                        fontWeight={500}
                        className={roboto.className}
                      >
                        {item.title}
                      </Typography>
                    </FlexBox>
                  </StyledDashboardNav>
                ))}
              </Fragment>
            ))}
          </Box>

          <StyledFlexBox flexDirection={"column"}>
            <Divider mt="1rem" color="#F5F5F5" />

            <Box px="1.7rem" mt="1rem">
              <Typography
                color="#3C3C3C"
                fontSize={"1.25rem"}
                mb="1.5rem"
                className={roboto.className}
                fontWeight={500}
              >
                Chat With Us
              </Typography>
              {/* <Typography
                mt="1rem  "
                color="#3C3C3C"
                mb="1.5rem"
                fontSize={"1.25rem"}
                className={roboto.className}
                fontWeight={500}
              >
                Contact Support
              </Typography> */}
              <Box>
                <Typography
                  color="#3C3C3C"
                  mt="1rem"
                  lineHeight={"1rem"}
                  fontSize={"1.25rem"}
                  className={roboto.className}
                  fontWeight={500}
                >
                  Call Us:
                </Typography>
                <a href={"tel:+919060614360"}>
                  <Typography
                    color="#848282"
                    fontSize={"0.9375rem"}
                    mb="1.5rem"
                    className={roboto.className}
                    fontWeight={500}
                  >
                    +91 9060614360
                  </Typography>
                </a>
              </Box>
              <Box>
                <Typography
                  color="#3C3C3C"
                  mt="1rem"
                  lineHeight={"1rem"}
                  fontSize={"1.25rem"}
                  className={roboto.className}
                  fontWeight={500}
                >
                  Write to Us:
                </Typography>
                <a href={"mailto:+919060614360"}>
                  <Typography
                    color="#848282"
                    fontSize={"0.9375rem"}
                    mb="1.5rem"
                    className={roboto.className}
                    fontWeight={500}
                  >
                    enquiry@needibay.com
                  </Typography>
                </a>
              </Box>
              <FlexBox justifyContent={"flex-start"} mt="1rem" mb="1rem">
                <Button
                  variant="outlined"
                  color="primary"
                  className={roboto.className}
                  onClick={() => signOut()}
                >
                  <Image
                    src="/assets/images/profile/logout.png"
                    alt="logo"
                    mr="0.5rem"
                  />
                  Logout
                </Button>
              </FlexBox>
            </Box>
          </StyledFlexBox>
        </DashboardNavigationWrapper>
      </MediaQuery>
      <MediaQuery maxWidth={768}>
        <>
          <FlexBox
            height="3rem"
            position="absolute"
            right="0"
            top="0"
            borderTopRightRadius={"50%"}
            borderBottomRightRadius={"50%"}
            marginRight={"-3rem"}
            width="3rem"
            zIndex={9999}
            alignItems="center"
            justifyContent="center"
            backgroundColor={"primary.main"}
            onClick={toggleSidenav}
          >
            <Icon variant="medium" color="light">
              close
            </Icon>
          </FlexBox>
          <DashboardNavigationWrapper
            px="0px"
            pb="1.5rem"
            position="relative"
            color="gray.900"
            borderRadius={8}
          >
            {/* main header */}
            {session?.user && (
              <>
                <FlexBox
                  mt="2rem"
                  px="1.5rem"
                  mb="1rem"
                  flexDirection={"row"}
                  justifyContent={"flex-start"}
                  alignItems="center"
                >
                  <Box mr="1rem">
                    <Image
                      height={50}
                      width={50}
                      src="/assets/images/profile/profile.svg"
                      alt="profile"
                    />
                  </Box>

                  <Box>
                    <Box>
                      <Typography
                        color="#0F3460"
                        className={sans.className}
                        fontSize="1rem"
                        fontWeight={700}
                      >
                        {state.customerProfileData?.fullName? state.customerProfileData?.fullName : session?.user?.name?.userData?.customerData?.fullName}
                      </Typography>
                    </Box>
                    <Box ml="0.15rem">
                      <Link href="/profile">
                        <Typography
                          color="#9F9F9F"
                          className={sans.className}
                          fontSize="0.7rem"
                          fontWeight={700}
                        >
                          {`+91 ${session?.user?.name?.userData?.phone}`}
                        </Typography>
                      </Link>
                    </Box>
                  </Box>
                </FlexBox>
                <Box width="100%">
                  <Divider mt="1rem" color="#F5F5F5" />
                  {profList.map((item) => (
                    <Fragment key={item.title}>
                      {item.list.map((item) => (
                        <StyledDashboardNav
                          px="1.5rem"
                          mb="0.2rem"
                          href={item.href}
                          key={item.title}
                          isCurrentPath={pathname.includes(item.href)}
                        >
                          <FlexBox mt="1rem" alignItems="center">
                            <Typography
                              fontSize="0.9rem"
                              fontWeight={500}
                              className={roboto.className}
                            >
                              {item.title}
                            </Typography>
                          </FlexBox>
                        </StyledDashboardNav>
                      ))}
                    </Fragment>
                  ))}
                </Box>
                <Divider mt="1rem" color="#F5F5F5" />
              </>
            )}

            <Box width="100%">
              {mobilelinkList.map((item) => (
                <Fragment key={item.title}>
                  {item.list.map((item) => (
                    <StyledDashboardNav
                      px="1.5rem"
                      mb="0.2rem"
                      href={item.href}
                      key={item.title}
                      isCurrentPath={pathname.includes(item.href)}
                    >
                      <FlexBox mt="1rem" alignItems="center">
                        <Typography
                          fontSize="0.9rem"
                          fontWeight={500}
                          className={roboto.className}
                        >
                          {item.title}
                        </Typography>
                      </FlexBox>
                    </StyledDashboardNav>
                  ))}
                </Fragment>
              ))}
            </Box>

            <StyledFlexBox flexDirection={"column"}>
              <Divider mt="1rem" color="#F5F5F5" />

              <Box px="2rem" mb="4rem" mt="1rem">
                <Typography
                  color="#3C3C3C"
                  fontSize={"0.9rem"}
                  className={roboto.className}
                  fontWeight={500}
                >
                  Chat With Us
                </Typography>
                <Box>
                  <Typography
                    color="#3C3C3C"
                    mt="1rem"
                    lineHeight={"1rem"}
                    fontSize={"0.9rem"}
                    className={roboto.className}
                    fontWeight={500}
                  >
                    Call Us:
                  </Typography>
                  <Typography
                    color="#848282"
                    fontSize={"0.7rem"}
                    className={roboto.className}
                    fontWeight={500}
                  >
                    +91 9060614360
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    color="#3C3C3C"
                    mt="1rem"
                    lineHeight={"1rem"}
                    fontSize={"0.9rem"}
                    className={roboto.className}
                    fontWeight={500}
                  >
                    Write to Us:
                  </Typography>
                  <Typography
                    color="#848282"
                    fontSize={"0.7rem"}
                    className={roboto.className}
                    fontWeight={500}
                  >
                    enquiry@needibay.com
                  </Typography>
                </Box>
                {session?.user && (
                  <FlexBox justifyContent={"flex-start"} mt="1rem" mb="1rem">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      className={roboto.className}
                      onClick={() => signOut()}
                    >
                      <Image
                        src="/assets/images/profile/logout.png"
                        alt="logo"
                        mr="0.5rem"
                      />
                      Logout
                    </Button>
                  </FlexBox>
                )}
              </Box>
            </StyledFlexBox>
          </DashboardNavigationWrapper>
        </>
      </MediaQuery>
    </>
  );
};

const profList = [
  {
    title: "DASHBOARD",
    list: [
      { href: "/profile", title: "Profile", iconName: "home", count: 5 },
      { href: "/orders", title: "Orders", iconName: "box", count: 19 },
      {
        href: "/address",
        title: "Addresses",
        iconName: "pin",
        count: 1,
      },
      {
        href: "/wishlist",
        title: "Wishlist",
        iconName: "heart",
        count: 4,
      }
    ],
  },
];
const mobilelinkList = [
  {
    title: "DASHBOARD",
    list: [
      {
        href: "/bulk-enquiries",
        title: "Bulk Enquiries",
        iconName: "bag",
        count: 5,
      },
      { href: "/contactus", title: "Contact Us", iconName: "heart", count: 19 },
      {
        href: "/career",
        title: "Careers",
        iconName: "customer-service",
        count: 1,
      },
    ],
  },
];

const desktopLinkList = [
  {
    title: "DASHBOARD",
    list: [
      {
        href: "/bulk-enquiries",
        title: "Bulk Enquiries",
        iconName: "bag",
        count: 5,
      },
      { href: "/contactus", title: "Contact Us", iconName: "heart", count: 19 },
    ],
  },
];

export default DashboardNavigation;
