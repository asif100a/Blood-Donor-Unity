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
        <section className="dark:bg-[#292929] min-h-[calc(100vh-389px)] py-3 md:py-6 mx-auto">
            <div className="px-6 lg:px-32">
                <h1 className="text-2xl font-semibold text-center capitalize dark:text-gray-100 mb-6 block md:hidden">Blood donation requests</h1>

                <div className="overflow-x-auto">
                    <table className="table table-sm md:table-md">
                        <caption>
                            <h1 className="md:text-3xl xl:text-4xl font-semibold text-center capitalize dark:text-gray-100 mb-8 hidden md:block">Blood donation requests</h1>
                        </caption>
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