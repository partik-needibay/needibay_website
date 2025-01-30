import { LayoutProps } from "interfaces";
import AppLayout from "@component/layout/LoginLayout";

export default function MarketLayout({ children }: LayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
