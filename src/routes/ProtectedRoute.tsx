import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: IProps) {
  const { username: userData } = JSON.parse(
    localStorage.getItem('auth') as string
  );
  const { pathname } = useLocation();

  if (!userData) {
    console.log('here');
    return <Navigate to="/signin" state={{ path: pathname }} />;
  }

  return children;
}
