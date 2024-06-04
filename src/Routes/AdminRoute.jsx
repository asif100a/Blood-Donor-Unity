import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import LoadingSpiner from "../SharedComponents/LoadingSpiner/LoadingSpiner";

const AdminRoute = ({children}) => {
    const { user, isPending } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch the user based on the logged user email
    const { data, isError, error, isLoading } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const { data: savedUser } = await axiosSecure(`/users/${user?.email}`);
            return savedUser;
        }
    });

    console.log(data);
    const role = data?.role;

    if(isPending || isLoading) {
        return <LoadingSpiner />
    }

    if(user && role === 'admin') {
        return children;
    }

    if(isError) {
        console.error(error);
    }
};

AdminRoute.propTypes = {
    children: PropTypes.node
};

export default AdminRoute;