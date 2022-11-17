import React, { memo } from 'react';
import { Route, Routes } from 'react-router-dom';

import NoPage from 'pages/NoPage';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';
import BoardsPage from 'pages/BoardsPage';
import BoardPage from 'pages/BoardPage';
import ProfilePage from 'pages/ProfilePage';
import { useAppSelector } from 'hooks/redux';
import { selectToken } from 'store/authSlice';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

const AppRouter = memo(() => {
  const token = useAppSelector(selectToken);
  //console.log(token);
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route index element={<HomePage />} />
        <Route element={<ProtectedRoute isAllowed={!token} />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!token} />}>
          <Route path="/projects" element={<BoardsPage />} />
          <Route path="/projects/:id" element={<BoardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
});

export default AppRouter;
