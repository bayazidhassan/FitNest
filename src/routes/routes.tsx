import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AboutUs from "../pages/AboutUs";
import cart from "../pages/cart/cart";
import Checkout from "../pages/cart/Checkout";
import ConfirmOrder from "../pages/cart/confirmOrder";
import ProtectedRouteForCheckout from "../pages/cart/ProtectedRouteForCheckout";
import HomePage from "../pages/home/HomePage";
import Login from "../pages/Login";
import ProductDetails from "../pages/products/ProductDetails";
import ProductManagement from "../pages/products/ProductManagement";
import Products from "../pages/products/Products";
import ProtectedRouteForProductManagement from "../pages/products/ProtectedRouteForProductManagement";
import Register from "../pages/Register";

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
        path: "productManagement",
        Component: ProtectedRouteForProductManagement,
        children: [
          {
            index: true,
            Component: ProductManagement,
          },
        ],
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
            path: "confirmOrder",
            Component: ConfirmOrder,
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
]);

export default router;
