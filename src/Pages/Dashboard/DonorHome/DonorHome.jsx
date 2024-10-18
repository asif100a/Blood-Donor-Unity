import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import WelcomeSection from "../../../SharedComponents/WelcomeSection/WelcomeSection";
import RequestTRow from "./components/RequestTRow";
import { Link } from "react-router-dom";
import LoadingSpiner from "../../../SharedComponents/LoadingSpiner/LoadingSpiner";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const DonorHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: recentRequests = [], isError, error, isPending, refetch } = useQuery({
        queryKey: ['recentRequests', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/recent-requests/${user?.email}`);
            return data;
        }
    });

    // Filter the recent donation requests
    // const filterdRecentData = donationRequests.
    console.log(recentRequests);

    const handleDelete = (id) => {
        console.log(id);
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success text-[#ffffff]",
                cancelButton: "btn btn-danger bg-[#ff0000] text-[#ffffff] ",
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

    if (isError) {
        console.error(error);
    }

    if (isPending) {
        return <LoadingSpiner smallLoader={true} />
    }

    return (
        <div className="w-full md:w-screen lg:w-full overflow-hidden">
            <WelcomeSection title={'Donor Dashboard Your Lifesaving Hub'} description={"Welcome to the Donor Dashboard! Here, you're the heartbeat of our mission. Track your contributions, schedule donations, and stay connected with our community of lifesavers. Thank you for your invaluable support in helping save lives through blood donation."} />

            <div className={`${recentRequests?.length === 0 && 'hidden'}`}>
                <div className="mt-3 mb-6">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center">Recent donation requests</h1>
                </div>

                <div className="overflow-x-auto w-screen lg:w-auto border dark:border-gray-600">
                    <table className="table table-sm">
                        <thead>
                            <tr className="dark:text-gray-300">
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
                                        handleDelete={handleDelete}
                                    />
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <div className="mt-10 mb-6 text-center">
                    <Link to={'/dashboard/my_donation_requests'}>
                        <button type="button" className={`t-6 relative rounded-full px-3 py-2 overflow-hidden group bg-green-600 hover:bg-gradient-to-r hover:from-green-600 hover:to-green-500 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-500 transition-all ease-out duration-300`}>
                            <span className="absolute right-0 w-6 h-24 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                            <span className="relative">View all requests</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DonorHome;