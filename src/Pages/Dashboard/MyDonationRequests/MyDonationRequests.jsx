import useAuth from "../../../Hooks/useAuth";
import AllDonorRequests from "../../../SharedComponents/AllDonationRequests/AllDonorRequests";

const MyDonationRequests = () => {
    const {user} = useAuth();

    return (
        <div className="w-auto mt-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl dark:text-gray-100 font-semibold text-center mb-12 w-[200px] sm:w-auto mx-auto capitalize">My donation requests</h1>
            
            <div>
                <AllDonorRequests email={user?.email} />
            </div>
        </div>
    );
};

export default MyDonationRequests;