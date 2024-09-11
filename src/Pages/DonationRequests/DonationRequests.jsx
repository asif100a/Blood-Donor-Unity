import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import LoadingSpiner from "../../SharedComponents/LoadingSpiner/LoadingSpiner";
import TableBody from "./components/TableBody";

const DonationRequests = () => {
    const axiosPublic = useAxiosPublic();

    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['pending-requests'],
        queryFn: async () => {
            const { data } = await axiosPublic('/pending-requests');
            return data;
        }
    });

    if (isLoading) {
        return <LoadingSpiner />;
    }

    return (
        <section className="dark:bg-[#292929] mx-auto py-5 my-1">
            <div className="px-6 lg:px-32">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center capitalize dark:text-gray-100 mb-6">Blood donation requests</h1>

                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        <thead className="dark:text-gray-300">
                            <tr>
                                <th></th>
                                <th>Recipient name</th>
                                <th>Recipient location</th>
                                <th>Donation date</th>
                                <th>Donation time</th>
                                <th>See detail information</th>
                            </tr>
                        </thead>
                        <tbody className="dark:text-gray-100">
                            {
                                requests.map((request, i) => <TableBody key={request?._id} i={i} request={request} />)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default DonationRequests;