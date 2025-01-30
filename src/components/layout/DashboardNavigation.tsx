import { FC, Fragment } from "react";
import Box from "@component/Box";
import Card from "@component/Card";
import styled from "styled-components";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { usePathname } from "next/navigation";
import Typography, { H1 } from "@component/Typography";
import NavLink from "@component/nav-link";
import { getTheme } from "@utils/utils";
import { roboto } from "@utils/fonts";
import Image from "@component/Image";
import Divider from "@component/Divider";
import Button from "@component/buttons/Button";

// styled component
const DashboardNavigationWrapper = styled(Card)`
margin-ri
  @media only screen and (max-width: 768px) {
    height: calc(100vh - 64px);
    box-shadow: none;
    overflow-y: auto;
  }
`;

const StyledDashboardNav = styled(NavLink)<{ isCurrentPath?: boolean }>`
  display: flex;
  border-radius: 1rem;
  align-items: center;
  justify-content: center; 

  color: ${({ isCurrentPath }) =>
  isCurrentPath ? 'box' : "inherit"};
    

  :hover {
    .dashboard-nav-icon-holder {
      color: ${getTheme("colors.gray.white")};
    }
  }
`;

const StyledFlexBox = styled(FlexBox)<{ isCurrentPath?: boolean }>`
  border-radius: 1rem;
  align-items: center;
  padding: 0.75rem 1.5rem;

  transition: all 0.3s ease-in-out;

  background-color: ${({ isCurrentPath }) =>
    isCurrentPath ? getTheme("colors.primary.main") : "white"};

  .dashboard-nav-title {
    color: ${({ isCurrentPath }) =>
      isCurrentPath ? getTheme("colors.gray.white") : "inherit"};
  }

  :hover {
    background-color: ${({ isCurrentPath }) =>
      isCurrentPath
        ? getTheme("colors.primary.main")
        : getTheme("colors.primary.main")};

    .dashboard-nav-title {
      color: ${({ isCurrentPath }) =>
        isCurrentPath
          ? getTheme("colors.gray.white")
          : getTheme("colors.gray.white")};
    }
  }
`;

interface DashboardNavigationProps {
  firstName: string;
  lastName: string;
}

const DashboardNavigation: FC<DashboardNavigationProps> = ({
  firstName,
  lastName,
}) => {
  const pathname = usePathname();

  return (
    <DashboardNavigationWrapper
      borderTopLeftRadius='1rem'
      borderBottomLeftRadius='1rem'
      px='0px'
      pb='1rem'
      color='gray.900'>
      {linkList.map((item) => (
        <Fragment key={item.title}>
          <Box textAlign={"center"}>
            <Image
              mt='1rem'
              src='/assets/images/profile/profile.png'
              alt='logo'
            />
            <Typography
              paddingTop={"1rem"}
              paddingBottom={"1rem"}
              color='primary.user'
              fontSize='1.5rem'
              fontWeight={600}
              textAlign={"center"}
              className={roboto.className}>
              {firstName} {lastName}
            </Typography>
          </Box>

          {item.list.map((item) => (
            <FlexBox
              justifyContent={"center"}
              width={"100%"}>
              <StyledDashboardNav
                px='2rem'
                mb='1.25rem'
                href={item.href}
                key={item.title}
                isCurrentPath={pathname.includes(item.href)}>
                <StyledFlexBox
                  justifyContent='center'
                  width='100%'
                  isCurrentPath={pathname.includes(item.href)}
                  alignItems='center'>
                  {/* <Box className='dashboard-nav-icon-holder'>
                    <Icon
                      variant='medium'
                      mr='10px'>
                      {item.iconName}
                    </Icon>
                  </Box> */}

                  <span className='dashboard-nav-title'>{item.title}</span>
                </StyledFlexBox>
              </StyledDashboardNav>
            </FlexBox>
          ))}

          <FlexBox justifyContent={"center"}>
            <Divider width={"75%"} />
          </FlexBox>

          <FlexBox
            justifyContent={"center"}
            mt='1rem'
            mb='1rem'>
            <Button
              variant='outlined'
              color='primary'
              className={roboto.className}>
              <Image
                src='/assets/images/profile/logout.png'
                alt='logo'
                mr='0.5rem'
              />
              Logout
            </Button>
          </FlexBox>
        </Fragment>
      ))}
    </DashboardNavigationWrapper>
  );
};

const linkList = [
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
      },
    ],
  },
];

export default DashboardNavigation;