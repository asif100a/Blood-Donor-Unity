import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import UsersTRow from "./components/UsersTRow";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import LoadingSpiner from "../../../../SharedComponents/LoadingSpiner/LoadingSpiner";
import useAuth from "../../../../Hooks/useAuth";
import { FaAngleDown } from "react-icons/fa";
// import useUpdateSingleField from "../../../../Hooks/useUpdateSingleField";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDisable, setIsDisable] = useState('');
    const [status, setStatus] = useState('');
    const [sortedValue, setSortedValue] = useState('');

    useEffect(() => {
        fetchedData();

        // Disable changing for logged user to change him
        setIsDisable(`${user?.email}`);
    }, [user?.email, sortedValue]);

    const fetchedData = async() => {
        try{
            const {data} = await axiosSecure(`/users?status=${sortedValue}`);
            console.log(data);
            setUsers(data);
            setIsLoading(false);

        } catch(err) {
            console.error(err);
        }
    };

    // Set sort functiionality
    const handleDropdown = (value) => {
        console.log(value);
        setSortedValue(value);
    };

    // Change the user status
    const handleSelectedActivity = async (value, email) => {
        console.table({ value, email });
        if (user?.email === email) {
            return toast.error("You can't change your status")
        }

        if (value === 'block') {
            setStatus('active');
        }
        else if (value === 'unblock') {
            setStatus('blocked');
        }
        console.log('status:', status, 'value:', value)

        if (status) {
            try {
                const { data } = await axiosSecure.patch(`/users-update-status/${email}`, { status: status });
                console.log(data);
                if (data?.modifiedCount > 0) {
                    toast.success("User's status updated successfully");
                    fetchedData();
                }

            } catch (error) {
                console.error(error);
            }
        }
    };

    // Change the user role
    const handleSelectedRole = async(value, email) => {
        console.table({ value, email });
        try{
            const {data} = await axiosSecure.patch(`/users-update-role/${email}`, {role: value});
            console.log(data);
            if(data?.modifiedCount > 0) {
                toast.success("User's role updated successfully");
                fetchedData();
            }
        } catch(error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return <LoadingSpiner />
    }

    return (
        <div className="mt-6 w-auto">
            <h1 className="text-2xl md:text-3xl lg:text-4xl dark:text-gray-100 font-semibold text-center capitalize mb-6">All users</h1>
            <div className="mb-12 text-center">
                <div className="dropdown ">
                    <button className="relative inline-flex items-center justify-center p-4 px-12 py-3 overflow-hidden font-medium text-red-600 transition duration-300 ease-out border-2 border-green-500 rounded-full shadow-md group">
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-green-500 group-hover:translate-x-0 ease">
                            <FaAngleDown className="w-6 h-6" />
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-red-600 transition-all duration-300 transform group-hover:translate-x-full ease">Sort by</span>
                        <span className="relative invisible">Sort by</span>
                    </button>

                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 -right-6 dark:text-gray-100">
                        <li onClick={() => handleDropdown('active')}><a>active</a></li>
                        <li onClick={() => handleDropdown('blocked')}><a>blocked</a></li>
                    </ul>
                </div>
            </div>

            <div className="overflow-x-auto w-screen lg:w-auto mx-auto borderauto">
                <table className="table table-sm">
                    {/* head */}
                    <thead>
                        <tr className="dark:text-gray-300">
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Manage activity</th>
                            <th>Change user role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map(user => <UsersTRow
                                key={user?._id}
                                user={user}
                                handleSelectedActivity={handleSelectedActivity}
                                handleSelectedRole={handleSelectedRole}
                                isDisable={isDisable}
                            />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;