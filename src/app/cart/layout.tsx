import { LayoutProps } from "interfaces";
import CheckoutNavLayout from "@component/layout/CheckoutNavLayout";
import CartLayout from "@component/layout/CartLayout";

export default function MarketLayout({ children }: LayoutProps) {
  return <CartLayout>{children}</CartLayout>;
}
