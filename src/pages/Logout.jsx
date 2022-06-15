import Login from "../pages/Login";
import { logout } from "../redux/apis";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Logout(){

  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

  if (!user) {
    return <Navigate to="/login"/>;
  } else {
    logout(dispatch);
    return <Navigate to="/"/>;
  }
}
