import { createBrowserRouter } from "react-router-dom";
import Signup from "../components/Signup";
import WorkFlowPage from "../components/WorkFlowPage";
import Login from "../components/Login";
import Home from "../pages/Home";
import UpdatePassword from "../components/UpdatePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  { path: "/login", element: <Login /> },
  {
    path: "/workflow",
    element: <WorkFlowPage />,
  },
  {
    path: "/update-password",
    element: <UpdatePassword />,
  },
]);

export default router;
