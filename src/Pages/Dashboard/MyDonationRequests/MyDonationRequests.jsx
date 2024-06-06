import useAuth from "../../../Hooks/useAuth";
import AllDonorRequests from "../../../SharedComponents/AllDonationRequests/AllDonorRequests";

const MyDonationRequests = () => {
    const {user} = useAuth();

    return (
        <div>
            <h1 className="text-4xl font-semibold text-center mb-16">My donation requests</h1>
            
            <div>
                <AllDonorRequests email={user?.email} />
            </div>
        </div>
    );
};

export default MyDonationRequests;