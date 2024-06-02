import PropTypes from 'prop-types';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpiner from '../SharedComponents/LoadingSpiner/LoadingSpiner';

const PrivatePage = ({ children }) => {
    const {user, isPending} = useAuth();
    const location = useLocation();

    if(isPending) {
        return <LoadingSpiner />
    }

    if(user) {
        return children;
    }

    return <Navigate state={{from: location?.pathname}} to={'/login'} replace={true} />;
};

PrivatePage.propTypes = {
    children: PropTypes.node
};

export default PrivatePage;