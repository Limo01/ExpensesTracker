import React from "react";
import { TbMoneybag } from "react-icons/tb";
import { TbReportMoney } from "react-icons/tb";

export const NavbarData = [
  {
    title: "Expenses",
    path: "/",
    icon: <TbMoneybag />,
    cName: "nav-text",
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <TbReportMoney />,
    cName: "nav-text",
  }
];
