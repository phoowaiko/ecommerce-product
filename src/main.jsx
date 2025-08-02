import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./main.css";
import { RouterProvider } from "react-router";
import router from "./routes/index.jsx";
import { AuthContextProvider } from "./Contexts/AuthContext.jsx";
import { CartContextProvider } from "./Contexts/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
