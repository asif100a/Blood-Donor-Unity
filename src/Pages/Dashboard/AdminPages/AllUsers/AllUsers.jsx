import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import UsersTRow from "./components/UsersTRow";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const {data: users = [], error, isError, isLoading} = useQuery({
        queryKey: ['users'],
        queryFn: async() => {
            const {data} = await axiosSecure('/users');
            return data;
        }
    });
    console.log(users)

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
                            users?.map(user => <UsersTRow key={user?._id} user={user} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;