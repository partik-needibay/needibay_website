"use client";
import { FC, ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AppLayout from "./AppLayout";
import Navbar from "../navbar/Navbar";
import useScrollStatic from "@hook/useScrollStatic";

// ======================================================
type Props = { children: ReactNode };
// ======================================================

const CheckoutNavLayout: FC<Props> = ({ children }) => {
  const [selectedStep, setSelectedStep] = useState(0);

  const isScrolled = useScrollStatic();

  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    switch (pathname) {
      case "/cart":
        setSelectedStep(1);
        break;
      case "/checkout":
        setSelectedStep(2);
        break;
      case "/payment":
        setSelectedStep(3);
        break;
      default:
        break;
    }
  }, [pathname]);

  return <AppLayout navbar={<Navbar />}>{children}</AppLayout>;
};

const stepperList = [
  { title: "Cart", disabled: false },
  { title: "Details", disabled: false },
  { title: "Payment", disabled: false },
  { title: "Review", disabled: true },
];

export default CheckoutNavLayout;
