import AllDonorRequests from "../../../SharedComponents/AllDonationRequests/AllDonorRequests";

const MyDonationRequests = () => {

    return (
        <div>
            <h1 className="text-4xl font-semibold text-center mb-16">My donation requests</h1>
            <div>
                <AllDonorRequests />
            </div>
        </div>
    );
};

export default MyDonationRequests;