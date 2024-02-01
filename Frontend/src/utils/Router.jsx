import { createBrowserRouter } from "react-router-dom";
import Signup from "../components/Signup";
import WorkFlowPage from "../components/WorkFlowPage";
import Login from "../components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
  },
  { path: "/login", element: <Login /> },
  {
    path: "/workflow",
    element: <WorkFlowPage />,
  },
]);

export default router;
