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

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/movies-card"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Movies />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/person-list"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Persons />
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
