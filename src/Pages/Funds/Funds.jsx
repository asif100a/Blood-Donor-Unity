import { useState } from "react";
import FundModal from "./components/FundModal";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import FundTRow from "./components/FundTRow";
import LoadingSpiner from "../../SharedComponents/LoadingSpiner/LoadingSpiner";

const Funds = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const axiosSecure = useAxiosSecure();

    const handleGetAmount = (e) => {
        console.log(e.target.value);
        setAmount(e.target.value);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const { data: fundData = [], isLoading, refetch } = useQuery({
        queryKey: ['donation-data'],
        queryFn: async () => {
            const { data } = await axiosSecure('/donation-fund');
            return data;
        }
    });
    // console.log(fundData);

    if(isLoading) {
        return <LoadingSpiner />;
    }

    return (
        <div className="px-6 lg:px-32 min-h-[calc(100vh-389px)] dark:bg-[#292929] dark:text-gray-100 py-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center capitalize">Donate to Our Fund</h1>
            <p className="mt-3 text-center max-w-xl mx-auto">Your contribution can save lives. By donating to our Blood Donation Fund, you support essential blood drives, medical supplies, and outreach programs that ensure a steady supply of life-saving blood for those in need.</p>

            <div className="text-center mt-6">
                <button onClick={() => setIsOpen(true)} className="relative rounded-full px-5 py-2.5 overflow-hidden group bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-orange-400 transition-all ease-out duration-300">
                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    <span className="relative">Give fund</span>
                </button>

                <FundModal
                    isOpen={isOpen}
                    closeModal={handleCloseModal}
                    amount={amount}
                    handleGetAmount={handleGetAmount}
                    setIsOpen={setIsOpen}
                    refetch={refetch}
                />
            </div>

            <div className="overflow-x-auto mt-6">
                <table className="table table-sm md:table-md">
                    <thead className="dark:text-gray-300">
                        <tr>
                            <th></th>
                            <th>Donor name</th>
                            <th>Donor email</th>
                            <th>Amount</th>
                            <th>Donation date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            fundData?.map((data, i) => <FundTRow key={data?._id} i={i} data={data} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Funds;