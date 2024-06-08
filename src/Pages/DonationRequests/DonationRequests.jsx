import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import LoadingSpiner from "../../SharedComponents/LoadingSpiner/LoadingSpiner";
import TableBody from "./components/TableBody";

const DonationRequests = () => {
    const axiosPublic = useAxiosPublic();

    const {data: requests = [], isLoading} = useQuery({
        queryKey: ['pending-requests'],
        queryFn: async() => {
            const {data} = await axiosPublic('/pending-requests');
            return data;
        }
    });

    if(isLoading) {
        return <LoadingSpiner />;
    }

    return (
        <div className="px-32">
            <h1 className="text-4xl font-semibold text-center my-6">Blood donation requests</h1>

            <div className="overflow-x-auto">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Recipient name</th>
                            <th>Recipient location</th>
                            <th>Donation date</th>
                            <th>Donation time</th>
                            <th>See details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            requests.map((request, i) => <TableBody key={request?._id} i={i} request={request} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DonationRequests;