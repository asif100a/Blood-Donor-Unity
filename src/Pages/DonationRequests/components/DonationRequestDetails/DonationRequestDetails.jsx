import { useLoaderData } from "react-router-dom";

const DonationRequestDetails = () => {
    const requestData = useLoaderData();
    console.log(requestData);
    const {
        requester_name,
        requester_email,
        recipient_name,
        district,
        upazila,
        hospital_name,
        full_address,
        request_message,
        selectedDate,
        time,
        donation_status
    } = requestData;

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

    return (
        <section
            className="bg-white pt-12 lg:pt-8 pb-12 lg:pb-[90px] relative z-20 overflow-hidden"
        >
            <div className="container">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full px-4">
                        <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
                            <h2
                                className="font-bold text-3xl sm:text-4xl md:text-[40px] text-dark mb-4"
                            >
                                Blood donation request details
                            </h2>
                            <p className="text-base text-body-color">
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
               rounded-xl
               relative
               z-10
               overflow-hidden
               border border-primary border-opacity-20
               shadow-pricing
               py-10
               px-8
               sm:p-12
               lg:py-10 lg:px-6
               xl:p-12
               mb-10
               "
                        >
                            <span className="text-primary font-semibold text-lg block mb-4">
                                Personal
                            </span>
                            <h2 className="font-bold text-dark mb-5 text-[42px]">
                                $59
                                <span className="text-base text-body-color font-medium">
                                    / year
                                </span>
                            </h2>
                            <p
                                className="
                  text-base text-body-color
                  pb-8
                  mb-8
                  border-b border-[#F2F2F2]
                  "
                            >
                                Perfect for using in a personal website or a client project.
                            </p>
                            <div className="mb-7">
                                <p className="text-base text-body-color leading-loose mb-1">
                                    <span className="font-bold">Blood recipient name:</span> {recipient_name}
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

                                <hr />

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
                            <a
                                href="#"
                                className="
                  w-full
                  block
                  text-base
                  font-semibold
                  text-primary
                  bg-transparent
                  border border-[#D4DEFF]
                  rounded-md
                  text-center
                  p-4
                  hover:text-white hover:bg-primary hover:border-primary
                  transition
                  "
                            >
                                Choose Personal
                            </a>
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