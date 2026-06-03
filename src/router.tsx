import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./app/Layout/Layout";
import HomePage from "./pages/home/HomePage";
import { Registration } from "./widgets/Auth/Registration/Registration";
import { Login } from "./widgets/Auth/Login/Login";
// import { ForgotPassword } from "./widgets/Auth/forgot-password/forgotPassword";
import { ForgotPasswordd } from "./widgets/Auth/forgotPassword/ForgotPasswordd";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "catalog", element: <div>Catalog</div> },
      { path: "lot/:id", element: <div>Lot Detail</div> },
      { path: "calculator", element: <div>Calculator</div> },
    ],
  },
  {
    path: "registration",
    element: <Registration />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "forgotpassword",
    element: <ForgotPasswordd />,
  },
]);
