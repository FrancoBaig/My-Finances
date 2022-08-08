import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ children }) {
    const auth = useSelector((state) => state.user.token);
    return auth ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
