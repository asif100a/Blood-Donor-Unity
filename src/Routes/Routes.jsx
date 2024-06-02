import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Root from "../Layout/Root";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import DonationRequests from "../Pages/DonationRequests/DonationRequests";
import Blogs from "../Pages/Blogs/Blogs";
import Funds from "../Pages/Funds/Funds";
import PrivatePage from "../ProtectedPage/PrivatePage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import Dashboard from "../Layout/Dashboard";

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
            }, {
                path: '/funds',
                element: <PrivatePage><Funds /></PrivatePage>
            }, {
                path: '/search_page',
                element: <SearchPage />
            }
        ]
    }, {
        path: '/dashboard',
        element: <Dashboard />
    }
]);

export default Routes;