import { createBrowserRouter, Navigate } from "react-router";
import Profile from "../pages/Profile.jsx";
import App from "../pages/App.jsx";
import Layout from "../Layout.jsx";
import Notfound from "../components/Notfound.jsx";
import ProductDetail from "../pages/ProductDetail";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Checkout from "../pages/Checkout.jsx";
import orders from "../pages/orders.jsx";
import AdminLayout from "../AdminLayout.jsx";
import Adminorders from "../pages/admin/Adminorders.jsx";
import Adminproducts from "../pages/admin/Adminproducts.jsx";
import Adminproductsform from "../pages/admin/Adminproductsform.jsx";
import AdminCategories from "../pages/admin/AdminCategories.jsx";
import AdminCategoriesform from "../pages/admin/AdminCategoriesform.jsx";
import AdminOrderDetail from "../pages/admin/AdminOrderDetail.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        Component: App,
      },
      {
        path: "/products/:id",
        Component: ProductDetail,
      },
      {
        path: "/profile",
        Component: Profile,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/checkout",
        Component: Checkout,
      },
      {
        path: "/orders",
        Component: orders,
      },
      {
        path: "*",
        Component: Notfound,
      },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        path: "orders",
        Component: () => {
          let isLoggedIn = localStorage.getItem("token");
          return isLoggedIn ? <Adminorders /> : <Navigate to={"/login"} />;
        },
      },
      {
        path: "products",
        Component: () => {
          let isLoggedIn = localStorage.getItem("token");
          return isLoggedIn ? <Adminproducts /> : <Navigate to={"/login"} />;
        },
      },
      {
        path: "products/create",
        Component: () => {
          let isLoggedIn = localStorage.getItem("token");
          return isLoggedIn ? (
            <Adminproductsform />
          ) : (
            <Navigate to={"/login"} />
          );
        },
      },
      {
        path: "products/:id/edit",
        Component: () => {
          let isLoggedIn = localStorage.getItem("token");
          return isLoggedIn ? (
            <Adminproductsform />
          ) : (
            <Navigate to={"/login"} />
          );
        },
      },
      {
        path: "categories",
        Component: () => {
          let isLoggedIn = localStorage.getItem("token");
          return isLoggedIn ? <AdminCategories /> : <Navigate to={"/login"} />;
        },
      },
      {
        path: "categories/create",
        Component: () => {
          let isLoggedIn = localStorage.getItem("token");
          return isLoggedIn ? (
            <AdminCategoriesform />
          ) : (
            <Navigate to={"/login"} />
          );
        },
      },
      {
        path: "admin/categories/:id/edit",
        Component: () => {
          let isLoggedIn = localStorage.getItem("token");
          return isLoggedIn ? (
            <AdminCategoriesform />
          ) : (
            <Navigate to={"/login"} />
          );
        },
      },
      {
        path: "orders/:id",
        Component: () => {
          let isLoggedIn = localStorage.getItem("token");
          return isLoggedIn ? <AdminOrderDetail /> : <Navigate to={"/login"} />;
        },
      },
    ],
  },
]);
export default router;
