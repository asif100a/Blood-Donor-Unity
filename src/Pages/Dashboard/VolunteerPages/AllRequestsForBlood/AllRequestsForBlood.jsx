import AllDonorRequests from "../../../../SharedComponents/AllDonationRequests/AllDonorRequests";

const AllRequestsForBlood = () => {
    return (
        <div className="w-[375px] md:w-full">
            <h1 className="text-4xl font-semibold text-center my-6">All blood donation requests</h1>

            <AllDonorRequests volunteer={true} />
        </div>
    );
};

export default AllRequestsForBlood;