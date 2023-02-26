import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../features/auth/authSlice";

function PrivateRoutes({ children, ...rest }) {
  console.log("home route is working");
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  if (token && user?.is_superuser) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  } else if (token && user?.is_doctor) {
    return <Navigate to="/doctor" state={{ from: location }} replace />;
  } else if (token && user?.is_receptor) {
    return <Navigate to="/receptor" state={{ from: location }} replace />;
  } else if (token && user?.is_patient) {
    return <Navigate to="/patient" state={{ from: location }} replace />;
  } else {
    return <Outlet />;
  }
}

export default PrivateRoutes;
