import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useLoggedUser = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const { data, isError, error, refetch } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const { data: savedUser } = await axiosSecure(`/users/${user?.email}`);
            return savedUser;
        }
    });

    if (user?.email) {
        refetch();
    }
    if (isError) {
        console.log(error)
    }

    return data;
};

export default useLoggedUser;