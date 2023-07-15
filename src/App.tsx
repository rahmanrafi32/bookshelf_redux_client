import Navbar from './components/Navbar.tsx';
import { useAppDispatch } from './hooks/reduxTypedHooks.ts';
import { useEffect } from 'react';
import { setUser } from './redux/features/user/userSlice.ts';
function App() {
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem('auth') as string);

  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch]);
  return <Navbar />;
}

export default App;
