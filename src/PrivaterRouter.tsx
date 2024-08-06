import React from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const PrivaterRouter = ({ children }: Props) => {
  const userString = sessionStorage.getItem("user");
  if (!userString) {
    return <Navigate to="/notfound" />;
  }

  const { user } = JSON.parse(userString);
  if (!user || user.id !== 1) {
    return <Navigate to="/notfound" />;
  }

  return children ? children : <Outlet />;
};

export default PrivaterRouter;