import AllDonorRequests from "../../../../SharedComponents/AllDonationRequests/AllDonorRequests";

const AllBloodDonationRequests = () => {
    return (
        <div>
           <h1 className="my-6 text-2xl md:text-3xl lg:text-4xl font-semibold text-center w-[200px] sm:w-auto mx-auto">All blood donation requests</h1> 

           <AllDonorRequests admin={true} />
        </div>
    );
};

export default AllBloodDonationRequests;