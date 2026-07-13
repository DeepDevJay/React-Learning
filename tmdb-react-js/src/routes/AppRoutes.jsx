import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Movies from "../pages/Movies";
import Persons from "../pages/Persons";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="movies-card">
            <Route index element={<Movies />} />
            {/* Detail, Create, Edit routes will go here */}
          </Route>

          <Route path="person-list">
            <Route index element={<Persons />} />
            {/* Create, Edit routes will go here */}
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
