import { Link, Routes, useNavigate } from 'react-router-dom';
import logo from '../../assets/Blood.png'
import { FaHouseDamage } from 'react-icons/fa';
import DonorLinks from './DonorLinks';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import VolunteerLinks from './VolunteerLinks';
import AdminLinks from './AdminLinks';
import toast from 'react-hot-toast';
import { BiLogOut } from 'react-icons/bi';

const Sidebar = () => {
    const { user, logoutUser } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    console.log(user)

    // Fetch the user based on the logged user email
    const { data, isError, error, isLoading, refetch } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const { data: savedUser } = await axiosSecure(`/users/${user?.email}`);
            return savedUser;
        }
    });

    if(user?.email) {
        refetch();
    }
    if(isError) {
        console.log(error)
    }

    console.log(data?.status);
    const role = data?.role;

    // Log out the user
    const handleLogout = async () => {
        await logoutUser();
        toast.success('You have logged out');
        navigate('/login');
    };

    return (
        <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
            <div className='flex gap-3 items-center'>
                <img className="w-auto h-14" src={logo} alt="Blood Donator Unity" />
                <p className='text-lg font-bold'>Blood Donator Unity</p>
            </div>

            <div className="mt-6">
                <a href="#" className="flex items-center px-4 -mx-2">
                    <img title={user?.displayName} className="object-cover mx-2 rounded-full h-9 w-9" referrerPolicy='no-referrer' src={user?.photoURL} alt="user photo" />
                    <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">My profile</span>
                </a>
            </div>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav>
                    <ol className='menu'>
                        {role === 'donor' && <DonorLinks status={data?.status} />}
                        {role === 'volunteer' && <VolunteerLinks />}
                        {role === 'admin' && <AdminLinks />}
                    </ol>
                </nav>

                <nav>
                    <hr className="my-6 border-gray-200 dark:border-gray-600" />
                    <Link to={'/'} className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                        <FaHouseDamage className='w-5 h-5' />

                        <span className="mx-4 font-medium">Home</span>
                    </Link>

                    <a onClick={handleLogout} className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 hover:cursor-pointer">
                        <BiLogOut className='w-6 h-6' />

                        <span className="mx-4 font-medium">Log out</span>
                    </a>
                </nav>


            </div>
        </aside >
    );
};

export default Sidebar;