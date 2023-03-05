import React, { memo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface IProtectedRouteProps {
  isAllowed: boolean;
  redirectPath?: string;
  children?: React.ReactElement;
}

const ProtectedRoute = memo<IProtectedRouteProps>(({ isAllowed, redirectPath = '/', children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
});

export default ProtectedRoute;
