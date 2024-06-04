import { FcFinePrint, FcHome } from 'react-icons/fc';
import { NavLink } from 'react-router-dom';

const VolunteerLinks = () => {
    return (
        <>
            <li>
                <NavLink to={'volunteer_home'} end className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-200">
                    <FcHome className='w-5 h-5' />

                    <span className="mx-4 font-medium">Volunteer Home</span>
                </NavLink>
            </li>

            <li>
                <NavLink className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                    <span>🩸</span>

                    <span className="mx-2 font-medium">All Blood Donation Requests</span>
                </NavLink>
            </li>

            <li>
                <NavLink className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                    <FcFinePrint className='w-6 h-6' />

                    <span className="mx-2 font-medium">Content Management</span>
                </NavLink>
            </li>
        </>
    );
};

export default VolunteerLinks;