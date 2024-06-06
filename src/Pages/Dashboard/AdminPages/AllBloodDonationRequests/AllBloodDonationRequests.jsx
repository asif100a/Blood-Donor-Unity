import AllDonorRequests from "../../../../SharedComponents/AllDonationRequests/AllDonorRequests";

const AllBloodDonationRequests = () => {
    return (
        <div>
           <h1 className="my-6 text-4xl font-semibold text-center">All blood donation requests</h1> 

        <div className="my-6 text-center">
            <button className="btn">Sort by</button>
        </div>
           <AllDonorRequests />
        </div>
    );
};

export default AllBloodDonationRequests;