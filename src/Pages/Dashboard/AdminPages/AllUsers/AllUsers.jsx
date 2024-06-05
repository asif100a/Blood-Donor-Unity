import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import UsersTRow from "./components/UsersTRow";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import LoadingSpiner from "../../../../SharedComponents/LoadingSpiner/LoadingSpiner";
import useAuth from "../../../../Hooks/useAuth";
// import useUpdateSingleField from "../../../../Hooks/useUpdateSingleField";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [isDisable, setIsDisable] = useState('');
    const [status, setStatus] = useState('');

    const { data: users = [], error, isError, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure('/users');
            return data;
        }
    });
    console.log(users);

    useEffect(() => {
        // Disable changing for logged user to change him
        setIsDisable(`${user?.email}`);
    }, [user?.email]);

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
                    refetch();
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
                refetch();
            }
        } catch(error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return <LoadingSpiner />
    }

    return (
        <div>
            <h1>All users</h1>
            <div className="my-6 text-center">
                <button className="btn">Sort by</button>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-sm">
                    {/* head */}
                    <thead>
                        <tr>
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