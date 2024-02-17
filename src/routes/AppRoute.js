import Home from "../Pages/Home";
import Login from "../Pages/Login";
import TableUsers from "../components/TableUsers";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import NotFoundPage from "../Pages/NotFoundPage";

const AppRoute = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={
            <PrivateRoute user={user}>
              <TableUsers />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default AppRoute;
