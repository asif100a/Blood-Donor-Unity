import { useQuery } from "@tanstack/react-query";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpiner from "../LoadingSpiner/LoadingSpiner";

const CountCard = () => {
    const axiosSecure = useAxiosSecure();

    const {data = {}, isPending} = useQuery({
        queryKey: ['admin-statistics'],
        queryFn: async() => {
            const {data} = await axiosSecure('/admin-statistics');
            return data;
        }
    });
    console.log(data);

    if(isPending) {
        return <LoadingSpiner />;
    }

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-4 mx-auto">
                <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">At a glance statistics</h1>

                {/* Total users */}
                <div className="grid grid-cols-1 gap-8 mt-6 lg:grid-cols-3 xl:mt-12">
                    <div className="flex items-center justify-between px-8 py-4 border border-green-500 cursor-pointer rounded-xl">
                        <div className="flex flex-col items-center space-y-1">
                            <FaUsers className="text-3xl text-green-500" />

                            <h2 className="text-lg font-medium text-orange-600 sm:text-xl capitalize dark:text-gray-200">Total user</h2>
                        </div>


                        <div className="flex flex-col items-center space-y-1">
                            <div className="px-2 text-xs font-medium text-green-500 bg-green-50 rounded-full dark:text-blue-400 sm:px-4 sm:py-1 dark:bg-gray-700">
                                Donors
                            </div>

                            <h2 className="text-2xl font-semibold text-orange-600 dark:text-blue-500 sm:text-3xl">{data?.total_user}</h2>
                        </div>
                    </div>

                    {/* Total funding */}
                    <div className="flex items-center justify-between px-8 py-4 border border-blue-500 cursor-pointer rounded-xl">
                        <div className="flex flex-col items-center space-y-1">
                            <GiPayMoney className="text-3xl text-blue-500" />

                            <h2 className="text-lg font-medium sm:text-xl capitalize dark:text-gray-200 text-[#FF1493]">Total funding</h2>
                        </div>


                        <div className="flex flex-col items-center space-y-1">
                            <div className="px-2 text-xs text-blue-500 bg-gray-100 rounded-full dark:text-blue-400 sm:px-4 sm:py-1 dark:bg-gray-700 font-medium">
                                Funds
                            </div>

                            <h2 className="text-2xl font-semibold text-[#FF1493] dark:text-blue-500 sm:text-3xl">[]</h2>
                        </div>
                    </div>

                    {/* Total blood dontaion request */}
                    <div className="flex items-center justify-between px-8 py-4 border border-orange-600 cursor-pointer rounded-xl">
                        <div className="flex flex-col space-y-1">
                            {/* <p>🩸</p> */}
                            <BiSolidDonateBlood className="text-3xl ml-12 text-orange-600" />

                            <h2 className="text-lg font-medium text-blue-500 sm:text-xl capitalize dark:text-gray-200">Total blood dontaion request</h2>
                        </div>


                        <div className="flex flex-col items-center space-y-1">
                            <div className="px-2 text-xs text-orange-600 bg-orange-100 rounded-full dark:text-blue-400 sm:px-4 sm:py-1 dark:bg-gray-700 font-medium">
                                Requests
                            </div>

                            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-500 sm:text-3xl">{data?.total_blood_donation_request}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountCard;