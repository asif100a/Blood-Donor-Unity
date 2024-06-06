import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import LoadingSpiner from '../LoadingSpiner/LoadingSpiner';
import RequestTbody from './components/RequestTbody';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AllDonorRequests = ({ email, volunteer, admin }) => {
    console.log(email)
    console.log(volunteer);
    console.log(admin)
    const axiosSecure = useAxiosSecure();

    const { data: donationRequests = [], isError, error, isPending, refetch } = useQuery({
        queryKey: ['donationRequests', email],
        queryFn: async () => {
            if (email) {
                const { data } = await axiosSecure(`/donation-requests/${email}`);
                return data;

            } else {
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
                        refetch();
                    }
                } catch (err) {
                    console.error(err);
                }


            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                // swalWithBootstrapButtons.fire({
                //     title: "Cancelled",
                //     text: "You have canceled delete oparation",
                //     icon: "error",
                //     timer: 1500,
                //     showConfirmButton: false
                // });;
                toast.error('You have canceled delete oparation')
            }
        });

    };

    // Change donation status by Admin & Volunteer
    const handleChangeStatus = async (value, id) => {
        // console.table({value, id});
        try {
            const { data } = await axiosSecure.patch(`/donation-requests-status/${id}`, { donation_status: value });
            console.log(data);
            if (data?.modifiedCount > 0) {
                toast.success('Status changed successfully');
                refetch();
            }

        } catch (err) {
            console.error(err);
        }
    };

    console.log(donationRequests);
    if (isError) {
        console.error(error);
    }

    if (isPending) {
        return <LoadingSpiner />
    }

    return (
        <div>
            <div className='my-6 text-center'>
                <button className='btn'>Sort by</button>
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
                            {(volunteer || admin) && <th>Change donation status</th>}
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
                                    volunteer={volunteer}
                                    admin={admin}
                                    handleChangeStatus={handleChangeStatus}
                                />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

AllDonorRequests.propTypes = {
    email: PropTypes.string,
    volunteer: PropTypes.bool,
    admin: PropTypes.bool,
};

export default AllDonorRequests;