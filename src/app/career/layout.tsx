import { LayoutProps } from "interfaces";
import AppLayout from "@component/layout/AppLayout";
import Navbar from "../../components/navbar/Navbar";
import Container from "@component/Container";
export default function MarketLayout({ children }: LayoutProps) {
  return <AppLayout navbar={<Navbar />}>{children}</AppLayout>;
}
