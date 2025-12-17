import { createBrowserRouter, redirect } from "react-router-dom";
import App from "../App";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import OrderManagementLayout from "../layout/OrderManagementLayout";
import UserDashboardLayout from "../layout/UserDashboardLayout";
import AboutUs from "../pages/AboutUs";
import cart from "../pages/cart/cart";
import Checkout from "../pages/cart/Checkout";
import ProtectedRouteForCheckout from "../pages/cart/ProtectedRouteForCheckout";
import SuccessOrder from "../pages/cart/SuccessOrder";
import adminHome from "../pages/dashboard/admin/adminHome";
import cancelledOrders from "../pages/dashboard/admin/orders/cancelledOrders";
import confirmedOrders from "../pages/dashboard/admin/orders/confirmedOrders";
import deliveredOrders from "../pages/dashboard/admin/orders/deliveredOrders";
import pendingOrders from "../pages/dashboard/admin/orders/pendingOrders";
import processingOrders from "../pages/dashboard/admin/orders/processingOrders";
import shippedOrders from "../pages/dashboard/admin/orders/shippedOrders";
import ProductManagement from "../pages/dashboard/admin/ProductManagement";
import userHome from "../pages/dashboard/user/userHome";
import HomePage from "../pages/home/HomePage";
import Login from "../pages/Login";
import ProductDetails from "../pages/products/ProductDetails";
import Products from "../pages/products/Products";
import Register from "../pages/Register";
import ProtectedRouteForDashboard from "./ProtectedRouteForDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "products",
        Component: Products,
      },
      {
        path: "products/:id",
        Component: ProductDetails,
      },
      {
        path: "cart",
        Component: cart,
      },
      {
        path: "checkout",
        Component: ProtectedRouteForCheckout,
        children: [
          {
            index: true,
            Component: Checkout,
          },
          {
            path: "successOrder",
            Component: SuccessOrder,
          },
        ],
      },
      {
        path: "aboutUs",
        Component: AboutUs,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/dashboard/user",
    loader: () => ({ role: "user" }),
    Component: ProtectedRouteForDashboard,
    children: [
      {
        Component: UserDashboardLayout,
        children: [
          {
            index: true,
            Component: userHome,
          },
          {
            path: "home",
            Component: userHome,
          },
        ],
      },
    ],
  },
  {
    path: "/dashboard/admin",
    loader: () => ({ role: "admin" }),
    Component: ProtectedRouteForDashboard,
    children: [
      {
        Component: AdminDashboardLayout,
        children: [
          {
            index: true,
            Component: adminHome,
          },
          {
            path: "home",
            Component: adminHome,
          },
          {
            path: "productManagement",
            Component: ProductManagement,
          },
          {
            path: "orderManagement",
            Component: OrderManagementLayout,
            children: [
              {
                index: true,
                // Component: pendingOrders,
                loader: () => redirect("pendingOrders"), //active this route for the first time visit
              },
              {
                path: "pendingOrders",
                Component: pendingOrders,
              },
              {
                path: "confirmedOrders",
                Component: confirmedOrders,
              },
              {
                path: "processingOrders",
                Component: processingOrders,
              },
              {
                path: "shippedOrders",
                Component: shippedOrders,
              },
              {
                path: "deliveredOrders",
                Component: deliveredOrders,
              },
              {
                path: "cancelledOrders",
                Component: cancelledOrders,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
