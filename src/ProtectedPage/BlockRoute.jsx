import PropTypes from 'prop-types';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoadingSpiner from '../SharedComponents/LoadingSpiner/LoadingSpiner';

const BlockRoute = ({ children }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    console.log(user)

    // Fetch the user based on the logged user email
    const { data, isError, error, isLoading, refetch } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const { data: savedUser } = await axiosSecure(`/users/${user?.email}`);
            return savedUser;
        }
    });

    if (isLoading) {
        return <LoadingSpiner />
    }
    if (user?.email) {
        refetch();
    }
    if (isError) {
        console.log(error)
    }

    if (data?.status === 'blocked') {
        <Navigate to={'block_page'} replace={true} />

    } else {
        return children;
    }
};

BlockRoute.propTypes = {
    children: PropTypes.node
};

export default BlockRoute;