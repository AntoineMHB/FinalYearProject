import { Navigate } from "react-router-dom";

export function PrivateRoute({ children, isLoggedIn }: { children: React.ReactNode, isLoggedIn: boolean }) {
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
}
