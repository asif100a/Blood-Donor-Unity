import { FcDonate, FcHome, FcInspection } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const DonorLinks = ({status}) => {
    console.log(status)
    return (
        <>
            <li>
                <NavLink to={'/dashboard/donor_home'} end className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                    <FcHome className='w-5 h-5' />

                    <span className="mx-4 font-medium">Donor Home</span>
                </NavLink>
            </li>

            <li>
                <NavLink to={'my_donation_requests'} className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                    <FcDonate className='w-6 h-6' />

                    <span className="mx-4 font-medium">My Donation Requests</span>
                </NavLink>
            </li>

            <li>
                <NavLink to={status === 'blocked' ? 'block_page' : 'create_donation_request'} className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                    <FcInspection className='w-6 h-6' />

                    <span className="mx-4 font-medium">Create Donation Request</span>
                </NavLink>
            </li>
        </>
    );
};

DonorLinks.propTypes = {
    status: PropTypes.any
};

export default DonorLinks;