import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import LoadingSpiner from "../SharedComponents/LoadingSpiner/LoadingSpiner";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const { user, isPending } = useAuth();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();

    // Fetch the user based on the logged user email
    const { data, isError, error, isLoading } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            if (user?.email) {
                const { data: savedUser } = await axiosSecure(`/users/${user?.email}`);
                return savedUser;
            }
        }
    });

    console.log(data);
    const role = data?.role;

    if (isPending || isLoading) {
        return <LoadingSpiner />
    }

    if (isError) {
        console.error(error);
    }

    if (user && role === 'admin') {
        return children;
    } else {
        <Navigate state={{ from: location?.pathname }} to={'/login'} replace={true} />
    }

};

AdminRoute.propTypes = {
    children: PropTypes.node
};

export default AdminRoute;