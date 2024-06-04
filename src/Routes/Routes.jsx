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
import CreateDonationRequest from "../Pages/Dashboard/CreateDonationRequest/CreateDonationRequest";
import MyDonationRequests from "../Pages/Dashboard/MyDonationRequests/MyDonationRequests";
import DonorHome from "../Pages/Dashboard/DonorHome/DonorHome";
import EditDonorRequest from "../SharedComponents/AllDonationRequests/EditPage/EditDonorRequest";

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
        element: <Dashboard />,
        children: [
            // For donator
            {
                path: '/dashboard/create_donation_request',
                element: <CreateDonationRequest />
            }, {
                path: '/dashboard/my_donation_requests',
                element: <MyDonationRequests />
            }, {
                path: '/dashboard/donor_home',
                element: <DonorHome />
            }, {
                path: '/dashboard/edit_donor_request/:id',
                element: <EditDonorRequest />,
                loader: ({params}) => fetch(`${import.meta.env.VITE_URL}/donation-requests-field/${params?.id}`)
            }
        ]
    }
]);

export default Routes;