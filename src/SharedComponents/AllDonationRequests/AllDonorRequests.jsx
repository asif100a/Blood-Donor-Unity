import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import LoadingSpiner from '../LoadingSpiner/LoadingSpiner';
import RequestTbody from './components/RequestTbody';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AllDonorRequests = ({ email }) => {
    console.log(email)
    const axiosSecure = useAxiosSecure();

    const { data: donationRequests = [], isError, error, isPending, refetch } = useQuery({
        queryKey: ['donationRequests', email],
        queryFn: async () => {
            if (email) {
                const { data } = await axiosSecure(`/donation-requests/${email}`);
                return data;

            } else{
                const { data } = await axiosSecure(`/donation-requests`);
                return data;
            }
        }
    });

    // Delete an data
    const handleDelete = (id) => {
        console.log(id);
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await axiosSecure.delete(`/donation-requests/${id}`);
                    console.log(data);
                    if (data?.deletedCount > 0) {
                        toast.success('You have deleted a donation request');
                        // swalWithBootstrapButtons.fire({
                        //     title: "Deleted!",
                        //     text: "Your file has been deleted.",
                        //     icon: "success"
                        //   });
                        refetch();
                    }
                } catch (err) {
                    console.error(err);
                }


            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "You have canceled delete oparation",
                    icon: "error",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });


    };

    console.log(donationRequests);
    if (isError) {
        console.error(error);
    }

    if (isPending) {
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
                                handleDelete={handleDelete}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

AllDonorRequests.propTypes = {
    email: PropTypes.string
};

export default AllDonorRequests;