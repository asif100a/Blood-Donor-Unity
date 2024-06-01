import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Root from "../Layout/Root";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import DonationRequests from "../Pages/DonationRequests/DonationRequests";
import Blogs from "../Pages/Blogs/Blogs";

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            }, {
                path: '/login',
                element: <Login />
            }, {
                path: '/register',
                element: <Register />
            }, {
                path: '/donation_requests',
                element: <DonationRequests />
            }, {
                path: '/blogs',
                element: <Blogs />
            }
        ]
    }
]);

export default Routes;