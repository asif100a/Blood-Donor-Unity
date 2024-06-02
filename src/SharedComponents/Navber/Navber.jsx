import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/Blood.png'
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Navber = () => {
    const { user, logoutUser } = useAuth();

    const NavLinks = <>
        <li><NavLink to={'/'} className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Home</NavLink></li>
        <li><NavLink to={'/donation_requests'} className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Donation requests</NavLink></li>
        <li><NavLink to={'/blogs'} className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Blogs</NavLink></li>

        {
            user && <li><NavLink to={'/funds'} className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Funds</NavLink></li>
        }
    </>;

    const handleLogout = async() => {
        await logoutUser();
        toast.success('You have logged out');
    };

    return (
        <nav className="relative bg-white shadow dark:bg-gray-800">
            <div className="container px-6 py-2 mx-auto">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between">
                        <Link to={'/'} className="flex justify-center items-center gap-2">
                            <img src={logo} alt="" className="w-[56px] h-[64px]" />
                            <span className="text-2xl font-semibold">Blood Donator Unity</span>
                        </Link>

                        <div className="flex lg:hidden">
                            <button type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">
                        <ul className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8 menu">
                            {NavLinks}
                        </ul>

                        <div className="flex items-center gap-3 mt-4 lg:mt-0">


                            {
                                user ? <>
                                    <div title={user?.displayName} className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                            <div className="w-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                                                <img src={user?.photoURL} />
                                            </div>
                                        </div>
                                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                            <li><Link>Dashboard</Link></li>
                                            <li onClick={handleLogout}><a>Logout</a></li>
                                        </ul>
                                    </div>
                                </> :
                                    <>
                                        <Link to={'/login'}><button className="btn">Login</button></Link>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav >
    );
};

export default Navber;