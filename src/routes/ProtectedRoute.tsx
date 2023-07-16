import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxTypedHooks.ts';

interface IProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: IProps) {
  const { username } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();
  if (!username) {
    return <Navigate to="/signin" state={{ path: pathname }} />;
  }

  return children;
}
