import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import WelcomeSection from "../../../SharedComponents/WelcomeSection/WelcomeSection";
import RequestTRow from "./components/RequestTRow";
import { Link } from "react-router-dom";
import LoadingSpiner from "../../../SharedComponents/LoadingSpiner/LoadingSpiner";

const DonorHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data: recentRequests = [], isError, error, isPending } = useQuery({
        queryKey: ['recentRequests'],
        queryFn: async () => {
            const { data } = await axiosSecure('/recent-requests');
            return data;
        }
    });

    // Filter the recent donation requests
    // const filterdRecentData = donationRequests.

    if (isPending) {
        return <LoadingSpiner smallLoader={true} />
    }

    return (
        <div>
          <WelcomeSection />  

          <div className="mt-3 mb-6">
            <h1 className="text-4xl font-semibold text-center">Recent donation requests</h1>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th></th>
                        <th>Recipient name</th>
                        <th>Recipient location</th>
                        <th>Donation date</th>
                        <th>Donation time</th>
                        <th>Donation status</th>
                        <th>Donor information</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        recentRequests?.map((donationRequest, index) => (
                            <RequestTRow
                                key={donationRequest?._id}
                                data={donationRequest}
                                index={index}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>

        <div className="mt-10 text-center">
            <Link to={'/dashboard/my_donation_requests'}><button className="btn">View my all request</button></Link>
        </div>
        </div>
    );
};

export default DonorHome;