import { useAuth } from '@/contexts/AuthContext';
import type { RoleName } from '@/types/user';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: RoleName[];
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn || !user) {
    return <Navigate to='/' replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role_id.name)) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
}
