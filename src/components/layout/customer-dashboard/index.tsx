'use client'
import { FC, ReactNode } from "react";
import AppLayout from "../AppLayout";
import Hidden from "@component/hidden";
import Grid from "@component/grid/Grid";
import api from "@utils/__api__/users";

import Container from "@component/Container";
import Navbar from "@component/navbar/Navbar";
import DashboardNavigation from "../DashboardNavigation";
import DashboardProfileNavigation from '@component/layout/DashboardProfileNavigation';

// ======================================================
type Props = { children: ReactNode };
// ======================================================

const CustomerDashboardLayout: FC<Props> = ({ children }) => {

  return (
    <AppLayout navbar={<Navbar />}>
      <Container my="2rem">
        <Grid container spacing={6}>
          <Hidden as={Grid} item lg={3} xs={12} down={1024}>
            <DashboardProfileNavigation />
          </Hidden>

          <Grid item lg={9} xs={12}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  );
};

export default CustomerDashboardLayout;
