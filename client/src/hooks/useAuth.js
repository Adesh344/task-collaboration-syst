import { useSelector, useDispatch } from "react-redux";
import { logout } from "../state/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, loading, error, users } = useSelector((s) => s.auth);
  const handleLogout = () => dispatch(logout());
  return { user, token, loading, error, users, handleLogout, isAuthenticated: !!token };
};

export default useAuth;