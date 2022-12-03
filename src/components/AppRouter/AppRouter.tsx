import React, { memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';
import Layout from 'components/Layout/Layout';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

import NoPage from 'pages/NoPage/NoPage';
import HomePage from 'pages/HomePage/HomePage';
import SignupPage from 'pages/SignupPage/SignupPage';
import BoardsPage from 'pages/BoardsPage/BoardsPage';
import AboutPage from 'pages/AboutPage/AboutPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import ProfilePage from 'pages/ProfilePage/ProfilePage';
import BoardPage from 'pages/BoardPage/BoardPage';

const AppRouter = memo(() => {
  const token = useAppSelector((state) => state.auth.token);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route element={<ProtectedRoute isAllowed={!token} redirectPath="/projects" />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
          <Route element={<ProtectedRoute isAllowed={!!token} />}>
            <Route path="/projects" element={<BoardsPage />} />
            <Route path="/projects/:id" element={<BoardPage />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      {!!token && <ProfilePage />}
    </>
  );
});

export default AppRouter;
