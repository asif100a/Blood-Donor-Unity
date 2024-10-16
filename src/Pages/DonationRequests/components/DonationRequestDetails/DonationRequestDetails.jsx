import { useLoaderData } from "react-router-dom";
import ModalForDonate from "./Modal/ModalForDonate";
import { useState } from "react";
import useLoggedUser from "../../../../Hooks/useLoggedUser";
import toast from "react-hot-toast";
// import useAuth from "../../../../Hooks/useAuth";

const DonationRequestDetails = () => {
    const loggedUser = useLoggedUser();
    // const {user} = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const requestData = useLoaderData();
    const {
        _id,
        requester_name,
        requester_email,
        recipient_name,
        blood_group,
        district,
        upazila,
        hospital_name,
        full_address,
        request_message,
        selectedDate,
        time,
        donation_status
    } = requestData;
    console.log(loggedUser.blood_group);

    // Convert selectedData to readable date
    const request_date = new Date(selectedDate).toLocaleDateString('en-GB');

    // Convert time to readable time
    const getReadableTime = (time24) => {
        // Separate hour and munite
        const [hour24, munite] = time24.split(':').map(Number);

        // Get the period of time
        const period = hour24 >= 12 ? 'PM' : 'AM';

        // Convert 24 hour to 12 hour
        const hour12 = hour24 % 12 || 12;

        // Formate the munite
        const formatedMunite = munite.toString().padStart(2, '0');

        // Get the formated 12 hour time
        const time12 = `${hour12}:${formatedMunite} ${period}`;

        return time12;
    };

    const request_time = getReadableTime(time);


    // Open the donate modal
    const handleOpenModal = () => {
        if (loggedUser?.blood_group !== blood_group) {
            return toast.error(`Need '${blood_group}' blood. Your blood is '${loggedUser?.blood_group}'`);
        }
        setIsOpen(true);
    };

    // Close the donate modal
    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <section
            className="bg-white dark:bg-[#292929] min-h-[calc(100vh-389px)] pt-12 lg:pt-8 pb-12 lg:pb-[90px] relative overflow-hidden"
        >
            <div className="container">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full px-4">
                        <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
                            <h2
                                className="font-bold text-3xl sm:text-4xl md:text-[40px] text-dark mb-4 capitalize dark:text-gray-100"
                            >
                                Blood donation request details
                            </h2>
                            <p className="text-base text-body-color dark:text-gray-200">
                                Blood Donator Unity is dedicated to connecting blood donors with those in need. Our mission is to facilitate timely blood donations and promote awareness about the importance of blood donation.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center -mx-4">
                    <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                        <div
                            className="
                                bg-white
                                dark:bg-inherit
                                dark:text-gray-100
                                rounded-xl
                                relative
                                z-10
                                overflow-hidden
                                border border-green-600 border-opacity-20
                                shadow-pricing
                                py-10
                                px-6
                                lg:px-16
                                sm:p-12
                                lg:py-10 
                                xl:p-12
                                mb-10
                                ">
                            <span className="text-orange-600 font-semibold text-lg block mb-4 bg-orange-100 w-fit px-2 rounded-md">
                                Request
                            </span>
                            <h2 className="font-bold text-dark mb-5 text-2xl">
                                Details of {recipient_name}
                            </h2>
                            <p
                                className="
                                text-base text-body-color
                                pb-8
                                mb-8
                                border-b 
                                border-[#F2F2F2]
                                ">
                                Perfect for using in a personal website or a client project.
                            </p>
                            <div className="mb-7">
                                <p className="text-base text-body-color leading-loose mb-1">
                                    <span className="font-bold">Recipient name:</span> {recipient_name}
                                </p>
                                <p className="text-base text-body-color leading-loose mb-1">
                                    <span className="font-bold">Blood group:</span> {blood_group}
                                </p>
                                <p className="text-base text-body-color leading-loose mb-1">
                                    <span className="font-bold">Location:</span> {upazila}, {district}
                                </p>
                                <p className="text-base text-body-color leading-loose mb-1">
                                    <span className="font-bold">Hospital:</span> {hospital_name}
                                </p>
                                <p className="text-base text-body-color leading-loose mb-1">
                                    <span className="font-bold">Address:</span> {full_address}
                                </p>
                                <p className="text-base text-body-color leading-loose mb-1">
                                    <span className="font-bold">Donation date:</span> {request_date}
                                </p>
                                <p className="text-base text-body-color leading-loose mb-1">
                                    <span className="font-bold">Donation time:</span> {request_time}
                                </p>
                                <p className="text-base text-body-color leading-loose mb-1">
                                    <span className="font-bold">Request message:</span> {request_message}
                                </p>

                                <hr className="my-3" />

                                <p className="text-base text-body-color leading-loose mb-1">
                                    <span className="font-bold">Donation status:</span> {donation_status}
                                </p>
                                <p className="text-base text-body-color leading-loose mb-1">
                                    <span className="font-bold">Requester name:</span> {requester_name}
                                </p>
                                <p className="text-base text-body-color leading-loose mb-1">
                                    <span className="font-bold">Requester email:</span> {requester_email}
                                </p>
                            </div>
                            <button
                                onClick={handleOpenModal}
                                className="w-full block
                                            text-base
                                            font-semibold
                                            border border-red-600
                                            rounded-md
                                            text-center
                                            text-green-600
                                            p-4
                                            hover:text-white hover:bg-green-600 hover:border-primary
                                            transition
                                            ">
                                Donate
                            </button>
                            <ModalForDonate isOpen={isOpen} onClose={handleCloseModal} id={_id} />

                            <div>
                                <span className="absolute right-0 top-7 z-[-1]">
                                    <svg
                                        width="77"
                                        height="172"
                                        viewBox="0 0 77 172"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle cx="86" cy="86" r="86" fill="url(#paint0_linear)" />
                                        <defs>
                                            <linearGradient
                                                id="paint0_linear"
                                                x1="86"
                                                y1="0"
                                                x2="86"
                                                y2="172"
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <stop stopColor="#16a34a" stopOpacity="0.8" />
                                                <stop
                                                    offset="1"
                                                    stopColor="#16a34a"
                                                    stopOpacity="0"
                                                />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </span>
                                <span className="absolute right-4 top-4 z-[-1]">
                                    <svg
                                        width="41"
                                        height="89"
                                        viewBox="0 0 41 89"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            cx="38.9138"
                                            cy="87.4849"
                                            r="1.42021"
                                            transform="rotate(180 38.9138 87.4849)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="38.9138"
                                            cy="74.9871"
                                            r="1.42021"
                                            transform="rotate(180 38.9138 74.9871)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="38.9138"
                                            cy="62.4892"
                                            r="1.42021"
                                            transform="rotate(180 38.9138 62.4892)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="38.9138"
                                            cy="38.3457"
                                            r="1.42021"
                                            transform="rotate(180 38.9138 38.3457)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="38.9138"
                                            cy="13.634"
                                            r="1.42021"
                                            transform="rotate(180 38.9138 13.634)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="38.9138"
                                            cy="50.2754"
                                            r="1.42021"
                                            transform="rotate(180 38.9138 50.2754)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="38.9138"
                                            cy="26.1319"
                                            r="1.42021"
                                            transform="rotate(180 38.9138 26.1319)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="38.9138"
                                            cy="1.42021"
                                            r="1.42021"
                                            transform="rotate(180 38.9138 1.42021)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="26.4157"
                                            cy="87.4849"
                                            r="1.42021"
                                            transform="rotate(180 26.4157 87.4849)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="26.4157"
                                            cy="74.9871"
                                            r="1.42021"
                                            transform="rotate(180 26.4157 74.9871)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="26.4157"
                                            cy="62.4892"
                                            r="1.42021"
                                            transform="rotate(180 26.4157 62.4892)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="26.4157"
                                            cy="38.3457"
                                            r="1.42021"
                                            transform="rotate(180 26.4157 38.3457)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="26.4157"
                                            cy="13.634"
                                            r="1.42021"
                                            transform="rotate(180 26.4157 13.634)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="26.4157"
                                            cy="50.2754"
                                            r="1.42021"
                                            transform="rotate(180 26.4157 50.2754)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="26.4157"
                                            cy="26.1319"
                                            r="1.42021"
                                            transform="rotate(180 26.4157 26.1319)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="26.4157"
                                            cy="1.4202"
                                            r="1.42021"
                                            transform="rotate(180 26.4157 1.4202)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="13.9177"
                                            cy="87.4849"
                                            r="1.42021"
                                            transform="rotate(180 13.9177 87.4849)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="13.9177"
                                            cy="74.9871"
                                            r="1.42021"
                                            transform="rotate(180 13.9177 74.9871)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="13.9177"
                                            cy="62.4892"
                                            r="1.42021"
                                            transform="rotate(180 13.9177 62.4892)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="13.9177"
                                            cy="38.3457"
                                            r="1.42021"
                                            transform="rotate(180 13.9177 38.3457)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="13.9177"
                                            cy="13.634"
                                            r="1.42021"
                                            transform="rotate(180 13.9177 13.634)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="13.9177"
                                            cy="50.2754"
                                            r="1.42021"
                                            transform="rotate(180 13.9177 50.2754)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="13.9177"
                                            cy="26.1319"
                                            r="1.42021"
                                            transform="rotate(180 13.9177 26.1319)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="13.9177"
                                            cy="1.42019"
                                            r="1.42021"
                                            transform="rotate(180 13.9177 1.42019)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="1.41963"
                                            cy="87.4849"
                                            r="1.42021"
                                            transform="rotate(180 1.41963 87.4849)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="1.41963"
                                            cy="74.9871"
                                            r="1.42021"
                                            transform="rotate(180 1.41963 74.9871)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="1.41963"
                                            cy="62.4892"
                                            r="1.42021"
                                            transform="rotate(180 1.41963 62.4892)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="1.41963"
                                            cy="38.3457"
                                            r="1.42021"
                                            transform="rotate(180 1.41963 38.3457)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="1.41963"
                                            cy="13.634"
                                            r="1.42021"
                                            transform="rotate(180 1.41963 13.634)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="1.41963"
                                            cy="50.2754"
                                            r="1.42021"
                                            transform="rotate(180 1.41963 50.2754)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="1.41963"
                                            cy="26.1319"
                                            r="1.42021"
                                            transform="rotate(180 1.41963 26.1319)"
                                            fill="#ea580c"
                                        />
                                        <circle
                                            cx="1.41963"
                                            cy="1.4202"
                                            r="1.42021"
                                            transform="rotate(180 1.41963 1.4202)"
                                            fill="#ea580c"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DonationRequestDetails;