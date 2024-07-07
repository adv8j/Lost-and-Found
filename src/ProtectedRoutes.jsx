import { Outlet, Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
export default function ProtectedRoutes() {
  const user = JSON.parse(localStorage.getItem("user"));

  return user ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/" />
    </>
  );
}
