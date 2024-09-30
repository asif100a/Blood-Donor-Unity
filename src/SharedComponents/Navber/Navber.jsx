import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/Blood_Donor_Unity.png'
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useLoggedUser from "../../Hooks/useLoggedUser";
import { useEffect, useRef, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { BiLogInCircle } from "react-icons/bi";
import './navber.css';

const Navber = () => {
    const { user, logoutUser } = useAuth();
    const loggedUser = useLoggedUser();
    const [isShow, setIsShow] = useState(false);
    const dropdownRef = useRef(null);

    const NavLinks = <>
        <li><NavLink to={'/'} className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-100 dark:hover:bg-black">Home</NavLink></li>
        <li><NavLink to={'/donation_requests'} className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-100 ">Donation requests</NavLink></li>
        <li><NavLink to={'/blogs'} className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-100 ">Blogs</NavLink></li>

        {
            user && <li><NavLink to={'/funds'} className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-100 ">Funds</NavLink></li>
        }
    </>;

    const handleLogout = async () => {
        await logoutUser();
        toast.success('You have logged out');
    };

    // Handle the menu
    const handleShowMenu = () => {
        setIsShow(true);
    };
    const handleHideMenu = () => {
        setIsShow(false);
    }

    // When user click on outside of the nav modal it will close
    useEffect(() => {
        if (!dropdownRef) {
            document.addEventListener('mousedown', handleHideMenu);

            return () => {
                document.removeEventListener('mousedown', handleHideMenu);
            }
        }
    }, []);


    return (
        <nav className="relative bg-white shadow-md dark:shadow-lg dark:bg-[#292929]">
            <div className="container px-3 md:px-6 py-2 mx-auto">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between -ml-3 ">
                        <Link to={'/'} className="flex justify-center items-center">
                            <img src={logo} alt="" className="block w-auto h-16" />
                        </Link>

                        <div className="flex lg:hidden">
                            <button type="button" className="text-gray-500 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                                {
                                    isShow ?
                                        <svg onClick={handleHideMenu} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 dark:text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        :
                                        <div onClick={handleShowMenu} className="w-fit h-fit">
                                            <CiMenuFries className="text-lg" />
                                        </div>
                                }
                            </button>
                        </div>
                    </div>

                    <div className={`absolute ${isShow === false && 'hidden'} inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 lg:dark:bg-transparent lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center border-y-2 border-t-orange-600 border-b-green-600 lg:border-none mt-6 rounded-xl lg:rounded-none`}>
                        <ul ref={dropdownRef} className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8 menu active-link">
                            {NavLinks}
                            {
                                loggedUser?.role === 'donor' && <li className="block lg:hidden"><NavLink to={'/dashboard/donor_home'} className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</NavLink></li>
                            }
                            {
                                loggedUser?.role === 'volunteer' && <li className="block lg:hidden"><NavLink to={'/dashboard/volunteer_home'} className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</NavLink></li>
                            }
                            {
                                loggedUser?.role === 'admin' && <li className="block lg:hidden"><NavLink to={'/dashboard/admin_home'} className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</NavLink></li>
                            }
                            {
                                user ?
                                    <li onClick={handleLogout} className="block lg:hidden"><a className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</a></li>
                                    :
                                    <li className="block lg:hidden"><NavLink to={'/login'} className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Login</NavLink></li>
                            }
                        </ul>

                        <div className="flex items-center gap-3 mt-4 lg:mt-0">


                            {
                                user ? <>
                                    <div title={user?.displayName} className="dropdown dropdown-end hidden lg:block">
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                            <div className="w-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                                                <img referrerPolicy="no-referrer" src={user?.photoURL} />
                                            </div>
                                        </div>
                                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 dark:text-gray-100">
                                            {
                                                loggedUser?.role === 'donor' && <li><Link to={'/dashboard/donor_home'}>Dashboard</Link></li>
                                            }
                                            {
                                                loggedUser?.role === 'volunteer' && <li><Link to={'/dashboard/volunteer_home'}>Dashboard</Link></li>
                                            }
                                            {
                                                loggedUser?.role === 'admin' && <li><Link to={'/dashboard/admin_home'}>Dashboard</Link></li>
                                            }
                                            <li onClick={handleLogout}><a className="">Logout</a></li>
                                        </ul>
                                    </div>
                                </> :
                                    <>
                                        <Link to={'/login'}>
                                            <button className="hidden lg:flex rounded-full px-4 py-1 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-green-600 text-orange-600">
                                                <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-green-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                                                <span className="relative text-orange-600 transition duration-300 group-hover:text-white ease flex justify-center items-center gap-2">
                                                    <span>Login</span>
                                                    <BiLogInCircle className="text-lg text-green-600 group-hover:text-orange-600" />
                                                </span>
                                            </button>
                                        </Link>
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