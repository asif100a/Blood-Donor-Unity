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
import AdminHome from "../Pages/Dashboard/AdminPages/AdminHome/AdminHome";
import AdminRoute from "./AdminRoute";
import AllUsers from "../Pages/Dashboard/AdminPages/AllUsers/AllUsers";
import AllBloodDonationRequests from "../Pages/Dashboard/AdminPages/AllBloodDonationRequests/AllBloodDonationRequests";
import ContentManagement from "../Pages/Dashboard/AdminPages/ContentManagement/ContentManagement";
import BlockPage from "../Pages/ErrorPage/BlockPage";
import BlockRoute from "../ProtectedPage/BlockRoute";
import AddBlogs from "../Pages/Dashboard/AdminPages/ContentManagement/components/AddBlogs";
import VolunteerHome from "../Pages/Dashboard/VolunteerPages/VolunteerHome/VolunteerHome";
import AllRequestsForBlood from "../Pages/Dashboard/VolunteerPages/AllRequestsForBlood/AllRequestsForBlood";
import ContentManageVol from "../Pages/Dashboard/VolunteerPages/VolunteerHome/ContentManageVol/ContentManageVol";
import DonationRequestDetails from "../Pages/DonationRequests/components/DonationRequestDetails/DonationRequestDetails";

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
                path: '/donation_request_details/:id',
                element: <PrivatePage><DonationRequestDetails /></PrivatePage>,
                loader: ({params}) => fetch(`${import.meta.env.VITE_URL}/pending-requests/${params.id}`)
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
        errorElement: <ErrorPage />,
        children: [
            // For admin
            {
                path: '/dashboard/admin_home',
                element: <AdminRoute><AdminHome /></AdminRoute>
            }, {
                path: '/dashboard/all_users',
                element: <AdminRoute><AllUsers /></AdminRoute>
            }, {
                path: '/dashboard/all_blood_donation_requests',
                element: <AdminRoute><AllBloodDonationRequests /></AdminRoute>
            }, {
                path: '/dashboard/content_management',
                element: <AdminRoute><ContentManagement /></AdminRoute>
            }, {
                path: '/dashboard/content_management/add_blog',
                element: <AddBlogs />
            },
            // For volunteer
            {
                path: '/dashboard/volunteer_home',
                element: <VolunteerHome />
            }, {
                path: '/dashboard/all_requests_for_blood',
                element: <AllRequestsForBlood />
            }, {
                path: '/dashboard/content_manage_vol',
                element: <ContentManageVol />
            },
            // For donator
            {
                path: '/dashboard/donor_home',
                element: <PrivatePage><DonorHome /></PrivatePage>
            }, {
                path: '/dashboard/create_donation_request',
                element: <PrivatePage><BlockRoute><CreateDonationRequest /></BlockRoute></PrivatePage>
            }, {
                path: '/dashboard/my_donation_requests',
                element: <PrivatePage><MyDonationRequests /></PrivatePage>
            },  {
                path: '/dashboard/edit_donor_request/:id',
                element: <PrivatePage><EditDonorRequest /></PrivatePage>,
                loader: ({params}) => fetch(`${import.meta.env.VITE_URL}/donation-requests-field/${params?.id}`)
            }, {
                path: '/dashboard/block_page',
                element: <PrivatePage><BlockPage /></PrivatePage>
            }
        ]
    }
]);

export default Routes;