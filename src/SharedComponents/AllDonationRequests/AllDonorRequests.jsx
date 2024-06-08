import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import LoadingSpiner from '../LoadingSpiner/LoadingSpiner';
import RequestTbody from './components/RequestTbody';
// import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaAngleDown } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import useRefresh from '../../Hooks/useRefresh';

const AllDonorRequests = ({ email, volunteer, admin }) => {
    console.log(email)
    console.log(volunteer);
    console.log(admin)
    const axiosSecure = useAxiosSecure();
    const [donationRequests, setDonationRequests] = useState([]);
    const [isPending, setIspending] = useState(true);
    const [sortedValue, setSortedValue] = useState('');
    // const [refetch, setRefetch] = useState(null);
    const refresh = useRefresh();

    // const { data: donationRequests = [], isError, error, isPending, refetch } = useQuery({
    //     queryKey: ['donationRequests', email],
    //     queryFn: async () => {
    //         if (email) {
    //             const { data } = await axiosSecure(`/donation-requests/${email}?status=${sortedValue}`);
    //             return data;

    //         } else {
    //             const { data } = await axiosSecure(`/donation-requests`);
    //             return data;
    //         }
    //     }
    // });
    // console.log(refetch)

    useEffect(() => {
        donationRequestsData();

    }, [sortedValue]);

    const donationRequestsData = async () => {
        if (email) {
            const { data } = await axiosSecure(`/donation-requests/${email}?status=${sortedValue}`);
            setDonationRequests(data);
            setIspending(false);

        } else {
            const { data } = await axiosSecure(`/donation-requests?status=${sortedValue}`);
            setDonationRequests(data);
            setIspending(false);
        }
    };

    // Handle dropdown sort by content
    const handleDropdown = (status) => {
        console.log(status);
        setSortedValue(status);
    };

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
                        
                        const updatedData = refresh(id, donationRequests);
                        setDonationRequests(updatedData);
                        console.log('updated data', updatedData)
                    }
                } catch (err) {
                    console.error(err);
                }


            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
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
                donationRequestsData();
            }

        } catch (err) {
            console.error(err);
        }
    };


    // Set loading spiner if data is pending
    if (isPending) {
        return <LoadingSpiner />
    }

    return (
        <div>
            <div className="mb-12 text-center">
                <div className="dropdown ">
                    <button className="relative inline-flex items-center justify-center p-4 px-12 py-3 overflow-hidden font-medium text-red-600 transition duration-300 ease-out border-2 border-green-500 rounded-full shadow-md group">
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-green-500 group-hover:translate-x-0 ease">
                            <FaAngleDown className="w-6 h-6" />
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-red-600 transition-all duration-300 transform group-hover:translate-x-full ease">Sort by</span>
                        <span className="relative invisible">Sort by</span>
                    </button>

                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 -right-6">
                        <li onClick={() => handleDropdown('pending')}><a>pending</a></li>
                        <li onClick={() => handleDropdown('in progress')}><a>in progress</a></li>
                        <li onClick={() => handleDropdown('complete')}><a>complete</a></li>
                    </ul>
                </div>
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