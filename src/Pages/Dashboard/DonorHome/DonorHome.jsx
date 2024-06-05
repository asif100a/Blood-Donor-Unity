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

    if (isError) {
        console.error(error);
    }

    if (isPending) {
        return <LoadingSpiner smallLoader={true} />
    }

    return (
        <div>
            <WelcomeSection title={'Donor Dashboard Your Lifesaving Hub'} description={"Welcome to the Donor Dashboard! Here, you're the heartbeat of our mission. Track your contributions, schedule donations, and stay connected with our community of lifesavers. Thank you for your invaluable support in helping save lives through blood donation."} />

            <div className={`${recentRequests?.length === 0 && 'hidden'}`}>
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
                                        handleDelete={handleDelete}
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
        </div>
    );
};

export default DonorHome;