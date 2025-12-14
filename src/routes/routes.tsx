import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import UserDashboardLayout from "../layout/UserDashboardLayout";
import AboutUs from "../pages/AboutUs";
import cart from "../pages/cart/cart";
import Checkout from "../pages/cart/Checkout";
import ProtectedRouteForCheckout from "../pages/cart/ProtectedRouteForCheckout";
import SuccessOrder from "../pages/cart/SuccessOrder";
import adminHome from "../pages/dashboard/admin/adminHome";
import OrderManagement from "../pages/dashboard/admin/OrderManagement";
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
            Component: OrderManagement,
          },
        ],
      },
    ],
  },
]);

export default router;
