import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: IProps) {
  const user = JSON.parse(localStorage.getItem('auth') as string);
  const { pathname } = useLocation();
  if (!user) {
    return <Navigate to="/signin" state={{ path: pathname }} />;
  }

  return children;
}
