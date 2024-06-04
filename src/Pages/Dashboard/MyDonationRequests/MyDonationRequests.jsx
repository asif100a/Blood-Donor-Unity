import AllDonorRequests from "../../../SharedComponents/AllDonationRequests/AllDonorRequests";

const MyDonationRequests = () => {

    return (
        <div>
            <h1 className="text-4xl font-semibold text-center mb-16">My donation requests</h1>
            <div className="my-6 text-center">
                <button className="btn">Sort by</button>
            </div>
            <div>
                <AllDonorRequests />
            </div>
        </div>
    );
};

export default MyDonationRequests;