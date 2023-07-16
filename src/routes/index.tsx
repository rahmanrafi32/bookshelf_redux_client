import App from '../App.tsx';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home.tsx';
import Signup from '../pages/Signup.tsx';
import Signin from '../pages/Signin.tsx';
import BookDetails from '../pages/BookDetails.tsx';
import EditBook from '../pages/EditBook.tsx';
import AddNewBook from '../pages/AddNewBook.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';
import Wishlist from '../pages/Wishlist.tsx';
import ReadingList from '../pages/ReadingList.tsx';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/book-details/:id',
        element: <BookDetails />,
      },
      {
        path: '/add-new-book',
        element: (
          <ProtectedRoute>
            <AddNewBook />
          </ProtectedRoute>
        ),
      },
      {
        path: '/edit-book',
        element: (
          <ProtectedRoute>
            <EditBook />
          </ProtectedRoute>
        ),
      },
      {
        path: '/wishlist',
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: '/readinglist',
        element: (
          <ProtectedRoute>
            <ReadingList />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
]);

export default routes;
