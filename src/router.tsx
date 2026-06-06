import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./app/Layout/Layout";
import HomePage from "./pages/home/HomePage";
import { Registration } from "./widgets/Auth/Registration/Registration";
import { Login } from "./widgets/Auth/Login/Login";
import { ForgotPasswordd } from "./widgets/Auth/forgotPassword/ForgotPasswordd";
import { PopularMakes } from "./widgets/PopularMakes/PopularMakes";
import PrePurchaseProcess1 from "./widgets/howItWorks/PrePurchaseProcess1/PrePurchaseProcess1";
import PurchaseProcess from "./widgets/howItWorks/PurchaseProcess/PurchaseProcess";
import { DeliveryTimes } from "./widgets/DeliveryTimes/DeliveryTimes";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "catalog", element: <div>Catalog</div> },
      { path: "lot/:id", element: <div>Lot Detail</div> },
      { path: "calculator", element: <div>Calculator</div> },
      { path: "popularmakes", element: <PopularMakes /> },
      { path: "prePurchaseProcess1", element: <PrePurchaseProcess1 /> },
      { path: "how-it-works", element: <PurchaseProcess /> },
      { path: "delivery", element: <DeliveryTimes /> },
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
