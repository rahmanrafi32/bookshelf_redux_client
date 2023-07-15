import App from '../App.tsx';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home.tsx';
import Signup from '../pages/Signup.tsx';
import Signin from '../pages/Signin.tsx';
import BookDetails from '../pages/BookDetails.tsx';
import EditBook from '../pages/EditBook.tsx';
import AddNewBook from '../pages/AddNewBook.tsx';

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
        path: '/edit-book',
        element: <EditBook />,
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
