import { useAuth } from '@/contexts/AuthContext';
import type { RoleName } from '@/types/user';
import { useEffect, useState, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../Loader/Loader';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: RoleName[];
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { isLoggedIn, isLoading, user } = useAuth();
  const [showLoader, setShowLoader] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsFadingOut(true);
      const timeout = setTimeout(() => setShowLoader(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  if (showLoader) {
    return <Loader isFadingOut={isFadingOut} />;
  }

  if (!isLoggedIn || !user) {
    return <Navigate to='/' replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role.name)) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
}
