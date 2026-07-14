import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Persons from "../pages/Persons";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import MovieList from "../pages/Movies/List";
import MovieDetail from "../pages/Movies/Detail";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="movies-card">
            <Route index element={<MovieList />} />
            <Route path=":movieId" element={<MovieDetail />} />
            {/* <Route path="create" element={<MovieFormPage />} />
            <Route path=":movieId/edit" element={<MovieFormPage />} /> */}
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
