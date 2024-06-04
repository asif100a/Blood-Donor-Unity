import useAxiosSecure from '../../Hooks/useAxiosSecure';
import LoadingSpiner from '../LoadingSpiner/LoadingSpiner';
import RequestTbody from './components/RequestTbody';
import { useQuery } from '@tanstack/react-query';

const AllDonorRequests = () => {
    const axiosSecure = useAxiosSecure();

    const { data: donationRequests = [], isError, error, isPending } = useQuery({
        queryKey: ['donationRequests'],
        queryFn: async () => {
            const { data } = await axiosSecure('/donation-requests');
            return data;
        }
    });

    if(isPending) {
        return <LoadingSpiner />
    }

    return (
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
                        donationRequests?.map((donationRequest, index) => (
                            <RequestTbody
                                key={donationRequest?._id}
                                data={donationRequest}
                                index={index}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllDonorRequests;