import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import ExpensesPage from "./components/pages/expenses/expenses";
//import ReportsPage from "./components/pages/reports/reports";
import Navbar from "./components/navbar/navbar";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";


const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <ExpensesPage />,
      },
      //{
      //  path: "/Reports",
      //  element: <ReportsPage />,
      //}
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
