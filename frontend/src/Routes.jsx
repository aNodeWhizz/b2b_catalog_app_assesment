import { Navigate, useRoutes } from "react-router-dom";
import PageNotFound from "./pages/NotFound";
import ProductListing from "./pages/ProductListing";
import ProtectedRoute from "./protectedRoute";
import LoginPage from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";

const allRoutes = [
  {
    path: "/product",
    exact: true,
    element: (
      <ProtectedRoute>
        <ProductListing />
      </ProtectedRoute>
    ),
  },
  {
    path: "/product/:productId",
    exact: true,
    element: (
      <ProtectedRoute>
        <ProductDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Navigate to="/product" />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

export default function AppRoutes() {
  const routes = useRoutes(allRoutes);
  return routes;
}
