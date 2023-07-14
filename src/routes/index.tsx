import App from "../App.tsx";
import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home.tsx";
import Signup from "../pages/Signup.tsx";
import Signin from "../pages/Signin.tsx";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
        ],
    },
    {
        path: '/signup',
        element: <Signup/>
    },
    {
        path: '/signin',
        element: <Signin/>
    },
]);

export default routes;
